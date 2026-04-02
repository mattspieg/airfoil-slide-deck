			const normalFrame = document.querySelector('.deck_frame-normal');
			const overviewFrame = document.querySelector('.deck_frame-overview');
			const stage = document.querySelector('.deck_stage');
			const modeToggle = document.querySelector('.deck_button-mode');
			const helpToggle = document.querySelector('.deck_button-help');
			const helpOverlay = document.querySelector('.deck_help-overlay');
			const helpClose = document.querySelector('.deck_help-close');
			const helpZoomTitle = document.querySelector('.deck_help-command-title-zoom');
			const helpZoomCopy = document.querySelector('.deck_help-copy-zoom');
			const helpZoomIcons = {
				option: document.querySelector('.deck_help-zoom-icon-option'),
				ctrl: document.querySelector('.deck_help-zoom-icon-ctrl'),
				alt: document.querySelector('.deck_help-zoom-icon-alt'),
			};
			const helpGestureFrame = document.querySelector('.deck_help-preview-frame');
			const helpGestureList = document.querySelector('.deck_help-tab-list');
			const toolbar = document.querySelector('.deck_toolbar');
			const isMobileDeck =
				/(iphone|ipod|ipad|android)/gi.test(navigator.userAgent) ||
				(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
			const hashState = {
				applying: false,
				lastSerialized: null,
				mobileBound: false,
			};
				const slideCount = 62;
				const groupStarts = [1, 2, 8, 14, 19, 24, 29, 34, 39, 44, 49, 54, 58];
				const groupSizes = groupStarts.map((start, index) => {
					const end = index + 1 < groupStarts.length ? groupStarts[index + 1] - 1 : slideCount;
					return end - start + 1;
				});
				const dualDebugPrefix = '[dual-self-contained]';
				function formatDualDebugDetail(detail) {
					const dualDebugSeenObjects = new WeakSet();

					try {
						return JSON.stringify(detail, (key, value) => {
							if (value === Infinity) {
								return 'Infinity';
							}

							if (value === -Infinity) {
								return '-Infinity';
							}

							if (typeof value === 'number' && Number.isNaN(value)) {
								return 'NaN';
							}

							if (value instanceof Error) {
								return {
									name: value.name,
									message: value.message,
									stack: value.stack,
								};
							}

							if (value && typeof value === 'object') {
								if (dualDebugSeenObjects.has(value)) {
									return '[Circular]';
								}

								dualDebugSeenObjects.add(value);
							}

							return value;
						});
					}
					catch (error) {
						return JSON.stringify({
							stringifyError: String(error),
						});
					}
				}

				function dualDebug(message, detail) {
					return;
				}

				dualDebug('bootstrap query state', {
					readyState: document.readyState,
					bodyPresent: !!document.body,
					normalFrameFound: !!normalFrame,
					overviewFrameFound: !!overviewFrame,
					stageFound: !!stage,
					normalFrameClassQueryCount: document.querySelectorAll('.deck_frame-normal').length,
					overviewFrameClassQueryCount: document.querySelectorAll('.deck_frame-overview').length,
					bodyHtmlPreview: document.body?.innerHTML?.slice(0, 300) || '',
				});

				document.addEventListener('DOMContentLoaded', () => {
					dualDebug('DOMContentLoaded query state', {
						readyState: document.readyState,
						bodyPresent: !!document.body,
						normalFrameFound: !!document.querySelector('.deck_frame-normal'),
						overviewFrameFound: !!document.querySelector('.deck_frame-overview'),
						stageFound: !!document.querySelector('.deck_stage'),
					});
				}, { once: true });

				window.addEventListener('load', () => {
					dualDebug('window load query state', {
						readyState: document.readyState,
						bodyPresent: !!document.body,
						normalFrameFound: !!document.querySelector('.deck_frame-normal'),
						overviewFrameFound: !!document.querySelector('.deck_frame-overview'),
						stageFound: !!document.querySelector('.deck_stage'),
					});
				}, { once: true });

				function getFrameDebugState(frame) {
					if (!frame) {
						return null;
					}

					try {
						return {
							id: frame.id,
							assignedSrc: frame.getAttribute('src'),
							resolvedSrc: frame.src,
							contentHref: frame.contentWindow?.location?.href || null,
							readyState: frame.contentDocument?.readyState || null,
							title: frame.contentDocument?.title || null,
							hasDeck: !!frame.contentWindow?.revealDeck,
							bodyText: frame.contentDocument?.body?.innerText?.slice(0, 120) || '',
						};
					}
					catch (error) {
						return {
							id: frame.id,
							assignedSrc: frame.getAttribute('src'),
							resolvedSrc: frame.src,
							error: String(error),
						};
					}
				}

				function getParentDebugState() {
					return {
						location: window.location.href,
						bodyClass: document.body.className,
						hash: window.location.hash,
						isMobileDeck,
						normalFrame: getFrameDebugState(normalFrame),
						overviewFrame: getFrameDebugState(overviewFrame),
					};
				}

				function getElementDebugState(element) {
					if (!element) {
						return null;
					}

					const rect = element.getBoundingClientRect();
					const style = window.getComputedStyle(element);
					return {
						tag: element.tagName,
						id: element.id || null,
						className: element.className || null,
						display: style.display,
						position: style.position,
						visibility: style.visibility,
						opacity: style.opacity,
						pointerEvents: style.pointerEvents,
						width: style.width,
						height: style.height,
						minHeight: style.minHeight,
						maxHeight: style.maxHeight,
						overflow: style.overflow,
						overflowX: style.overflowX,
						overflowY: style.overflowY,
						transform: style.transform,
						rect: {
							top: rect.top,
							left: rect.left,
							width: rect.width,
							height: rect.height,
							bottom: rect.bottom,
							right: rect.right,
						},
					};
				}

				function logMobileShellMetrics(reason) {
					if (!isMobileDeck) {
						return;
					}

					let childDocState = null;
					try {
						const childDoc = normalFrame?.contentDocument;
						const childWindow = normalFrame?.contentWindow;
						childDocState = childDoc ? {
							readyState: childDoc.readyState,
							title: childDoc.title || null,
							location: childWindow?.location?.href || null,
							html: getElementDebugState(childDoc.documentElement),
							body: getElementDebugState(childDoc.body),
							reveal: getElementDebugState(childDoc.querySelector('.reveal')),
							slides: getElementDebugState(childDoc.querySelector('.slides')),
							presentSlide: getElementDebugState(
								childDoc.querySelector('.slides section.present:not(.stack), .slides > section.present')
							),
							bodyTextPreview: childDoc.body?.innerText?.slice(0, 200) || '',
							hasDeck: !!childWindow?.revealDeck,
						} : null;
					}
					catch (error) {
						childDocState = {
							error: String(error),
						};
					}

					dualDebug(`mobile shell metrics:${reason}`, {
						parentViewport: {
							innerWidth: window.innerWidth,
							innerHeight: window.innerHeight,
							clientWidth: document.documentElement.clientWidth,
							clientHeight: document.documentElement.clientHeight,
							visualViewport: window.visualViewport ? {
								width: window.visualViewport.width,
								height: window.visualViewport.height,
								offsetTop: window.visualViewport.offsetTop,
								offsetLeft: window.visualViewport.offsetLeft,
								scale: window.visualViewport.scale,
							} : null,
						},
						html: getElementDebugState(document.documentElement),
						body: getElementDebugState(document.body),
						stage: getElementDebugState(stage),
						normalFrame: getElementDebugState(normalFrame),
						overviewFrame: getElementDebugState(overviewFrame),
						toolbar: getElementDebugState(toolbar),
						helpOverlay: getElementDebugState(helpOverlay),
						child: childDocState,
					});
				}

				function summarizeFrameState(frame) {
					const state = getFrameDebugState(frame);
					if (!state) {
						return 'missing-frame';
					}

					return [
						`id=${state.id}`,
						`assigned=${state.assignedSrc || 'null'}`,
						`resolved=${state.resolvedSrc || 'null'}`,
						`content=${state.contentHref || 'null'}`,
						`ready=${state.readyState || 'null'}`,
						`title=${state.title || 'null'}`,
						`hasDeck=${state.hasDeck}`,
						`body=${JSON.stringify(state.bodyText || '')}`,
					].join(' | ');
				}

				async function probeFrameSrc(frame, reason) {
					if (!frame?.src) {
						dualDebug(`probe skipped: ${frame?.id || 'unknown'} has no src`, { reason });
						return;
					}

					try {
						const response = await fetch(frame.src, {
							method: 'HEAD',
							cache: 'no-store',
						});

						dualDebug(`${frame.id} HEAD probe`, {
							reason,
							ok: response.ok,
							status: response.status,
							contentType: response.headers.get('content-type'),
							contentLength: response.headers.get('content-length'),
							url: frame.src,
						});
					}
					catch (error) {
						dualDebug(`${frame.id} HEAD probe failed`, {
							reason,
							url: frame.src,
							error: String(error),
						});
					}
				}

				function startFrameLoadWatchdog(label) {
					const startedAt = Date.now();
					let tickCount = 0;
					const maxTicks = 20;
					const interval = window.setInterval(() => {
						tickCount += 1;
						const normalSummary = summarizeFrameState(normalFrame);
						const overviewSummary = summarizeFrameState(overviewFrame);
						const bothLoaded =
							!!normalFrame?.contentWindow?.revealDeck &&
							(!overviewFrame || !!overviewFrame?.contentWindow?.revealDeck);

						dualDebug(`watchdog:${label}:tick-${tickCount}`, {
							elapsedMs: Date.now() - startedAt,
							bothLoaded,
							normal: normalSummary,
							overview: overviewSummary,
						});

						if (bothLoaded || tickCount >= maxTicks) {
							window.clearInterval(interval);
							dualDebug(`watchdog:${label}:stop`, {
								elapsedMs: Date.now() - startedAt,
								bothLoaded,
							});
						}
					}, 1000);
				}

				window.addEventListener('error', (event) => {
					dualDebug('window error', {
						message: event.message,
						filename: event.filename,
						lineno: event.lineno,
						colno: event.colno,
					});
				});

				window.addEventListener('unhandledrejection', (event) => {
					dualDebug('unhandled rejection', {
						reason: String(event.reason),
					});
				});

				[normalFrame, overviewFrame].forEach((frame) => {
					if (!frame) {
						return;
					}

					frame.addEventListener('load', () => {
						dualDebug(`${frame.id} iframe load`, getFrameDebugState(frame));
					});

					frame.addEventListener('error', () => {
						dualDebug(`${frame.id} iframe error`, getFrameDebugState(frame));
					});
				});

				dualDebug('script start', getParentDebugState());

				if (!normalFrame || !overviewFrame) {
					dualDebug('frame lookup failed before init', {
						readyState: document.readyState,
						normalFrameFound: !!normalFrame,
						overviewFrameFound: !!overviewFrame,
						normalFrameClassQueryCount: document.querySelectorAll('.deck_frame-normal').length,
						overviewFrameClassQueryCount: document.querySelectorAll('.deck_frame-overview').length,
						bodyHtmlPreview: document.body?.innerHTML?.slice(0, 500) || '',
					});
				}

			function parseDeckHash(hash = window.location.hash) {
				const match = hash.match(/^#\/(\d+)(?:\/(\d+))?(?:\/(\d+))?$/);
				if (!match) {
					dualDebug('parseDeckHash:no-match', { hash });
					return null;
				}

				const groupIndex = Math.min(
					Math.max(0, Number(match[1] || 1) - 1),
					Math.max(0, groupSizes.length - 1)
				);
				const slideIndex = Math.min(
					Math.max(0, Number(match[2] || 1) - 1),
					Math.max(0, (groupSizes[groupIndex] || 1) - 1)
				);

				const parsed = {
					h: slideIndex,
					v: groupIndex,
					f: Math.max(0, Number(match[3] || 0)),
				};
				dualDebug('parseDeckHash:match', { hash, parsed });
				return parsed;
			}

			function serializeDeckHash(indices) {
				const h = Math.max(0, Number(indices?.h || 0));
				const v = Math.max(0, Number(indices?.v || 0));
				const f = Math.max(0, Number(indices?.f || 0));
				let hash = `#/${v + 1}/${h + 1}`;

				if (f > 0) {
					hash += `/${f}`;
				}

				return hash;
			}

			function replaceDeckHash(indices) {
				if (hashState.applying) {
					dualDebug('replaceDeckHash:skip-applying', { indices, hash: window.location.hash });
					return;
				}

				const nextHash = serializeDeckHash(indices);
				if (nextHash === hashState.lastSerialized && window.location.hash === nextHash) {
					dualDebug('replaceDeckHash:skip-same', { indices, nextHash, currentHash: window.location.hash });
					return;
				}

				hashState.lastSerialized = nextHash;
				dualDebug('replaceDeckHash:apply', { indices, nextHash });
				history.replaceState(null, '', `${window.location.pathname}${window.location.search}${nextHash}`);
			}

			function applyHashToDeck(deck, indices) {
				if (!deck || !indices) {
					dualDebug('applyHashToDeck:skip', { hasDeck: !!deck, indices });
					return;
				}

				dualDebug('applyHashToDeck:apply', {
					hash: window.location.hash,
					indices,
					deckIndicesBefore: typeof deck.getIndices === 'function' ? deck.getIndices() : null,
				});
				hashState.applying = true;
				deck.slide(indices.h, indices.v, indices.f || 0);
				requestAnimationFrame(() => {
					dualDebug('applyHashToDeck:post-raf', {
						hash: window.location.hash,
						indices,
						deckIndicesAfter: typeof deck.getIndices === 'function' ? deck.getIndices() : null,
					});
					hashState.applying = false;
				});
			}

				function bindMobileHashSync() {
					if (!isMobileDeck || hashState.mobileBound) {
						return;
					}

					const deck = normalFrame.contentWindow?.revealDeck;
					if (!deck || typeof deck.on !== 'function') {
						dualDebug('bindMobileHashSync skipped: deck unavailable', getFrameDebugState(normalFrame));
						return;
					}

					hashState.mobileBound = true;
					dualDebug('bindMobileHashSync attached', getFrameDebugState(normalFrame));

					deck.on('ready', () => {
						const initialHash = parseDeckHash();
						dualDebug('mobile deck ready', {
							initialHash,
							frame: getFrameDebugState(normalFrame),
						});
						if (initialHash) {
							applyHashToDeck(deck, initialHash);
						}
					else if (typeof deck.getIndices === 'function') {
						replaceDeckHash(deck.getIndices());
					}
				});

				deck.on('slidechanged', () => {
					if (typeof deck.getIndices === 'function') {
						replaceDeckHash(deck.getIndices());
					}
				});
			}

				if (isMobileDeck) {
					normalFrame.classList.remove('deck_frame-pending');
					normalFrame.src = `/directional?mode=mobile${window.location.hash || ''}`;
					dualDebug('assigned mobile iframe src', getParentDebugState());
					logMobileShellMetrics('after-mobile-src-assigned');
					void probeFrameSrc(normalFrame, 'mobile-assign');
					startFrameLoadWatchdog('mobile');
					overviewFrame.remove();
					toolbar?.remove();
					helpOverlay.remove();
					logMobileShellMetrics('after-mobile-dom-prune');
					normalFrame.addEventListener('load', () => {
						dualDebug('mobile iframe load pre-bind', {
							frame: getFrameDebugState(normalFrame),
						});
						logMobileShellMetrics('mobile-iframe-load');
						requestAnimationFrame(() => {
							bindMobileHashSync();
							logMobileShellMetrics('mobile-iframe-load-raf');
						});
					}, { once: true });
					window.addEventListener('hashchange', () => {
						const nextHash = parseDeckHash();
						dualDebug('mobile hashchange', {
							hash: window.location.hash,
							parsed: nextHash,
						});
						if (!nextHash) {
							return;
						}

						const deck = normalFrame.contentWindow?.revealDeck;
						applyHashToDeck(deck, nextHash);
					});
					window.addEventListener('pageshow', () => {
						logMobileShellMetrics('pageshow');
					});
					window.addEventListener('resize', () => {
						logMobileShellMetrics('resize');
					});
					window.visualViewport?.addEventListener('resize', () => {
						logMobileShellMetrics('visualViewport-resize');
					});
					window.setTimeout(() => {
						logMobileShellMetrics('timeout-250ms');
					}, 250);
					window.setTimeout(() => {
						logMobileShellMetrics('timeout-1000ms');
					}, 1000);
					window.setTimeout(() => {
						logMobileShellMetrics('timeout-2500ms');
					}, 2500);
					}
					else {
						dualDebug('using html iframe srcs', getParentDebugState());
						void probeFrameSrc(normalFrame, 'html-src');
						void probeFrameSrc(overviewFrame, 'html-src');
						startFrameLoadWatchdog('dual');
					}

			if (!isMobileDeck) {
				const state = {
				activeMode: 'normal',
				transitionProgress: 0,
				initialHashApplied: false,
				ready: {
					normal: false,
					overview: false,
				},
				lastIndices: {
					normal: { h: 0, v: 0, f: 0 },
					overview: { h: 0, v: 0, f: 0 },
				},
				syncing: false,
				pinchGestureScale: 1,
				pinchSnapTimer: null,
				wheelNavigation: {
					accumulatedX: 0,
					accumulatedY: 0,
					hasNavigated: false,
					axis: null,
					direction: 0,
					lastEventAt: 0,
					lastDominantMagnitude: 0,
					smoothedSpeed: 0,
					minSinceNavigate: Infinity,
					resetTimer: null,
				},
				clickZoomTimer: null,
				isClickZoom: false,
				isPinching: false,
				isReady: false,
				isHelpOpen: false,
				gestureTabs: {
					index: 0,
					timer: null,
					startAt: 0,
					duration: 3800,
					raf: null,
				},
				};

				const scales = {
				normalActive: 1,
				normalInactive: 0.2,
				overviewActive: 1,
				overviewInactive: 5,
				};
				const clickZoomDuration = 1120;

				function toggleClass(element, className, enabled) {
					element?.classList.toggle(className, enabled);
				}

				function syncFrameStateClasses() {
					[normalFrame, overviewFrame].forEach((frame) => {
						toggleClass(frame, 'deck_frame-pending', !state.isReady);
						toggleClass(frame, 'deck_frame-click-zoom', state.isClickZoom);
						toggleClass(frame, 'deck_frame-pinching', state.isPinching);
					});
				}

				function measureViewportUnit(unit) {
					const probe = document.createElement('div');
					probe.style.position = 'fixed';
					probe.style.left = '0';
					probe.style.top = '0';
					probe.style.width = '0.0625rem';
					probe.style.height = `100${unit}`;
					probe.style.pointerEvents = 'none';
					probe.style.opacity = '0';
					document.body.appendChild(probe);
					const height = probe.getBoundingClientRect().height;
					probe.remove();
					return height;
				}

				function getViewportDebugMetrics() {
					return {
						innerWidth: window.innerWidth,
						innerHeight: window.innerHeight,
						clientWidth: document.documentElement.clientWidth,
						clientHeight: document.documentElement.clientHeight,
						visualViewport: window.visualViewport ? {
							width: window.visualViewport.width,
							height: window.visualViewport.height,
							offsetTop: window.visualViewport.offsetTop,
							offsetLeft: window.visualViewport.offsetLeft,
							scale: window.visualViewport.scale,
						} : null,
						vh: measureViewportUnit('vh'),
						dvh: measureViewportUnit('dvh'),
						svh: measureViewportUnit('svh'),
						lvh: measureViewportUnit('lvh'),
					};
				}

				function logDualLayoutMetrics(reason) {
					return;
				}

				function getPlatformZoomConfig() {
				const platform = navigator.userAgentData?.platform || navigator.platform || navigator.userAgent || '';

				if (/Mac|iPhone|iPad|iPod/i.test(platform)) {
					return {
						label: 'Option + click',
						iconKey: 'option',
						copy: 'Zoom in to see finer detail.',
					};
				}

				if (/Linux/i.test(platform)) {
					return {
						label: 'Ctrl + click',
						iconKey: 'ctrl',
						copy: 'Zoom in to see finer detail.',
					};
				}

				return {
					label: 'Alt + click',
					iconKey: 'alt',
					copy: 'Zoom in to see finer detail.',
				};
			}

				function setHelpOpen(isOpen, { restoreFocus = true } = {}) {
				state.isHelpOpen = isOpen;
				helpOverlay.classList.toggle('deck_help-overlay-open', isOpen);
				helpOverlay.setAttribute('aria-hidden', String(!isOpen));
				helpToggle.setAttribute('aria-expanded', String(isOpen));
				if (isOpen) {
					startGestureTabs();
				}
				else {
					stopGestureTabs();
				}

				if (isOpen) {
					helpClose.focus();
				}
				else if (restoreFocus) {
					const activeFrame = getFrame(state.activeMode);
					try {
						activeFrame.focus();
						activeFrame.contentWindow?.focus();
						activeFrame.contentWindow?.document?.body?.focus();
					}
					catch (error) {
						helpToggle.focus();
					}
				}
			}

				const platformZoomConfig = getPlatformZoomConfig();
				helpZoomTitle.textContent = platformZoomConfig.label;
				helpZoomCopy.textContent = platformZoomConfig.copy;
				Object.entries(helpZoomIcons).forEach(([iconKey, iconElement]) => {
					iconElement?.classList.toggle('deck_help-zoom-icon-visible', iconKey === platformZoomConfig.iconKey);
				});

				const gestureTabs = Array.from(helpGestureList.querySelectorAll('.deck_help-tab'));

				function renderGestureProgress() {
				const now = performance.now();
				const elapsed = now - state.gestureTabs.startAt;
				const progress = Math.max(0, Math.min(1, elapsed / state.gestureTabs.duration));
				gestureTabs.forEach((tab, index) => {
					const bar = tab.querySelector('.deck_help-tab-progress-fill');
					bar.style.width = index === state.gestureTabs.index ? `${progress * 100}%` : '0%';
				});
				if (state.isHelpOpen) {
					state.gestureTabs.raf = requestAnimationFrame(renderGestureProgress);
				}
				}

				function setGestureTab(index) {
				state.gestureTabs.index = index;
				state.gestureTabs.startAt = performance.now();
				gestureTabs.forEach((tab, tabIndex) => {
					tab.classList.toggle('deck_help-tab-active', tabIndex === index);
					const bar = tab.querySelector('.deck_help-tab-progress-fill');
					bar.style.width = tabIndex === index ? '0%' : '0%';
				});
				helpGestureFrame.src = gestureTabs[index].dataset.gestureSrc;
				}

				function stopGestureTabs() {
				if (state.gestureTabs.timer) {
					clearInterval(state.gestureTabs.timer);
					state.gestureTabs.timer = null;
				}
				if (state.gestureTabs.raf) {
					cancelAnimationFrame(state.gestureTabs.raf);
					state.gestureTabs.raf = null;
				}
				}

				function startGestureTabs() {
				stopGestureTabs();
				setGestureTab(state.gestureTabs.index);
				state.gestureTabs.timer = setInterval(() => {
					setGestureTab((state.gestureTabs.index + 1) % gestureTabs.length);
				}, state.gestureTabs.duration);
				state.gestureTabs.raf = requestAnimationFrame(renderGestureProgress);
				}

				gestureTabs.forEach((tab, index) => {
				tab.addEventListener('click', () => {
					setGestureTab(index);
					if (state.isHelpOpen) {
						startGestureTabs();
					}
				});
				});

				function clamp(value, min, max) {
				return Math.min(max, Math.max(min, value));
				}

				function lerp(start, end, progress) {
				return start + (end - start) * progress;
				}

			function applyTransitionProgress(progress) {
				state.transitionProgress = clamp(progress, 0, 1);
				const isClickZoomToNormal = state.isClickZoom && state.activeMode === 'normal';

				const normalOpacity = 1 - state.transitionProgress;
				const overviewOpacity = state.transitionProgress;
				const normalScale = lerp(scales.normalActive, scales.normalInactive, state.transitionProgress);
				const overviewScale = isClickZoomToNormal
					? scales.overviewActive
					: lerp(scales.overviewInactive, scales.overviewActive, state.transitionProgress);

				normalFrame.style.opacity = normalOpacity.toFixed(4);
				normalFrame.style.transform = `scale(${normalScale})`;
				overviewFrame.style.opacity = overviewOpacity.toFixed(4);
				overviewFrame.style.transform = `scale(${overviewScale})`;

				normalFrame.style.pointerEvents = state.transitionProgress < 0.5 ? 'auto' : 'none';
				overviewFrame.style.pointerEvents = state.transitionProgress >= 0.5 ? 'auto' : 'none';
			}

			function setFrameOrigins(origin) {
				normalFrame.style.transformOrigin = '50% 50%';
				overviewFrame.style.transformOrigin = '50% 50%';
			}

			function clearClickZoomTimer() {
				if (state.clickZoomTimer) {
					clearTimeout(state.clickZoomTimer);
					state.clickZoomTimer = null;
				}
			}

			function startClickZoom() {
				clearClickZoomTimer();
				setFrameOrigins(null);
				state.isClickZoom = true;
				syncFrameStateClasses();
				state.clickZoomTimer = setTimeout(() => {
					state.isClickZoom = false;
					syncFrameStateClasses();
					setFrameOrigins(null);
					state.clickZoomTimer = null;
				}, clickZoomDuration);
			}

			function clearPinchSnapTimer() {
				if (state.pinchSnapTimer) {
					clearTimeout(state.pinchSnapTimer);
					state.pinchSnapTimer = null;
				}
			}

			function schedulePinchSnap() {
				clearPinchSnapTimer();
				state.pinchSnapTimer = setTimeout(() => {
					state.isPinching = false;
					syncFrameStateClasses();
					setMode(state.transitionProgress >= 0.5 ? 'overview' : 'normal');
				}, 120);
			}

			function updatePinchProgress(delta) {
				if (state.transitionProgress > 0.5 && delta < 0) {
					delta *= 1.9;
				}

				state.isPinching = true;
				syncFrameStateClasses();
				applyTransitionProgress(state.transitionProgress + delta);
				schedulePinchSnap();
			}

			function navigateActiveDeck(direction) {
				const deck = getDeck(state.activeMode);
				if (!deck) {
					return;
				}

				if (direction === 'left') {
					deck.left();
				}
				else if (direction === 'right') {
					deck.right();
				}
				else if (direction === 'up') {
					deck.up();
				}
				else if (direction === 'down') {
					deck.down();
				}
			}

			function clearWheelNavigationResetTimer() {
				if (state.wheelNavigation.resetTimer) {
					clearTimeout(state.wheelNavigation.resetTimer);
					state.wheelNavigation.resetTimer = null;
				}
			}

			function scheduleWheelNavigationReset(delay = 95) {
				clearWheelNavigationResetTimer();
				state.wheelNavigation.resetTimer = setTimeout(() => {
					state.wheelNavigation.accumulatedX = 0;
					state.wheelNavigation.accumulatedY = 0;
					state.wheelNavigation.hasNavigated = false;
					state.wheelNavigation.axis = null;
					state.wheelNavigation.direction = 0;
					state.wheelNavigation.lastEventAt = 0;
					state.wheelNavigation.lastDominantMagnitude = 0;
					state.wheelNavigation.smoothedSpeed = 0;
					state.wheelNavigation.minSinceNavigate = Infinity;
					state.wheelNavigation.resetTimer = null;
				}, delay);
			}

			function queueWheelNavigation(deltaX, deltaY) {
				const wheelNavigationThreshold = 260;
				const wheelNavigationGestureIdle = 115;
				const wheelNavigationResetDelay = 95;
				const wheelNavigationSmoothing = 0.3;
				const wheelNavigationRearmDelta = 12;
				const wheelNavigationMinGestureSpeed = 18;
				const now = Date.now();
				const absX = Math.abs(deltaX);
				const absY = Math.abs(deltaY);
				const nextAxis = absX >= absY ? 'x' : 'y';
				const dominantMagnitude = nextAxis === 'x' ? absX : absY;
				const nextDirection = nextAxis === 'x' ? Math.sign(deltaX) : Math.sign(deltaY);
				const speed = (state.wheelNavigation.smoothedSpeed * (1 - wheelNavigationSmoothing)) + (dominantMagnitude * wheelNavigationSmoothing);

				if (now - state.wheelNavigation.lastEventAt > wheelNavigationGestureIdle) {
					state.wheelNavigation.accumulatedX = 0;
					state.wheelNavigation.accumulatedY = 0;
					state.wheelNavigation.hasNavigated = false;
					state.wheelNavigation.axis = null;
					state.wheelNavigation.direction = 0;
				}

				state.wheelNavigation.lastEventAt = now;
				state.wheelNavigation.lastDominantMagnitude = dominantMagnitude;
				state.wheelNavigation.smoothedSpeed = speed;
				scheduleWheelNavigationReset(wheelNavigationResetDelay);

				if (state.wheelNavigation.hasNavigated) {
					state.wheelNavigation.minSinceNavigate = Math.min(state.wheelNavigation.minSinceNavigate, speed);
				}

				if (
					state.wheelNavigation.hasNavigated &&
					speed >= state.wheelNavigation.minSinceNavigate + wheelNavigationRearmDelta &&
					dominantMagnitude >= wheelNavigationMinGestureSpeed
				) {
					state.wheelNavigation.accumulatedX = 0;
					state.wheelNavigation.accumulatedY = 0;
					state.wheelNavigation.hasNavigated = false;
					state.wheelNavigation.axis = null;
					state.wheelNavigation.direction = 0;
					state.wheelNavigation.minSinceNavigate = Infinity;
				}

				if (state.wheelNavigation.hasNavigated) {
					return;
				}

				state.wheelNavigation.axis = nextAxis;
				state.wheelNavigation.direction = nextDirection;
				state.wheelNavigation.accumulatedX += deltaX;
				state.wheelNavigation.accumulatedY += deltaY;

				const accumulatedAbsX = Math.abs(state.wheelNavigation.accumulatedX);
				const accumulatedAbsY = Math.abs(state.wheelNavigation.accumulatedY);

				if (accumulatedAbsX < wheelNavigationThreshold && accumulatedAbsY < wheelNavigationThreshold) {
					return;
				}

				let direction = null;

				if (accumulatedAbsX >= accumulatedAbsY) {
					direction = state.wheelNavigation.accumulatedX > 0 ? 'right' : 'left';
				}
				else {
					direction = state.wheelNavigation.accumulatedY > 0 ? 'down' : 'up';
				}

				state.wheelNavigation.accumulatedX = 0;
				state.wheelNavigation.accumulatedY = 0;
				state.wheelNavigation.hasNavigated = true;
				state.wheelNavigation.lastNavigationAt = now;
				state.wheelNavigation.minSinceNavigate = speed;
				navigateActiveDeck(direction);
			}

			function getFrame(mode) {
				return mode === 'overview' ? overviewFrame : normalFrame;
			}

			function getDeck(mode) {
				const frame = getFrame(mode);
				return frame.contentWindow && frame.contentWindow.revealDeck ? frame.contentWindow.revealDeck : null;
			}

				function setMode(mode, { syncInactive = true } = {}) {
					state.activeMode = mode;
					state.transitionProgress = mode === 'overview' ? 1 : 0;
					modeToggle.textContent = mode === 'normal' ? 'Switch to overview' : 'Back to normal';
					applyTransitionProgress(state.transitionProgress);
					dualDebug('setMode', {
						mode,
						syncInactive,
						parent: getParentDebugState(),
					});

					const activeFrame = getFrame(mode);
				try {
					activeFrame.contentWindow.focus();
					activeFrame.contentWindow.document.body.focus();
				} catch (error) {
					// No-op if the iframe is not ready to take focus yet.
				}

				if (syncInactive) {
					syncInactiveDeck();
				}

				requestAnimationFrame(() => {
					logDualLayoutMetrics(`setMode:${mode}`);
				});
			}

				function syncDeck(mode, indices) {
					const deck = getDeck(mode);
					if (!deck || !state.ready[mode]) {
						dualDebug('syncDeck skipped', {
							mode,
							indices,
							hasDeck: !!deck,
							ready: state.ready[mode],
						});
						return;
					}

					dualDebug('syncDeck', {
						mode,
						indices,
					});
					state.syncing = true;
					deck.slide(indices.h, indices.v, indices.f || 0);
					requestAnimationFrame(() => {
						state.syncing = false;
					});
			}

			function syncInactiveDeck() {
				const activeIndices = state.lastIndices[state.activeMode];
				const inactiveMode = state.activeMode === 'normal' ? 'overview' : 'normal';
				syncDeck(inactiveMode, activeIndices);
			}

				function applyInitialHashIfNeeded() {
					if (state.initialHashApplied || !state.ready.normal || !state.ready.overview) {
						dualDebug('applyInitialHashIfNeeded skipped', {
							initialHashApplied: state.initialHashApplied,
							ready: state.ready,
							hash: window.location.hash,
						});
						return;
					}

					state.initialHashApplied = true;
					const initialHash = parseDeckHash();
					dualDebug('applyInitialHashIfNeeded', {
						initialHash,
						hash: window.location.hash,
					});

				if (initialHash) {
					state.lastIndices.normal = initialHash;
					state.lastIndices.overview = initialHash;
					syncDeck('normal', initialHash);
					syncDeck('overview', initialHash);
					replaceDeckHash(initialHash);
				}
				else {
					replaceDeckHash(state.lastIndices.normal);
				}
			}

				helpToggle.addEventListener('click', () => {
				setHelpOpen(!state.isHelpOpen);
				});

				helpClose.addEventListener('click', () => {
				setHelpOpen(false);
				});

				helpOverlay.addEventListener('click', (event) => {
				if (event.target === helpOverlay) {
					setHelpOpen(false);
				}
				});

				document.addEventListener('keydown', (event) => {
				if (event.key === 'Escape' && state.isHelpOpen) {
					event.preventDefault();
					event.stopPropagation();
					setHelpOpen(false);
				}
				}, true);

				requestAnimationFrame(() => {
				setHelpOpen(true, { restoreFocus: false });
				});

			modeToggle.addEventListener('click', () => {
				setMode(state.activeMode === 'normal' ? 'overview' : 'normal');
			});

			document.addEventListener('wheel', (event) => {
				if (event.ctrlKey) {
					event.preventDefault();
					updatePinchProgress(clamp(event.deltaY * 0.004, -0.24, 0.24));
				}
				else {
					event.preventDefault();
					queueWheelNavigation(event.deltaX, event.deltaY);
				}
			}, { passive: false });

				window.addEventListener('message', (event) => {
					const data = event.data;
					if (!data || data.source !== 'directional-deck') {
						return;
					}

					dualDebug('message received', {
						type: data.type,
						mode: data.mode,
						data,
					});

					if (data.type === 'ready') {
						state.ready[data.mode] = true;
						state.lastIndices[data.mode] = data.indices || state.lastIndices[data.mode];
						dualDebug('child ready', {
							ready: state.ready,
							lastIndices: state.lastIndices,
							parent: getParentDebugState(),
						});

						if (state.ready.normal && state.ready.overview) {
							state.isReady = true;
							syncFrameStateClasses();
							syncInactiveDeck();
							applyInitialHashIfNeeded();
							dualDebug('both children ready', getParentDebugState());
							requestAnimationFrame(() => {
								logDualLayoutMetrics('both-ready');
							});
					}

					return;
				}

					if (data.type === 'slidechanged') {
						state.lastIndices[data.mode] = {
							h: data.indexh,
							v: data.indexv,
							f: data.indexf || 0,
						};
						dualDebug('child slidechanged', {
							mode: data.mode,
							lastIndices: state.lastIndices,
							syncing: state.syncing,
						});

					if (!state.syncing) {
						const inactiveMode = data.mode === 'normal' ? 'overview' : 'normal';
						syncDeck(inactiveMode, state.lastIndices[data.mode]);
					}
					if (data.mode === state.activeMode) {
						replaceDeckHash(state.lastIndices[data.mode]);
					}

					requestAnimationFrame(() => {
						logDualLayoutMetrics(`slidechanged:${data.mode}`);
					});

					return;
				}

					if (data.type === 'toggle-request') {
						dualDebug('toggle request', {
							activeMode: state.activeMode,
						});
						setMode(state.activeMode === 'normal' ? 'overview' : 'normal');
						return;
					}

					if (data.type === 'open-normal') {
						dualDebug('open-normal request', {
							indices: data.indices,
							clickCenter: data.clickCenter,
						});
						if (data.indices) {
							state.lastIndices.overview = data.indices;
							state.lastIndices.normal = data.indices;
					}

					if (data.indices) {
						syncDeck('normal', data.indices);
					}
					requestAnimationFrame(() => {
						startClickZoom();
						setMode('normal', { syncInactive: false });
						if (data.indices) {
							setTimeout(() => {
								syncDeck('overview', data.indices);
							}, clickZoomDuration);
						}
					});
					return;
				}

					if (data.type === 'pinch') {
						dualDebug('pinch event', {
							pinchType: data.pinchType,
							deltaY: data.deltaY,
							scale: data.scale,
							transitionProgress: state.transitionProgress,
						});
						if (data.pinchType === 'wheel') {
							updatePinchProgress(clamp((data.deltaY || 0) * 0.004, -0.24, 0.24));
						}
					else if (data.pinchType === 'gesturestart') {
						state.isPinching = true;
						syncFrameStateClasses();
						state.pinchGestureScale = data.scale || 1;
						clearPinchSnapTimer();
					}
					else if (data.pinchType === 'gesturechange') {
						const nextScale = data.scale || 1;
						const delta = clamp((state.pinchGestureScale - nextScale) * 1.35, -0.24, 0.24);
						state.pinchGestureScale = nextScale;
						updatePinchProgress(delta);
					}
					else if (data.pinchType === 'gestureend') {
						state.pinchGestureScale = 1;
						schedulePinchSnap();
					}
					return;
				}

					if (data.type === 'wheel-nav') {
						dualDebug('wheel-nav event', {
							deltaX: data.deltaX || 0,
							deltaY: data.deltaY || 0,
						});
						queueWheelNavigation(data.deltaX || 0, data.deltaY || 0);
					}
				});

				syncFrameStateClasses();
				applyTransitionProgress(0);
				window.addEventListener('resize', () => {
					requestAnimationFrame(() => {
						logDualLayoutMetrics('parent-resize');
					});
				});
				window.visualViewport?.addEventListener('resize', () => {
					requestAnimationFrame(() => {
						logDualLayoutMetrics('parent-visualViewport-resize');
					});
				});
				window.addEventListener('hashchange', () => {
					const nextHash = parseDeckHash();
					if (!nextHash) {
						return;
					}

					state.lastIndices.normal = nextHash;
					state.lastIndices.overview = nextHash;
					syncDeck('normal', nextHash);
					syncDeck('overview', nextHash);
				});
			}
