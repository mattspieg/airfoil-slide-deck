import { SLIDES_SELECTOR } from '../../utils/constants'
import { queryAll, transformElement } from '../../utils/util'

/**
 * Transposed overview controller.
 *
 * Physical deck structure remains the same:
 * - horizontal slides = groups
 * - vertical slides = slides within a group
 *
 * But overview renders:
 * - groups on the vertical axis
 * - slides within a group on the horizontal axis
 */
export default class Overview {

	constructor( Reveal ) {

		this.Reveal = Reveal;

		this.active = false;

		this.onSlideClicked = this.onSlideClicked.bind( this );

	}

	activate() {

		if( this.Reveal.getConfig().overview && !this.Reveal.isScrollView() && !this.isActive() ) {

			this.active = true;

			this.Reveal.getRevealElement().classList.add( 'overview' );
			this.Reveal.getRevealElement().classList.add( 'overview-activating' );

			this.Reveal.cancelAutoSlide();

			this.Reveal.getSlidesElement().appendChild( this.Reveal.getBackgroundsElement() );

			queryAll( this.Reveal.getRevealElement(), SLIDES_SELECTOR ).forEach( slide => {
				if( !slide.classList.contains( 'stack' ) ) {
					slide.addEventListener( 'click', this.onSlideClicked, true );
				}
			} );

			const slideSize = this.Reveal.getComputedSlideSize();
			const horizontalMargin = slideSize.width * 0.08;
			const verticalGap = slideSize.height * 0.45;

			this.overviewSlideWidth = slideSize.width + horizontalMargin;
			this.overviewSlideHeight = slideSize.height + verticalGap;

			if( this.Reveal.getConfig().rtl ) {
				this.overviewSlideWidth = -this.overviewSlideWidth;
			}

			this.Reveal.updateSlidesVisibility();
			this.layout();
			this.update();
			this.Reveal.layout();

			const indices = this.Reveal.getIndices();

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

	layout() {

		this.Reveal.getHorizontalSlides().forEach( ( hslide, h ) => {
			hslide.setAttribute( 'data-index-h', h );
			transformElement( hslide, 'translate3d(0, ' + ( h * this.overviewSlideHeight ) + 'px, 0)' );

			if( hslide.classList.contains( 'stack' ) ) {
				queryAll( hslide, 'section' ).forEach( ( vslide, v ) => {
					vslide.setAttribute( 'data-index-h', h );
					vslide.setAttribute( 'data-index-v', v );
					transformElement( vslide, 'translate3d(' + ( v * this.overviewSlideWidth ) + 'px, 0, 0)' );
				} );
			}
		} );

		Array.from( this.Reveal.getBackgroundsElement().childNodes ).forEach( ( hbackground, h ) => {
			transformElement( hbackground, 'translate3d(0, ' + ( h * this.overviewSlideHeight ) + 'px, 0)' );

			queryAll( hbackground, '.slide-background' ).forEach( ( vbackground, v ) => {
				transformElement( vbackground, 'translate3d(' + ( v * this.overviewSlideWidth ) + 'px, 0, 0)' );
			} );
		} );

	}

	update() {

		const vmin = Math.min( window.innerWidth, window.innerHeight );
		const scale = Math.max( vmin / 5, 150 ) / vmin;
		const indices = this.Reveal.getIndices();
		const targetTransform = [
			'scale(' + scale + ')',
			'translateX(' + ( -indices.v * this.overviewSlideWidth ) + 'px)',
			'translateY(' + ( -indices.h * this.overviewSlideHeight ) + 'px)'
		].join( ' ' );

		this.Reveal.transformSlides( {
			overview: targetTransform
		} );

	}

	deactivate() {

		if( this.Reveal.getConfig().overview ) {

			this.active = false;

			this.Reveal.getRevealElement().classList.remove( 'overview' );
			this.Reveal.getRevealElement().classList.add( 'overview-deactivating' );

			setTimeout( () => {
				this.Reveal.getRevealElement().classList.remove( 'overview-deactivating' );
			}, 1 );

			this.Reveal.getRevealElement().appendChild( this.Reveal.getBackgroundsElement() );

			queryAll( this.Reveal.getRevealElement(), SLIDES_SELECTOR ).forEach( slide => {
				transformElement( slide, '' );
				slide.removeEventListener( 'click', this.onSlideClicked, true );
			} );

			queryAll( this.Reveal.getBackgroundsElement(), '.slide-background' ).forEach( background => {
				transformElement( background, '' );
			} );

			this.Reveal.transformSlides( { overview: '' } );

			const indices = this.Reveal.getIndices();

			this.Reveal.slide( indices.h, indices.v );
			this.Reveal.layout();
			this.Reveal.cueAutoSlide();

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

	toggle( override ) {

		if( typeof override === 'boolean' ) {
			override ? this.activate() : this.deactivate();
		}
		else {
			this.isActive() ? this.deactivate() : this.activate();
		}

	}

	isActive() {

		return this.active;

	}

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
