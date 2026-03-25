import { queryAll, enterFullscreen } from '../../utils/util'
import { isAndroid } from '../../utils/device'

export default class Controls {

	constructor( Reveal ) {

		this.Reveal = Reveal;

		this.onNavigateLeftClicked = this.onNavigateLeftClicked.bind( this );
		this.onNavigateRightClicked = this.onNavigateRightClicked.bind( this );
		this.onNavigateUpClicked = this.onNavigateUpClicked.bind( this );
		this.onNavigateDownClicked = this.onNavigateDownClicked.bind( this );
		this.onNavigatePrevClicked = this.onNavigatePrevClicked.bind( this );
		this.onNavigateNextClicked = this.onNavigateNextClicked.bind( this );
		this.onEnterFullscreen = this.onEnterFullscreen.bind( this );

	}

	render() {

		const revealElement = this.Reveal.getRevealElement();

		this.element = document.createElement( 'aside' );
		this.element.className = 'controls';
		this.element.innerHTML =
			`<button class="navigate-left" aria-label="previous slide in this group"><div class="controls-arrow"></div></button>
			<button class="navigate-right" aria-label="next slide in this group"><div class="controls-arrow"></div></button>
			<button class="navigate-up" aria-label="previous group"><div class="controls-arrow"></div></button>
			<button class="navigate-down" aria-label="next group"><div class="controls-arrow"></div></button>`;

		this.Reveal.getRevealElement().appendChild( this.element );

		this.controlsLeft = queryAll( revealElement, '.navigate-left' );
		this.controlsRight = queryAll( revealElement, '.navigate-right' );
		this.controlsUp = queryAll( revealElement, '.navigate-up' );
		this.controlsDown = queryAll( revealElement, '.navigate-down' );
		this.controlsPrev = queryAll( revealElement, '.navigate-prev' );
		this.controlsNext = queryAll( revealElement, '.navigate-next' );
		this.controlsFullscreen = queryAll( revealElement, '.enter-fullscreen' );

		this.controlsRightArrow = this.element.querySelector( '.navigate-right' );
		this.controlsLeftArrow = this.element.querySelector( '.navigate-left' );
		this.controlsDownArrow = this.element.querySelector( '.navigate-down' );

	}

	configure( config ) {

		const speakerOnly = config.controls === 'speaker' || config.controls === 'speaker-only';

		this.element.style.display = (
			config.controls &&
			(!speakerOnly || this.Reveal.isSpeakerNotes())
		) ? 'block' : 'none';

		this.element.setAttribute( 'data-controls-layout', config.controlsLayout );
		this.element.setAttribute( 'data-controls-back-arrows', config.controlsBackArrows );

	}

	bind() {

		let pointerEvents = [ 'touchstart', 'click' ];

		if( isAndroid ) {
			pointerEvents = [ 'touchend' ];
		}

		pointerEvents.forEach( eventName => {
			this.controlsLeft.forEach( el => el.addEventListener( eventName, this.onNavigateLeftClicked, false ) );
			this.controlsRight.forEach( el => el.addEventListener( eventName, this.onNavigateRightClicked, false ) );
			this.controlsUp.forEach( el => el.addEventListener( eventName, this.onNavigateUpClicked, false ) );
			this.controlsDown.forEach( el => el.addEventListener( eventName, this.onNavigateDownClicked, false ) );
			this.controlsPrev.forEach( el => el.addEventListener( eventName, this.onNavigatePrevClicked, false ) );
			this.controlsNext.forEach( el => el.addEventListener( eventName, this.onNavigateNextClicked, false ) );
			this.controlsFullscreen.forEach( el => el.addEventListener( eventName, this.onEnterFullscreen, false ) );
		} );

	}

	unbind() {

		[ 'touchstart', 'touchend', 'click' ].forEach( eventName => {
			this.controlsLeft.forEach( el => el.removeEventListener( eventName, this.onNavigateLeftClicked, false ) );
			this.controlsRight.forEach( el => el.removeEventListener( eventName, this.onNavigateRightClicked, false ) );
			this.controlsUp.forEach( el => el.removeEventListener( eventName, this.onNavigateUpClicked, false ) );
			this.controlsDown.forEach( el => el.removeEventListener( eventName, this.onNavigateDownClicked, false ) );
			this.controlsPrev.forEach( el => el.removeEventListener( eventName, this.onNavigatePrevClicked, false ) );
			this.controlsNext.forEach( el => el.removeEventListener( eventName, this.onNavigateNextClicked, false ) );
			this.controlsFullscreen.forEach( el => el.removeEventListener( eventName, this.onEnterFullscreen, false ) );
		} );

	}

	getGroupLength( groupIndex ) {

		const horizontalSlides = this.Reveal.getHorizontalSlides();
		const safeIndex = Math.max( 0, Math.min( groupIndex, horizontalSlides.length - 1 ) );
		const group = horizontalSlides[ safeIndex ];
		const verticalSlides = group ? group.querySelectorAll( ':scope > section' ) : [];

		return verticalSlides.length || 1;

	}

	getLogicalIndices() {

		const indices = this.Reveal.getIndices();
		const physicalGroup = Math.max( 0, indices.h || 0 );
		const physicalItem = Math.max( 0, indices.v || 0 );

		return {
			h: physicalItem,
			v: physicalGroup,
			f: indices.f || indices.indexf || 0,
		};

	}

	getLogicalRoutes() {

		const indices = this.getLogicalIndices();
		const totalGroups = this.Reveal.getHorizontalSlides().length;

		return {
			left: indices.h > 0,
			right: indices.h < this.getGroupLength( indices.v ) - 1,
			up: indices.v > 0,
			down: indices.v < totalGroups - 1,
		};

	}

	update() {

		const routes = this.getLogicalRoutes();
		const fragmentsRoutes = this.Reveal.availableFragments();
		const currentIndices = this.getLogicalIndices();
		const currentGroupLength = this.getGroupLength( currentIndices.v );
		const overviewActive = this.Reveal.isOverview();
		const config = this.Reveal.getConfig();
		const controlStates = [
			[ this.controlsLeft, routes.left, fragmentsRoutes.prev, 'previous slide in this group' ],
			[ this.controlsRight, routes.right, fragmentsRoutes.next, 'next slide in this group' ],
			[ this.controlsUp, routes.up, false, 'previous group' ],
			[ this.controlsDown, routes.down, false, 'next group' ],
			[ this.controlsPrev, routes.left || routes.up, fragmentsRoutes.prev, 'previous item' ],
			[ this.controlsNext, routes.right || routes.down, fragmentsRoutes.next, 'next item' ],
		];

		controlStates.forEach( ([ controls, enabled, fragmented, label ]) => {
			controls.forEach( control => {
				const isEnabled = !!( enabled || fragmented );

				control.classList.remove( 'enabled', 'fragmented', 'highlight' );
				control.setAttribute( 'aria-label', label );

				if( fragmented ) {
					control.classList.add( 'fragmented' );
				}

				if( isEnabled ) {
					control.classList.add( 'enabled' );
					control.removeAttribute( 'disabled' );
				}
				else {
					control.setAttribute( 'disabled', 'disabled' );
				}
			} );
		} );

		if( config.controlsTutorial && !overviewActive ) {
			const hasNavigatedWithinGroup = this.Reveal.hasNavigatedVertically();
			const hasNavigatedAcrossGroups = this.Reveal.hasNavigatedHorizontally();

			if( !hasNavigatedAcrossGroups && routes.down ) {
				this.controlsDownArrow.classList.add( 'highlight' );
			}
			else {
				this.controlsDownArrow.classList.remove( 'highlight' );

				if( !hasNavigatedWithinGroup && routes.right && currentIndices.h === 0 && currentGroupLength > 1 ) {
					this.controlsRightArrow.classList.add( 'highlight' );
				}
				else {
					this.controlsRightArrow.classList.remove( 'highlight' );
				}
			}
		}
		else {
			this.controlsLeftArrow.classList.remove( 'highlight' );
			this.controlsRightArrow.classList.remove( 'highlight' );
			this.controlsDownArrow.classList.remove( 'highlight' );
		}

	}

	destroy() {

		this.unbind();
		this.element.remove();

	}

	onNavigateLeftClicked( event ) {

		event.preventDefault();
		this.Reveal.onUserInput();
		this.Reveal.up();

	}

	onNavigateRightClicked( event ) {

		event.preventDefault();
		this.Reveal.onUserInput();
		this.Reveal.down();

	}

	onNavigateUpClicked( event ) {

		event.preventDefault();
		this.Reveal.onUserInput();
		this.Reveal.left();

	}

	onNavigateDownClicked( event ) {

		event.preventDefault();
		this.Reveal.onUserInput();
		this.Reveal.right();

	}

	onNavigatePrevClicked( event ) {

		event.preventDefault();
		this.Reveal.onUserInput();
		this.Reveal.prev();

	}

	onNavigateNextClicked( event ) {

		event.preventDefault();
		this.Reveal.onUserInput();
		this.Reveal.next();

	}

	onEnterFullscreen( event ) {

		const config = this.Reveal.getConfig();
		const viewport = this.Reveal.getViewportElement();

		enterFullscreen( config.embedded ? viewport : viewport.parentElement );

	}

}
