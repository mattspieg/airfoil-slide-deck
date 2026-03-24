import { SLIDES_SELECTOR } from '../utils/constants'
import { extend, queryAll, transformElement } from '../utils/util'

/**
 * Handles all logic related to the overview mode
 * (birds-eye view of all slides).
 */
export default class Overview {

	constructor( Reveal ) {

		this.Reveal = Reveal;

		this.active = false;

		this.onSlideClicked = this.onSlideClicked.bind( this );

	}

	/**
	 * Displays the overview of slides (quick nav) by scaling
	 * down and arranging all slide elements.
	 */
	activate() {

		// Only proceed if enabled in config
		if( this.Reveal.getConfig().overview && !this.Reveal.isScrollView() && !this.isActive() ) {

			this.active = true;

			this.Reveal.getRevealElement().classList.add( 'overview' );
			this.Reveal.getRevealElement().classList.add( 'overview-activating' );

			// Don't auto-slide while in overview mode
			this.Reveal.cancelAutoSlide();

			// Move the backgrounds element into the slide container to
			// that the same scaling is applied
			this.Reveal.getSlidesElement().appendChild( this.Reveal.getBackgroundsElement() );

			// Clicking on an overview slide navigates to it
			queryAll( this.Reveal.getRevealElement(), SLIDES_SELECTOR ).forEach( slide => {
				if( !slide.classList.contains( 'stack' ) ) {
					slide.addEventListener( 'click', this.onSlideClicked, true );
				}
			} );

			// Calculate slide sizes
			const margin = 70;
			const slideSize = this.Reveal.getComputedSlideSize();
			const horizontalMargin = margin * 2;
			const verticalGap = 0;
			const verticalStep = slideSize.height + verticalGap;
			this.overviewSlideWidth = slideSize.width + horizontalMargin;
			this.overviewSlideHeight = verticalStep;

			const revealElement = this.Reveal.getRevealElement();
			const slidesElement = this.Reveal.getSlidesElement();
			const backgroundsElement = this.Reveal.getBackgroundsElement();
			const currentSlide = this.Reveal.getCurrentSlide();
			const currentSlideRect = currentSlide ? currentSlide.getBoundingClientRect() : null;
			const slidesRect = slidesElement.getBoundingClientRect();
			const revealRect = revealElement.getBoundingClientRect();
			const backgroundsRect = backgroundsElement.getBoundingClientRect();
			const slidesStyle = window.getComputedStyle( slidesElement );
			const backgroundsStyle = window.getComputedStyle( backgroundsElement );
			const computedScale = Math.max( Math.min( window.innerWidth, window.innerHeight ) / 5, 150 ) / Math.min( window.innerWidth, window.innerHeight );
			const targetTransform = [
				'scale(' + computedScale + ')',
				'translateX(' + ( -this.Reveal.getIndices().h * this.overviewSlideWidth ) + 'px)',
				'translateY(' + ( -this.Reveal.getIndices().v * this.overviewSlideHeight ) + 'px)'
			].join( ' ' );

			// Reverse in RTL mode
			if( this.Reveal.getConfig().rtl ) {
				this.overviewSlideWidth = -this.overviewSlideWidth;
			}

			this.Reveal.updateSlidesVisibility();

			this.layout();
			this.update();

			this.Reveal.layout();

			const indices = this.Reveal.getIndices();

			// Notify observers of the overview showing
			this.Reveal.dispatchEvent({
				type: 'overviewshown',
				data: {
					'indexh': indices.h,
					'indexv': indices.v,
					'currentSlide': this.Reveal.getCurrentSlide()
				}
			});

			requestAnimationFrame( () => {
				requestAnimationFrame( () => {
					this.Reveal.getRevealElement().classList.remove( 'overview-activating' );
				} );
			} );

		}

	}

	/**
	 * Uses CSS transforms to position all slides in a grid for
	 * display inside of the overview mode.
	 */
	layout() {

		// Layout slides
		this.Reveal.getHorizontalSlides().forEach( ( hslide, h ) => {
			hslide.setAttribute( 'data-index-h', h );
			transformElement( hslide, 'translate3d(' + ( h * this.overviewSlideWidth ) + 'px, 0, 0)' );

			if( hslide.classList.contains( 'stack' ) ) {

				queryAll( hslide, 'section' ).forEach( ( vslide, v ) => {
					vslide.setAttribute( 'data-index-h', h );
					vslide.setAttribute( 'data-index-v', v );

					transformElement( vslide, 'translate3d(0, ' + ( v * this.overviewSlideHeight ) + 'px, 0)' );
				} );

			}
		} );

		// Layout slide backgrounds
		Array.from( this.Reveal.getBackgroundsElement().childNodes ).forEach( ( hbackground, h ) => {
			transformElement( hbackground, 'translate3d(' + ( h * this.overviewSlideWidth ) + 'px, 0, 0)' );

			queryAll( hbackground, '.slide-background' ).forEach( ( vbackground, v ) => {
				transformElement( vbackground, 'translate3d(0, ' + ( v * this.overviewSlideHeight ) + 'px, 0)' );
			} );
		} );

	}

	/**
	 * Moves the overview viewport to the current slides.
	 * Called each time the current slide changes.
	 */
	update() {

		const vmin = Math.min( window.innerWidth, window.innerHeight );
		const scale = Math.max( vmin / 5, 150 ) / vmin;
		const indices = this.Reveal.getIndices();
		const targetTransform = [
			'scale(' + scale + ')',
			'translateX(' + ( -indices.h * this.overviewSlideWidth ) + 'px)',
			'translateY(' + ( -indices.v * this.overviewSlideHeight ) + 'px)'
		].join( ' ' );

		this.Reveal.transformSlides( {
			overview: targetTransform
		} );

		requestAnimationFrame( () => {
		} );

	}

	/**
	 * Exits the slide overview and enters the currently
	 * active slide.
	 */
	deactivate() {

		// Only proceed if enabled in config
		if( this.Reveal.getConfig().overview ) {

			this.active = false;

			this.Reveal.getRevealElement().classList.remove( 'overview' );

			// Temporarily add a class so that transitions can do different things
			// depending on whether they are exiting/entering overview, or just
			// moving from slide to slide
			this.Reveal.getRevealElement().classList.add( 'overview-deactivating' );

			setTimeout( () => {
				this.Reveal.getRevealElement().classList.remove( 'overview-deactivating' );
			}, 1 );

			// Move the background element back out
			this.Reveal.getRevealElement().appendChild( this.Reveal.getBackgroundsElement() );

			// Clean up changes made to slides
			queryAll( this.Reveal.getRevealElement(), SLIDES_SELECTOR ).forEach( slide => {
				transformElement( slide, '' );

				slide.removeEventListener( 'click', this.onSlideClicked, true );
			} );

			// Clean up changes made to backgrounds
			queryAll( this.Reveal.getBackgroundsElement(), '.slide-background' ).forEach( background => {
				transformElement( background, '' );
			} );

			this.Reveal.transformSlides( { overview: '' } );

			const indices = this.Reveal.getIndices();

			this.Reveal.slide( indices.h, indices.v );
			this.Reveal.layout();
			this.Reveal.cueAutoSlide();

			// Notify observers of the overview hiding
			this.Reveal.dispatchEvent({
				type: 'overviewhidden',
				data: {
					'indexh': indices.h,
					'indexv': indices.v,
					'currentSlide': this.Reveal.getCurrentSlide()
				}
			});

		}
	}

	/**
	 * Toggles the slide overview mode on and off.
	 *
	 * @param {Boolean} [override] Flag which overrides the
	 * toggle logic and forcibly sets the desired state. True means
	 * overview is open, false means it's closed.
	 */
	toggle( override ) {

		if( typeof override === 'boolean' ) {
			override ? this.activate() : this.deactivate();
		}
		else {
			this.isActive() ? this.deactivate() : this.activate();
		}

	}

	/**
	 * Checks if the overview is currently active.
	 *
	 * @return {Boolean} true if the overview is active,
	 * false otherwise
	 */
	isActive() {

		return this.active;

	}

	/**
	 * Invoked when a slide is and we're in the overview.
	 *
	 * @param {object} event
	 */
	onSlideClicked( event ) {

		if( this.isActive() ) {
			event.preventDefault();

			let element = event.target;

			while( element && !element.nodeName.match( /section/gi ) ) {
				element = element.parentNode;
			}

			if( element && !element.classList.contains( 'disabled' ) ) {

				this.deactivate();

				if( element.nodeName.match( /section/gi ) ) {
					let h = parseInt( element.getAttribute( 'data-index-h' ), 10 ),
						v = parseInt( element.getAttribute( 'data-index-v' ), 10 );

					this.Reveal.slide( h, v );
				}

			}
		}

	}

}
