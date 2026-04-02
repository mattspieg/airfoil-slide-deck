var pi = Object.defineProperty, vi = Object.defineProperties;
var mi = Object.getOwnPropertyDescriptors;
var xt = Object.getOwnPropertySymbols;
var yi = Object.prototype.hasOwnProperty, bi = Object.prototype.propertyIsEnumerable;
var Ue = (h, e, t) => e in h ? pi(h, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : h[e] = t, Q = (h, e) => {
  for (var t in e || (e = {}))
    yi.call(e, t) && Ue(h, t, e[t]);
  if (xt)
    for (var t of xt(e))
      bi.call(e, t) && Ue(h, t, e[t]);
  return h;
}, We = (h, e) => vi(h, mi(e));
var je = (h, e, t) => Ue(h, typeof e != "symbol" ? e + "" : e, t);
var It = (h, e, t) => new Promise((i, s) => {
  var a = (c) => {
    try {
      o(t.next(c));
    } catch (u) {
      s(u);
    }
  }, n = (c) => {
    try {
      o(t.throw(c));
    } catch (u) {
      s(u);
    }
  }, o = (c) => c.done ? i(c.value) : Promise.resolve(c.value).then(a, n);
  o((t = t.apply(h, e)).next());
});
const ge = (h, e) => {
  for (let t in e)
    h[t] = e[t];
  return h;
}, E = (h, e) => Array.from(h.querySelectorAll(e)), Ke = (h, e, t) => {
  t ? h.classList.add(e) : h.classList.remove(e);
}, fe = (h) => {
  if (typeof h == "string") {
    if (h === "null") return null;
    if (h === "true") return !0;
    if (h === "false") return !1;
    if (h.match(/^-?[\d\.]+$/)) return parseFloat(h);
  }
  return h;
}, ae = (h, e) => {
  h.style.transform = e;
}, xe = (h, e) => {
  let t = h.matches || h.matchesSelector || h.msMatchesSelector;
  return !!(t && t.call(h, e));
}, F = (h, e) => {
  if (h && typeof h.closest == "function")
    return h.closest(e);
  for (; h; ) {
    if (xe(h, e))
      return h;
    h = h.parentElement;
  }
  return null;
}, Dt = (h) => {
  h = h || document.documentElement;
  let e = h.requestFullscreen || h.webkitRequestFullscreen || h.webkitRequestFullScreen || h.mozRequestFullScreen || h.msRequestFullscreen;
  e && e.apply(h);
}, wi = (h, e, t, i = "") => {
  let s = h.querySelectorAll("." + t);
  for (let n = 0; n < s.length; n++) {
    let o = s[n];
    if (o.parentNode === h)
      return o;
  }
  let a = document.createElement(e);
  return a.className = t, a.innerHTML = i, h.appendChild(a), a;
}, Xe = (h) => {
  let e = document.createElement("style");
  return h && h.length > 0 && e.appendChild(document.createTextNode(h)), document.head.appendChild(e), e;
}, Mt = () => {
  let h = {};
  location.search.replace(/[A-Z0-9]+?=([\w\.%-]*)/gi, (e) => {
    const t = e.split("=").shift(), i = e.split("=").pop();
    return t && i !== void 0 && (h[t] = i), e;
  });
  for (let e in h) {
    let t = h[e];
    h[e] = fe(unescape(t));
  }
  return typeof h.dependencies != "undefined" && delete h.dependencies, h;
}, Ei = (h, e = 0) => {
  var t;
  if (h) {
    let i, s = h.style.height;
    return h.style.height = "0px", h.parentElement && (h.parentElement.style.height = "auto"), i = e - (((t = h.parentElement) == null ? void 0 : t.offsetHeight) || 0), h.style.height = s + "px", h.parentElement && h.parentElement.style.removeProperty("height"), i;
  }
  return e;
}, Si = {
  mp4: "video/mp4",
  m4a: "video/mp4",
  ogv: "video/ogg",
  mpeg: "video/mpeg",
  webm: "video/webm"
}, Ai = (h = "") => {
  const e = h.split(".").pop();
  return e ? Si[e] : void 0;
}, Ri = (h = "") => encodeURI(h).replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[!'()*]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`), Ft = navigator.userAgent, le = /(iphone|ipod|ipad|android)/gi.test(Ft) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1, Vt = /android/gi.test(Ft);
var ki = (function(h) {
  if (h) {
    var e = function(f) {
      return [].slice.call(f);
    }, t = 0, i = 1, s = 2, a = 3, n = [], o = null, c = "requestAnimationFrame" in h ? function() {
      var f = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : { sync: !1 };
      h.cancelAnimationFrame(o);
      var S = function() {
        return p(n.filter((function(T) {
          return T.dirty && T.active;
        })));
      };
      if (f.sync) return S();
      o = h.requestAnimationFrame(S);
    } : function() {
    }, u = function(f) {
      return function(S) {
        n.forEach((function(T) {
          return T.dirty = f;
        })), c(S);
      };
    }, p = function(f) {
      f.filter((function(T) {
        return !T.styleComputed;
      })).forEach((function(T) {
        T.styleComputed = l(T);
      })), f.filter(A).forEach(M);
      var S = f.filter(b);
      S.forEach(g), S.forEach((function(T) {
        M(T), y(T);
      })), S.forEach(O);
    }, y = function(f) {
      return f.dirty = t;
    }, g = function(f) {
      f.availableWidth = f.element.parentNode.clientWidth, f.currentWidth = f.element.scrollWidth, f.previousFontSize = f.currentFontSize, f.currentFontSize = Math.min(Math.max(f.minSize, f.availableWidth / f.currentWidth * f.previousFontSize), f.maxSize), f.whiteSpace = f.multiLine && f.currentFontSize === f.minSize ? "normal" : "nowrap";
    }, b = function(f) {
      return f.dirty !== s || f.dirty === s && f.element.parentNode.clientWidth !== f.availableWidth;
    }, l = function(f) {
      var S = h.getComputedStyle(f.element, null);
      return f.currentFontSize = parseFloat(S.getPropertyValue("font-size")), f.display = S.getPropertyValue("display"), f.whiteSpace = S.getPropertyValue("white-space"), !0;
    }, A = function(f) {
      var S = !1;
      return !f.preStyleTestCompleted && (/inline-/.test(f.display) || (S = !0, f.display = "inline-block"), f.whiteSpace !== "nowrap" && (S = !0, f.whiteSpace = "nowrap"), f.preStyleTestCompleted = !0, S);
    }, M = function(f) {
      f.element.style.whiteSpace = f.whiteSpace, f.element.style.display = f.display, f.element.style.fontSize = f.currentFontSize + "px";
    }, O = function(f) {
      f.element.dispatchEvent(new CustomEvent("fit", { detail: { oldValue: f.previousFontSize, newValue: f.currentFontSize, scaleFactor: f.currentFontSize / f.previousFontSize } }));
    }, q = function(f, S) {
      return function(T) {
        f.dirty = S, f.active && c(T);
      };
    }, re = function(f) {
      return function() {
        n = n.filter((function(S) {
          return S.element !== f.element;
        })), f.observeMutations && f.observer.disconnect(), f.element.style.whiteSpace = f.originalStyle.whiteSpace, f.element.style.display = f.originalStyle.display, f.element.style.fontSize = f.originalStyle.fontSize;
      };
    }, z = function(f) {
      return function() {
        f.active || (f.active = !0, c());
      };
    }, R = function(f) {
      return function() {
        return f.active = !1;
      };
    }, B = function(f) {
      f.observeMutations && (f.observer = new MutationObserver(q(f, i)), f.observer.observe(f.element, f.observeMutations));
    }, U = { minSize: 16, maxSize: 512, multiLine: !0, observeMutations: "MutationObserver" in h && { subtree: !0, childList: !0, characterData: !0 } }, W = null, L = function() {
      h.clearTimeout(W), W = h.setTimeout(u(s), C.observeWindowDelay);
    }, k = ["resize", "orientationchange"];
    return Object.defineProperty(C, "observeWindow", { set: function(f) {
      var S = "".concat(f ? "add" : "remove", "EventListener");
      k.forEach((function(T) {
        h[S](T, L);
      }));
    } }), C.observeWindow = !0, C.observeWindowDelay = 100, C.fitAll = u(a), C;
  }
  function V(f, S) {
    var T = Object.assign({}, U, S), X = f.map((function(K) {
      var ie = Object.assign({}, T, { element: K, active: !0 });
      return (function(D) {
        D.originalStyle = { whiteSpace: D.element.style.whiteSpace, display: D.element.style.display, fontSize: D.element.style.fontSize }, B(D), D.newbie = !0, D.dirty = !0, n.push(D);
      })(ie), { element: K, fit: q(ie, a), unfreeze: z(ie), freeze: R(ie), unsubscribe: re(ie) };
    }));
    return c(), X;
  }
  function C(f) {
    var S = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return typeof f == "string" ? V(e(document.querySelectorAll(f)), S) : V([f], S)[0];
  }
})(typeof window == "undefined" ? null : window);
class Ci {
  constructor(e) {
    je(this, "allowedToPlayAudio", null);
    this.Reveal = e, this.startEmbeddedMedia = this.startEmbeddedMedia.bind(this), this.startEmbeddedIframe = this.startEmbeddedIframe.bind(this), this.preventIframeAutoFocus = this.preventIframeAutoFocus.bind(this), this.ensureMobileMediaPlaying = this.ensureMobileMediaPlaying.bind(this), this.failedAudioPlaybackTargets = /* @__PURE__ */ new Set(), this.failedVideoPlaybackTargets = /* @__PURE__ */ new Set(), this.failedMutedVideoPlaybackTargets = /* @__PURE__ */ new Set(), this.renderMediaPlayButton();
  }
  renderMediaPlayButton() {
    this.mediaPlayButton = document.createElement("button"), this.mediaPlayButton.className = "r-overlay-button r-media-play-button", this.mediaPlayButton.addEventListener("click", () => {
      this.resetTemporarilyMutedMedia(), (/* @__PURE__ */ new Set([
        ...this.failedAudioPlaybackTargets,
        ...this.failedVideoPlaybackTargets,
        ...this.failedMutedVideoPlaybackTargets
      ])).forEach((t) => {
        this.startEmbeddedMedia({ target: t });
      }), this.clearMediaPlaybackErrors();
    });
  }
  logMediaDebug(e, t = {}) {
    console.log("[reveal media]", e, JSON.stringify(t));
  }
  /**
   * Should the given element be preloaded?
   * Decides based on local element attributes and global config.
   *
   * @param {HTMLElement} element
   */
  shouldPreload(e) {
    if (this.Reveal.isScrollView())
      return !0;
    let t = this.Reveal.getConfig().preloadIframes;
    return typeof t != "boolean" && (t = e.hasAttribute("data-preload")), t;
  }
  /**
   * Called when the given slide is within the configured view
   * distance. Shows the slide element and loads any content
   * that is set to load lazily (data-src).
   *
   * @param {HTMLElement} slide Slide to show
   */
  load(e, t = {}) {
    const i = this.Reveal.getConfig().display;
    const a0 = e.classList.contains("stack") || e.querySelector(":scope > section") !== null;
    if (i.includes("!important")) {
      const a = i.replace(/\s*!important\s*$/, "").trim();
      e.style.setProperty("display", a, "important");
    } else
      e.style.display = i;
    a0 || E(e, "img[data-src], audio[data-src], iframe[data-src]").forEach((a) => {
      const n = a.tagName === "IFRAME";
      (!n || this.shouldPreload(a)) && (this.logMediaDebug("load:data-src->src", { tagName: a.tagName, slideId: e.getAttribute("data-deck-slide") || e.id || null, src: a.getAttribute("data-src"), isIframe: n, shouldPreload: n ? this.shouldPreload(a) : null }), a.setAttribute("src", a.getAttribute("data-src")), a.setAttribute("data-lazy-loaded", ""), a.removeAttribute("data-src"), n && a.addEventListener("load", this.preventIframeAutoFocus));
    }), a0 || E(e, "audio").forEach((a) => {
      let n = 0;
      E(a, "source[data-src]").forEach((o) => {
        this.logMediaDebug("load:source-data-src->src", { tagName: a.tagName, slideId: e.getAttribute("data-deck-slide") || e.id || null, src: o.getAttribute("data-src") }), o.setAttribute("src", o.getAttribute("data-src")), o.removeAttribute("data-src"), o.setAttribute("data-lazy-loaded", ""), n += 1;
      }), le && a.tagName === "VIDEO" && a.setAttribute("playsinline", ""), n > 0 && (this.logMediaDebug("media.load()", { tagName: a.tagName, slideId: e.getAttribute("data-deck-slide") || e.id || null, sources: n }), a.load());
    });
    let s = e.slideBackgroundElement;
    if (s) {
      s.style.display = "block";
      let a = e.slideBackgroundContentElement, n = e.getAttribute("data-background-iframe");
      if (s.hasAttribute("data-loaded") === !1) {
        s.setAttribute("data-loaded", "true");
        let c = e.getAttribute("data-background-image"), u = e.getAttribute("data-background-video"), p = e.hasAttribute("data-background-video-loop"), y = e.hasAttribute("data-background-video-muted");
        if (c)
          /^data:/.test(c.trim()) ? a.style.backgroundImage = `url(${c.trim()})` : a.style.backgroundImage = c.split(",").map((g) => {
            let b = decodeURI(g.trim());
            return `url(${Ri(b)})`;
          }).join(",");
        else if (u) {
          let g = document.createElement("video");
          p && g.setAttribute("loop", ""), (y || this.Reveal.isSpeakerNotes()) && (g.muted = !0), le && g.setAttribute("playsinline", ""), u.split(",").forEach((b) => {
            const l = document.createElement("source");
            l.setAttribute("src", b);
            let A = Ai(b);
            A && l.setAttribute("type", A), g.appendChild(l);
          }), a.appendChild(g);
        } else if (n && t.excludeIframes !== !0) {
          let g = document.createElement("iframe");
          g.setAttribute("allowfullscreen", ""), g.setAttribute("mozallowfullscreen", ""), g.setAttribute("webkitallowfullscreen", ""), g.setAttribute("allow", "autoplay"), g.setAttribute("data-src", n), g.style.width = "100%", g.style.height = "100%", g.style.maxHeight = "100%", g.style.maxWidth = "100%", a.appendChild(g);
        }
      }
      let o = a.querySelector("iframe[data-src]");
      o && this.shouldPreload(s) && !/autoplay=(1|true|yes)/gi.test(n) && o.getAttribute("src") !== n && o.setAttribute("src", n);
    }
    this.layout(e);
  }
  /**
   * Applies JS-dependent layout helpers for the scope.
   */
  layout(e) {
    Array.from(e.querySelectorAll(".r-fit-text")).forEach((t) => {
      ki(t, {
        minSize: 24,
        maxSize: this.Reveal.getConfig().height * 0.8,
        observeMutations: !1,
        observeWindow: !1
      });
    });
  }
  /**
   * Unloads and hides the given slide. This is called when the
   * slide is moved outside of the configured view distance.
   *
   * @param {HTMLElement} slide
   */
  unload(e) {
    e.style.display = "none";
    const t = e.classList.contains("stack") || e.querySelector(":scope > section") !== null;
    let i = this.Reveal.getSlideBackground(e);
    i && (i.style.display = "none", E(i, "iframe[src]").forEach((a) => {
      a.removeAttribute("src");
    })), t || E(e, "iframe[data-lazy-loaded][src]").forEach((a) => {
      this.logMediaDebug("unload:src->data-src", { tagName: a.tagName, slideId: e.getAttribute("data-deck-slide") || e.id || null, src: a.getAttribute("src"), currentSrc: a.currentSrc || null, paused: typeof a.paused == "boolean" ? a.paused : null }), a.setAttribute("data-src", a.getAttribute("src")), a.removeAttribute("src");
    }), t || E(e, "audio[data-lazy-loaded] source[src]").forEach((a) => {
      this.logMediaDebug("unload:source-src->data-src", { tagName: (a.parentElement == null ? void 0 : a.parentElement.tagName) || a.tagName, slideId: e.getAttribute("data-deck-slide") || e.id || null, src: a.getAttribute("src") }), a.setAttribute("data-src", a.getAttribute("src")), a.removeAttribute("src");
    }), t && this.logMediaDebug("unload:skip-stack-media", { slideId: e.getAttribute("data-deck-slide") || e.id || null, className: e.className });
  }
  /**
   * Enforces origin-specific format rules for embedded media.
   */
  formatEmbeddedContent() {
    let e = (t, i, s) => {
      E(this.Reveal.getSlidesElement(), "iframe[" + t + '*="' + i + '"]').forEach((a) => {
        let n = a.getAttribute(t);
        n && n.indexOf(s) === -1 && a.setAttribute(t, n + (/\?/.test(n) ? "&" : "?") + s);
      });
    };
    e("src", "youtube.com/embed/", "enablejsapi=1"), e("data-src", "youtube.com/embed/", "enablejsapi=1"), e("src", "player.vimeo.com/", "api=1"), e("data-src", "player.vimeo.com/", "api=1");
  }
  /**
   * Start playback of any embedded content inside of
   * the given element.
   *
   * @param {HTMLElement} element
   */
  startEmbeddedContent(e) {
    if (e) {
      const t = this.Reveal.isSpeakerNotes();
      E(e, 'img[src$=".gif"]').forEach((i) => {
        i.setAttribute("src", i.getAttribute("src"));
      }), E(e, "video, audio").forEach((i) => {
        if (F(i, ".fragment") && !F(i, ".fragment.visible"))
          return;
        let s = this.Reveal.getConfig().autoPlayMedia;
        if (typeof s != "boolean" && (s = i.hasAttribute("data-autoplay") || !!F(i, ".slide-background")), s && typeof i.play == "function") {
          if (t && !i.muted) return;
          i.readyState > 1 ? this.startEmbeddedMedia({ target: i }) : le ? (i.addEventListener("canplay", this.ensureMobileMediaPlaying), this.playMediaElement(i)) : (i.removeEventListener("loadeddata", this.startEmbeddedMedia), i.addEventListener("loadeddata", this.startEmbeddedMedia));
        }
      }), t || (E(e, "iframe[src]").forEach((i) => {
        F(i, ".fragment") && !F(i, ".fragment.visible") || this.startEmbeddedIframe({ target: i });
      }), E(e, "iframe[data-src]").forEach((i) => {
        F(i, ".fragment") && !F(i, ".fragment.visible") || i.getAttribute("src") !== i.getAttribute("data-src") && (i.removeEventListener("load", this.startEmbeddedIframe), i.addEventListener("load", this.startEmbeddedIframe), i.setAttribute("src", i.getAttribute("data-src")));
      }));
    }
  }
  /**
   * Ensure that an HTMLMediaElement is playing on mobile devices.
   *
   * This is a workaround for a bug in mobile Safari where
   * the media fails to display if many videos are started
   * at the same moment. When this happens, Mobile Safari
   * reports the video is playing, and the current time
   * advances, but nothing is visible.
   *
   * @param {Event} event
   */
  ensureMobileMediaPlaying(e) {
    const t = e.target;
    typeof t.getVideoPlaybackQuality == "function" && setTimeout(() => {
      const i = t.paused === !1, s = t.getVideoPlaybackQuality().totalVideoFrames;
      i && s === 0 && (t.load(), t.play());
    }, 1e3);
  }
  /**
   * Starts playing an embedded video/audio element after
   * it has finished loading.
   *
   * @param {object} event
   */
  startEmbeddedMedia(e) {
    let t = !!F(e.target, "html"), i = !!F(e.target, ".present");
    t && i && (e.target.paused || e.target.ended) && (e.target.currentTime = 0, this.playMediaElement(e.target)), e.target.removeEventListener("loadeddata", this.startEmbeddedMedia);
  }
  /**
   * Plays the given HTMLMediaElement and handles any playback
   * errors, such as the browser not allowing audio to play without
   * user action.
   *
   * @param {HTMLElement} mediaElement
   */
  playMediaElement(e) {
    this.logMediaDebug("play()", { tagName: e.tagName, src: e.getAttribute("src"), currentSrc: e.currentSrc || null, paused: e.paused, readyState: e.readyState });
    const t = e.play();
    t && typeof t.catch == "function" && t.then(() => {
      e.muted || (this.allowedToPlayAudio = !0);
    }).catch((i) => {
      if (i.name === "NotAllowedError")
        if (this.allowedToPlayAudio = !1, e.tagName === "VIDEO") {
          this.onVideoPlaybackNotAllowed(e);
          let s = !!F(e, "html"), a = !!F(e, ".present"), n = e.muted;
          s && a && !n && (e.setAttribute("data-muted-by-reveal", "true"), e.muted = !0, e.play().catch(() => {
            this.onMutedVideoPlaybackNotAllowed(e);
          }));
        } else e.tagName === "AUDIO" && this.onAudioPlaybackNotAllowed(e);
    });
  }
  /**
   * "Starts" the content of an embedded iframe using the
   * postMessage API.
   *
   * @param {object} event
   */
  startEmbeddedIframe(e) {
    let t = e.target;
    if (this.preventIframeAutoFocus(e), t && t.contentWindow) {
      let i = !!F(e.target, "html"), s = !!F(e.target, ".present");
      if (i && s) {
        let a = this.Reveal.getConfig().autoPlayMedia;
        typeof a != "boolean" && (a = t.hasAttribute("data-autoplay") || !!F(t, ".slide-background")), /youtube\.com\/embed\//.test(t.getAttribute("src")) && a ? t.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*") : /player\.vimeo\.com\//.test(t.getAttribute("src")) && a ? t.contentWindow.postMessage('{"method":"play"}', "*") : t.contentWindow.postMessage("slide:start", "*");
      }
    }
  }
  /**
   * Stop playback of any embedded content inside of
   * the targeted slide.
   *
   * @param {HTMLElement} element
   */
  stopEmbeddedContent(e, t = {}) {
    t = ge({
      // Defaults
      unloadIframes: !0
    }, t), e && e.parentNode && (E(e, "video, audio").forEach((i) => {
      !i.hasAttribute("data-ignore") && typeof i.pause == "function" && (i.setAttribute("data-paused-by-reveal", ""), i.pause(), le && i.removeEventListener("canplay", this.ensureMobileMediaPlaying));
    }), E(e, "iframe").forEach((i) => {
      i.contentWindow && i.contentWindow.postMessage("slide:stop", "*"), i.removeEventListener("load", this.preventIframeAutoFocus), i.removeEventListener("load", this.startEmbeddedIframe);
    }), E(e, 'iframe[src*="youtube.com/embed/"]').forEach((i) => {
      !i.hasAttribute("data-ignore") && i.contentWindow && typeof i.contentWindow.postMessage == "function" && i.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
    }), E(e, 'iframe[src*="player.vimeo.com/"]').forEach((i) => {
      !i.hasAttribute("data-ignore") && i.contentWindow && typeof i.contentWindow.postMessage == "function" && i.contentWindow.postMessage('{"method":"pause"}', "*");
    }), t.unloadIframes === !0 && E(e, "iframe[data-src]").forEach((i) => {
      i.setAttribute("src", "about:blank"), i.removeAttribute("src");
    }));
  }
  /**
   * Checks whether media playback is blocked by the browser. This
   * typically happens when media playback is initiated without a
   * direct user interaction.
   */
  isAllowedToPlayAudio() {
    return this.allowedToPlayAudio;
  }
  /**
   * Shows a manual button in situations where autoamtic media playback
   * is not allowed by the browser.
   */
  showPlayOrUnmuteButton() {
    const e = this.failedAudioPlaybackTargets.size, t = this.failedVideoPlaybackTargets.size, i = this.failedMutedVideoPlaybackTargets.size;
    let s = "Play media";
    i > 0 ? s = "Play video" : t > 0 ? s = "Unmute video" : e > 0 && (s = "Play audio"), this.mediaPlayButton.textContent = s, this.Reveal.getRevealElement().appendChild(this.mediaPlayButton);
  }
  onAudioPlaybackNotAllowed(e) {
    this.failedAudioPlaybackTargets.add(e), this.showPlayOrUnmuteButton(e);
  }
  onVideoPlaybackNotAllowed(e) {
    this.failedVideoPlaybackTargets.add(e), this.showPlayOrUnmuteButton();
  }
  onMutedVideoPlaybackNotAllowed(e) {
    this.failedMutedVideoPlaybackTargets.add(e), this.showPlayOrUnmuteButton();
  }
  /**
   * Videos may be temporarily muted by us to get around browser
   * restrictions on automatic playback. This method rolls back
   * all such temporary audio changes.
   */
  resetTemporarilyMutedMedia() {
    (/* @__PURE__ */ new Set([
      ...this.failedAudioPlaybackTargets,
      ...this.failedVideoPlaybackTargets,
      ...this.failedMutedVideoPlaybackTargets
    ])).forEach((t) => {
      t.hasAttribute("data-muted-by-reveal") && (t.muted = !1, t.removeAttribute("data-muted-by-reveal"));
    });
  }
  clearMediaPlaybackErrors() {
    this.resetTemporarilyMutedMedia(), this.failedAudioPlaybackTargets.clear(), this.failedVideoPlaybackTargets.clear(), this.failedMutedVideoPlaybackTargets.clear(), this.mediaPlayButton.remove();
  }
  /**
   * Prevents iframes from automatically focusing themselves.
   *
   * @param {Event} event
   */
  preventIframeAutoFocus(e) {
    const t = e.target;
    if (t && this.Reveal.getConfig().preventIframeAutoFocus) {
      let i = 0;
      const s = 100, a = 1e3, n = () => {
        document.activeElement === t ? document.activeElement.blur() : i < a && (i += s, setTimeout(n, s));
      };
      setTimeout(n, s);
    }
  }
  afterSlideChanged() {
    this.clearMediaPlaybackErrors();
  }
}
const de = ".slides section", te = ".slides>section", _e = ".slides>section.present>section", Pi = ".backgrounds>.slide-background", Li = /registerPlugin|registerKeyboardShortcut|addKeyBinding|addEventListener|showPreview/, Ti = "h.v", xi = "h/v", Ye = "c", zt = "c/t";
class Ii {
  constructor(e) {
    this.Reveal = e;
  }
  render() {
    this.element = document.createElement("div"), this.element.className = "slide-number", this.Reveal.getRevealElement().appendChild(this.element);
  }
  /**
   * Called when the reveal.js config is updated.
   */
  configure(e, t) {
    let i = "none";
    e.slideNumber && !this.Reveal.isPrintView() && (e.showSlideNumber === "all" || e.showSlideNumber === "speaker" && this.Reveal.isSpeakerNotes()) && (i = "block"), this.element.style.display = i;
  }
  /**
   * Updates the slide number to match the current slide.
   */
  update() {
    this.Reveal.getConfig().slideNumber && this.element && (this.element.innerHTML = this.getSlideNumber());
  }
  /**
   * Returns the HTML string corresponding to the current slide
   * number, including formatting.
   */
  getSlideNumber(e = this.Reveal.getCurrentSlide()) {
    let t = this.Reveal.getConfig(), i, s = Ti;
    if (typeof t.slideNumber == "function")
      i = t.slideNumber(e);
    else {
      typeof t.slideNumber == "string" && (s = t.slideNumber), !/c/.test(s) && this.Reveal.getHorizontalSlides().length === 1 && (s = Ye);
      let n = e && e.dataset.visibility === "uncounted" ? 0 : 1;
      switch (i = [], s) {
        case Ye:
          i.push(this.Reveal.getSlidePastCount(e) + n);
          break;
        case zt:
          i.push(this.Reveal.getSlidePastCount(e) + n, "/", this.Reveal.getTotalSlides());
          break;
        default:
          let o = this.Reveal.getIndices(e);
          i.push(o.h + n);
          let c = s === xi ? "/" : ".";
          this.Reveal.isVerticalSlide(e) && i.push(c, o.v + 1);
      }
    }
    let a = "#" + this.Reveal.location.getHash(e);
    return this.formatNumber(i[0], i[1], i[2], a);
  }
  /**
   * Applies HTML formatting to a slide number before it's
   * written to the DOM.
   *
   * @param {number} a Current slide
   * @param {string} delimiter Character to separate slide numbers
   * @param {(number|*)} b Total slides
   * @param {HTMLElement} [url='#'+locationHash()] The url to link to
   * @return {string} HTML string fragment
   */
  formatNumber(e, t, i, s = "#" + this.Reveal.location.getHash()) {
    return typeof i == "number" && !isNaN(i) ? `<a href="${s}">
					<span class="slide-number-a">${e}</span>
					<span class="slide-number-delimiter">${t}</span>
					<span class="slide-number-b">${i}</span>
					</a>` : `<a href="${s}">
					<span class="slide-number-a">${e}</span>
					</a>`;
  }
  destroy() {
    this.element.remove();
  }
}
class Mi {
  constructor(e) {
    this.Reveal = e, this.onInput = this.onInput.bind(this), this.onBlur = this.onBlur.bind(this), this.onKeyDown = this.onKeyDown.bind(this);
  }
  render() {
    this.element = document.createElement("div"), this.element.className = "jump-to-slide", this.jumpInput = document.createElement("input"), this.jumpInput.type = "text", this.jumpInput.className = "jump-to-slide-input", this.jumpInput.placeholder = "Jump to slide", this.jumpInput.addEventListener("input", this.onInput), this.jumpInput.addEventListener("keydown", this.onKeyDown), this.jumpInput.addEventListener("blur", this.onBlur), this.element.appendChild(this.jumpInput);
  }
  show() {
    this.indicesOnShow = this.Reveal.getIndices(), this.Reveal.getRevealElement().appendChild(this.element), this.jumpInput.focus();
  }
  hide() {
    this.isVisible() && (this.element.remove(), this.jumpInput.value = "", clearTimeout(this.jumpTimeout), delete this.jumpTimeout);
  }
  isVisible() {
    return !!this.element.parentNode;
  }
  /**
   * Parses the current input and jumps to the given slide.
   */
  jump() {
    clearTimeout(this.jumpTimeout), delete this.jumpTimeout;
    let e = this.jumpInput.value.trim(""), t;
    if (/^\d+$/.test(e)) {
      const i = this.Reveal.getConfig().slideNumber;
      if (i === Ye || i === zt) {
        const s = this.Reveal.getSlides()[parseInt(e, 10) - 1];
        s && (t = this.Reveal.getIndices(s));
      }
    }
    return t || (/^\d+\.\d+$/.test(e) && (e = e.replace(".", "/")), t = this.Reveal.location.getIndicesFromHash(e, { oneBasedIndex: !0 })), !t && /\S+/i.test(e) && e.length > 1 && (t = this.search(e)), t && e !== "" ? (this.Reveal.slide(t.h, t.v, t.f), !0) : (this.Reveal.slide(this.indicesOnShow.h, this.indicesOnShow.v, this.indicesOnShow.f), !1);
  }
  jumpAfter(e) {
    clearTimeout(this.jumpTimeout), this.jumpTimeout = setTimeout(() => this.jump(), e);
  }
  /**
   * A lofi search that looks for the given query in all
   * of our slides and returns the first match.
   */
  search(e) {
    const t = new RegExp("\\b" + e.trim() + "\\b", "i"), i = this.Reveal.getSlides().find((s) => t.test(s.innerText));
    return i ? this.Reveal.getIndices(i) : null;
  }
  /**
   * Reverts back to the slide we were on when jump to slide was
   * invoked.
   */
  cancel() {
    this.Reveal.slide(this.indicesOnShow.h, this.indicesOnShow.v, this.indicesOnShow.f), this.hide();
  }
  confirm() {
    this.jump(), this.hide();
  }
  destroy() {
    this.jumpInput.removeEventListener("input", this.onInput), this.jumpInput.removeEventListener("keydown", this.onKeyDown), this.jumpInput.removeEventListener("blur", this.onBlur), this.element.remove();
  }
  onKeyDown(e) {
    e.keyCode === 13 ? this.confirm() : e.keyCode === 27 && (this.cancel(), e.stopImmediatePropagation());
  }
  onInput(e) {
    this.jumpAfter(200);
  }
  onBlur() {
    setTimeout(() => this.hide(), 1);
  }
}
const Ge = (h) => {
  let e = h.match(/^#([0-9a-f]{3})$/i);
  if (e && e[1]) {
    const a = e[1];
    return {
      r: parseInt(a.charAt(0), 16) * 17,
      g: parseInt(a.charAt(1), 16) * 17,
      b: parseInt(a.charAt(2), 16) * 17
    };
  }
  let t = h.match(/^#([0-9a-f]{6})$/i);
  if (t && t[1]) {
    const a = t[1];
    return {
      r: parseInt(a.slice(0, 2), 16),
      g: parseInt(a.slice(2, 4), 16),
      b: parseInt(a.slice(4, 6), 16)
    };
  }
  let i = h.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
  if (i)
    return {
      r: parseInt(i[1], 10),
      g: parseInt(i[2], 10),
      b: parseInt(i[3], 10)
    };
  let s = h.match(
    /^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d]+|[\d]*.[\d]+)\s*\)$/i
  );
  return s ? {
    r: parseInt(s[1], 10),
    g: parseInt(s[2], 10),
    b: parseInt(s[3], 10),
    a: parseFloat(s[4])
  } : null;
}, Ni = (h) => (typeof h == "string" && (h = Ge(h)), h ? (h.r * 299 + h.g * 587 + h.b * 114) / 1e3 : null);
class Bi {
  constructor(e) {
    this.Reveal = e;
  }
  render() {
    this.element = document.createElement("div"), this.element.className = "backgrounds", this.Reveal.getRevealElement().appendChild(this.element);
  }
  /**
   * Creates the slide background elements and appends them
   * to the background container. One element is created per
   * slide no matter if the given slide has visible background.
   */
  create() {
    this.element.innerHTML = "", this.element.classList.add("no-transition"), this.Reveal.getHorizontalSlides().forEach((e) => {
      let t = this.createBackground(e, this.element);
      E(e, "section").forEach((i) => {
        this.createBackground(i, t), t.classList.add("stack");
      });
    }), this.Reveal.getConfig().parallaxBackgroundImage ? (this.element.style.backgroundImage = 'url("' + this.Reveal.getConfig().parallaxBackgroundImage + '")', this.element.style.backgroundSize = this.Reveal.getConfig().parallaxBackgroundSize, this.element.style.backgroundRepeat = this.Reveal.getConfig().parallaxBackgroundRepeat, this.element.style.backgroundPosition = this.Reveal.getConfig().parallaxBackgroundPosition, setTimeout(() => {
      this.Reveal.getRevealElement().classList.add("has-parallax-background");
    }, 1)) : (this.element.style.backgroundImage = "", this.Reveal.getRevealElement().classList.remove("has-parallax-background"));
  }
  /**
   * Creates a background for the given slide.
   *
   * @param {HTMLElement} slide
   * @param {HTMLElement} container The element that the background
   * should be appended to
   * @return {HTMLElement} New background div
   */
  createBackground(e, t) {
    let i = document.createElement("div");
    i.className = "slide-background " + e.className.replace(/present|past|future/, "");
    let s = document.createElement("div");
    return s.className = "slide-background-content", i.appendChild(s), t.appendChild(i), e.slideBackgroundElement = i, e.slideBackgroundContentElement = s, this.sync(e), i;
  }
  /**
   * Renders all of the visual properties of a slide background
   * based on the various background attributes.
   *
   * @param {HTMLElement} slide
   */
  sync(e) {
    const t = e.slideBackgroundElement, i = e.slideBackgroundContentElement, s = {
      background: e.getAttribute("data-background"),
      backgroundSize: e.getAttribute("data-background-size"),
      backgroundImage: e.getAttribute("data-background-image"),
      backgroundVideo: e.getAttribute("data-background-video"),
      backgroundIframe: e.getAttribute("data-background-iframe"),
      backgroundColor: e.getAttribute("data-background-color"),
      backgroundGradient: e.getAttribute("data-background-gradient"),
      backgroundRepeat: e.getAttribute("data-background-repeat"),
      backgroundPosition: e.getAttribute("data-background-position"),
      backgroundTransition: e.getAttribute("data-background-transition"),
      backgroundOpacity: e.getAttribute("data-background-opacity")
    }, a = e.hasAttribute("data-preload");
    e.classList.remove("has-dark-background"), e.classList.remove("has-light-background"), t.removeAttribute("data-loaded"), t.removeAttribute("data-background-hash"), t.removeAttribute("data-background-size"), t.removeAttribute("data-background-transition"), t.style.backgroundColor = "", i.style.backgroundSize = "", i.style.backgroundRepeat = "", i.style.backgroundPosition = "", i.style.backgroundImage = "", i.style.opacity = "", i.innerHTML = "", s.background && (/^(http|file|\/\/)/gi.test(s.background) || /\.(svg|png|jpg|jpeg|gif|bmp|webp)([?#\s]|$)/gi.test(s.background) ? e.setAttribute("data-background-image", s.background) : t.style.background = s.background), (s.background || s.backgroundColor || s.backgroundGradient || s.backgroundImage || s.backgroundVideo || s.backgroundIframe) && t.setAttribute("data-background-hash", s.background + s.backgroundSize + s.backgroundImage + s.backgroundVideo + s.backgroundIframe + s.backgroundColor + s.backgroundGradient + s.backgroundRepeat + s.backgroundPosition + s.backgroundTransition + s.backgroundOpacity), s.backgroundSize && t.setAttribute("data-background-size", s.backgroundSize), s.backgroundColor && (t.style.backgroundColor = s.backgroundColor), s.backgroundGradient && (t.style.backgroundImage = s.backgroundGradient), s.backgroundTransition && t.setAttribute("data-background-transition", s.backgroundTransition), a && t.setAttribute("data-preload", ""), s.backgroundSize && (i.style.backgroundSize = s.backgroundSize), s.backgroundRepeat && (i.style.backgroundRepeat = s.backgroundRepeat), s.backgroundPosition && (i.style.backgroundPosition = s.backgroundPosition), s.backgroundOpacity && (i.style.opacity = s.backgroundOpacity);
    const n = this.getContrastClass(e);
    typeof n == "string" && e.classList.add(n);
  }
  /**
   * Returns a class name that can be applied to a slide to indicate
   * if it has a light or dark background.
   *
   * @param {*} slide
   *
   * @returns {string|null}
   */
  getContrastClass(e) {
    const t = e.slideBackgroundElement;
    let i = e.getAttribute("data-background-color");
    if (!i || !Ge(i)) {
      let s = window.getComputedStyle(t);
      s && s.backgroundColor && (i = s.backgroundColor);
    }
    if (i) {
      const s = Ge(i);
      if (s && s.a !== 0)
        return Ni(i) < 128 ? "has-dark-background" : "has-light-background";
    }
    return null;
  }
  /**
   * Bubble the 'has-light-background'/'has-dark-background' classes.
   */
  bubbleSlideContrastClassToElement(e, t) {
    ["has-light-background", "has-dark-background"].forEach((i) => {
      e.classList.contains(i) ? t.classList.add(i) : t.classList.remove(i);
    }, this);
  }
  /**
   * Updates the background elements to reflect the current
   * slide.
   *
   * @param {boolean} includeAll If true, the backgrounds of
   * all vertical slides (not just the present) will be updated.
   */
  update(e = !1) {
    let t = this.Reveal.getConfig(), i = this.Reveal.getCurrentSlide(), s = this.Reveal.getIndices(), a = null, n = t.rtl ? "future" : "past", o = t.rtl ? "past" : "future";
    if (Array.from(this.element.childNodes).forEach((u, p) => {
      u.classList.remove("past", "present", "future"), p < s.h ? u.classList.add(n) : p > s.h ? u.classList.add(o) : (u.classList.add("present"), a = u), (e || p === s.h) && E(u, ".slide-background").forEach((y, g) => {
        y.classList.remove("past", "present", "future");
        const b = typeof s.v == "number" ? s.v : 0;
        g < b ? y.classList.add("past") : g > b ? y.classList.add("future") : (y.classList.add("present"), p === s.h && (a = y));
      });
    }), this.previousBackground && !this.previousBackground.closest("body") && (this.previousBackground = null), a && this.previousBackground) {
      let u = this.previousBackground.getAttribute("data-background-hash"), p = a.getAttribute("data-background-hash");
      if (p && p === u && a !== this.previousBackground) {
        this.element.classList.add("no-transition");
        const y = a.querySelector("video"), g = this.previousBackground.querySelector("video");
        if (y && g) {
          const b = y.parentNode;
          g.parentNode.appendChild(y), b.appendChild(g);
        }
      }
    }
    const c = a !== this.previousBackground;
    if (c && this.previousBackground && this.Reveal.slideContent.stopEmbeddedContent(this.previousBackground, { unloadIframes: !this.Reveal.slideContent.shouldPreload(this.previousBackground) }), c && a) {
      this.Reveal.slideContent.startEmbeddedContent(a);
      let u = a.querySelector(".slide-background-content");
      if (u) {
        let p = u.style.backgroundImage || "";
        /\.gif/i.test(p) && (u.style.backgroundImage = "", window.getComputedStyle(u).opacity, u.style.backgroundImage = p);
      }
      this.previousBackground = a;
    }
    i && this.bubbleSlideContrastClassToElement(i, this.Reveal.getRevealElement()), setTimeout(() => {
      this.element.classList.remove("no-transition");
    }, 10);
  }
  /**
   * Updates the position of the parallax background based
   * on the current slide index.
   */
  updateParallax() {
    let e = this.Reveal.getIndices();
    if (this.Reveal.getConfig().parallaxBackgroundImage) {
      let t = this.Reveal.getHorizontalSlides(), i = this.Reveal.getVerticalSlides(), s = this.element.style.backgroundSize.split(" "), a, n;
      s.length === 1 ? a = n = parseInt(s[0], 10) : (a = parseInt(s[0], 10), n = parseInt(s[1], 10));
      let o = this.element.offsetWidth, c = t.length, u, p;
      typeof this.Reveal.getConfig().parallaxBackgroundHorizontal == "number" ? u = this.Reveal.getConfig().parallaxBackgroundHorizontal : u = c > 1 ? (a - o) / (c - 1) : 0, p = u * e.h * -1;
      let y = this.element.offsetHeight, g = i.length, b, l;
      typeof this.Reveal.getConfig().parallaxBackgroundVertical == "number" ? b = this.Reveal.getConfig().parallaxBackgroundVertical : b = (n - y) / (g - 1), l = g > 0 ? b * e.v : 0, this.element.style.backgroundPosition = p + "px " + -l + "px";
    }
  }
  destroy() {
    this.element.remove();
  }
}
let Nt = 0;
class Hi {
  constructor(e) {
    this.Reveal = e;
  }
  /**
   * Runs an auto-animation between the given slides.
   *
   * @param  {HTMLElement} fromSlide
   * @param  {HTMLElement} toSlide
   */
  run(e, t) {
    this.reset();
    let i = this.Reveal.getSlides(), s = i.indexOf(t), a = i.indexOf(e);
    if (e && t && e.hasAttribute("data-auto-animate") && t.hasAttribute("data-auto-animate") && e.getAttribute("data-auto-animate-id") === t.getAttribute("data-auto-animate-id") && !(s > a ? t : e).hasAttribute("data-auto-animate-restart")) {
      this.autoAnimateStyleSheet = this.autoAnimateStyleSheet || Xe();
      let n = this.getAutoAnimateOptions(t);
      e.dataset.autoAnimate = "pending", t.dataset.autoAnimate = "pending", n.slideDirection = s > a ? "forward" : "backward";
      let o = e.style.display === "none";
      o && (e.style.display = this.Reveal.getConfig().display);
      let c = this.getAutoAnimatableElements(e, t).map((u) => this.autoAnimateElements(u.from, u.to, u.options || {}, n, Nt++));
      if (o && (e.style.display = "none"), t.dataset.autoAnimateUnmatched !== "false" && this.Reveal.getConfig().autoAnimateUnmatched === !0) {
        let u = n.duration * 0.8, p = n.duration * 0.2;
        this.getUnmatchedAutoAnimateElements(t).forEach((y) => {
          let g = this.getAutoAnimateOptions(y, n), b = "unmatched";
          (g.duration !== n.duration || g.delay !== n.delay) && (b = "unmatched-" + Nt++, c.push(`[data-auto-animate="running"] [data-auto-animate-target="${b}"] { transition: opacity ${g.duration}s ease ${g.delay}s; }`)), y.dataset.autoAnimateTarget = b;
        }, this), c.push(`[data-auto-animate="running"] [data-auto-animate-target="unmatched"] { transition: opacity ${u}s ease ${p}s; }`);
      }
      this.autoAnimateStyleSheet.innerHTML = c.join(""), requestAnimationFrame(() => {
        this.autoAnimateStyleSheet && (getComputedStyle(this.autoAnimateStyleSheet).fontWeight, t.dataset.autoAnimate = "running");
      }), this.Reveal.dispatchEvent({
        type: "autoanimate",
        data: {
          fromSlide: e,
          toSlide: t,
          sheet: this.autoAnimateStyleSheet
        }
      });
    }
  }
  /**
   * Rolls back all changes that we've made to the DOM so
   * that as part of animating.
   */
  reset() {
    E(this.Reveal.getRevealElement(), '[data-auto-animate]:not([data-auto-animate=""])').forEach((e) => {
      e.dataset.autoAnimate = "";
    }), E(this.Reveal.getRevealElement(), "[data-auto-animate-target]").forEach((e) => {
      delete e.dataset.autoAnimateTarget;
    }), this.autoAnimateStyleSheet && this.autoAnimateStyleSheet.parentNode && (this.autoAnimateStyleSheet.parentNode.removeChild(this.autoAnimateStyleSheet), this.autoAnimateStyleSheet = null);
  }
  /**
   * Creates a FLIP animation where the `to` element starts out
   * in the `from` element position and animates to its original
   * state.
   *
   * @param {HTMLElement} from
   * @param {HTMLElement} to
   * @param {Object} elementOptions Options for this element pair
   * @param {Object} animationOptions Options set at the slide level
   * @param {String} id Unique ID that we can use to identify this
   * auto-animate element in the DOM
   */
  autoAnimateElements(e, t, i, s, a) {
    e.dataset.autoAnimateTarget = "", t.dataset.autoAnimateTarget = a;
    let n = this.getAutoAnimateOptions(t, s);
    typeof i.delay != "undefined" && (n.delay = i.delay), typeof i.duration != "undefined" && (n.duration = i.duration), typeof i.easing != "undefined" && (n.easing = i.easing);
    let o = this.getAutoAnimatableProperties("from", e, i), c = this.getAutoAnimatableProperties("to", t, i);
    if (t.classList.contains("fragment") && delete c.styles.opacity, i.translate !== !1 || i.scale !== !1) {
      let y = this.Reveal.getScale(), g = {
        x: (o.x - c.x) / y,
        y: (o.y - c.y) / y,
        scaleX: o.width / c.width,
        scaleY: o.height / c.height
      };
      g.x = Math.round(g.x * 1e3) / 1e3, g.y = Math.round(g.y * 1e3) / 1e3, g.scaleX = Math.round(g.scaleX * 1e3) / 1e3, g.scaleX = Math.round(g.scaleX * 1e3) / 1e3;
      let b = i.translate !== !1 && (g.x !== 0 || g.y !== 0), l = i.scale !== !1 && (g.scaleX !== 0 || g.scaleY !== 0);
      if (b || l) {
        let A = [];
        b && A.push(`translate(${g.x}px, ${g.y}px)`), l && A.push(`scale(${g.scaleX}, ${g.scaleY})`), o.styles.transform = A.join(" "), o.styles["transform-origin"] = "top left", c.styles.transform = "none";
      }
    }
    for (let y in c.styles) {
      const g = c.styles[y], b = o.styles[y];
      g === b ? delete c.styles[y] : (g.explicitValue === !0 && (c.styles[y] = g.value), b.explicitValue === !0 && (o.styles[y] = b.value));
    }
    let u = "", p = Object.keys(c.styles);
    if (p.length > 0) {
      o.styles.transition = "none", c.styles.transition = `all ${n.duration}s ${n.easing} ${n.delay}s`, c.styles["transition-property"] = p.join(", "), c.styles["will-change"] = p.join(", ");
      let y = Object.keys(o.styles).map((b) => b + ": " + o.styles[b] + " !important;").join(""), g = Object.keys(c.styles).map((b) => b + ": " + c.styles[b] + " !important;").join("");
      u = '[data-auto-animate-target="' + a + '"] {' + y + '}[data-auto-animate="running"] [data-auto-animate-target="' + a + '"] {' + g + "}";
    }
    return u;
  }
  /**
   * Returns the auto-animate options for the given element.
   *
   * @param {HTMLElement} element Element to pick up options
   * from, either a slide or an animation target
   * @param {Object} [inheritedOptions] Optional set of existing
   * options
   */
  getAutoAnimateOptions(e, t) {
    let i = {
      easing: this.Reveal.getConfig().autoAnimateEasing,
      duration: this.Reveal.getConfig().autoAnimateDuration,
      delay: 0
    };
    if (i = ge(i, t), e.parentNode) {
      let s = F(e.parentNode, "[data-auto-animate-target]");
      s && (i = this.getAutoAnimateOptions(s, i));
    }
    return e.dataset.autoAnimateEasing && (i.easing = e.dataset.autoAnimateEasing), e.dataset.autoAnimateDuration && (i.duration = parseFloat(e.dataset.autoAnimateDuration)), e.dataset.autoAnimateDelay && (i.delay = parseFloat(e.dataset.autoAnimateDelay)), i;
  }
  /**
   * Returns an object containing all of the properties
   * that can be auto-animated for the given element and
   * their current computed values.
   *
   * @param {String} direction 'from' or 'to'
   */
  getAutoAnimatableProperties(e, t, i) {
    let s = this.Reveal.getConfig(), a = { styles: [] };
    if (i.translate !== !1 || i.scale !== !1) {
      let o;
      if (typeof i.measure == "function")
        o = i.measure(t);
      else if (s.center)
        o = t.getBoundingClientRect();
      else {
        let c = this.Reveal.getScale();
        o = {
          x: t.offsetLeft * c,
          y: t.offsetTop * c,
          width: t.offsetWidth * c,
          height: t.offsetHeight * c
        };
      }
      a.x = o.x, a.y = o.y, a.width = o.width, a.height = o.height;
    }
    const n = getComputedStyle(t);
    return (i.styles || s.autoAnimateStyles).forEach((o) => {
      let c;
      typeof o == "string" && (o = { property: o }), typeof o.from != "undefined" && e === "from" ? c = { value: o.from, explicitValue: !0 } : typeof o.to != "undefined" && e === "to" ? c = { value: o.to, explicitValue: !0 } : (o.property === "line-height" && (c = parseFloat(n["line-height"]) / parseFloat(n["font-size"])), isNaN(c) && (c = n[o.property])), c !== "" && (a.styles[o.property] = c);
    }), a;
  }
  /**
   * Get a list of all element pairs that we can animate
   * between the given slides.
   *
   * @param {HTMLElement} fromSlide
   * @param {HTMLElement} toSlide
   *
   * @return {Array} Each value is an array where [0] is
   * the element we're animating from and [1] is the
   * element we're animating to
   */
  getAutoAnimatableElements(e, t) {
    let s = (typeof this.Reveal.getConfig().autoAnimateMatcher == "function" ? this.Reveal.getConfig().autoAnimateMatcher : this.getAutoAnimatePairs).call(this, e, t), a = [];
    return s.filter((n, o) => {
      if (a.indexOf(n.to) === -1)
        return a.push(n.to), !0;
    });
  }
  /**
   * Identifies matching elements between slides.
   *
   * You can specify a custom matcher function by using
   * the `autoAnimateMatcher` config option.
   */
  getAutoAnimatePairs(e, t) {
    let i = [];
    const a = "h1, h2, h3, h4, h5, h6, p, li", n = "img, video, iframe";
    return this.findAutoAnimateMatches(i, e, t, "[data-id]", (o) => o.nodeName + ":::" + o.getAttribute("data-id")), this.findAutoAnimateMatches(i, e, t, a, (o) => o.nodeName + ":::" + o.textContent.trim()), this.findAutoAnimateMatches(i, e, t, n, (o) => o.nodeName + ":::" + (o.getAttribute("src") || o.getAttribute("data-src"))), this.findAutoAnimateMatches(i, e, t, "pre", (o) => o.nodeName + ":::" + o.textContent.trim()), i.forEach((o) => {
      xe(o.from, a) ? o.options = { scale: !1 } : xe(o.from, "pre") && (o.options = { scale: !1, styles: ["width", "height"] }, this.findAutoAnimateMatches(i, o.from, o.to, ".hljs .hljs-ln-code", (c) => c.textContent, {
        scale: !1,
        styles: [],
        measure: this.getLocalBoundingBox.bind(this)
      }), this.findAutoAnimateMatches(i, o.from, o.to, ".hljs .hljs-ln-numbers[data-line-number]", (c) => c.getAttribute("data-line-number"), {
        scale: !1,
        styles: ["width"],
        measure: this.getLocalBoundingBox.bind(this)
      }));
    }, this), i;
  }
  /**
   * Helper method which returns a bounding box based on
   * the given elements offset coordinates.
   *
   * @param {HTMLElement} element
   * @return {Object} x, y, width, height
   */
  getLocalBoundingBox(e) {
    const t = this.Reveal.getScale();
    return {
      x: Math.round(e.offsetLeft * t * 100) / 100,
      y: Math.round(e.offsetTop * t * 100) / 100,
      width: Math.round(e.offsetWidth * t * 100) / 100,
      height: Math.round(e.offsetHeight * t * 100) / 100
    };
  }
  /**
   * Finds matching elements between two slides.
   *
   * @param {Array} pairs            	List of pairs to push matches to
   * @param {HTMLElement} fromScope   Scope within the from element exists
   * @param {HTMLElement} toScope     Scope within the to element exists
   * @param {String} selector         CSS selector of the element to match
   * @param {Function} serializer     A function that accepts an element and returns
   *                                  a stringified ID based on its contents
   * @param {Object} animationOptions Optional config options for this pair
   */
  findAutoAnimateMatches(e, t, i, s, a, n) {
    let o = {}, c = {};
    [].slice.call(t.querySelectorAll(s)).forEach((u, p) => {
      const y = a(u);
      typeof y == "string" && y.length && (o[y] = o[y] || [], o[y].push(u));
    }), [].slice.call(i.querySelectorAll(s)).forEach((u, p) => {
      const y = a(u);
      c[y] = c[y] || [], c[y].push(u);
      let g;
      if (o[y]) {
        const b = c[y].length - 1, l = o[y].length - 1;
        o[y][b] ? (g = o[y][b], o[y][b] = null) : o[y][l] && (g = o[y][l], o[y][l] = null);
      }
      g && e.push({
        from: g,
        to: u,
        options: n
      });
    });
  }
  /**
   * Returns a all elements within the given scope that should
   * be considered unmatched in an auto-animate transition. If
   * fading of unmatched elements is turned on, these elements
   * will fade when going between auto-animate slides.
   *
   * Note that parents of auto-animate targets are NOT considered
   * unmatched since fading them would break the auto-animation.
   *
   * @param {HTMLElement} rootElement
   * @return {Array}
   */
  getUnmatchedAutoAnimateElements(e) {
    return [].slice.call(e.children).reduce((t, i) => {
      const s = i.querySelector("[data-auto-animate-target]");
      return !i.hasAttribute("data-auto-animate-target") && !s && t.push(i), i.querySelector("[data-auto-animate-target]") && (t = t.concat(this.getUnmatchedAutoAnimateElements(i))), t;
    }, []);
  }
}
const Di = 500, Fi = 4, Vi = 6, zi = 8;
class Oi {
  constructor(e) {
    this.Reveal = e, this.active = !1, this.activatedCallbacks = [], this.onScroll = this.onScroll.bind(this);
  }
  /**
   * Activates the scroll view. This rearranges the presentation DOM
   * by—among other things—wrapping each slide in a page element.
   */
  activate() {
    if (this.active) return;
    const e = this.Reveal.getState();
    this.active = !0, this.slideHTMLBeforeActivation = this.Reveal.getSlidesElement().innerHTML;
    const t = E(this.Reveal.getRevealElement(), te), i = E(this.Reveal.getRevealElement(), Pi);
    this.viewportElement.classList.add("loading-scroll-mode", "reveal-scroll");
    let s;
    const a = window.getComputedStyle(this.viewportElement);
    a && a.background && (s = a.background);
    const n = [], o = t[0].parentNode;
    let c;
    const u = (p, y, g, b) => {
      let l;
      if (c && this.Reveal.shouldAutoAnimateBetween(c, p))
        l = document.createElement("div"), l.className = "scroll-page-content scroll-auto-animate-page", l.style.display = "none", c.closest(".scroll-page-content").parentNode.appendChild(l);
      else {
        const A = document.createElement("div");
        if (A.className = "scroll-page", n.push(A), b && i.length > y) {
          const O = i[y], q = window.getComputedStyle(O);
          q && q.background ? A.style.background = q.background : s && (A.style.background = s);
        } else s && (A.style.background = s);
        const M = document.createElement("div");
        M.className = "scroll-page-sticky", A.appendChild(M), l = document.createElement("div"), l.className = "scroll-page-content", M.appendChild(l);
      }
      l.appendChild(p), p.classList.remove("past", "future"), p.setAttribute("data-index-h", y), p.setAttribute("data-index-v", g), p.slideBackgroundElement && (p.slideBackgroundElement.remove("past", "future"), l.insertBefore(p.slideBackgroundElement, p)), c = p;
    };
    t.forEach((p, y) => {
      this.Reveal.isVerticalStack(p) ? p.querySelectorAll("section").forEach((g, b) => {
        u(g, y, b, !0);
      }) : u(p, y, 0);
    }, this), this.createProgressBar(), E(this.Reveal.getRevealElement(), ".stack").forEach((p) => p.remove()), n.forEach((p) => o.appendChild(p)), this.Reveal.slideContent.layout(this.Reveal.getSlidesElement()), this.Reveal.layout(), this.Reveal.setState(e), this.activatedCallbacks.forEach((p) => p()), this.activatedCallbacks = [], this.restoreScrollPosition(), this.viewportElement.classList.remove("loading-scroll-mode"), this.viewportElement.addEventListener("scroll", this.onScroll, { passive: !0 });
  }
  /**
   * Deactivates the scroll view and restores the standard slide-based
   * presentation.
   */
  deactivate() {
    if (!this.active) return;
    const e = this.Reveal.getState();
    this.active = !1, this.viewportElement.removeEventListener("scroll", this.onScroll), this.viewportElement.classList.remove("reveal-scroll"), this.removeProgressBar(), this.Reveal.getSlidesElement().innerHTML = this.slideHTMLBeforeActivation, this.Reveal.sync(), this.Reveal.setState(e), this.slideHTMLBeforeActivation = null;
  }
  toggle(e) {
    typeof e == "boolean" ? e ? this.activate() : this.deactivate() : this.isActive() ? this.deactivate() : this.activate();
  }
  /**
   * Checks if the scroll view is currently active.
   */
  isActive() {
    return this.active;
  }
  /**
   * Renders the progress bar component.
   */
  createProgressBar() {
    this.progressBar = document.createElement("div"), this.progressBar.className = "scrollbar", this.progressBarInner = document.createElement("div"), this.progressBarInner.className = "scrollbar-inner", this.progressBar.appendChild(this.progressBarInner), this.progressBarPlayhead = document.createElement("div"), this.progressBarPlayhead.className = "scrollbar-playhead", this.progressBarInner.appendChild(this.progressBarPlayhead), this.viewportElement.insertBefore(this.progressBar, this.viewportElement.firstChild);
    const e = (s) => {
      let a = (s.clientY - this.progressBarInner.getBoundingClientRect().top) / this.progressBarHeight;
      a = Math.max(Math.min(a, 1), 0), this.viewportElement.scrollTop = a * (this.viewportElement.scrollHeight - this.viewportElement.offsetHeight);
    }, t = (s) => {
      this.draggingProgressBar = !1, this.showProgressBar(), document.removeEventListener("mousemove", e), document.removeEventListener("mouseup", t);
    }, i = (s) => {
      s.preventDefault(), this.draggingProgressBar = !0, document.addEventListener("mousemove", e), document.addEventListener("mouseup", t), e(s);
    };
    this.progressBarInner.addEventListener("mousedown", i);
  }
  removeProgressBar() {
    this.progressBar && (this.progressBar.remove(), this.progressBar = null);
  }
  layout() {
    this.isActive() && (this.syncPages(), this.syncScrollPosition());
  }
  /**
   * Updates our pages to match the latest configuration and
   * presentation size.
   */
  syncPages() {
    const e = this.Reveal.getConfig(), t = this.Reveal.getComputedSlideSize(window.innerWidth, window.innerHeight), i = this.Reveal.getScale(), s = e.scrollLayout === "compact", a = this.viewportElement.offsetHeight, n = t.height * i, o = s ? n : a;
    this.scrollTriggerHeight = s ? n : a, this.viewportElement.style.setProperty("--page-height", o + "px"), this.viewportElement.style.scrollSnapType = typeof e.scrollSnap == "string" ? `y ${e.scrollSnap}` : "", this.slideTriggers = [];
    const c = Array.from(this.Reveal.getRevealElement().querySelectorAll(".scroll-page"));
    this.pages = c.map((u) => {
      const p = this.createPage({
        pageElement: u,
        slideElement: u.querySelector("section"),
        stickyElement: u.querySelector(".scroll-page-sticky"),
        contentElement: u.querySelector(".scroll-page-content"),
        backgroundElement: u.querySelector(".slide-background"),
        autoAnimateElements: u.querySelectorAll(".scroll-auto-animate-page"),
        autoAnimatePages: []
      });
      p.pageElement.style.setProperty("--slide-height", e.center === !0 ? "auto" : t.height + "px"), this.slideTriggers.push({
        page: p,
        activate: () => this.activatePage(p),
        deactivate: () => this.deactivatePage(p)
      }), this.createFragmentTriggersForPage(p), p.autoAnimateElements.length > 0 && this.createAutoAnimateTriggersForPage(p);
      let y = Math.max(p.scrollTriggers.length - 1, 0);
      y += p.autoAnimatePages.reduce((g, b) => g + Math.max(b.scrollTriggers.length - 1, 0), p.autoAnimatePages.length), p.pageElement.querySelectorAll(".scroll-snap-point").forEach((g) => g.remove());
      for (let g = 0; g < y + 1; g++) {
        const b = document.createElement("div");
        b.className = "scroll-snap-point", b.style.height = this.scrollTriggerHeight + "px", b.style.scrollSnapAlign = s ? "center" : "start", p.pageElement.appendChild(b), g === 0 && (b.style.marginTop = -this.scrollTriggerHeight + "px");
      }
      return s && p.scrollTriggers.length > 0 ? (p.pageHeight = a, p.pageElement.style.setProperty("--page-height", a + "px")) : (p.pageHeight = o, p.pageElement.style.removeProperty("--page-height")), p.scrollPadding = this.scrollTriggerHeight * y, p.totalHeight = p.pageHeight + p.scrollPadding, p.pageElement.style.setProperty("--page-scroll-padding", p.scrollPadding + "px"), y > 0 ? (p.stickyElement.style.position = "sticky", p.stickyElement.style.top = Math.max((a - p.pageHeight) / 2, 0) + "px") : (p.stickyElement.style.position = "relative", p.pageElement.style.scrollSnapAlign = p.pageHeight < a ? "center" : "start"), p;
    }), this.setTriggerRanges(), this.viewportElement.setAttribute("data-scrollbar", e.scrollProgress), e.scrollProgress && this.totalScrollTriggerCount > 1 ? (this.progressBar || this.createProgressBar(), this.syncProgressBar()) : this.removeProgressBar();
  }
  /**
   * Calculates and sets the scroll range for all of our scroll
   * triggers.
   */
  setTriggerRanges() {
    this.totalScrollTriggerCount = this.slideTriggers.reduce((t, i) => t + Math.max(i.page.scrollTriggers.length, 1), 0);
    let e = 0;
    this.slideTriggers.forEach((t, i) => {
      t.range = [
        e,
        e + Math.max(t.page.scrollTriggers.length, 1) / this.totalScrollTriggerCount
      ];
      const s = (t.range[1] - t.range[0]) / t.page.scrollTriggers.length;
      t.page.scrollTriggers.forEach((a, n) => {
        a.range = [
          e + n * s,
          e + (n + 1) * s
        ];
      }), e = t.range[1];
    }), this.slideTriggers[this.slideTriggers.length - 1].range[1] = 1;
  }
  /**
   * Creates one scroll trigger for each fragments in the given page.
   *
   * @param {*} page
   */
  createFragmentTriggersForPage(e, t) {
    t = t || e.slideElement;
    const i = this.Reveal.fragments.sort(t.querySelectorAll(".fragment"), !0);
    return i.length && (e.fragments = this.Reveal.fragments.sort(t.querySelectorAll(".fragment:not(.disabled)")), e.scrollTriggers.push(
      // Trigger for the initial state with no fragments visible
      {
        activate: () => {
          this.Reveal.fragments.update(-1, e.fragments, t);
        }
      }
    ), i.forEach((s, a) => {
      e.scrollTriggers.push({
        activate: () => {
          this.Reveal.fragments.update(a, e.fragments, t);
        }
      });
    })), e.scrollTriggers.length;
  }
  /**
   * Creates scroll triggers for the auto-animate steps in the
   * given page.
   *
   * @param {*} page
   */
  createAutoAnimateTriggersForPage(e) {
    e.autoAnimateElements.length > 0 && this.slideTriggers.push(...Array.from(e.autoAnimateElements).map((t, i) => {
      let s = this.createPage({
        slideElement: t.querySelector("section"),
        contentElement: t,
        backgroundElement: t.querySelector(".slide-background")
      });
      return this.createFragmentTriggersForPage(s, s.slideElement), e.autoAnimatePages.push(s), {
        page: s,
        activate: () => this.activatePage(s),
        deactivate: () => this.deactivatePage(s)
      };
    }));
  }
  /**
   * Helper method for creating a page definition and adding
   * required fields. A "page" is a slide or auto-animate step.
   */
  createPage(e) {
    return e.scrollTriggers = [], e.indexh = parseInt(e.slideElement.getAttribute("data-index-h"), 10), e.indexv = parseInt(e.slideElement.getAttribute("data-index-v"), 10), e;
  }
  /**
   * Rerenders progress bar segments so that they match the current
   * reveal.js config and size.
   */
  syncProgressBar() {
    this.progressBarInner.querySelectorAll(".scrollbar-slide").forEach((n) => n.remove());
    const e = this.viewportElement.scrollHeight, t = this.viewportElement.offsetHeight, i = t / e;
    this.progressBarHeight = this.progressBarInner.offsetHeight, this.playheadHeight = Math.max(i * this.progressBarHeight, zi), this.progressBarScrollableHeight = this.progressBarHeight - this.playheadHeight;
    const s = t / e * this.progressBarHeight, a = Math.min(s / 8, Fi);
    this.progressBarPlayhead.style.height = this.playheadHeight - a + "px", s > Vi ? this.slideTriggers.forEach((n) => {
      const { page: o } = n;
      o.progressBarSlide = document.createElement("div"), o.progressBarSlide.className = "scrollbar-slide", o.progressBarSlide.style.top = n.range[0] * this.progressBarHeight + "px", o.progressBarSlide.style.height = (n.range[1] - n.range[0]) * this.progressBarHeight - a + "px", o.progressBarSlide.classList.toggle("has-triggers", o.scrollTriggers.length > 0), this.progressBarInner.appendChild(o.progressBarSlide), o.scrollTriggerElements = o.scrollTriggers.map((c, u) => {
        const p = document.createElement("div");
        return p.className = "scrollbar-trigger", p.style.top = (c.range[0] - n.range[0]) * this.progressBarHeight + "px", p.style.height = (c.range[1] - c.range[0]) * this.progressBarHeight - a + "px", o.progressBarSlide.appendChild(p), u === 0 && (p.style.display = "none"), p;
      });
    }) : this.pages.forEach((n) => n.progressBarSlide = null);
  }
  /**
   * Reads the current scroll position and updates our active
   * trigger states accordingly.
   */
  syncScrollPosition() {
    const e = this.viewportElement.offsetHeight, t = e / this.viewportElement.scrollHeight, i = this.viewportElement.scrollTop, s = this.viewportElement.scrollHeight - e, a = Math.max(Math.min(i / s, 1), 0), n = Math.max(Math.min((i + e / 2) / this.viewportElement.scrollHeight, 1), 0);
    let o;
    this.slideTriggers.forEach((c) => {
      const { page: u } = c;
      a >= c.range[0] - t * 2 && a <= c.range[1] + t * 2 && !u.loaded ? (u.loaded = !0, this.Reveal.slideContent.load(u.slideElement)) : u.loaded && (u.loaded = !1, this.Reveal.slideContent.unload(u.slideElement)), a >= c.range[0] && a <= c.range[1] ? (this.activateTrigger(c), o = c.page) : c.active && this.deactivateTrigger(c);
    }), o && o.scrollTriggers.forEach((c) => {
      n >= c.range[0] && n <= c.range[1] ? this.activateTrigger(c) : c.active && this.deactivateTrigger(c);
    }), this.setProgressBarValue(i / (this.viewportElement.scrollHeight - e));
  }
  /**
   * Moves the progress bar playhead to the specified position.
   *
   * @param {number} progress 0-1
   */
  setProgressBarValue(e) {
    this.progressBar && (this.progressBarPlayhead.style.transform = `translateY(${e * this.progressBarScrollableHeight}px)`, this.getAllPages().filter((t) => t.progressBarSlide).forEach((t) => {
      t.progressBarSlide.classList.toggle("active", t.active === !0), t.scrollTriggers.forEach((i, s) => {
        t.scrollTriggerElements[s].classList.toggle("active", t.active === !0 && i.active === !0);
      });
    }), this.showProgressBar());
  }
  /**
   * Show the progress bar and, if configured, automatically hide
   * it after a delay.
   */
  showProgressBar() {
    this.progressBar.classList.add("visible"), clearTimeout(this.hideProgressBarTimeout), this.Reveal.getConfig().scrollProgress === "auto" && !this.draggingProgressBar && (this.hideProgressBarTimeout = setTimeout(() => {
      this.progressBar && this.progressBar.classList.remove("visible");
    }, Di));
  }
  /**
   * Scroll to the previous page.
   */
  prev() {
    this.viewportElement.scrollTop -= this.scrollTriggerHeight;
  }
  /**
   * Scroll to the next page.
   */
  next() {
    this.viewportElement.scrollTop += this.scrollTriggerHeight;
  }
  /**
   * Scrolls the given slide element into view.
   *
   * @param {HTMLElement} slideElement
   */
  scrollToSlide(e) {
    if (!this.active)
      this.activatedCallbacks.push(() => this.scrollToSlide(e));
    else {
      const t = this.getScrollTriggerBySlide(e);
      t && (this.viewportElement.scrollTop = t.range[0] * (this.viewportElement.scrollHeight - this.viewportElement.offsetHeight));
    }
  }
  /**
   * Persists the current scroll position to session storage
   * so that it can be restored.
   */
  storeScrollPosition() {
    clearTimeout(this.storeScrollPositionTimeout), this.storeScrollPositionTimeout = setTimeout(() => {
      sessionStorage.setItem("reveal-scroll-top", this.viewportElement.scrollTop), sessionStorage.setItem("reveal-scroll-origin", location.origin + location.pathname), this.storeScrollPositionTimeout = null;
    }, 50);
  }
  /**
   * Restores the scroll position when a deck is reloader.
   */
  restoreScrollPosition() {
    const e = sessionStorage.getItem("reveal-scroll-top"), t = sessionStorage.getItem("reveal-scroll-origin");
    e && t === location.origin + location.pathname && (this.viewportElement.scrollTop = parseInt(e, 10));
  }
  /**
   * Activates the given page and starts its embedded content
   * if there is any.
   *
   * @param {object} page
   */
  activatePage(e) {
    if (!e.active) {
      e.active = !0;
      const { slideElement: t, backgroundElement: i, contentElement: s, indexh: a, indexv: n } = e;
      s.style.display = "block", t.classList.add("present"), i && i.classList.add("present"), this.Reveal.setCurrentScrollPage(t, a, n), this.Reveal.backgrounds.bubbleSlideContrastClassToElement(t, this.viewportElement), Array.from(s.parentNode.querySelectorAll(".scroll-page-content")).forEach((o) => {
        o !== s && (o.style.display = "none");
      });
    }
  }
  /**
   * Deactivates the page after it has been visible.
   *
   * @param {object} page
   */
  deactivatePage(e) {
    e.active && (e.active = !1, e.slideElement && e.slideElement.classList.remove("present"), e.backgroundElement && e.backgroundElement.classList.remove("present"));
  }
  activateTrigger(e) {
    e.active || (e.active = !0, e.activate());
  }
  deactivateTrigger(e) {
    e.active && (e.active = !1, e.deactivate && e.deactivate());
  }
  /**
   * Retrieve a slide by its original h/v index (i.e. the indices the
   * slide had before being linearized).
   *
   * @param {number} h
   * @param {number} v
   * @returns {HTMLElement}
   */
  getSlideByIndices(e, t) {
    const i = this.getAllPages().find((s) => s.indexh === e && s.indexv === t);
    return i ? i.slideElement : null;
  }
  /**
   * Retrieve a list of all scroll triggers for the given slide
   * DOM element.
   *
   * @param {HTMLElement} slide
   * @returns {Array}
   */
  getScrollTriggerBySlide(e) {
    return this.slideTriggers.find((t) => t.page.slideElement === e);
  }
  /**
   * Get a list of all pages in the scroll view. This includes
   * both top-level slides and auto-animate steps.
   *
   * @returns {Array}
   */
  getAllPages() {
    return this.pages.flatMap((e) => [e, ...e.autoAnimatePages || []]);
  }
  onScroll() {
    this.syncScrollPosition(), this.storeScrollPosition();
  }
  get viewportElement() {
    return this.Reveal.getViewportElement();
  }
}
class qi {
  constructor(e) {
    this.Reveal = e;
  }
  /**
   * Configures the presentation for printing to a static
   * PDF.
   */
  activate() {
    return It(this, null, function* () {
      const e = this.Reveal.getConfig(), t = E(this.Reveal.getRevealElement(), de), i = e.slideNumber && /all|print/i.test(e.showSlideNumber), s = this.Reveal.getComputedSlideSize(window.innerWidth, window.innerHeight), a = Math.floor(s.width * (1 + e.margin)), n = Math.floor(s.height * (1 + e.margin)), o = s.width, c = s.height;
      yield new Promise(requestAnimationFrame), Xe("@page{size:" + a + "px " + n + "px; margin: 0px;}"), Xe(".reveal section>img, .reveal section>video, .reveal section>iframe{max-width: " + o + "px; max-height:" + c + "px}"), document.documentElement.classList.add("reveal-print", "print-pdf"), document.body.style.width = a + "px", document.body.style.height = n + "px";
      const u = this.Reveal.getViewportElement();
      let p;
      if (u) {
        const A = window.getComputedStyle(u);
        A && A.background && (p = A.background);
      }
      yield new Promise(requestAnimationFrame), this.Reveal.layoutSlideContents(o, c), yield new Promise(requestAnimationFrame);
      const y = t.map((A) => A.scrollHeight), g = [], b = t[0].parentNode;
      let l = 1;
      t.forEach(function(A, M) {
        if (A.classList.contains("stack") === !1) {
          let O = (a - o) / 2, q = (n - c) / 2;
          const re = y[M];
          let z = Math.max(Math.ceil(re / n), 1);
          z = Math.min(z, e.pdfMaxPagesPerSlide), (z === 1 && e.center || A.classList.contains("center")) && (q = Math.max((n - re) / 2, 0));
          const R = document.createElement("div");
          if (g.push(R), R.className = "pdf-page", R.style.height = (n + e.pdfPageHeightOffset) * z + "px", p && (R.style.background = p), R.appendChild(A), A.style.left = O + "px", A.style.top = q + "px", A.style.width = o + "px", this.Reveal.slideContent.layout(A), A.slideBackgroundElement && R.insertBefore(A.slideBackgroundElement, A), e.showNotes) {
            const B = this.Reveal.getSlideNotes(A);
            if (B) {
              const W = typeof e.showNotes == "string" ? e.showNotes : "inline", L = document.createElement("div");
              L.classList.add("speaker-notes"), L.classList.add("speaker-notes-pdf"), L.setAttribute("data-layout", W), L.innerHTML = B, W === "separate-page" ? g.push(L) : (L.style.left = "8px", L.style.bottom = "8px", L.style.width = a - 16 + "px", R.appendChild(L));
            }
          }
          if (i) {
            const B = document.createElement("div");
            B.classList.add("slide-number"), B.classList.add("slide-number-pdf"), B.innerHTML = l++, R.appendChild(B);
          }
          if (e.pdfSeparateFragments) {
            const B = this.Reveal.fragments.sort(R.querySelectorAll(".fragment"), !0);
            let U;
            B.forEach(function(W, L) {
              U && U.forEach(function(V) {
                V.classList.remove("current-fragment");
              }), W.forEach(function(V) {
                V.classList.add("visible", "current-fragment");
              }, this);
              const k = R.cloneNode(!0);
              if (i) {
                const V = k.querySelector(".slide-number-pdf"), C = L + 1;
                V.innerHTML += "." + C;
              }
              g.push(k), U = W;
            }, this), B.forEach(function(W) {
              W.forEach(function(L) {
                L.classList.remove("visible", "current-fragment");
              });
            });
          } else
            E(R, ".fragment:not(.fade-out)").forEach(function(B) {
              B.classList.add("visible");
            });
        }
      }, this), yield new Promise(requestAnimationFrame), g.forEach((A) => b.appendChild(A)), this.Reveal.slideContent.layout(this.Reveal.getSlidesElement()), this.Reveal.dispatchEvent({ type: "pdf-ready" }), u.classList.remove("loading-scroll-mode");
    });
  }
  /**
   * Checks if the print mode is/should be activated.
   */
  isActive() {
    return this.Reveal.getConfig().view === "print";
  }
}
class Ui {
  constructor(e) {
    this.Reveal = e;
  }
  /**
   * Called when the reveal.js config is updated.
   */
  configure(e, t) {
    e.fragments === !1 ? this.disable() : t.fragments === !1 && this.enable();
  }
  /**
   * If fragments are disabled in the deck, they should all be
   * visible rather than stepped through.
   */
  disable() {
    E(this.Reveal.getSlidesElement(), ".fragment").forEach((e) => {
      e.classList.add("visible"), e.classList.remove("current-fragment");
    });
  }
  /**
   * Reverse of #disable(). Only called if fragments have
   * previously been disabled.
   */
  enable() {
    E(this.Reveal.getSlidesElement(), ".fragment").forEach((e) => {
      e.classList.remove("visible"), e.classList.remove("current-fragment");
    });
  }
  /**
   * Returns an object describing the available fragment
   * directions.
   *
   * @return {{prev: boolean, next: boolean}}
   */
  availableRoutes() {
    let e = this.Reveal.getCurrentSlide();
    if (e && this.Reveal.getConfig().fragments) {
      let t = e.querySelectorAll(".fragment:not(.disabled)"), i = e.querySelectorAll(".fragment:not(.disabled):not(.visible)");
      return {
        prev: t.length - i.length > 0,
        next: !!i.length
      };
    } else
      return { prev: !1, next: !1 };
  }
  /**
   * Return a sorted fragments list, ordered by an increasing
   * "data-fragment-index" attribute.
   *
   * Fragments will be revealed in the order that they are returned by
   * this function, so you can use the index attributes to control the
   * order of fragment appearance.
   *
   * To maintain a sensible default fragment order, fragments are presumed
   * to be passed in document order. This function adds a "fragment-index"
   * attribute to each node if such an attribute is not already present,
   * and sets that attribute to an integer value which is the position of
   * the fragment within the fragments list.
   *
   * @param {object[]|*} fragments
   * @param {boolean} grouped If true the returned array will contain
   * nested arrays for all fragments with the same index
   * @return {object[]} sorted Sorted array of fragments
   */
  sort(e, t = !1) {
    e = Array.from(e);
    let i = [], s = [], a = [];
    e.forEach((o) => {
      if (o.hasAttribute("data-fragment-index")) {
        let c = parseInt(o.getAttribute("data-fragment-index"), 10);
        i[c] || (i[c] = []), i[c].push(o);
      } else
        s.push([o]);
    }), i = i.concat(s);
    let n = 0;
    return i.forEach((o) => {
      o.forEach((c) => {
        a.push(c), c.setAttribute("data-fragment-index", n);
      }), n++;
    }), t === !0 ? i : a;
  }
  /**
   * Sorts and formats all of fragments in the
   * presentation.
   */
  sortAll() {
    this.Reveal.getHorizontalSlides().forEach((e) => {
      let t = E(e, "section");
      t.forEach((i, s) => {
        this.sort(i.querySelectorAll(".fragment"));
      }, this), t.length === 0 && this.sort(e.querySelectorAll(".fragment"));
    });
  }
  /**
   * Refreshes the fragments on the current slide so that they
   * have the appropriate classes (.visible + .current-fragment).
   *
   * @param {number} [index] The index of the current fragment
   * @param {array} [fragments] Array containing all fragments
   * in the current slide
   *
   * @return {{shown: array, hidden: array}}
   */
  update(e, t, i = this.Reveal.getCurrentSlide()) {
    let s = {
      shown: [],
      hidden: []
    };
    if (i && this.Reveal.getConfig().fragments && (t = t || this.sort(i.querySelectorAll(".fragment")), t.length)) {
      let a = 0;
      if (typeof e != "number") {
        let n = this.sort(i.querySelectorAll(".fragment.visible")).pop();
        n && (e = parseInt(n.getAttribute("data-fragment-index") || 0, 10));
      }
      Array.from(t).forEach((n, o) => {
        if (n.hasAttribute("data-fragment-index") && (o = parseInt(n.getAttribute("data-fragment-index"), 10)), a = Math.max(a, o), o <= e) {
          let c = n.classList.contains("visible");
          n.classList.add("visible"), n.classList.remove("current-fragment"), o === e && (this.Reveal.announceStatus(this.Reveal.getStatusText(n)), n.classList.add("current-fragment"), this.Reveal.slideContent.startEmbeddedContent(n)), c || (s.shown.push(n), this.Reveal.dispatchEvent({
            target: n,
            type: "visible",
            bubbles: !1
          }));
        } else {
          let c = n.classList.contains("visible");
          n.classList.remove("visible"), n.classList.remove("current-fragment"), c && (this.Reveal.slideContent.stopEmbeddedContent(n), s.hidden.push(n), this.Reveal.dispatchEvent({
            target: n,
            type: "hidden",
            bubbles: !1
          }));
        }
      }), e = typeof e == "number" ? e : -1, e = Math.max(Math.min(e, a), -1), i.setAttribute("data-fragment", e);
    }
    return s.hidden.length && this.Reveal.dispatchEvent({
      type: "fragmenthidden",
      data: {
        fragment: s.hidden[0],
        fragments: s.hidden
      }
    }), s.shown.length && this.Reveal.dispatchEvent({
      type: "fragmentshown",
      data: {
        fragment: s.shown[0],
        fragments: s.shown
      }
    }), s;
  }
  /**
   * Formats the fragments on the given slide so that they have
   * valid indices. Call this if fragments are changed in the DOM
   * after reveal.js has already initialized.
   *
   * @param {HTMLElement} slide
   * @return {Array} a list of the HTML fragments that were synced
   */
  sync(e = this.Reveal.getCurrentSlide()) {
    return this.sort(e.querySelectorAll(".fragment"));
  }
  /**
   * Navigate to the specified slide fragment.
   *
   * @param {?number} index The index of the fragment that
   * should be shown, -1 means all are invisible
   * @param {number} offset Integer offset to apply to the
   * fragment index
   *
   * @return {boolean} true if a change was made in any
   * fragments visibility as part of this call
   */
  goto(e, t = 0) {
    let i = this.Reveal.getCurrentSlide();
    if (i && this.Reveal.getConfig().fragments) {
      let s = this.sort(i.querySelectorAll(".fragment:not(.disabled)"));
      if (s.length) {
        if (typeof e != "number") {
          let n = this.sort(i.querySelectorAll(".fragment:not(.disabled).visible")).pop();
          n ? e = parseInt(n.getAttribute("data-fragment-index") || 0, 10) : e = -1;
        }
        e += t;
        let a = this.update(e, s);
        return this.Reveal.controls.update(), this.Reveal.progress.update(), this.Reveal.getConfig().fragmentInURL && this.Reveal.location.writeURL(), !!(a.shown.length || a.hidden.length);
      }
    }
    return !1;
  }
  /**
   * Navigate to the next slide fragment.
   *
   * @return {boolean} true if there was a next fragment,
   * false otherwise
   */
  next() {
    return this.goto(null, 1);
  }
  /**
   * Navigate to the previous slide fragment.
   *
   * @return {boolean} true if there was a previous fragment,
   * false otherwise
   */
  prev() {
    return this.goto(null, -1);
  }
}
class Wi {
  constructor(e) {
    this.Reveal = e, this.active = !1, this.onSlideClicked = this.onSlideClicked.bind(this);
  }
  activate() {
    if (this.Reveal.getConfig().overview && !this.Reveal.isScrollView() && !this.isActive()) {
      this.active = !0, this.Reveal.getRevealElement().classList.add("overview"), this.Reveal.getRevealElement().classList.add("overview-activating"), this.Reveal.cancelAutoSlide(), this.Reveal.getSlidesElement().appendChild(this.Reveal.getBackgroundsElement()), E(this.Reveal.getRevealElement(), de).forEach((a) => {
        a.classList.contains("stack") || a.addEventListener("click", this.onSlideClicked, !0);
      });
      const e = this.Reveal.getComputedSlideSize(), t = e.width * 0.08, i = e.height * 0.45;
      this.overviewSlideWidth = e.width + t, this.overviewSlideHeight = e.height + i, this.Reveal.getConfig().rtl && (this.overviewSlideWidth = -this.overviewSlideWidth), this.Reveal.updateSlidesVisibility(), this.layout(), this.update(), this.Reveal.layout();
      const s = this.Reveal.getIndices();
      this.Reveal.dispatchEvent({
        type: "overviewshown",
        data: {
          indexh: s.h,
          indexv: s.v,
          currentSlide: this.Reveal.getCurrentSlide()
        }
      }), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.Reveal.getRevealElement().classList.remove("overview-activating");
        });
      });
    }
  }
  layout() {
    this.Reveal.getHorizontalSlides().forEach((e, t) => {
      e.setAttribute("data-index-h", t), ae(e, "translate3d(0, " + t * this.overviewSlideHeight + "px, 0)"), e.classList.contains("stack") && E(e, "section").forEach((i, s) => {
        i.setAttribute("data-index-h", t), i.setAttribute("data-index-v", s), ae(i, "translate3d(" + s * this.overviewSlideWidth + "px, 0, 0)");
      });
    }), Array.from(this.Reveal.getBackgroundsElement().childNodes).forEach((e, t) => {
      ae(e, "translate3d(0, " + t * this.overviewSlideHeight + "px, 0)"), E(e, ".slide-background").forEach((i, s) => {
        ae(i, "translate3d(" + s * this.overviewSlideWidth + "px, 0, 0)");
      });
    });
  }
  update() {
    const e = Math.min(window.innerWidth, window.innerHeight), t = Math.max(e / 5, 150) / e, i = this.Reveal.getIndices(), s = [
      "scale(" + t + ")",
      "translateX(" + -i.v * this.overviewSlideWidth + "px)",
      "translateY(" + -i.h * this.overviewSlideHeight + "px)"
    ].join(" ");
    this.Reveal.transformSlides({
      overview: s
    });
  }
  deactivate() {
    if (this.Reveal.getConfig().overview) {
      this.active = !1, this.Reveal.getRevealElement().classList.remove("overview"), this.Reveal.getRevealElement().classList.add("overview-deactivating"), setTimeout(() => {
        this.Reveal.getRevealElement().classList.remove("overview-deactivating");
      }, 1), this.Reveal.getRevealElement().appendChild(this.Reveal.getBackgroundsElement()), E(this.Reveal.getRevealElement(), de).forEach((t) => {
        ae(t, ""), t.removeEventListener("click", this.onSlideClicked, !0);
      }), E(this.Reveal.getBackgroundsElement(), ".slide-background").forEach((t) => {
        ae(t, "");
      }), this.Reveal.transformSlides({ overview: "" });
      const e = this.Reveal.getIndices();
      this.Reveal.slide(e.h, e.v), this.Reveal.layout(), this.Reveal.cueAutoSlide(), this.Reveal.dispatchEvent({
        type: "overviewhidden",
        data: {
          indexh: e.h,
          indexv: e.v,
          currentSlide: this.Reveal.getCurrentSlide()
        }
      });
    }
  }
  toggle(e) {
    typeof e == "boolean" ? e ? this.activate() : this.deactivate() : this.isActive() ? this.deactivate() : this.activate();
  }
  isActive() {
    return this.active;
  }
  onSlideClicked(e) {
    if (this.isActive()) {
      e.preventDefault();
      let t = e.target;
      for (; t && !t.nodeName.match(/section/gi); )
        t = t.parentNode;
      if (t && !t.classList.contains("disabled") && (this.deactivate(), t.nodeName.match(/section/gi))) {
        let i = parseInt(t.getAttribute("data-index-h"), 10), s = parseInt(t.getAttribute("data-index-v"), 10);
        this.Reveal.slide(i, s);
      }
    }
  }
}
class ji {
  constructor(e) {
    this.Reveal = e, this.shortcuts = {}, this.bindings = {}, this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
  }
  /**
   * Called when the reveal.js config is updated.
   */
  configure(e, t) {
    e.navigationMode === "linear" ? (this.shortcuts["&#8594;  ,  &#8595;  ,  SPACE  ,  N  ,  L  ,  J"] = "Next slide", this.shortcuts["&#8592;  ,  &#8593;  ,  P  ,  H  ,  K"] = "Previous slide") : (this.shortcuts["N  ,  SPACE"] = "Next slide", this.shortcuts["P  ,  Shift SPACE"] = "Previous slide", this.shortcuts["&#8592;  ,  H"] = "Navigate left", this.shortcuts["&#8594;  ,  L"] = "Navigate right", this.shortcuts["&#8593;  ,  K"] = "Navigate up", this.shortcuts["&#8595;  ,  J"] = "Navigate down"), this.shortcuts["Alt + &#8592;/&#8593/&#8594;/&#8595;"] = "Navigate without fragments", this.shortcuts["Shift + &#8592;/&#8593/&#8594;/&#8595;"] = "Jump to first/last slide", this.shortcuts["B  ,  ."] = "Pause", this.shortcuts.F = "Fullscreen", this.shortcuts.G = "Jump to slide", this.shortcuts["ESC, O"] = "Slide overview";
  }
  /**
   * Starts listening for keyboard events.
   */
  bind() {
    document.addEventListener("keydown", this.onDocumentKeyDown, !1);
  }
  /**
   * Stops listening for keyboard events.
   */
  unbind() {
    document.removeEventListener("keydown", this.onDocumentKeyDown, !1);
  }
  /**
   * Add a custom key binding with optional description to
   * be added to the help screen.
   */
  addKeyBinding(e, t) {
    typeof e == "object" && e.keyCode ? this.bindings[e.keyCode] = {
      callback: t,
      key: e.key,
      description: e.description
    } : this.bindings[e] = {
      callback: t,
      key: null,
      description: null
    };
  }
  /**
   * Removes the specified custom key binding.
   */
  removeKeyBinding(e) {
    delete this.bindings[e];
  }
  /**
   * Programmatically triggers a keyboard event
   *
   * @param {int} keyCode
   */
  triggerKey(e) {
    this.onDocumentKeyDown({ keyCode: e });
  }
  /**
   * Registers a new shortcut to include in the help overlay
   *
   * @param {String} key
   * @param {String} value
   */
  registerKeyboardShortcut(e, t) {
    this.shortcuts[e] = t;
  }
  getShortcuts() {
    return this.shortcuts;
  }
  getBindings() {
    return this.bindings;
  }
  /**
   * Handler for the document level 'keydown' event.
   *
   * @param {object} event
   */
  onDocumentKeyDown(e) {
    let t = this.Reveal.getConfig();
    if (typeof t.keyboardCondition == "function" && t.keyboardCondition(e) === !1 || t.keyboardCondition === "focused" && !this.Reveal.isFocused())
      return !0;
    let i = e.keyCode, s = !this.Reveal.isAutoSliding();
    this.Reveal.onUserInput(e);
    let a = document.activeElement && document.activeElement.isContentEditable === !0, n = document.activeElement && document.activeElement.tagName && /input|textarea/i.test(document.activeElement.tagName), o = document.activeElement && document.activeElement.className && /speaker-notes/i.test(document.activeElement.className), u = !([32, 37, 38, 39, 40, 63, 78, 80, 191].indexOf(e.keyCode) !== -1 && e.shiftKey || e.altKey) && (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey);
    if (a || n || o || u) return;
    let p = [66, 86, 190, 191, 112], y;
    if (typeof t.keyboard == "object")
      for (y in t.keyboard)
        t.keyboard[y] === "togglePause" && p.push(parseInt(y, 10));
    if (this.Reveal.isOverlayOpen() && !["Escape", "f", "c", "b", "."].includes(e.key) || this.Reveal.isPaused() && p.indexOf(i) === -1)
      return !1;
    let g = t.navigationMode === "linear" || !this.Reveal.hasHorizontalSlides() || !this.Reveal.hasVerticalSlides(), b = !1;
    if (typeof t.keyboard == "object") {
      for (y in t.keyboard)
        if (parseInt(y, 10) === i) {
          let l = t.keyboard[y];
          typeof l == "function" ? l.apply(null, [e]) : typeof l == "string" && typeof this.Reveal[l] == "function" && this.Reveal[l].call(), b = !0;
        }
    }
    if (b === !1) {
      for (y in this.bindings)
        if (parseInt(y, 10) === i) {
          let l = this.bindings[y].callback;
          typeof l == "function" ? l.apply(null, [e]) : typeof l == "string" && typeof this.Reveal[l] == "function" && this.Reveal[l].call(), b = !0;
        }
    }
    b === !1 && (b = !0, i === 80 || i === 33 ? this.Reveal.prev({ skipFragments: e.altKey }) : i === 78 || i === 34 ? this.Reveal.next({ skipFragments: e.altKey }) : i === 72 || i === 37 ? e.shiftKey ? this.Reveal.slide(0) : !this.Reveal.overview.isActive() && g ? t.rtl ? this.Reveal.next({ skipFragments: e.altKey }) : this.Reveal.prev({ skipFragments: e.altKey }) : this.Reveal.left({ skipFragments: e.altKey }) : i === 76 || i === 39 ? e.shiftKey ? this.Reveal.slide(this.Reveal.getHorizontalSlides().length - 1) : !this.Reveal.overview.isActive() && g ? t.rtl ? this.Reveal.prev({ skipFragments: e.altKey }) : this.Reveal.next({ skipFragments: e.altKey }) : this.Reveal.right({ skipFragments: e.altKey }) : i === 75 || i === 38 ? e.shiftKey ? this.Reveal.slide(void 0, 0) : !this.Reveal.overview.isActive() && g ? this.Reveal.prev({ skipFragments: e.altKey }) : this.Reveal.up({ skipFragments: e.altKey }) : i === 74 || i === 40 ? e.shiftKey ? this.Reveal.slide(void 0, Number.MAX_VALUE) : !this.Reveal.overview.isActive() && g ? this.Reveal.next({ skipFragments: e.altKey }) : this.Reveal.down({ skipFragments: e.altKey }) : i === 36 ? this.Reveal.slide(0) : i === 35 ? this.Reveal.slide(this.Reveal.getHorizontalSlides().length - 1) : i === 32 ? (this.Reveal.overview.isActive() && this.Reveal.overview.deactivate(), e.shiftKey ? this.Reveal.prev({ skipFragments: e.altKey }) : this.Reveal.next({ skipFragments: e.altKey })) : [58, 59, 66, 86, 190].includes(i) || i === 191 && !e.shiftKey ? this.Reveal.togglePause() : i === 70 ? Dt(t.embedded ? this.Reveal.getViewportElement() : document.documentElement) : i === 65 ? t.autoSlideStoppable && this.Reveal.toggleAutoSlide(s) : i === 71 ? t.jumpToSlide && this.Reveal.toggleJumpToSlide() : i === 67 && this.Reveal.isOverlayOpen() ? this.Reveal.closeOverlay() : (i === 63 || i === 191) && e.shiftKey ? this.Reveal.toggleHelp() : i === 112 ? this.Reveal.toggleHelp() : b = !1), b ? e.preventDefault && e.preventDefault() : i === 27 || i === 79 ? (this.Reveal.closeOverlay() === !1 && this.Reveal.overview.toggle(), e.preventDefault && e.preventDefault()) : i === 13 && this.Reveal.overview.isActive() && (this.Reveal.overview.deactivate(), e.preventDefault && e.preventDefault()), this.Reveal.cueAutoSlide();
  }
}
class Ki {
  constructor(e) {
    // The minimum number of milliseconds that must pass between
    // calls to history.replaceState
    je(this, "MAX_REPLACE_STATE_FREQUENCY", 1e3);
    this.Reveal = e, this.writeURLTimeout = 0, this.replaceStateTimestamp = 0, this.onWindowHashChange = this.onWindowHashChange.bind(this);
  }
  bind() {
    window.addEventListener("hashchange", this.onWindowHashChange, !1);
  }
  unbind() {
    window.removeEventListener("hashchange", this.onWindowHashChange, !1);
  }
  /**
   * Returns the slide indices for the given hash link.
   *
   * @param {string} [hash] the hash string that we want to
   * find the indices for
   *
   * @returns slide indices or null
   */
  getIndicesFromHash(e = window.location.hash, t = {}) {
    let i = e.replace(/^#\/?/, ""), s = i.split("/");
    if (!/^[0-9]*$/.test(s[0]) && i.length) {
      let a, n;
      /\/[-\d]+$/g.test(i) && (n = parseInt(i.split("/").pop(), 10), n = isNaN(n) ? void 0 : n, i = i.split("/").shift());
      try {
        const o = decodeURIComponent(i);
        a = (document.getElementById(o) || document.querySelector(`[data-id="${o}"]`)).closest(".slides section");
      } catch (o) {
      }
      if (a)
        return We(Q({}, this.Reveal.getIndices(a)), { f: n });
    } else {
      const a = this.Reveal.getConfig();
      let n = a.hashOneBasedIndex || t.oneBasedIndex ? 1 : 0, o = parseInt(s[0], 10) - n || 0, c = parseInt(s[1], 10) - n || 0, u;
      return a.fragmentInURL && (u = parseInt(s[2], 10), isNaN(u) && (u = void 0)), { h: o, v: c, f: u };
    }
    return null;
  }
  /**
   * Reads the current URL (hash) and navigates accordingly.
   */
  readURL() {
    const e = this.Reveal.getIndices(), t = this.getIndicesFromHash();
    t ? (t.h !== e.h || t.v !== e.v || t.f !== void 0) && this.Reveal.slide(t.h, t.v, t.f) : this.Reveal.slide(e.h || 0, e.v || 0);
  }
  /**
   * Updates the page URL (hash) to reflect the current
   * state.
   *
   * @param {number} delay The time in ms to wait before
   * writing the hash
   */
  writeURL(e) {
    let t = this.Reveal.getConfig(), i = this.Reveal.getCurrentSlide();
    if (clearTimeout(this.writeURLTimeout), typeof e == "number")
      this.writeURLTimeout = setTimeout(this.writeURL, e);
    else if (i) {
      let s = this.getHash();
      t.history ? window.location.hash = s : t.hash && (s === "/" ? this.debouncedReplaceState(window.location.pathname + window.location.search) : this.debouncedReplaceState("#" + s));
    }
  }
  replaceState(e) {
    window.history.replaceState(null, null, e), this.replaceStateTimestamp = Date.now();
  }
  debouncedReplaceState(e) {
    clearTimeout(this.replaceStateTimeout), Date.now() - this.replaceStateTimestamp > this.MAX_REPLACE_STATE_FREQUENCY ? this.replaceState(e) : this.replaceStateTimeout = setTimeout(() => this.replaceState(e), this.MAX_REPLACE_STATE_FREQUENCY);
  }
  /**
   * Return a hash URL that will resolve to the given slide location.
   *
   * @param {HTMLElement} [slide=currentSlide] The slide to link to
   */
  getHash(e) {
    let t = "/", i = e || this.Reveal.getCurrentSlide(), s = i ? i.getAttribute("id") : null;
    s && (s = encodeURIComponent(s));
    let a = this.Reveal.getIndices(e);
    if (this.Reveal.getConfig().fragmentInURL || (a.f = void 0), typeof s == "string" && s.length)
      t = "/" + s, a.f >= 0 && (t += "/" + a.f);
    else {
      let n = this.Reveal.getConfig().hashOneBasedIndex ? 1 : 0;
      (a.h > 0 || a.v > 0 || a.f >= 0) && (t += a.h + n), (a.v > 0 || a.f >= 0) && (t += "/" + (a.v + n)), a.f >= 0 && (t += "/" + a.f);
    }
    return t;
  }
  /**
   * Handler for the window level 'hashchange' event.
   *
   * @param {object} [event]
   */
  onWindowHashChange(e) {
    this.readURL();
  }
}
class _i {
  constructor(e) {
    this.Reveal = e, this.onNavigateLeftClicked = this.onNavigateLeftClicked.bind(this), this.onNavigateRightClicked = this.onNavigateRightClicked.bind(this), this.onNavigateUpClicked = this.onNavigateUpClicked.bind(this), this.onNavigateDownClicked = this.onNavigateDownClicked.bind(this), this.onNavigatePrevClicked = this.onNavigatePrevClicked.bind(this), this.onNavigateNextClicked = this.onNavigateNextClicked.bind(this), this.onEnterFullscreen = this.onEnterFullscreen.bind(this);
  }
  render() {
    const e = this.Reveal.getRevealElement();
    this.element = document.createElement("aside"), this.element.className = "controls", this.element.innerHTML = `<button class="navigate-left" aria-label="previous slide in this group"><div class="controls-arrow"></div></button>
			<button class="navigate-right" aria-label="next slide in this group"><div class="controls-arrow"></div></button>
			<button class="navigate-up" aria-label="previous group"><div class="controls-arrow"></div></button>
			<button class="navigate-down" aria-label="next group"><div class="controls-arrow"></div></button>`, this.Reveal.getRevealElement().appendChild(this.element), this.controlsLeft = E(e, ".navigate-left"), this.controlsRight = E(e, ".navigate-right"), this.controlsUp = E(e, ".navigate-up"), this.controlsDown = E(e, ".navigate-down"), this.controlsPrev = E(e, ".navigate-prev"), this.controlsNext = E(e, ".navigate-next"), this.controlsFullscreen = E(e, ".enter-fullscreen"), this.controlsRightArrow = this.element.querySelector(".navigate-right"), this.controlsLeftArrow = this.element.querySelector(".navigate-left"), this.controlsDownArrow = this.element.querySelector(".navigate-down");
  }
  configure(e) {
    const t = e.controls === "speaker" || e.controls === "speaker-only";
    this.element.style.display = e.controls && (!t || this.Reveal.isSpeakerNotes()) ? "block" : "none", this.element.setAttribute("data-controls-layout", e.controlsLayout), this.element.setAttribute("data-controls-back-arrows", e.controlsBackArrows);
  }
  bind() {
    let e = ["touchstart", "click"];
    Vt && (e = ["touchend"]), e.forEach((t) => {
      this.controlsLeft.forEach((i) => i.addEventListener(t, this.onNavigateLeftClicked, !1)), this.controlsRight.forEach((i) => i.addEventListener(t, this.onNavigateRightClicked, !1)), this.controlsUp.forEach((i) => i.addEventListener(t, this.onNavigateUpClicked, !1)), this.controlsDown.forEach((i) => i.addEventListener(t, this.onNavigateDownClicked, !1)), this.controlsPrev.forEach((i) => i.addEventListener(t, this.onNavigatePrevClicked, !1)), this.controlsNext.forEach((i) => i.addEventListener(t, this.onNavigateNextClicked, !1)), this.controlsFullscreen.forEach((i) => i.addEventListener(t, this.onEnterFullscreen, !1));
    });
  }
  unbind() {
    ["touchstart", "touchend", "click"].forEach((e) => {
      this.controlsLeft.forEach((t) => t.removeEventListener(e, this.onNavigateLeftClicked, !1)), this.controlsRight.forEach((t) => t.removeEventListener(e, this.onNavigateRightClicked, !1)), this.controlsUp.forEach((t) => t.removeEventListener(e, this.onNavigateUpClicked, !1)), this.controlsDown.forEach((t) => t.removeEventListener(e, this.onNavigateDownClicked, !1)), this.controlsPrev.forEach((t) => t.removeEventListener(e, this.onNavigatePrevClicked, !1)), this.controlsNext.forEach((t) => t.removeEventListener(e, this.onNavigateNextClicked, !1)), this.controlsFullscreen.forEach((t) => t.removeEventListener(e, this.onEnterFullscreen, !1));
    });
  }
  getGroupLength(e) {
    const t = this.Reveal.getHorizontalSlides(), i = Math.max(0, Math.min(e, t.length - 1)), s = t[i];
    return (s ? s.querySelectorAll(":scope > section") : []).length || 1;
  }
  getLogicalIndices() {
    const e = this.Reveal.getIndices(), t = Math.max(0, e.h || 0);
    return {
      h: Math.max(0, e.v || 0),
      v: t,
      f: e.f || e.indexf || 0
    };
  }
  getLogicalRoutes() {
    const e = this.getLogicalIndices(), t = this.Reveal.getHorizontalSlides().length;
    return {
      left: e.h > 0,
      right: e.h < this.getGroupLength(e.v) - 1,
      up: e.v > 0,
      down: e.v < t - 1
    };
  }
  update() {
    const e = this.getLogicalRoutes(), t = this.Reveal.availableFragments(), i = this.getLogicalIndices(), s = this.getGroupLength(i.v), a = this.Reveal.isOverview(), n = this.Reveal.getConfig();
    if ([
      [this.controlsLeft, e.left, t.prev, "previous slide in this group"],
      [this.controlsRight, e.right, t.next, "next slide in this group"],
      [this.controlsUp, e.up, !1, "previous group"],
      [this.controlsDown, e.down, !1, "next group"],
      [this.controlsPrev, e.left || e.up, t.prev, "previous item"],
      [this.controlsNext, e.right || e.down, t.next, "next item"]
    ].forEach(([c, u, p, y]) => {
      c.forEach((g) => {
        const b = !!(u || p);
        g.classList.remove("enabled", "fragmented", "highlight"), g.setAttribute("aria-label", y), p && g.classList.add("fragmented"), b ? (g.classList.add("enabled"), g.removeAttribute("disabled")) : g.setAttribute("disabled", "disabled");
      });
    }), n.controlsTutorial && !a) {
      const c = this.Reveal.hasNavigatedVertically();
      !this.Reveal.hasNavigatedHorizontally() && e.down ? this.controlsDownArrow.classList.add("highlight") : (this.controlsDownArrow.classList.remove("highlight"), !c && e.right && i.h === 0 && s > 1 ? this.controlsRightArrow.classList.add("highlight") : this.controlsRightArrow.classList.remove("highlight"));
    } else
      this.controlsLeftArrow.classList.remove("highlight"), this.controlsRightArrow.classList.remove("highlight"), this.controlsDownArrow.classList.remove("highlight");
  }
  destroy() {
    this.unbind(), this.element.remove();
  }
  onNavigateLeftClicked(e) {
    e.preventDefault(), this.Reveal.onUserInput(), this.Reveal.up();
  }
  onNavigateRightClicked(e) {
    e.preventDefault(), this.Reveal.onUserInput(), this.Reveal.down();
  }
  onNavigateUpClicked(e) {
    e.preventDefault(), this.Reveal.onUserInput(), this.Reveal.left();
  }
  onNavigateDownClicked(e) {
    e.preventDefault(), this.Reveal.onUserInput(), this.Reveal.right();
  }
  onNavigatePrevClicked(e) {
    e.preventDefault(), this.Reveal.onUserInput(), this.Reveal.prev();
  }
  onNavigateNextClicked(e) {
    e.preventDefault(), this.Reveal.onUserInput(), this.Reveal.next();
  }
  onEnterFullscreen(e) {
    const t = this.Reveal.getConfig(), i = this.Reveal.getViewportElement();
    Dt(t.embedded ? i : i.parentElement);
  }
}
class $i {
  constructor(e) {
    this.Reveal = e, this.onProgressClicked = this.onProgressClicked.bind(this);
  }
  render() {
    this.element = document.createElement("div"), this.element.className = "progress", this.Reveal.getRevealElement().appendChild(this.element), this.bar = document.createElement("span"), this.element.appendChild(this.bar);
  }
  /**
   * Called when the reveal.js config is updated.
   */
  configure(e, t) {
    this.element.style.display = e.progress ? "block" : "none";
  }
  bind() {
    this.Reveal.getConfig().progress && this.element && this.element.addEventListener("click", this.onProgressClicked, !1);
  }
  unbind() {
    this.Reveal.getConfig().progress && this.element && this.element.removeEventListener("click", this.onProgressClicked, !1);
  }
  /**
   * Updates the progress bar to reflect the current slide.
   */
  update() {
    if (this.Reveal.getConfig().progress && this.bar) {
      let e = this.Reveal.getProgress();
      this.Reveal.getTotalSlides() < 2 && (e = 0), this.bar.style.transform = "scaleX(" + e + ")";
    }
  }
  getMaxWidth() {
    return this.Reveal.getRevealElement().offsetWidth;
  }
  /**
   * Clicking on the progress bar results in a navigation to the
   * closest approximate horizontal slide using this equation:
   *
   * ( clickX / presentationWidth ) * numberOfSlides
   *
   * @param {object} event
   */
  onProgressClicked(e) {
    this.Reveal.onUserInput(e), e.preventDefault();
    let t = this.Reveal.getSlides(), i = t.length, s = Math.floor(e.clientX / this.getMaxWidth() * i);
    this.Reveal.getConfig().rtl && (s = i - s);
    let a = this.Reveal.getIndices(t[s]);
    this.Reveal.slide(a.h, a.v);
  }
  destroy() {
    this.element.remove();
  }
}
class Xi {
  constructor(e) {
    this.Reveal = e, this.lastMouseWheelStep = 0, this.cursorHidden = !1, this.cursorInactiveTimeout = 0, this.onDocumentCursorActive = this.onDocumentCursorActive.bind(this), this.onDocumentMouseScroll = this.onDocumentMouseScroll.bind(this);
  }
  /**
   * Called when the reveal.js config is updated.
   */
  configure(e, t) {
    e.mouseWheel ? document.addEventListener("wheel", this.onDocumentMouseScroll, !1) : document.removeEventListener("wheel", this.onDocumentMouseScroll, !1), e.hideInactiveCursor ? (document.addEventListener("mousemove", this.onDocumentCursorActive, !1), document.addEventListener("mousedown", this.onDocumentCursorActive, !1)) : (this.showCursor(), document.removeEventListener("mousemove", this.onDocumentCursorActive, !1), document.removeEventListener("mousedown", this.onDocumentCursorActive, !1));
  }
  /**
   * Shows the mouse pointer after it has been hidden with
   * #hideCursor.
   */
  showCursor() {
    this.cursorHidden && (this.cursorHidden = !1, this.Reveal.getRevealElement().style.cursor = "");
  }
  /**
   * Hides the mouse pointer when it's on top of the .reveal
   * container.
   */
  hideCursor() {
    this.cursorHidden === !1 && (this.cursorHidden = !0, this.Reveal.getRevealElement().style.cursor = "none");
  }
  destroy() {
    this.showCursor(), document.removeEventListener("wheel", this.onDocumentMouseScroll, !1), document.removeEventListener("mousemove", this.onDocumentCursorActive, !1), document.removeEventListener("mousedown", this.onDocumentCursorActive, !1);
  }
  /**
   * Called whenever there is mouse input at the document level
   * to determine if the cursor is active or not.
   *
   * @param {object} event
   */
  onDocumentCursorActive(e) {
    this.showCursor(), clearTimeout(this.cursorInactiveTimeout), this.cursorInactiveTimeout = setTimeout(this.hideCursor.bind(this), this.Reveal.getConfig().hideCursorTime);
  }
  /**
   * Handles mouse wheel scrolling, throttled to avoid skipping
   * multiple slides.
   *
   * @param {object} event
   */
  onDocumentMouseScroll(e) {
    if (Date.now() - this.lastMouseWheelStep > 1e3) {
      this.lastMouseWheelStep = Date.now();
      let t = e.detail || -e.wheelDelta;
      t > 0 ? this.Reveal.next() : t < 0 && this.Reveal.prev();
    }
  }
}
const Bt = (h, e) => {
  const t = document.createElement("script");
  t.type = "text/javascript", t.async = !1, t.defer = !1, t.src = h, typeof e == "function" && (t.onload = (s) => {
    s.type === "load" && (t.onload = t.onerror = null, e());
  }, t.onerror = (s) => {
    t.onload = t.onerror = null, e(new Error("Failed loading script: " + t.src + `
` + s));
  });
  const i = document.querySelector("head");
  i && i.insertBefore(t, i.lastChild);
};
class Yi {
  constructor(e) {
    this.Reveal = e, this.state = "idle", this.registeredPlugins = {}, this.asyncDependencies = [];
  }
  /**
   * Loads reveal.js dependencies, registers and
   * initializes plugins.
   *
   * Plugins are direct references to a reveal.js plugin
   * object that we register and initialize after any
   * synchronous dependencies have loaded.
   *
   * Dependencies are defined via the 'dependencies' config
   * option and will be loaded prior to starting reveal.js.
   * Some dependencies may have an 'async' flag, if so they
   * will load after reveal.js has been started up.
   */
  load(e, t) {
    return this.state = "loading", e.forEach(this.registerPlugin.bind(this)), new Promise((i) => {
      let s = [], a = 0;
      if (t.forEach((n) => {
        (!n.condition || n.condition()) && (n.async ? this.asyncDependencies.push(n) : s.push(n));
      }), s.length) {
        a = s.length;
        const n = (o) => {
          o && typeof o.callback == "function" && o.callback(), --a === 0 && this.initPlugins().then(i);
        };
        s.forEach((o) => {
          typeof o.id == "string" ? (this.registerPlugin(o), n(o)) : typeof o.src == "string" ? Bt(o.src, () => n(o)) : (console.warn("Unrecognized plugin format", o), n());
        });
      } else
        this.initPlugins().then(i);
    });
  }
  /**
   * Initializes our plugins and waits for them to be ready
   * before proceeding.
   */
  initPlugins() {
    return new Promise((e) => {
      let t = Object.values(this.registeredPlugins), i = t.length;
      if (i === 0)
        this.loadAsync().then(e);
      else {
        let s, a = () => {
          --i === 0 ? this.loadAsync().then(e) : s();
        }, n = 0;
        s = () => {
          let o = t[n++];
          if (typeof o.init == "function") {
            let c = o.init(this.Reveal);
            c && typeof c.then == "function" ? c.then(a) : a();
          } else
            a();
        }, s();
      }
    });
  }
  /**
   * Loads all async reveal.js dependencies.
   */
  loadAsync() {
    return this.state = "loaded", this.asyncDependencies.length && this.asyncDependencies.forEach((e) => {
      Bt(e.src, e.callback);
    }), Promise.resolve();
  }
  /**
   * Registers a new plugin with this reveal.js instance.
   *
   * reveal.js waits for all registered plugins to initialize
   * before considering itself ready, as long as the plugin
   * is registered before calling `Reveal.initialize()`.
   */
  registerPlugin(e) {
    arguments.length === 2 && typeof arguments[0] == "string" ? (e = arguments[1], e.id = arguments[0]) : typeof e == "function" && (e = e());
    let t = e.id;
    typeof t != "string" ? console.warn("Unrecognized plugin format; can't find plugin.id", e) : this.registeredPlugins[t] === void 0 ? (this.registeredPlugins[t] = e, this.state === "loaded" && typeof e.init == "function" && e.init(this.Reveal)) : console.warn('reveal.js: "' + t + '" plugin has already been registered');
  }
  /**
   * Checks if a specific plugin has been registered.
   *
   * @param {String} id Unique plugin identifier
   */
  hasPlugin(e) {
    return !!this.registeredPlugins[e];
  }
  /**
   * Returns the specific plugin instance, if a plugin
   * with the given ID has been registered.
   *
   * @param {String} id Unique plugin identifier
   */
  getPlugin(e) {
    return this.registeredPlugins[e];
  }
  getRegisteredPlugins() {
    return this.registeredPlugins;
  }
  destroy() {
    Object.values(this.registeredPlugins).forEach((e) => {
      typeof e.destroy == "function" && e.destroy();
    }), this.registeredPlugins = {}, this.asyncDependencies = [];
  }
}
class Gi {
  constructor(e) {
    this.Reveal = e, this.onSlidesClicked = this.onSlidesClicked.bind(this), this.iframeTriggerSelector = null, this.mediaTriggerSelector = "[data-preview-image], [data-preview-video]", this.stateProps = ["previewIframe", "previewImage", "previewVideo", "previewFit"], this.state = {};
  }
  update() {
    this.Reveal.getConfig().previewLinks ? this.iframeTriggerSelector = "a[href]:not([data-preview-link=false]), [data-preview-link]:not(a):not([data-preview-link=false])" : this.iframeTriggerSelector = "[data-preview-link]:not([data-preview-link=false])";
    const e = this.Reveal.getSlidesElement().querySelectorAll(this.iframeTriggerSelector).length > 0, t = this.Reveal.getSlidesElement().querySelectorAll(this.mediaTriggerSelector).length > 0;
    e || t ? this.Reveal.getSlidesElement().addEventListener("click", this.onSlidesClicked, !1) : this.Reveal.getSlidesElement().removeEventListener("click", this.onSlidesClicked, !1);
  }
  createOverlay(e) {
    this.dom = document.createElement("div"), this.dom.classList.add("r-overlay"), this.dom.classList.add(e), this.viewport = document.createElement("div"), this.viewport.classList.add("r-overlay-viewport"), this.dom.appendChild(this.viewport), this.Reveal.getRevealElement().appendChild(this.dom);
  }
  /**
   * Opens a lightbox that previews the target URL.
   *
   * @param {string} url - url for lightbox iframe src
   */
  previewIframe(e) {
    this.close(), this.state = { previewIframe: e }, this.createOverlay("r-overlay-preview"), this.dom.dataset.state = "loading", this.viewport.innerHTML = `<header class="r-overlay-header">
				<a class="r-overlay-header-button r-overlay-external" href="${e}" target="_blank"><span class="icon"></span></a>
				<button class="r-overlay-header-button r-overlay-close"><span class="icon"></span></button>
			</header>
			<div class="r-overlay-spinner"></div>
			<div class="r-overlay-content">
				<iframe src="${e}"></iframe>
				<small class="r-overlay-content-inner">
					<span class="r-overlay-error x-frame-error">Unable to load iframe. This is likely due to the site's policy (x-frame-options).</span>
				</small>
			</div>`, this.dom.querySelector("iframe").addEventListener("load", (t) => {
      this.dom.dataset.state = "loaded";
    }, !1), this.dom.querySelector(".r-overlay-close").addEventListener("click", (t) => {
      this.close(), t.preventDefault();
    }, !1), this.dom.querySelector(".r-overlay-external").addEventListener("click", (t) => {
      this.close();
    }, !1), this.Reveal.dispatchEvent({ type: "previewiframe", data: { url: e } });
  }
  /**
   * Opens a lightbox window that provides a larger view of the
   * given image/video.
   *
   * @param {string} url - url to the image/video to preview
   * @param {image|video} mediaType
   * @param {string} [fitMode] - the fit mode to use for the preview
   */
  previewMedia(e, t, i) {
    if (t !== "image" && t !== "video") {
      console.warn("Please specify a valid media type to preview (image|video)");
      return;
    }
    this.close(), i = i || "scale-down", this.createOverlay("r-overlay-preview"), this.dom.dataset.state = "loading", this.dom.dataset.previewFit = i, this.viewport.innerHTML = `<header class="r-overlay-header">
				<button class="r-overlay-header-button r-overlay-close">Esc <span class="icon"></span></button>
			</header>
			<div class="r-overlay-spinner"></div>
			<div class="r-overlay-content"></div>`;
    const s = this.dom.querySelector(".r-overlay-content");
    if (t === "image") {
      this.state = { previewImage: e, previewFit: i };
      const a = document.createElement("img", {});
      a.src = e, s.appendChild(a), a.addEventListener("load", () => {
        this.dom.dataset.state = "loaded";
      }, !1), a.addEventListener("error", () => {
        this.dom.dataset.state = "error", s.innerHTML = '<span class="r-overlay-error">Unable to load image.</span>';
      }, !1), this.dom.style.cursor = "zoom-out", this.dom.addEventListener("click", (n) => {
        this.close();
      }, !1), this.Reveal.dispatchEvent({ type: "previewimage", data: { url: e } });
    } else if (t === "video") {
      this.state = { previewVideo: e, previewFit: i };
      const a = document.createElement("video");
      a.autoplay = this.dom.dataset.previewAutoplay !== "false", a.controls = this.dom.dataset.previewControls !== "false", a.loop = this.dom.dataset.previewLoop === "true", a.muted = this.dom.dataset.previewMuted === "true", a.playsInline = !0, a.src = e, s.appendChild(a), a.addEventListener("loadeddata", () => {
        this.dom.dataset.state = "loaded";
      }, !1), a.addEventListener("error", () => {
        this.dom.dataset.state = "error", s.innerHTML = '<span class="r-overlay-error">Unable to load video.</span>';
      }, !1), this.Reveal.dispatchEvent({ type: "previewvideo", data: { url: e } });
    } else
      throw new Error("Please specify a valid media type to preview");
    this.dom.querySelector(".r-overlay-close").addEventListener("click", (a) => {
      this.close(), a.preventDefault();
    }, !1);
  }
  previewImage(e, t) {
    this.previewMedia(e, "image", t);
  }
  previewVideo(e, t) {
    this.previewMedia(e, "video", t);
  }
  /**
   * Open or close help overlay window.
   *
   * @param {Boolean} [override] Flag which overrides the
   * toggle logic and forcibly sets the desired state. True means
   * help is open, false means it's closed.
   */
  toggleHelp(e) {
    typeof e == "boolean" ? e ? this.showHelp() : this.close() : this.dom ? this.close() : this.showHelp();
  }
  /**
   * Opens an overlay window with help material.
   */
  showHelp() {
    if (this.Reveal.getConfig().help) {
      this.close(), this.createOverlay("r-overlay-help");
      let e = '<p class="title">Keyboard Shortcuts</p>', t = this.Reveal.keyboard.getShortcuts(), i = this.Reveal.keyboard.getBindings();
      e += "<table><th>KEY</th><th>ACTION</th>";
      for (let s in t)
        e += `<tr><td>${s}</td><td>${t[s]}</td></tr>`;
      for (let s in i)
        i[s].key && i[s].description && (e += `<tr><td>${i[s].key}</td><td>${i[s].description}</td></tr>`);
      e += "</table>", this.viewport.innerHTML = `
				<header class="r-overlay-header">
					<button class="r-overlay-header-button r-overlay-close">Esc <span class="icon"></span></button>
				</header>
				<div class="r-overlay-content">
					<div class="r-overlay-help-content">${e}</div>
				</div>
			`, this.dom.querySelector(".r-overlay-close").addEventListener("click", (s) => {
        this.close(), s.preventDefault();
      }, !1), this.Reveal.dispatchEvent({ type: "showhelp" });
    }
  }
  isOpen() {
    return !!this.dom;
  }
  /**
   * Closes any currently open overlay.
   */
  close() {
    return this.dom ? (this.dom.remove(), this.dom = null, this.state = {}, this.Reveal.dispatchEvent({ type: "closeoverlay" }), !0) : !1;
  }
  getState() {
    return this.state;
  }
  setState(e) {
    this.stateProps.every((t) => this.state[t] === e[t]) || (e.previewIframe ? this.previewIframe(e.previewIframe) : e.previewImage ? this.previewImage(e.previewImage, e.previewFit) : e.previewVideo ? this.previewVideo(e.previewVideo, e.previewFit) : this.close());
  }
  onSlidesClicked(e) {
    const t = e.target, i = t.closest(this.iframeTriggerSelector), s = t.closest(this.mediaTriggerSelector);
    if (i) {
      if (e.metaKey || e.shiftKey || e.altKey)
        return;
      const a = i.getAttribute("data-preview-link");
      let o = typeof a == "string" && a.startsWith("http") ? a : i.getAttribute("href");
      o && (this.previewIframe(o), e.preventDefault());
    } else if (s) {
      if (s.hasAttribute("data-preview-image")) {
        let a = s.dataset.previewImage || s.getAttribute("src");
        a && (this.previewImage(a, s.dataset.previewFit), e.preventDefault());
      } else if (s.hasAttribute("data-preview-video")) {
        let a = s.dataset.previewVideo || s.getAttribute("src");
        if (!a) {
          let n = s.querySelector("source");
          n && (a = n.getAttribute("src"));
        }
        a && (this.previewVideo(a, s.dataset.previewFit), e.preventDefault());
      }
    }
  }
  destroy() {
    this.close();
  }
}
const Te = 40;
class Ji {
  constructor(e) {
    this.Reveal = e, this.touchStartX = 0, this.touchStartY = 0, this.touchStartCount = 0, this.touchCaptured = !1, this.onPointerDown = this.onPointerDown.bind(this), this.onPointerMove = this.onPointerMove.bind(this), this.onPointerUp = this.onPointerUp.bind(this), this.onTouchStart = this.onTouchStart.bind(this), this.onTouchMove = this.onTouchMove.bind(this), this.onTouchEnd = this.onTouchEnd.bind(this);
  }
  bind() {
    let e = this.Reveal.getRevealElement();
    "onpointerdown" in window ? (e.addEventListener("pointerdown", this.onPointerDown, !1), e.addEventListener("pointermove", this.onPointerMove, !1), e.addEventListener("pointerup", this.onPointerUp, !1)) : window.navigator.msPointerEnabled ? (e.addEventListener("MSPointerDown", this.onPointerDown, !1), e.addEventListener("MSPointerMove", this.onPointerMove, !1), e.addEventListener("MSPointerUp", this.onPointerUp, !1)) : (e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), e.addEventListener("touchend", this.onTouchEnd, !1));
  }
  unbind() {
    let e = this.Reveal.getRevealElement();
    e.removeEventListener("pointerdown", this.onPointerDown, !1), e.removeEventListener("pointermove", this.onPointerMove, !1), e.removeEventListener("pointerup", this.onPointerUp, !1), e.removeEventListener("MSPointerDown", this.onPointerDown, !1), e.removeEventListener("MSPointerMove", this.onPointerMove, !1), e.removeEventListener("MSPointerUp", this.onPointerUp, !1), e.removeEventListener("touchstart", this.onTouchStart, !1), e.removeEventListener("touchmove", this.onTouchMove, !1), e.removeEventListener("touchend", this.onTouchEnd, !1);
  }
  isSwipePrevented(e) {
    if (xe(e, "video[controls], audio[controls]")) return !0;
    for (; e && typeof e.hasAttribute == "function"; ) {
      if (e.hasAttribute("data-prevent-swipe")) return !0;
      e = e.parentNode;
    }
    return !1;
  }
  onTouchStart(e) {
    if (this.touchCaptured = !1, this.isSwipePrevented(e.target)) return !0;
    this.touchStartX = e.touches[0].clientX, this.touchStartY = e.touches[0].clientY, this.touchStartCount = e.touches.length;
  }
  onTouchMove(e) {
    if (this.isSwipePrevented(e.target)) return !0;
    let t = this.Reveal.getConfig();
    if (this.touchCaptured)
      Vt && e.preventDefault();
    else {
      this.Reveal.onUserInput(e);
      let i = e.touches[0].clientX, s = e.touches[0].clientY;
      if (e.touches.length === 1 && this.touchStartCount !== 2) {
        let a = this.Reveal.availableRoutes({ includeFragments: !0 }), n = i - this.touchStartX, o = s - this.touchStartY;
        n > Te && Math.abs(n) > Math.abs(o) ? (this.touchCaptured = !0, t.navigationMode === "linear" ? t.rtl ? this.Reveal.next() : this.Reveal.prev() : this.Reveal.up()) : n < -Te && Math.abs(n) > Math.abs(o) ? (this.touchCaptured = !0, t.navigationMode === "linear" ? t.rtl ? this.Reveal.prev() : this.Reveal.next() : this.Reveal.down()) : o > Te && a.up ? (this.touchCaptured = !0, t.navigationMode === "linear" ? this.Reveal.prev() : this.Reveal.left()) : o < -Te && a.down && (this.touchCaptured = !0, t.navigationMode === "linear" ? this.Reveal.next() : this.Reveal.right()), t.embedded ? (this.touchCaptured || this.Reveal.isVerticalSlide()) && e.preventDefault() : e.preventDefault();
      }
    }
  }
  onTouchEnd(e) {
    this.touchCaptured && !this.Reveal.slideContent.isAllowedToPlayAudio() && this.Reveal.startEmbeddedContent(this.Reveal.getCurrentSlide()), this.touchCaptured = !1;
  }
  onPointerDown(e) {
    (e.pointerType === e.MSPOINTER_TYPE_TOUCH || e.pointerType === "touch") && (e.touches = [{ clientX: e.clientX, clientY: e.clientY }], this.onTouchStart(e));
  }
  onPointerMove(e) {
    (e.pointerType === e.MSPOINTER_TYPE_TOUCH || e.pointerType === "touch") && (e.touches = [{ clientX: e.clientX, clientY: e.clientY }], this.onTouchMove(e));
  }
  onPointerUp(e) {
    (e.pointerType === e.MSPOINTER_TYPE_TOUCH || e.pointerType === "touch") && (e.touches = [{ clientX: e.clientX, clientY: e.clientY }], this.onTouchEnd(e));
  }
}
const $e = "focus", Ht = "blur";
class Qi {
  constructor(e) {
    this.Reveal = e, this.onRevealPointerDown = this.onRevealPointerDown.bind(this), this.onDocumentPointerDown = this.onDocumentPointerDown.bind(this);
  }
  /**
   * Called when the reveal.js config is updated.
   */
  configure(e, t) {
    e.embedded ? this.blur() : (this.focus(), this.unbind());
  }
  bind() {
    this.Reveal.getConfig().embedded && this.Reveal.getRevealElement().addEventListener("pointerdown", this.onRevealPointerDown, !1);
  }
  unbind() {
    this.Reveal.getRevealElement().removeEventListener("pointerdown", this.onRevealPointerDown, !1), document.removeEventListener("pointerdown", this.onDocumentPointerDown, !1);
  }
  focus() {
    this.state !== $e && (this.Reveal.getRevealElement().classList.add("focused"), document.addEventListener("pointerdown", this.onDocumentPointerDown, !1)), this.state = $e;
  }
  blur() {
    this.state !== Ht && (this.Reveal.getRevealElement().classList.remove("focused"), document.removeEventListener("pointerdown", this.onDocumentPointerDown, !1)), this.state = Ht;
  }
  isFocused() {
    return this.state === $e;
  }
  destroy() {
    this.Reveal.getRevealElement().classList.remove("focused");
  }
  onRevealPointerDown(e) {
    this.focus();
  }
  onDocumentPointerDown(e) {
    let t = F(e.target, ".reveal");
    (!t || t !== this.Reveal.getRevealElement()) && this.blur();
  }
}
class Zi {
  constructor(e) {
    this.Reveal = e;
  }
  render() {
    this.element = document.createElement("div"), this.element.className = "speaker-notes", this.element.setAttribute("data-prevent-swipe", ""), this.element.setAttribute("tabindex", "0"), this.Reveal.getRevealElement().appendChild(this.element);
  }
  /**
   * Called when the reveal.js config is updated.
   */
  configure(e, t) {
    e.showNotes && this.element.setAttribute("data-layout", typeof e.showNotes == "string" ? e.showNotes : "inline");
  }
  /**
   * Pick up notes from the current slide and display them
   * to the viewer.
   *
   * @see {@link config.showNotes}
   */
  update() {
    this.Reveal.getConfig().showNotes && this.element && this.Reveal.getCurrentSlide() && !this.Reveal.isScrollView() && !this.Reveal.isPrintView() && (this.element.innerHTML = this.getSlideNotes() || '<span class="notes-placeholder">No notes on this slide.</span>');
  }
  /**
   * Updates the visibility of the speaker notes sidebar that
   * is used to share annotated slides. The notes sidebar is
   * only visible if showNotes is true and there are notes on
   * one or more slides in the deck.
   */
  updateVisibility() {
    this.Reveal.getConfig().showNotes && this.hasNotes() && !this.Reveal.isScrollView() && !this.Reveal.isPrintView() ? this.Reveal.getRevealElement().classList.add("show-notes") : this.Reveal.getRevealElement().classList.remove("show-notes");
  }
  /**
   * Checks if there are speaker notes for ANY slide in the
   * presentation.
   */
  hasNotes() {
    return this.Reveal.getSlidesElement().querySelectorAll("[data-notes], aside.notes").length > 0;
  }
  /**
   * Checks if this presentation is running inside of the
   * speaker notes window.
   *
   * @return {boolean}
   */
  isSpeakerNotesWindow() {
    return !!window.location.search.match(/receiver/gi);
  }
  /**
   * Retrieves the speaker notes from a slide. Notes can be
   * defined in two ways:
   * 1. As a data-notes attribute on the slide <section>
   * 2. With <aside class="notes"> elements inside the slide
   *
   * @param {HTMLElement} [slide=currentSlide]
   * @return {(string|null)}
   */
  getSlideNotes(e = this.Reveal.getCurrentSlide()) {
    if (e.hasAttribute("data-notes"))
      return e.getAttribute("data-notes");
    let t = e.querySelectorAll("aside.notes");
    return t ? Array.from(t).map((i) => i.innerHTML).join(`
`) : null;
  }
  destroy() {
    this.element.remove();
  }
}
class es {
  /**
   * @param {HTMLElement} container The component will append
   * itself to this
   * @param {function} progressCheck A method which will be
   * called frequently to get the current playback progress on
   * a range of 0-1
   */
  constructor(e, t) {
    this.diameter = 100, this.diameter2 = this.diameter / 2, this.thickness = 6, this.playing = !1, this.progress = 0, this.progressOffset = 1, this.container = e, this.progressCheck = t, this.canvas = document.createElement("canvas"), this.canvas.className = "playback", this.canvas.width = this.diameter, this.canvas.height = this.diameter, this.canvas.style.width = this.diameter2 + "px", this.canvas.style.height = this.diameter2 + "px", this.context = this.canvas.getContext("2d"), this.container.appendChild(this.canvas), this.render();
  }
  setPlaying(e) {
    const t = this.playing;
    this.playing = e, !t && this.playing ? this.animate() : this.render();
  }
  animate() {
    const e = this.progress;
    this.progress = this.progressCheck(), e > 0.8 && this.progress < 0.2 && (this.progressOffset = this.progress), this.render(), this.playing && requestAnimationFrame(this.animate.bind(this));
  }
  /**
   * Renders the current progress and playback state.
   */
  render() {
    let e = this.playing ? this.progress : 0, t = this.diameter2 - this.thickness, i = this.diameter2, s = this.diameter2, a = 28;
    this.progressOffset += (1 - this.progressOffset) * 0.1;
    const n = -Math.PI / 2 + e * (Math.PI * 2), o = -Math.PI / 2 + this.progressOffset * (Math.PI * 2);
    this.context.save(), this.context.clearRect(0, 0, this.diameter, this.diameter), this.context.beginPath(), this.context.arc(i, s, t + 4, 0, Math.PI * 2, !1), this.context.fillStyle = "rgba( 0, 0, 0, 0.4 )", this.context.fill(), this.context.beginPath(), this.context.arc(i, s, t, 0, Math.PI * 2, !1), this.context.lineWidth = this.thickness, this.context.strokeStyle = "rgba( 255, 255, 255, 0.2 )", this.context.stroke(), this.playing && (this.context.beginPath(), this.context.arc(i, s, t, o, n, !1), this.context.lineWidth = this.thickness, this.context.strokeStyle = "#fff", this.context.stroke()), this.context.translate(i - a / 2, s - a / 2), this.playing ? (this.context.fillStyle = "#fff", this.context.fillRect(0, 0, a / 2 - 4, a), this.context.fillRect(a / 2 + 4, 0, a / 2 - 4, a)) : (this.context.beginPath(), this.context.translate(4, 0), this.context.moveTo(0, 0), this.context.lineTo(a - 4, a / 2), this.context.lineTo(0, a), this.context.fillStyle = "#fff", this.context.fill()), this.context.restore();
  }
  on(e, t) {
    this.canvas.addEventListener(e, t, !1);
  }
  off(e, t) {
    this.canvas.removeEventListener(e, t, !1);
  }
  destroy() {
    this.playing = !1, this.canvas.parentNode && this.container.removeChild(this.canvas);
  }
}
const ts = {
  width: 960,
  height: 700,
  margin: 0,
  minScale: 0.2,
  maxScale: 2,
  controls: !0,
  controlsTutorial: !0,
  controlsLayout: "bottom-right",
  controlsBackArrows: "faded",
  progress: !0,
  slideNumber: !1,
  showSlideNumber: "all",
  hashOneBasedIndex: !1,
  hash: !1,
  respondToHashChanges: !0,
  jumpToSlide: !0,
  history: !1,
  keyboard: !0,
  keyboardCondition: null,
  disableLayout: !1,
  overview: !0,
  center: !0,
  touch: !0,
  loop: !1,
  rtl: !1,
  navigationMode: "default",
  shuffle: !1,
  fragments: !0,
  fragmentInURL: !0,
  embedded: !1,
  help: !0,
  pause: !0,
  showNotes: !1,
  showHiddenSlides: !1,
  autoPlayMedia: null,
  preloadIframes: null,
  mouseWheel: !1,
  previewLinks: !1,
  viewDistance: 3,
  mobileViewDistance: 2,
  display: "block",
  hideInactiveCursor: !0,
  hideCursorTime: 5e3,
  sortFragmentsOnSync: !0,
  autoAnimate: !0,
  autoAnimateMatcher: null,
  autoAnimateEasing: "ease",
  autoAnimateDuration: 1,
  autoAnimateUnmatched: !0,
  autoAnimateStyles: [
    "opacity",
    "color",
    "background-color",
    "padding",
    "font-size",
    "line-height",
    "letter-spacing",
    "border-width",
    "border-color",
    "border-radius",
    "outline",
    "outline-offset"
  ],
  autoSlide: 0,
  autoSlideStoppable: !0,
  autoSlideMethod: null,
  defaultTiming: null,
  postMessage: !0,
  postMessageEvents: !1,
  focusBodyOnPageVisibilityChange: !0,
  transition: "slide",
  transitionSpeed: "default",
  backgroundTransition: "fade",
  parallaxBackgroundImage: "",
  parallaxBackgroundSize: "",
  parallaxBackgroundRepeat: "",
  parallaxBackgroundPosition: "",
  parallaxBackgroundHorizontal: null,
  parallaxBackgroundVertical: null,
  view: null,
  scrollLayout: "full",
  scrollSnap: "mandatory",
  scrollProgress: "auto",
  scrollActivationWidth: 435,
  pdfMaxPagesPerSlide: Number.POSITIVE_INFINITY,
  pdfSeparateFragments: !0,
  pdfPageHeightOffset: -1,
  dependencies: [],
  plugins: []
}, Ot = "6.0.0";
function qt(h, e) {
  arguments.length < 2 && (e = arguments[0], h = document.querySelector(".reveal"));
  const t = {};
  let i = {}, s = !1, a = !1, n, o, c, u, p = {
    hasNavigatedHorizontally: !1,
    hasNavigatedVertically: !1
  }, y = [], g = 1, b = { layout: "", overview: "" }, l = {}, A = "idle", M = 0, O, q = 0, re = -1, z = !1, R = new Ci(t), B = new Ii(t), U = new Mi(t), W = new Hi(t), L = new Bi(t), k = new Oi(t), V = new qi(t), C = new Ui(t), f = new Wi(t), S = new ji(t), T = new Ki(t), X = new _i(t), K = new $i(t), ie = new Xi(t), D = new Yi(t), H = new Gi(t), ne = new Qi(t), Ie = new Ji(t), _ = new Zi(t);
  function Wt(r) {
    if (!h) throw 'Unable to find presentation root (<div class="reveal">).';
    if (s) throw "Reveal.js has already been initialized.";
    if (s = !0, l.wrapper = h, l.slides = h.querySelector(".slides"), !l.slides) throw 'Unable to find slides container (<div class="slides">).';
    return i = Q(Q(Q(Q(Q({}, ts), i), e), r), Mt()), /print-pdf/gi.test(window.location.search) && (i.view = "print"), jt(), window.addEventListener("load", he, !1), D.load(i.plugins, i.dependencies).then(Kt), new Promise((d) => t.on("ready", d));
  }
  function jt() {
    i.embedded === !0 ? l.viewport = F(h, ".reveal-viewport") || h : (l.viewport = document.body, document.documentElement.classList.add("reveal-full-page")), l.viewport.classList.add("reveal-viewport");
  }
  function Kt() {
    s !== !1 && (a = !0, Je(), $t(), Jt(), Yt(), Gt(), ni(), Ze(), L.update(!0), _t(), T.readURL(), setTimeout(() => {
      l.slides.classList.remove("no-transition"), l.wrapper.classList.add("ready"), j({
        type: "ready",
        data: {
          indexh: n,
          indexv: o,
          currentSlide: u
        }
      });
    }, 1));
  }
  function _t() {
    const r = i.view === "print", d = i.view === "scroll" || i.view === "reader";
    (r || d) && (r ? be() : Ie.unbind(), l.viewport.classList.add("loading-scroll-mode"), r ? document.readyState === "complete" ? V.activate() : window.addEventListener("load", () => V.activate()) : k.activate());
  }
  function Je() {
    i.showHiddenSlides || E(l.wrapper, 'section[data-visibility="hidden"]').forEach((r) => {
      const d = r.parentNode;
      d.childElementCount === 1 && /section/i.test(d.nodeName) ? d.remove() : r.remove();
    });
  }
  function $t() {
    l.slides.classList.add("no-transition"), le ? l.wrapper.classList.add("no-hover") : l.wrapper.classList.remove("no-hover"), L.render(), B.render(), U.render(), X.render(), K.render(), _.render(), l.pauseOverlay = wi(l.wrapper, "div", "pause-overlay", i.controls ? '<button class="resume-button">Resume presentation</button>' : null), l.statusElement = Xt(), l.wrapper.setAttribute("role", "application");
  }
  function Xt() {
    let r = l.wrapper.querySelector(".aria-status");
    return r || (r = document.createElement("div"), r.style.position = "absolute", r.style.height = "1px", r.style.width = "1px", r.style.overflow = "hidden", r.style.clip = "rect( 1px, 1px, 1px, 1px )", r.classList.add("aria-status"), r.setAttribute("aria-live", "polite"), r.setAttribute("aria-atomic", "true"), l.wrapper.appendChild(r)), r;
  }
  function Me(r) {
    l.statusElement.textContent = r;
  }
  function ye(r) {
    let d = "";
    if (r.nodeType === 3)
      d += r.textContent.trim();
    else if (r.nodeType === 1) {
      let v = r.getAttribute("aria-hidden"), m = window.getComputedStyle(r).display === "none";
      if (v !== "true" && !m) {
        if (r.tagName === "IMG" || r.tagName === "VIDEO") {
          let P = r.getAttribute("alt");
          P && (d += Qe(P));
        }
        Array.from(r.childNodes).forEach((P) => {
          d += ye(P);
        }), ["P", "DIV", "UL", "OL", "LI", "H1", "H2", "H3", "H4", "H5", "H6", "BLOCKQUOTE"].includes(r.tagName) && d.trim() !== "" && (d = Qe(d));
      }
    }
    return d = d.trim(), d === "" ? "" : d + " ";
  }
  function Qe(r) {
    const d = r.trim();
    return d === "" ? r : /[.!?]$/.test(d) ? d : d + ".";
  }
  function Yt() {
    setInterval(() => {
      (!k.isActive() && l.wrapper.scrollTop !== 0 || l.wrapper.scrollLeft !== 0) && (l.wrapper.scrollTop = 0, l.wrapper.scrollLeft = 0);
    }, 1e3);
  }
  function Gt() {
    document.addEventListener("fullscreenchange", Pe), document.addEventListener("webkitfullscreenchange", Pe);
  }
  function Jt() {
    i.postMessage && window.addEventListener("message", Rt, !1);
  }
  function Ze(r) {
    const d = Q({}, i);
    if (typeof r == "object" && ge(i, r), t.isReady() === !1) return;
    const v = l.wrapper.querySelectorAll(de).length;
    l.wrapper.classList.remove(d.transition), l.wrapper.classList.add(i.transition), l.wrapper.setAttribute("data-transition-speed", i.transitionSpeed), l.wrapper.setAttribute("data-background-transition", i.backgroundTransition), l.viewport.style.setProperty("--slide-width", typeof i.width == "string" ? i.width : i.width + "px"), l.viewport.style.setProperty("--slide-height", typeof i.height == "string" ? i.height : i.height + "px"), i.shuffle && De(), Ke(l.wrapper, "embedded", i.embedded), Ke(l.wrapper, "rtl", i.rtl), Ke(l.wrapper, "center", i.center), i.pause === !1 && ve(), W.reset(), O && (O.destroy(), O = null), v > 1 && i.autoSlide && i.autoSlideStoppable && (O = new es(l.wrapper, () => Math.min(Math.max((Date.now() - re) / M, 0), 1)), O.on("click", fi), z = !1), i.navigationMode !== "default" ? l.wrapper.setAttribute("data-navigation-mode", i.navigationMode) : l.wrapper.removeAttribute("data-navigation-mode"), _.configure(i, d), ne.configure(i, d), ie.configure(i, d), X.configure(i, d), K.configure(i, d), S.configure(i, d), C.configure(i, d), B.configure(i, d), ut();
  }
  function et() {
    window.addEventListener("resize", Pt, !1), i.touch && Ie.bind(), i.keyboard && S.bind(), i.progress && K.bind(), i.respondToHashChanges && T.bind(), X.bind(), ne.bind(), l.slides.addEventListener("click", Ct, !1), l.slides.addEventListener("transitionend", kt, !1), l.pauseOverlay.addEventListener("click", ve, !1), i.focusBodyOnPageVisibilityChange && document.addEventListener("visibilitychange", Lt, !1);
  }
  function be() {
    Ie.unbind(), ne.unbind(), S.unbind(), X.unbind(), K.unbind(), T.unbind(), window.removeEventListener("resize", Pt, !1), l.slides.removeEventListener("click", Ct, !1), l.slides.removeEventListener("transitionend", kt, !1), l.pauseOverlay.removeEventListener("click", ve, !1);
  }
  function Qt() {
    s = !1, a !== !1 && (be(), Se(), _.destroy(), ne.destroy(), H.destroy(), D.destroy(), ie.destroy(), X.destroy(), K.destroy(), L.destroy(), B.destroy(), U.destroy(), document.removeEventListener("fullscreenchange", Pe), document.removeEventListener("webkitfullscreenchange", Pe), document.removeEventListener("visibilitychange", Lt, !1), window.removeEventListener("message", Rt, !1), window.removeEventListener("load", he, !1), l.pauseOverlay && l.pauseOverlay.remove(), l.statusElement && l.statusElement.remove(), document.documentElement.classList.remove("reveal-full-page"), l.wrapper.classList.remove("ready", "center", "has-horizontal-slides", "has-vertical-slides"), l.wrapper.removeAttribute("data-transition-speed"), l.wrapper.removeAttribute("data-background-transition"), l.viewport.classList.remove("reveal-viewport"), l.viewport.style.removeProperty("--slide-width"), l.viewport.style.removeProperty("--slide-height"), l.slides.style.removeProperty("width"), l.slides.style.removeProperty("height"), l.slides.style.removeProperty("zoom"), l.slides.style.removeProperty("left"), l.slides.style.removeProperty("top"), l.slides.style.removeProperty("bottom"), l.slides.style.removeProperty("right"), l.slides.style.removeProperty("transform"), Array.from(l.wrapper.querySelectorAll(de)).forEach((r) => {
      r.style.removeProperty("display"), r.style.removeProperty("top"), r.removeAttribute("hidden"), r.removeAttribute("aria-hidden");
    }));
  }
  function tt(r, d, v) {
    h.addEventListener(r, d, v);
  }
  function it(r, d, v) {
    h.removeEventListener(r, d, v);
  }
  function Ne(r) {
    typeof r.layout == "string" && (b.layout = r.layout), typeof r.overview == "string" && (b.overview = r.overview), b.layout ? ae(l.slides, b.layout + " " + b.overview) : ae(l.slides, b.overview);
  }
  function j({ target: r = l.wrapper, type: d, data: v, bubbles: m = !0 }) {
    let w = document.createEvent("HTMLEvents", 1, 2);
    return w.initEvent(d, m, !0), ge(w, v), r.dispatchEvent(w), r === l.wrapper && at(d), w;
  }
  function st(r) {
    j({
      type: "slidechanged",
      data: {
        indexh: n,
        indexv: o,
        previousSlide: c,
        currentSlide: u,
        origin: r
      }
    });
  }
  function at(r, d) {
    if (i.postMessageEvents && window.parent !== window.self) {
      let v = {
        namespace: "reveal",
        eventName: r,
        state: St()
      };
      ge(v, d), window.parent.postMessage(JSON.stringify(v), "*");
    }
  }
  function he() {
    if (l.wrapper && !V.isActive()) {
      const r = l.viewport.offsetWidth, d = l.viewport.offsetHeight;
      if (!i.disableLayout) {
        le && !i.embedded && document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
        const v = k.isActive() ? we(r, d) : we(), m = g;
        rt(i.width, i.height), l.slides.style.width = v.width + "px", l.slides.style.height = v.height + "px", g = Math.min(v.presentationWidth / v.width, v.presentationHeight / v.height), g = Math.max(g, i.minScale), g = Math.min(g, i.maxScale), g === 1 || k.isActive() ? (l.slides.style.zoom = "", l.slides.style.left = "", l.slides.style.top = "", l.slides.style.bottom = "", l.slides.style.right = "", Ne({ layout: "" })) : (l.slides.style.zoom = "", l.slides.style.left = "50%", l.slides.style.top = "50%", l.slides.style.bottom = "auto", l.slides.style.right = "auto", Ne({ layout: "translate(-50%, -50%) scale(" + g + ")" }));
        const w = Array.from(l.wrapper.querySelectorAll(de));
        for (let P = 0, x = w.length; P < x; P++) {
          const N = w[P];
          N.style.display !== "none" && (i.center || N.classList.contains("center") ? N.classList.contains("stack") ? N.style.top = 0 : N.style.top = Math.max((v.height - N.scrollHeight) / 2, 0) + "px" : N.style.top = "");
        }
        m !== g && j({
          type: "resize",
          data: {
            oldScale: m,
            scale: g,
            size: v
          }
        });
      }
      Zt(), l.viewport.style.setProperty("--slide-scale", g), l.viewport.style.setProperty("--viewport-width", r + "px"), l.viewport.style.setProperty("--viewport-height", d + "px"), k.layout(), K.update(), L.updateParallax(), f.isActive() && f.update();
    }
  }
  function rt(r, d) {
    E(l.slides, "section > .stretch, section > .r-stretch").forEach((v) => {
      let m = Ei(v, d);
      if (/(img|video)/gi.test(v.nodeName)) {
        const w = v.naturalWidth || v.videoWidth, P = v.naturalHeight || v.videoHeight, x = Math.min(r / w, m / P);
        v.style.width = w * x + "px", v.style.height = P * x + "px";
      } else
        v.style.width = r + "px", v.style.height = m + "px";
    });
  }
  function Zt() {
    if (l.wrapper && !i.disableLayout && !V.isActive() && typeof i.scrollActivationWidth == "number" && i.view !== "scroll") {
      const r = we();
      r.presentationWidth > 0 && r.presentationWidth <= i.scrollActivationWidth ? k.isActive() || (L.create(), k.activate()) : k.isActive() && k.deactivate();
    }
  }
  function we(r, d) {
    let v = i.width, m = i.height;
    i.disableLayout && (v = l.slides.offsetWidth, m = l.slides.offsetHeight);
    const w = {
      // Slide size
      width: v,
      height: m,
      // Presentation size
      presentationWidth: r || l.wrapper.offsetWidth,
      presentationHeight: d || l.wrapper.offsetHeight
    };
    return w.presentationWidth -= w.presentationWidth * i.margin, w.presentationHeight -= w.presentationHeight * i.margin, typeof w.width == "string" && /%$/.test(w.width) && (w.width = parseInt(w.width, 10) / 100 * w.presentationWidth), typeof w.height == "string" && /%$/.test(w.height) && (w.height = parseInt(w.height, 10) / 100 * w.presentationHeight), w;
  }
  function nt(r, d) {
    typeof r == "object" && typeof r.setAttribute == "function" && r.setAttribute("data-previous-indexv", d || 0);
  }
  function ot(r) {
    if (typeof r == "object" && typeof r.setAttribute == "function" && r.classList.contains("stack")) {
      const d = r.hasAttribute("data-start-indexv") ? "data-start-indexv" : "data-previous-indexv";
      return parseInt(r.getAttribute(d) || 0, 10);
    }
    return 0;
  }
  function pe(r = u) {
    return r && r.parentNode && !!r.parentNode.nodeName.match(/section/i);
  }
  function ei(r = u) {
    return r.classList.contains(".stack") || r.querySelector("section") !== null;
  }
  function lt() {
    return u && pe(u) ? !u.nextElementSibling : !1;
  }
  function dt() {
    return n === 0 && o === 0;
  }
  function Be() {
    return u ? !(u.nextElementSibling || pe(u) && u.parentNode.nextElementSibling) : !1;
  }
  function ct() {
    if (i.pause) {
      const r = l.wrapper.classList.contains("paused");
      Se(), l.wrapper.classList.add("paused"), r === !1 && j({ type: "paused" });
    }
  }
  function ve() {
    const r = l.wrapper.classList.contains("paused");
    l.wrapper.classList.remove("paused"), ue(), r && j({ type: "resumed" });
  }
  function ht(r) {
    typeof r == "boolean" ? r ? ct() : ve() : me() ? ve() : ct();
  }
  function me() {
    return l.wrapper.classList.contains("paused");
  }
  function ti(r) {
    typeof r == "boolean" ? r ? U.show() : U.hide() : U.isVisible() ? U.hide() : U.show();
  }
  function ii(r) {
    typeof r == "boolean" ? r ? Re() : Ae() : z ? Re() : Ae();
  }
  function si() {
    return !!(M && !z);
  }
  function Y(r, d, v, m) {
    if (j({
      type: "beforeslidechange",
      data: {
        indexh: r === void 0 ? n : r,
        indexv: d === void 0 ? o : d,
        origin: m
      }
    }).defaultPrevented) return;
    c = u;
    const P = l.wrapper.querySelectorAll(te);
    if (k.isActive()) {
      const J = k.getSlideByIndices(r, d);
      J && k.scrollToSlide(J);
      return;
    }
    if (P.length === 0) return;
    d === void 0 && !f.isActive() && (d = ot(P[r])), c && c.parentNode && c.parentNode.classList.contains("stack") && nt(c.parentNode, o);
    const x = y.concat();
    y.length = 0;
    let N = n || 0, oe = o || 0;
    n = Ee(te, r === void 0 ? n : r), o = Ee(_e, d === void 0 ? o : d);
    let G = n !== N || o !== oe;
    G || (c = null);
    let $ = P[n], I = $.querySelectorAll("section");
    h.classList.toggle("is-vertical-slide", I.length > 1), u = I[o] || $;
    let ee = !1;
    G && c && u && !f.isActive() && (A = "running", ee = He(c, u, N, oe), ee && l.slides.classList.add("disable-slide-transitions")), Fe(), he(), f.isActive() && f.update(), typeof v != "undefined" && C.goto(v), c && c !== u && (c.classList.remove("present"), c.setAttribute("aria-hidden", "true"), dt() && setTimeout(() => {
      li().forEach((J) => {
        nt(J, 0);
      });
    }, 0));
    e: for (let J = 0, gi = y.length; J < gi; J++) {
      for (let Le = 0; Le < x.length; Le++)
        if (x[Le] === y[J]) {
          x.splice(Le, 1);
          continue e;
        }
      l.viewport.classList.add(y[J]), j({ type: y[J] });
    }
    for (; x.length; )
      l.viewport.classList.remove(x.pop());
    G && (R.afterSlideChanged(), st(m)), (G || !c) && (R.stopEmbeddedContent(c), R.startEmbeddedContent(u)), requestAnimationFrame(() => {
      Me(ye(u));
    }), K.update(), X.update(), _.update(), L.update(), L.updateParallax(), B.update(), C.update(), T.writeURL(), ue(), ee && (setTimeout(() => {
      l.slides.classList.remove("disable-slide-transitions");
    }, 0), i.autoAnimate && W.run(c, u));
  }
  function He(r, d, v, m) {
    return r.hasAttribute("data-auto-animate") && d.hasAttribute("data-auto-animate") && r.getAttribute("data-auto-animate-id") === d.getAttribute("data-auto-animate-id") && !(n > v || o > m ? d : r).hasAttribute("data-auto-animate-restart");
  }
  function ai(r, d, v) {
    let m = n || 0;
    n = d, o = v;
    const w = u !== r;
    c = u, u = r, u && c && i.autoAnimate && He(c, u, m, o) && W.run(c, u), w && (R.afterSlideChanged(), c && (R.stopEmbeddedContent(c), R.stopEmbeddedContent(c.slideBackgroundElement)), R.startEmbeddedContent(u), R.startEmbeddedContent(u.slideBackgroundElement)), requestAnimationFrame(() => {
      Me(ye(u));
    }), st();
  }
  function ut() {
    be(), et(), he(), M = i.autoSlide, ue(), L.create(), T.writeURL(), i.sortFragmentsOnSync === !0 && C.sortAll(), typeof n != "undefined" && (n = Ee(te, n), o = Ee(_e, o)), X.update(), K.update(), Fe(), _.update(), _.updateVisibility(), H.update(), L.update(!0), B.update(), R.formatEmbeddedContent(), i.autoPlayMedia === !1 ? R.stopEmbeddedContent(u, { unloadIframes: !1 }) : R.startEmbeddedContent(u), f.isActive() && f.layout(), j({ type: "sync" });
  }
  function ri(r = u) {
    L.sync(r), C.sync(r), R.load(r), L.update(), _.update(), j({
      type: "slidesync",
      data: {
        slide: r
      }
    });
  }
  function ni() {
    se().forEach((r) => {
      E(r, "section").forEach((d, v) => {
        v > 0 && (d.classList.remove("present"), d.classList.remove("past"), d.classList.add("future"), d.setAttribute("aria-hidden", "true"));
      });
    });
  }
  function De(r = se()) {
    r.forEach((d, v) => {
      let m = r[Math.floor(Math.random() * r.length)];
      m.parentNode === d.parentNode && d.parentNode.insertBefore(d, m);
      let w = d.querySelectorAll("section");
      w.length && De(w);
    });
  }
  function Ee(r, d) {
    let v = E(l.wrapper, r), m = v.length, w = k.isActive() || V.isActive(), P = !1, x = !1;
    if (m) {
      i.loop && (d >= m && (P = !0), d %= m, d < 0 && (d = m + d, x = !0)), d = Math.max(Math.min(d, m - 1), 0);
      for (let $ = 0; $ < m; $++) {
        let I = v[$], ee = i.rtl && !pe(I);
        if (I.classList.remove("past"), I.classList.remove("present"), I.classList.remove("future"), I.setAttribute("hidden", ""), I.setAttribute("aria-hidden", "true"), I.querySelector("section") && I.classList.add("stack"), w) {
          I.classList.add("present");
          continue;
        }
        $ < d ? (I.classList.add(ee ? "future" : "past"), i.fragments && ft(I)) : $ > d ? (I.classList.add(ee ? "past" : "future"), i.fragments && gt(I)) : $ === d && i.fragments && (P ? gt(I) : x && ft(I));
      }
      let N = v[d], oe = N.classList.contains("present");
      N.classList.add("present"), N.removeAttribute("hidden"), N.removeAttribute("aria-hidden"), oe || j({
        target: N,
        type: "visible",
        bubbles: !1
      });
      let G = N.getAttribute("data-state");
      G && (y = y.concat(G.split(" ")));
    } else
      d = 0;
    return d;
  }
  function ft(r) {
    E(r, ".fragment").forEach((d) => {
      d.classList.add("visible"), d.classList.remove("current-fragment");
    });
  }
  function gt(r) {
    E(r, ".fragment.visible").forEach((d) => {
      d.classList.remove("visible", "current-fragment");
    });
  }
  function Fe() {
    let r = se(), d = r.length, v, m;
    if (d && typeof n != "undefined") {
      const w = f.isActive();
      let P = w ? 10 : i.viewDistance;
      le && (P = w ? 6 : i.mobileViewDistance), V.isActive() && (P = Number.MAX_VALUE);
      for (let x = 0; x < d; x++) {
        let N = r[x], oe = E(N, "section"), G = oe.length;
        if (v = Math.abs((n || 0) - x) || 0, i.loop && (v = Math.abs(((n || 0) - x) % (d - P)) || 0), console.log("[reveal media]", "Fe:group-decision", JSON.stringify({
          groupIndex: x,
          currentH: n || 0,
          currentV: o || 0,
          distance: v,
          threshold: P,
          action: v < P ? "load" : "unload",
          hasDataSrcVideo: !!N.querySelector("video[data-src], video source[data-src]"),
          hasSrcVideo: !!N.querySelector("video[src], video source[src]"),
          deckGroup: N.getAttribute("data-deck-group") || null
        })), v < P ? R.load(N) : R.unload(N), G) {
          let $ = w ? 0 : ot(N);
          for (let I = 0; I < G; I++) {
            let ee = oe[I];
            m = Math.abs(x === (n || 0) ? (o || 0) - I : I - $), console.log("[reveal media]", "Fe:slide-decision", JSON.stringify({
              groupIndex: x,
              slideIndex: I,
              currentH: n || 0,
              currentV: o || 0,
              groupDistance: v,
              slideDistance: m,
              totalDistance: v + m,
              threshold: P,
              action: v + m < P ? "load" : "unload",
              deckSlide: ee.getAttribute("data-deck-slide") || null,
              hasDataSrcVideo: !!ee.querySelector("video[data-src], video source[data-src]") || ee.matches("video[data-src]"),
              hasSrcVideo: !!ee.querySelector("video[src], video source[src]") || ee.matches("video[src]")
            })), v + m < P ? R.load(ee) : R.unload(ee);
          }
        }
      }
      bt() ? l.wrapper.classList.add("has-vertical-slides") : l.wrapper.classList.remove("has-vertical-slides"), yt() ? l.wrapper.classList.add("has-horizontal-slides") : l.wrapper.classList.remove("has-horizontal-slides");
    }
  }
  function Z({ includeFragments: r = !1 } = {}) {
    let d = l.wrapper.querySelectorAll(te), v = l.wrapper.querySelectorAll(_e), m = {
      left: n > 0,
      right: n < d.length - 1,
      up: o > 0,
      down: o < v.length - 1
    };
    if (i.loop && (d.length > 1 && (m.left = !0, m.right = !0), v.length > 1 && (m.up = !0, m.down = !0)), d.length > 1 && i.navigationMode === "linear" && (m.right = m.right || m.down, m.left = m.left || m.up), r === !0) {
      let w = C.availableRoutes();
      m.left = m.left || w.prev, m.up = m.up || w.prev, m.down = m.down || w.next, m.right = m.right || w.next;
    }
    if (i.rtl) {
      let w = m.left;
      m.left = m.right, m.right = w;
    }
    return m;
  }
  function pt(r = u) {
    let d = se(), v = 0;
    e: for (let m = 0; m < d.length; m++) {
      let w = d[m], P = w.querySelectorAll("section");
      for (let x = 0; x < P.length; x++) {
        if (P[x] === r)
          break e;
        P[x].dataset.visibility !== "uncounted" && v++;
      }
      if (w === r)
        break;
      w.classList.contains("stack") === !1 && w.dataset.visibility !== "uncounted" && v++;
    }
    return v;
  }
  function oi() {
    let r = wt(), d = pt();
    if (u) {
      let v = u.querySelectorAll(".fragment");
      if (v.length > 0) {
        let m = u.querySelectorAll(".fragment.visible");
        d += m.length / v.length * 0.9;
      }
    }
    return Math.min(d / (r - 1), 1);
  }
  function vt(r) {
    let d = n, v = o, m;
    if (r)
      if (k.isActive())
        d = parseInt(r.getAttribute("data-index-h"), 10), r.getAttribute("data-index-v") && (v = parseInt(r.getAttribute("data-index-v"), 10));
      else {
        let w = pe(r), P = w ? r.parentNode : r, x = se();
        d = Math.max(x.indexOf(P), 0), v = void 0, w && (v = Math.max(E(r.parentNode, "section").indexOf(r), 0));
      }
    if (!r && u && u.querySelectorAll(".fragment").length > 0) {
      let P = u.querySelector(".current-fragment");
      P && P.hasAttribute("data-fragment-index") ? m = parseInt(P.getAttribute("data-fragment-index"), 10) : m = u.querySelectorAll(".fragment.visible").length - 1;
    }
    return { h: d, v, f: m };
  }
  function Ve() {
    return E(l.wrapper, de + ':not(.stack):not([data-visibility="uncounted"])');
  }
  function se() {
    return E(l.wrapper, te);
  }
  function mt() {
    return E(l.wrapper, ".slides>section>section");
  }
  function li() {
    return E(l.wrapper, te + ".stack");
  }
  function yt() {
    return se().length > 1;
  }
  function bt() {
    return mt().length > 1;
  }
  function di() {
    return Ve().map((r) => {
      let d = {};
      for (let v = 0; v < r.attributes.length; v++) {
        let m = r.attributes[v];
        d[m.name] = m.value;
      }
      return d;
    });
  }
  function wt() {
    return Ve().length;
  }
  function Et(r, d) {
    let v = se()[r], m = v && v.querySelectorAll("section");
    return m && m.length && typeof d == "number" ? m ? m[d] : void 0 : v;
  }
  function ci(r, d) {
    let v = typeof r == "number" ? Et(r, d) : r;
    if (v)
      return v.slideBackgroundElement;
  }
  function St() {
    let r = vt();
    return Q({
      indexh: r.h,
      indexv: r.v,
      indexf: r.f,
      paused: me(),
      overview: f.isActive()
    }, H.getState());
  }
  function hi(r) {
    if (typeof r == "object") {
      Y(fe(r.indexh), fe(r.indexv), fe(r.indexf));
      let d = fe(r.paused), v = fe(r.overview);
      typeof d == "boolean" && d !== me() && ht(d), typeof v == "boolean" && v !== f.isActive() && f.toggle(v), H.setState(r);
    }
  }
  function ue() {
    if (Se(), u && i.autoSlide !== !1) {
      let r = u.querySelector(".current-fragment[data-autoslide]"), d = r ? r.getAttribute("data-autoslide") : null, v = u.parentNode ? u.parentNode.getAttribute("data-autoslide") : null, m = u.getAttribute("data-autoslide");
      d ? M = parseInt(d, 10) : m ? M = parseInt(m, 10) : v ? M = parseInt(v, 10) : (M = i.autoSlide, u.querySelectorAll(".fragment").length === 0 && E(u, "video, audio").forEach((w) => {
        w.hasAttribute("data-autoplay") && M && w.duration * 1e3 / w.playbackRate > M && (M = w.duration * 1e3 / w.playbackRate + 1e3);
      })), M && !z && !me() && !f.isActive() && (!Be() || C.availableRoutes().next || i.loop === !0) && (q = setTimeout(() => {
        typeof i.autoSlideMethod == "function" ? i.autoSlideMethod() : qe(), ue();
      }, M), re = Date.now()), O && O.setPlaying(q !== -1);
    }
  }
  function Se() {
    clearTimeout(q), q = -1;
  }
  function Ae() {
    M && !z && (z = !0, j({ type: "autoslidepaused" }), clearTimeout(q), O && O.setPlaying(!1));
  }
  function Re() {
    M && z && (z = !1, j({ type: "autoslideresumed" }), ue());
  }
  function ke({ skipFragments: r = !1 } = {}) {
    if (p.hasNavigatedHorizontally = !0, k.isActive()) return k.prev();
    i.rtl ? (f.isActive() || r || C.next() === !1) && Z().left && Y(n + 1, i.navigationMode === "grid" ? o : void 0) : (f.isActive() || r || C.prev() === !1) && Z().left && Y(n - 1, i.navigationMode === "grid" ? o : void 0);
  }
  function Ce({ skipFragments: r = !1 } = {}) {
    if (p.hasNavigatedHorizontally = !0, k.isActive()) return k.next();
    i.rtl ? (f.isActive() || r || C.prev() === !1) && Z().right && Y(n - 1, i.navigationMode === "grid" ? o : void 0) : (f.isActive() || r || C.next() === !1) && Z().right && Y(n + 1, i.navigationMode === "grid" ? o : void 0);
  }
  function ze({ skipFragments: r = !1 } = {}) {
    if (k.isActive()) return k.prev();
    (f.isActive() || r || C.prev() === !1) && Z().up && Y(n, o - 1);
  }
  function Oe({ skipFragments: r = !1 } = {}) {
    if (p.hasNavigatedVertically = !0, k.isActive()) return k.next();
    (f.isActive() || r || C.next() === !1) && Z().down && Y(n, o + 1);
  }
  function At({ skipFragments: r = !1 } = {}) {
    if (k.isActive()) return k.prev();
    if (r || C.prev() === !1)
      if (Z().up)
        ze({ skipFragments: r });
      else {
        let d;
        if (i.rtl ? d = E(l.wrapper, te + ".future").pop() : d = E(l.wrapper, te + ".past").pop(), d && d.classList.contains("stack")) {
          let v = d.querySelectorAll("section").length - 1 || void 0, m = n - 1;
          Y(m, v);
        } else i.rtl ? Ce({ skipFragments: r }) : ke({ skipFragments: r });
      }
  }
  function qe({ skipFragments: r = !1 } = {}) {
    if (p.hasNavigatedHorizontally = !0, p.hasNavigatedVertically = !0, k.isActive()) return k.next();
    if (r || C.next() === !1) {
      let d = Z();
      d.down && d.right && i.loop && lt() && (d.down = !1), d.down ? Oe({ skipFragments: r }) : i.rtl ? ke({ skipFragments: r }) : Ce({ skipFragments: r });
    }
  }
  function ui(r) {
    i.autoSlideStoppable && Ae();
  }
  function Rt(r) {
    let d = r.data;
    if (typeof d == "string" && d.charAt(0) === "{" && d.charAt(d.length - 1) === "}" && (d = JSON.parse(d), d.method && typeof t[d.method] == "function"))
      if (Li.test(d.method) === !1) {
        const v = t[d.method].apply(t, d.args);
        at("callback", { method: d.method, result: v });
      } else
        console.warn('reveal.js: "' + d.method + '" is is blacklisted from the postMessage API');
  }
  function kt(r) {
    A === "running" && /section/gi.test(r.target.nodeName) && (A = "idle", j({
      type: "slidetransitionend",
      data: { indexh: n, indexv: o, previousSlide: c, currentSlide: u }
    }));
  }
  function Ct(r) {
    const d = F(r.target, 'a[href^="#"]');
    if (d) {
      const v = d.getAttribute("href"), m = T.getIndicesFromHash(v);
      m && (t.slide(m.h, m.v, m.f), r.preventDefault());
    }
  }
  function Pt(r) {
    he();
  }
  function Lt(r) {
    document.hidden === !1 && document.activeElement !== document.body && (typeof document.activeElement.blur == "function" && document.activeElement.blur(), document.body.focus());
  }
  function Pe(r) {
    (document.fullscreenElement || document.webkitFullscreenElement) === l.wrapper && (r.stopImmediatePropagation(), setTimeout(() => {
      t.layout(), t.focus.focus();
    }, 1));
  }
  function fi(r) {
    Be() && i.loop === !1 ? (Y(0, 0), Re()) : z ? Re() : Ae();
  }
  const Tt = {
    VERSION: Ot,
    initialize: Wt,
    configure: Ze,
    destroy: Qt,
    sync: ut,
    syncSlide: ri,
    syncFragments: C.sync.bind(C),
    // Navigation methods
    slide: Y,
    left: ke,
    right: Ce,
    up: ze,
    down: Oe,
    prev: At,
    next: qe,
    // Navigation aliases
    navigateLeft: ke,
    navigateRight: Ce,
    navigateUp: ze,
    navigateDown: Oe,
    navigatePrev: At,
    navigateNext: qe,
    // Fragment methods
    navigateFragment: C.goto.bind(C),
    prevFragment: C.prev.bind(C),
    nextFragment: C.next.bind(C),
    // Event binding
    on: tt,
    off: it,
    // Legacy event binding methods left in for backwards compatibility
    addEventListener: tt,
    removeEventListener: it,
    // Forces an update in slide layout
    layout: he,
    // Randomizes the order of slides
    shuffle: De,
    // Returns an object with the available routes as booleans (left/right/top/bottom)
    availableRoutes: Z,
    // Returns an object with the available fragments as booleans (prev/next)
    availableFragments: C.availableRoutes.bind(C),
    // Toggles a help overlay with keyboard shortcuts
    toggleHelp: H.toggleHelp.bind(H),
    // Toggles the overview mode on/off
    toggleOverview: f.toggle.bind(f),
    // Toggles the scroll view on/off
    toggleScrollView: k.toggle.bind(k),
    // Toggles the "black screen" mode on/off
    togglePause: ht,
    // Toggles the auto slide mode on/off
    toggleAutoSlide: ii,
    // Toggles visibility of the jump-to-slide UI
    toggleJumpToSlide: ti,
    // Slide navigation checks
    isFirstSlide: dt,
    isLastSlide: Be,
    isLastVerticalSlide: lt,
    isVerticalSlide: pe,
    isVerticalStack: ei,
    // State checks
    isPaused: me,
    isAutoSliding: si,
    isSpeakerNotes: _.isSpeakerNotesWindow.bind(_),
    isOverview: f.isActive.bind(f),
    isFocused: ne.isFocused.bind(ne),
    isOverlayOpen: H.isOpen.bind(H),
    isScrollView: k.isActive.bind(k),
    isPrintView: V.isActive.bind(V),
    // Checks if reveal.js has been loaded and is ready for use
    isReady: () => a,
    // Slide preloading
    loadSlide: R.load.bind(R),
    unloadSlide: R.unload.bind(R),
    // Start/stop all media inside of the current slide
    startEmbeddedContent: () => R.startEmbeddedContent(u),
    stopEmbeddedContent: () => R.stopEmbeddedContent(u, { unloadIframes: !1 }),
    // Lightbox previews
    previewIframe: H.previewIframe.bind(H),
    previewImage: H.previewImage.bind(H),
    previewVideo: H.previewVideo.bind(H),
    showPreview: H.previewIframe.bind(H),
    // deprecated in favor of showIframeLightbox
    hidePreview: H.close.bind(H),
    // Adds or removes all internal event listeners
    addEventListeners: et,
    removeEventListeners: be,
    dispatchEvent: j,
    // Facility for persisting and restoring the presentation state
    getState: St,
    setState: hi,
    // Presentation progress on range of 0-1
    getProgress: oi,
    // Returns the indices of the current, or specified, slide
    getIndices: vt,
    // Returns an Array of key:value maps of the attributes of each
    // slide in the deck
    getSlidesAttributes: di,
    // Returns the number of slides that we have passed
    getSlidePastCount: pt,
    // Returns the total number of slides
    getTotalSlides: wt,
    // Returns the slide element at the specified index
    getSlide: Et,
    // Returns the previous slide element, may be null
    getPreviousSlide: () => c,
    // Returns the current slide element
    getCurrentSlide: () => u,
    // Returns the slide background element at the specified index
    getSlideBackground: ci,
    // Returns the speaker notes string for a slide, or null
    getSlideNotes: _.getSlideNotes.bind(_),
    // Returns an Array of all slides
    getSlides: Ve,
    // Returns an array with all horizontal/vertical slides in the deck
    getHorizontalSlides: se,
    getVerticalSlides: mt,
    // Checks if the presentation contains two or more horizontal
    // and vertical slides
    hasHorizontalSlides: yt,
    hasVerticalSlides: bt,
    // Checks if the deck has navigated on either axis at least once
    hasNavigatedHorizontally: () => p.hasNavigatedHorizontally,
    hasNavigatedVertically: () => p.hasNavigatedVertically,
    shouldAutoAnimateBetween: He,
    // Adds/removes a custom key binding
    addKeyBinding: S.addKeyBinding.bind(S),
    removeKeyBinding: S.removeKeyBinding.bind(S),
    // Programmatically triggers a keyboard event
    triggerKey: S.triggerKey.bind(S),
    // Registers a new shortcut to include in the help overlay
    registerKeyboardShortcut: S.registerKeyboardShortcut.bind(S),
    getComputedSlideSize: we,
    setCurrentScrollPage: ai,
    // Allows for manually removing slides prior to reveal.js initialization
    removeHiddenSlides: Je,
    // Returns the current scale of the presentation content
    getScale: () => g,
    // Returns the current configuration object
    getConfig: () => i,
    // Helper method, retrieves query string as a key:value map
    getQueryHash: Mt,
    // Returns the path to the current slide as represented in the URL
    getSlidePath: T.getHash.bind(T),
    // Returns reveal.js DOM elements
    getRevealElement: () => h,
    getSlidesElement: () => l.slides,
    getViewportElement: () => l.viewport,
    getBackgroundsElement: () => L.element,
    // API for registering and retrieving plugins
    registerPlugin: D.registerPlugin.bind(D),
    hasPlugin: D.hasPlugin.bind(D),
    getPlugin: D.getPlugin.bind(D),
    getPlugins: D.getRegisteredPlugins.bind(D)
  };
  return ge(t, We(Q({}, Tt), {
    // Methods for announcing content to screen readers
    announceStatus: Me,
    getStatusText: ye,
    // Controllers
    focus: ne,
    scroll: k,
    progress: K,
    controls: X,
    location: T,
    overview: f,
    keyboard: S,
    fragments: C,
    backgrounds: L,
    slideContent: R,
    slideNumber: B,
    onUserInput: ui,
    closeOverlay: H.close.bind(H),
    updateSlidesVisibility: Fe,
    layoutSlideContents: rt,
    transformSlides: Ne,
    cueAutoSlide: ue,
    cancelAutoSlide: Se
  })), Tt;
}
const ce = qt, Ut = [];
ce.initialize = (h) => {
  const e = document.querySelector(".reveal");
  if (!(e instanceof HTMLElement))
    throw new Error('Unable to find presentation root (<div class="reveal">).');
  return Object.assign(ce, new qt(e, h)), Ut.map((t) => t(ce)), ce.initialize();
};
["configure", "on", "off", "addEventListener", "removeEventListener", "registerPlugin"].forEach((h) => {
  ce[h] = (...e) => {
    Ut.push((t) => t[h].call(null, ...e));
  };
});
ce.isReady = () => !1;
ce.VERSION = Ot;
const Reveal = ce;

/*!
 * reveal.js Zoom plugin
 */
const Plugin = {

	id: 'zoom',

	init: function( reveal ) {

		reveal.getRevealElement().addEventListener( 'mousedown', function( event ) {
			var defaultModifier = /Linux/.test( window.navigator.platform ) ? 'ctrl' : 'alt';

			var modifier = ( reveal.getConfig().zoomKey ? reveal.getConfig().zoomKey : defaultModifier ) + 'Key';
			var zoomLevel = ( reveal.getConfig().zoomLevel ? reveal.getConfig().zoomLevel : 2 );

			if( event[ modifier ] && !reveal.isOverview() ) {
				event.preventDefault();

				zoom.to({
					x: event.clientX,
					y: event.clientY,
					scale: zoomLevel,
					pan: false
				});
			}
		} );

	},

	destroy: () => {

		zoom.reset();

	}

};

const RevealZoom = () => Plugin;
/*!
 * zoom.js 0.3 (modified for use with reveal.js)
 * http://lab.hakim.se/zoom-js
 * MIT licensed
 *
 * Copyright (C) 2011-2014 Hakim El Hattab, http://hakim.se
 */
var zoom = (function(){

	// The current zoom level (scale)
	var level = 1;

	// The current mouse position, used for panning
	var mouseX = 0,
		mouseY = 0;

	// Timeout before pan is activated
	var panEngageTimeout = -1,
		panUpdateInterval = -1;

	// Check for transform support so that we can fallback otherwise
	var supportsTransforms = 	'transform' in document.body.style;

	if( supportsTransforms ) {
		// The easing that will be applied when we zoom in/out
		document.body.style.transition = 'transform 0.8s ease';
	}

	// Zoom out if the user hits escape
	document.addEventListener( 'keyup', function( event ) {
		if( level !== 1 && event.keyCode === 27 ) {
			zoom.out();
		}
	} );

	// Monitor mouse movement for panning
	document.addEventListener( 'mousemove', function( event ) {
		if( level !== 1 ) {
			mouseX = event.clientX;
			mouseY = event.clientY;
		}
	} );

	/**
	 * Applies the CSS required to zoom in, prefers the use of CSS3
	 * transforms but falls back on zoom for IE.
	 *
	 * @param {Object} rect
	 * @param {Number} scale
	 */
	function magnify( rect, scale ) {

		var scrollOffset = getScrollOffset();

		// Ensure a width/height is set
		rect.width = rect.width || 1;
		rect.height = rect.height || 1;

		// Center the rect within the zoomed viewport
		rect.x -= ( window.innerWidth - ( rect.width * scale ) ) / 2;
		rect.y -= ( window.innerHeight - ( rect.height * scale ) ) / 2;

		if( supportsTransforms ) {
			// Reset
			if( scale === 1 ) {
				document.body.style.transform = '';
			}
			// Scale
			else {
				var origin = scrollOffset.x +'px '+ scrollOffset.y +'px',
					transform = 'translate('+ -rect.x +'px,'+ -rect.y +'px) scale('+ scale +')';

				document.body.style.transformOrigin = origin;
				document.body.style.transform = transform;
			}
		}
		else {
			// Reset
			if( scale === 1 ) {
				document.body.style.position = '';
				document.body.style.left = '';
				document.body.style.top = '';
				document.body.style.width = '';
				document.body.style.height = '';
				document.body.style.zoom = '';
			}
			// Scale
			else {
				document.body.style.position = 'relative';
				document.body.style.left = ( - ( scrollOffset.x + rect.x ) / scale ) + 'px';
				document.body.style.top = ( - ( scrollOffset.y + rect.y ) / scale ) + 'px';
				document.body.style.width = ( scale * 100 ) + '%';
				document.body.style.height = ( scale * 100 ) + '%';
				document.body.style.zoom = scale;
			}
		}

		level = scale;

		if( document.documentElement.classList ) {
			if( level !== 1 ) {
				document.documentElement.classList.add( 'zoomed' );
			}
			else {
				document.documentElement.classList.remove( 'zoomed' );
			}
		}
	}

	/**
	 * Pan the document when the mouse cursor approaches the edges
	 * of the window.
	 */
	function pan() {
		var range = 0.12,
			rangeX = window.innerWidth * range,
			rangeY = window.innerHeight * range,
			scrollOffset = getScrollOffset();

		// Up
		if( mouseY < rangeY ) {
			window.scroll( scrollOffset.x, scrollOffset.y - ( 1 - ( mouseY / rangeY ) ) * ( 14 / level ) );
		}
		// Down
		else if( mouseY > window.innerHeight - rangeY ) {
			window.scroll( scrollOffset.x, scrollOffset.y + ( 1 - ( window.innerHeight - mouseY ) / rangeY ) * ( 14 / level ) );
		}

		// Left
		if( mouseX < rangeX ) {
			window.scroll( scrollOffset.x - ( 1 - ( mouseX / rangeX ) ) * ( 14 / level ), scrollOffset.y );
		}
		// Right
		else if( mouseX > window.innerWidth - rangeX ) {
			window.scroll( scrollOffset.x + ( 1 - ( window.innerWidth - mouseX ) / rangeX ) * ( 14 / level ), scrollOffset.y );
		}
	}

	function getScrollOffset() {
		return {
			x: window.scrollX !== undefined ? window.scrollX : window.pageXOffset,
			y: window.scrollY !== undefined ? window.scrollY : window.pageYOffset
		}
	}

	return {
		/**
		 * Zooms in on either a rectangle or HTML element.
		 *
		 * @param {Object} options
		 *   - element: HTML element to zoom in on
		 *   OR
		 *   - x/y: coordinates in non-transformed space to zoom in on
		 *   - width/height: the portion of the screen to zoom in on
		 *   - scale: can be used instead of width/height to explicitly set scale
		 */
		to: function( options ) {

			// Due to an implementation limitation we can't zoom in
			// to another element without zooming out first
			if( level !== 1 ) {
				zoom.out();
			}
			else {
				options.x = options.x || 0;
				options.y = options.y || 0;

				// If an element is set, that takes precedence
				if( !!options.element ) {
					// Space around the zoomed in element to leave on screen
					var padding = 20;
					var bounds = options.element.getBoundingClientRect();

					options.x = bounds.left - padding;
					options.y = bounds.top - padding;
					options.width = bounds.width + ( padding * 2 );
					options.height = bounds.height + ( padding * 2 );
				}

				// If width/height values are set, calculate scale from those values
				if( options.width !== undefined && options.height !== undefined ) {
					options.scale = Math.max( Math.min( window.innerWidth / options.width, window.innerHeight / options.height ), 1 );
				}

				if( options.scale > 1 ) {
					options.x *= options.scale;
					options.y *= options.scale;

					magnify( options, options.scale );

					if( options.pan !== false ) {

						// Wait with engaging panning as it may conflict with the
						// zoom transition
						panEngageTimeout = setTimeout( function() {
							panUpdateInterval = setInterval( pan, 1000 / 60 );
						}, 800 );

					}
				}
			}
		},

		/**
		 * Resets the document zoom state to its default.
		 */
		out: function() {
			clearTimeout( panEngageTimeout );
			clearInterval( panUpdateInterval );

			magnify( { x: 0, y: 0 }, 1 );

			level = 1;
		},

		// Alias
		magnify: function( options ) { this.to( options ) },
		reset: function() { this.out() },

		zoomLevel: function() {
			return level;
		}
	}

})();

			const deckRoot = document.querySelector('.deck_view');
			const slidesRoot = document.querySelector('.deck_slides');
			const getDeckGroups = () => Array.from(slidesRoot?.children || []).filter((element) => element.tagName === 'SECTION');
			const getDeckSlides = (groupElement) => Array.from(groupElement?.children || []).filter((element) => element.tagName === 'SECTION');
			const groupSizes = (() => {
				const sizes = getDeckGroups().map((groupElement) => getDeckSlides(groupElement).length).filter((size) => size > 0);
				return sizes.length ? sizes : [1];
			})();
			const logicalGroupProgress = new Map([[0, 0]]);
			const mobileHashState = {
				applying: false,
				lastSerialized: null,
			};
			const controlsRoot = () => document.querySelector('.deck_controls');
			const helperTip = document.querySelector('.deck_helper-tip');
			const helperIconColor = 'white';
			const isTouchDevice =
				navigator.maxTouchPoints > 0 ||
				'ontouchstart' in window ||
				window.matchMedia('(pointer: coarse)').matches;
			const deckMode = new URLSearchParams(window.location.search).get('mode');
			const isDualMode = deckMode === 'normal' || deckMode === 'overview';
			const isOverviewDeck = deckMode === 'overview';
			// Plain /directional on touch devices should follow the same code path
			// as the iframe-driven mobile view used by the dual shell.
			const isMobileDeck = deckMode === 'mobile' || (!isDualMode && isTouchDevice);
			function isUsingRevealScrollView() {
				return typeof Reveal?.isScrollView === 'function' && Reveal.isScrollView();
			}
			const revealCanvas = {
				width: 1600,
				height: 900,
				margin: 0,
			};
			const allowNonPauseKeyboardInput = (event) => {
				const keyCode = event.keyCode;
				return !(
					[58, 59, 66, 86, 190].includes(keyCode) ||
					(keyCode === 191 && !event.shiftKey)
				);
			};

			if ((isDualMode || isMobileDeck) && helperTip) {
				helperTip.classList.add('deck_helper-tip-hidden');
			}

			const downTipIcon = `
				<span class="deck_helper-tip-icon" aria-hidden="true">
					<svg class="deck_helper-tip-icon-svg" width="200" height="208" viewBox="0 0 200 208" fill="none" xmlns="http://www.w3.org/2000/svg">
						<mask id="path-1-outside-1_79_71" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="208" fill="black">
							<rect fill="white" width="200" height="208"/>
							<path d="M10 38C10 22.536 22.536 10 38 10H162C177.464 10 190 22.536 190 38V152C190 167.464 177.464 180 162 180H38C22.536 180 10 167.464 10 152V38Z"/>
						</mask>
						<path d="M0 38C0 17.0132 17.0132 0 38 0H162C182.987 0 200 17.0132 200 38H180C180 28.0589 171.941 20 162 20H38C28.0589 20 20 28.0589 20 38H0ZM200 170C200 190.987 182.987 208 162 208H38C17.0132 208 0 190.987 0 170L20 152C20 152 28.0589 152 38 152H162C171.941 152 180 152 180 152L200 170ZM38 208C17.0132 208 0 190.987 0 170V38C0 17.0132 17.0132 0 38 0V20C28.0589 20 20 28.0589 20 38V152C20 152 28.0589 152 38 152V208ZM162 0C182.987 0 200 17.0132 200 38V170C200 190.987 182.987 208 162 208V152C171.941 152 180 152 180 152V38C180 28.0589 171.941 20 162 20V0Z" fill="${helperIconColor}" fill-opacity="0.5" mask="url(#path-1-outside-1_79_71)"/>
						<path d="M100.389 129.774C100.017 130.497 98.9834 130.497 98.6111 129.774L74.7511 83.4579C74.4083 82.7924 74.8914 81.9999 75.6401 81.9999L123.36 81.9999C124.109 81.9999 124.592 82.7924 124.249 83.4579L100.389 129.774Z" fill="${helperIconColor}" fill-opacity="0.5"/>
					</svg>
				</span>`;
			const escTipIcon = `
				<span class="deck_helper-tip-icon" aria-hidden="true">
					<svg class="deck_helper-tip-icon-svg" width="200" height="208" viewBox="0 0 200 208" fill="none" xmlns="http://www.w3.org/2000/svg">
						<mask id="path-1-outside-1_79_71" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="208" fill="black">
							<rect fill="white" width="200" height="208"/>
							<path d="M10 38C10 22.536 22.536 10 38 10H162C177.464 10 190 22.536 190 38V152C190 167.464 177.464 180 162 180H38C22.536 180 10 167.464 10 152V38Z"/>
						</mask>
						<path d="M0 38C0 17.0132 17.0132 0 38 0H162C182.987 0 200 17.0132 200 38H180C180 28.0589 171.941 20 162 20H38C28.0589 20 20 28.0589 20 38H0ZM200 170C200 190.987 182.987 208 162 208H38C17.0132 208 0 190.987 0 170L20 152C20 152 28.0589 152 38 152H162C171.941 152 180 152 180 152L200 170ZM38 208C17.0132 208 0 190.987 0 170V38C0 17.0132 17.0132 0 38 0V20C28.0589 20 20 28.0589 20 38V152C20 152 28.0589 152 38 152V208ZM162 0C182.987 0 200 17.0132 200 38V170C200 190.987 182.987 208 162 208V152C171.941 152 180 152 180 152V38C180 28.0589 171.941 20 162 20V0Z" fill="${helperIconColor}" fill-opacity="0.5" mask="url(#path-1-outside-1_79_71)"/>
						<path d="M52.6194 121.938C47.6819 121.938 43.4319 120.938 39.8694 118.938C36.3277 116.917 33.5985 114.062 31.6819 110.375C29.7652 106.667 28.8069 102.281 28.8069 97.2187C28.8069 92.2812 29.7652 87.9479 31.6819 84.2188C33.5985 80.4896 36.2965 77.5833 39.7756 75.5C43.2756 73.4167 47.3798 72.375 52.0881 72.375C55.2548 72.375 58.2027 72.8854 60.9319 73.9062C63.6819 74.9062 66.0777 76.4167 68.1194 78.4375C70.1819 80.4583 71.786 83 72.9319 86.0625C74.0777 89.1042 74.6506 92.6667 74.6506 96.75V100.406H34.1194V92.1562H62.1194C62.1194 90.2396 61.7027 88.5417 60.8694 87.0625C60.036 85.5833 58.8798 84.4271 57.4006 83.5937C55.9423 82.7396 54.2444 82.3125 52.3069 82.3125C50.286 82.3125 48.4944 82.7812 46.9319 83.7187C45.3902 84.6354 44.1819 85.875 43.3069 87.4375C42.4319 88.9792 41.984 90.6979 41.9631 92.5937V100.437C41.9631 102.812 42.4006 104.865 43.2756 106.594C44.1715 108.323 45.4319 109.656 47.0569 110.594C48.6819 111.531 50.609 112 52.8381 112C54.3173 112 55.6715 111.792 56.9006 111.375C58.1298 110.958 59.1819 110.333 60.0569 109.5C60.9319 108.667 61.5985 107.646 62.0569 106.438L74.3694 107.25C73.7444 110.208 72.4631 112.792 70.5256 115C68.609 117.187 66.1298 118.896 63.0881 120.125C60.0673 121.333 56.5777 121.938 52.6194 121.938ZM121.516 86.6875L109.328 87.4375C109.12 86.3958 108.672 85.4583 107.984 84.625C107.297 83.7708 106.391 83.0937 105.266 82.5937C104.161 82.0729 102.839 81.8125 101.297 81.8125C99.2344 81.8125 97.4948 82.25 96.0781 83.125C94.6615 83.9792 93.9531 85.125 93.9531 86.5625C93.9531 87.7083 94.4115 88.6771 95.3281 89.4688C96.2448 90.2604 97.8177 90.8958 100.047 91.375L108.734 93.125C113.401 94.0833 116.88 95.625 119.172 97.75C121.464 99.875 122.609 102.667 122.609 106.125C122.609 109.271 121.682 112.031 119.828 114.406C117.995 116.781 115.474 118.635 112.266 119.969C109.078 121.281 105.401 121.938 101.234 121.938C94.8802 121.938 89.8177 120.615 86.0469 117.969C82.2969 115.302 80.099 111.677 79.4531 107.094L92.5469 106.406C92.9427 108.344 93.901 109.823 95.4219 110.844C96.9427 111.844 98.8906 112.344 101.266 112.344C103.599 112.344 105.474 111.896 106.891 111C108.328 110.083 109.057 108.906 109.078 107.469C109.057 106.26 108.547 105.271 107.547 104.5C106.547 103.708 105.005 103.104 102.922 102.687L94.6094 101.031C89.9219 100.094 86.4323 98.4687 84.1406 96.1562C81.8698 93.8437 80.7344 90.8958 80.7344 87.3125C80.7344 84.2292 81.5677 81.5729 83.2344 79.3437C84.9219 77.1146 87.2865 75.3958 90.3281 74.1875C93.3906 72.9792 96.974 72.375 101.078 72.375C107.141 72.375 111.911 73.6562 115.391 76.2187C118.891 78.7812 120.932 82.2708 121.516 86.6875ZM150.92 121.938C146.003 121.938 141.774 120.896 138.232 118.812C134.711 116.708 132.003 113.792 130.107 110.062C128.232 106.333 127.295 102.042 127.295 97.1875C127.295 92.2708 128.243 87.9583 130.138 84.25C132.055 80.5208 134.774 77.6146 138.295 75.5312C141.816 73.4271 146.003 72.375 150.857 72.375C155.045 72.375 158.711 73.1354 161.857 74.6562C165.003 76.1771 167.493 78.3125 169.326 81.0625C171.159 83.8125 172.17 87.0417 172.357 90.75H159.795C159.441 88.3542 158.503 86.4271 156.982 84.9687C155.482 83.4896 153.513 82.75 151.076 82.75C149.013 82.75 147.211 83.3125 145.67 84.4375C144.149 85.5417 142.961 87.1562 142.107 89.2812C141.253 91.4062 140.826 93.9792 140.826 97C140.826 100.062 141.243 102.667 142.076 104.812C142.93 106.958 144.128 108.594 145.67 109.719C147.211 110.844 149.013 111.406 151.076 111.406C152.597 111.406 153.961 111.094 155.17 110.469C156.399 109.844 157.409 108.937 158.201 107.75C159.013 106.542 159.545 105.094 159.795 103.406H172.357C172.149 107.073 171.149 110.302 169.357 113.094C167.586 115.865 165.138 118.031 162.013 119.594C158.888 121.156 155.191 121.938 150.92 121.938Z" fill="${helperIconColor}" fill-opacity="0.5"/>
					</svg>
				</span>`;

			function toNumber(value, fallback = 0) {
				const parsed = Number(value);
				return Number.isFinite(parsed) ? parsed : fallback;
			}

			function clampIndex(value, min, max) {
				if (max < min) {
					return min;
				}

				return Math.min(max, Math.max(min, value));
			}

			function getGroupLength(groupIndex) {
				const safeGroupIndex = clampIndex(toNumber(groupIndex, 0), 0, groupSizes.length - 1);
				return groupSizes[safeGroupIndex] || 1;
			}

			function toLogicalIndices(indices = {}) {
				const physicalGroup = clampIndex(toNumber(indices.h, 0), 0, groupSizes.length - 1);
				const physicalItem = clampIndex(toNumber(indices.v, 0), 0, getGroupLength(physicalGroup) - 1);

				return {
					h: physicalItem,
					v: physicalGroup,
					f: toNumber(indices.f ?? indices.indexf, 0),
				};
			}

			function toPhysicalIndices(indices = {}) {
				const logicalGroup = clampIndex(toNumber(indices.v, 0), 0, groupSizes.length - 1);
				const logicalItem = clampIndex(toNumber(indices.h, 0), 0, getGroupLength(logicalGroup) - 1);

				return {
					h: logicalGroup,
					v: logicalItem,
					f: toNumber(indices.f ?? indices.indexf, 0),
				};
			}

			function getLogicalIndices(slideElement) {
				return slideElement ? toLogicalIndices(Reveal.getIndices(slideElement)) : toLogicalIndices(Reveal.getIndices());
			}

			function getLogicalAvailableRoutes() {
				const indices = getLogicalIndices();
				return {
					left: indices.h > 0,
					right: indices.h < getGroupLength(indices.v) - 1,
					up: indices.v > 0,
					down: indices.v < groupSizes.length - 1,
				};
			}

			function isOverviewActive() {
				return Reveal.getRevealElement().classList.contains('overview');
			}

			function slideLogical(h, v, f = 0) {
				const current = getLogicalIndices();
				const nextLogical = {
					h: typeof h === 'number' ? h : current.h,
					v: typeof v === 'number' ? v : current.v,
					f: typeof f === 'number' ? f : current.f,
				};
				const nextPhysical = toPhysicalIndices(nextLogical);

				Reveal.slide(nextPhysical.h, nextPhysical.v, nextPhysical.f);
			}

			function parseMobileDeckHash(hash = window.location.hash) {
				const flatMatch = hash.match(/^#\/(\d+)$/);
				if (flatMatch) {
					let flatIndex = Math.max(0, Number(flatMatch[1] || 1) - 1);
					let groupIndex = 0;

					while (groupIndex < groupSizes.length) {
						const groupSize = groupSizes[groupIndex] || 1;
						if (flatIndex < groupSize) {
							return {
								h: flatIndex,
								v: groupIndex,
								f: 0,
							};
						}

						flatIndex -= groupSize;
						groupIndex += 1;
					}

					const lastGroupIndex = Math.max(0, groupSizes.length - 1);
					return {
						h: Math.max(0, (groupSizes[lastGroupIndex] || 1) - 1),
						v: lastGroupIndex,
						f: 0,
					};
				}

				const parsedIndices = Reveal.location?.getIndicesFromHash?.(hash);
				return parsedIndices ? toLogicalIndices(parsedIndices) : null;
			}

			function serializeMobileDeckHash(indices = getLogicalIndices()) {
				const safeIndices = {
					h: clampIndex(toNumber(indices.h, 0), 0, getGroupLength(indices.v) - 1),
					v: clampIndex(toNumber(indices.v, 0), 0, groupSizes.length - 1),
				};
				let flatIndex = safeIndices.h;

				for (let groupIndex = 0; groupIndex < safeIndices.v; groupIndex += 1) {
					flatIndex += groupSizes[groupIndex] || 0;
				}

				return `#/${flatIndex + 1}`;
			}

			function replaceMobileDeckHash(indices = getLogicalIndices()) {
				if (!isMobileDeck || mobileHashState.applying) {
					return;
				}

				const nextHash = serializeMobileDeckHash(indices);
				if (nextHash === mobileHashState.lastSerialized && window.location.hash === nextHash) {
					return;
				}

				mobileHashState.lastSerialized = nextHash;
				history.replaceState(null, '', `${window.location.pathname}${window.location.search}${nextHash}`);
			}

			function applyMobileDeckHash(hash = window.location.hash) {
				if (!isMobileDeck) {
					return;
				}

				const nextIndices = parseMobileDeckHash(hash);
				if (!nextIndices) {
					return;
				}

				mobileHashState.applying = true;
				slideLogical(nextIndices.h, nextIndices.v, nextIndices.f || 0);
				requestAnimationFrame(() => {
					mobileHashState.applying = false;
				});
			}

			function navigateLogical(direction) {
				const indices = getLogicalIndices();
				const overviewActive = isOverviewActive();

				if (!overviewActive) {
					logicalGroupProgress.set(indices.v, indices.h);
				}

				if (direction === 'left') {
					slideLogical(indices.h - 1, indices.v, indices.f);
				}
				else if (direction === 'right') {
					slideLogical(indices.h + 1, indices.v, indices.f);
				}
				else if (direction === 'up') {
					const targetGroup = indices.v - 1;
					const targetSlide = overviewActive
						? indices.h
						: logicalGroupProgress.has(targetGroup) ? logicalGroupProgress.get(targetGroup) : 0;
					slideLogical(targetSlide, targetGroup, indices.f);
				}
				else if (direction === 'down') {
					const targetGroup = indices.v + 1;
					const targetSlide = overviewActive
						? indices.h
						: logicalGroupProgress.has(targetGroup) ? logicalGroupProgress.get(targetGroup) : 0;
					slideLogical(targetSlide, targetGroup, indices.f);
				}
			}

			const mobileSwipeState = {
				startX: 0,
				startY: 0,
				active: false,
				navigated: false,
			};

			function handleMobileTouchStart(event) {
				if (!isMobileDeck || isUsingRevealScrollView() || !event.touches || event.touches.length !== 1) {
					return;
				}

				const touch = event.touches[0];
				mobileSwipeState.startX = touch.clientX;
				mobileSwipeState.startY = touch.clientY;
				mobileSwipeState.active = true;
				mobileSwipeState.navigated = false;
			}

			function handleMobileTouchMove(event) {
				if (!isMobileDeck || isUsingRevealScrollView() || !mobileSwipeState.active || mobileSwipeState.navigated || !event.touches || event.touches.length !== 1) {
					return;
				}

				const touch = event.touches[0];
				const deltaX = touch.clientX - mobileSwipeState.startX;
				const deltaY = touch.clientY - mobileSwipeState.startY;
				const absX = Math.abs(deltaX);
				const absY = Math.abs(deltaY);
				const swipeThreshold = 40;
				let direction = null;

				if (absX > swipeThreshold && absX > absY) {
					direction = deltaX < 0 ? 'right' : 'left';
				}
				else if (absY > swipeThreshold && absY > absX) {
					direction = deltaY < 0 ? 'down' : 'up';
				}

				if (!direction) {
					return;
				}

				const routes = getLogicalAvailableRoutes();
				if (!routes[direction]) {
					mobileSwipeState.navigated = true;
					event.preventDefault();
					return;
				}

				mobileSwipeState.navigated = true;
				navigateLogical(direction);
				event.preventDefault();
			}

			function handleMobileTouchEnd() {
				if (isUsingRevealScrollView()) {
					mobileSwipeState.active = false;
					mobileSwipeState.navigated = false;
					return;
				}
				mobileSwipeState.active = false;
				mobileSwipeState.navigated = false;
			}

			function getOverviewMetrics() {
				const margin = 140;
				const slideSize = Reveal.getComputedSlideSize();
				const horizontalMargin = margin * 2;
				const verticalGap = slideSize.height * 0.2;
				const width = slideSize.width + horizontalMargin;
				const height = slideSize.height + verticalGap;

				return {
					width: Reveal.getConfig().rtl ? -width : width,
					height,
				};
			}

			function toggleClass(element, className, enabled) {
				element?.classList.toggle(className, enabled);
			}

			function syncDirectionalRuntimeClasses() {
				const revealElement = Reveal.getRevealElement?.() || deckRoot;
				const slidesElement = Reveal.getSlidesElement?.() || slidesRoot;
				const backgroundsElement = Reveal.getBackgroundsElement?.() || revealElement?.querySelector('.backgrounds');
				const controlsElement = revealElement?.querySelector('.controls');
				const isOverview = revealElement?.classList.contains('overview');
				const isOverviewActivating = revealElement?.classList.contains('overview-activating');
				const stackGroups = Array.from(slidesElement?.children || []).filter((element) => element.tagName === 'SECTION');
				const backgrounds = Array.from(backgroundsElement?.querySelectorAll('.slide-background') || []);
				const controlDirections = ['left', 'right', 'up', 'down'];

				revealElement?.classList.add('deck_view');
				toggleClass(revealElement, 'deck_view-mask-hidden', isMobileDeck || isTouchDevice);
				toggleClass(revealElement, 'deck_view-overview-touch-lock', !isDualMode && !!isOverview);

				slidesElement?.classList.add('deck_slides');
				toggleClass(slidesElement, 'deck_slides-overview-transition', !!isOverview && !isOverviewActivating);

				backgroundsElement?.classList.add('deck_backgrounds');
				toggleClass(backgroundsElement, 'deck_backgrounds-overview-transition', !!isOverview && !isOverviewActivating);

				stackGroups.forEach((group) => {
					const isStack = group.classList.contains('stack');
					group.classList.add('deck_group');
					toggleClass(group, 'deck_group-stack', isStack);
					toggleClass(group, 'deck_group-stack-overview', isStack && !!isOverview);
				});

				Array.from(slidesElement?.querySelectorAll('.deck_slide') || []).forEach((slide) => {
					toggleClass(slide, 'deck_slide-overview-transition', !!isOverview);
				});

				backgrounds.forEach((background) => {
					background.classList.add('deck_background');
					toggleClass(background, 'deck_background-overview-transition', !!isOverview);
				});

				if (controlsElement) {
					controlsElement.classList.add('deck_controls');
				}

				controlDirections.forEach((direction) => {
					const control = controlsElement?.querySelector(`.navigate-${direction}`);
					control?.classList.add('deck_control', `deck_control-${direction}`);
				});
			}

			function getManagedSlideVideos() {
				const slidesElement = Reveal.getSlidesElement?.() || slidesRoot;
				return Array.from(
					slidesElement?.querySelectorAll('section video[autoplay], section video[data-autoplay]') || []
				).filter((video) => !video.closest('.slide-background'));
			}

			function isVideoOnActiveSlide(video) {
				if (!video || isOverviewActive()) {
					return false;
				}

				const slide = video.closest('.slides section');
				return !!slide && !slide.classList.contains('stack') && slide.classList.contains('present');
			}

			function isVideoInViewport(video) {
				if (!video) {
					return false;
				}

				const rect = video.getBoundingClientRect();
				const viewportWidth = window.visualViewport?.width || window.innerWidth || document.documentElement.clientWidth || 0;
				const viewportHeight = window.visualViewport?.height || window.innerHeight || document.documentElement.clientHeight || 0;

				if (rect.width <= 0 || rect.height <= 0 || viewportWidth <= 0 || viewportHeight <= 0) {
					return false;
				}

				const visibleWidth = Math.max(0, Math.min(rect.right, viewportWidth) - Math.max(rect.left, 0));
				const visibleHeight = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
				const visibleArea = visibleWidth * visibleHeight;
				const totalArea = rect.width * rect.height;

				return totalArea > 0 && visibleArea / totalArea >= 0.6;
			}

			function getVideoLogicalDistance(video) {
				const slide = video?.closest('.slides section');
				if (!slide) {
					return Number.POSITIVE_INFINITY;
				}

				const current = getLogicalIndices();
				const target = getLogicalIndices(slide);
				return Math.abs((target.v ?? 0) - (current.v ?? 0)) + Math.abs((target.h ?? 0) - (current.h ?? 0));
			}

			function ensureManagedVideoLoaded(video) {
				if (!video) {
					return;
				}

				if (video.dataset.directionalLoaded === 'true') {
					return;
				}

				const directSrc = video.getAttribute('data-src');
				if (directSrc && !video.getAttribute('src')) {
					video.setAttribute('src', directSrc);
					video.removeAttribute('data-src');
					video.dataset.directionalLoaded = 'true';
					console.log('[directional media]', 'ensureManagedVideoLoaded:video-src', JSON.stringify({
						slideId: video.closest('[data-deck-slide]')?.getAttribute('data-deck-slide') || null,
						src: directSrc,
					}));
					return;
				}

				let sources = 0;
				video.querySelectorAll('source[data-src]').forEach((source) => {
					source.setAttribute('src', source.getAttribute('data-src'));
					source.removeAttribute('data-src');
					sources += 1;
				});

				if (sources > 0) {
					video.dataset.directionalLoaded = 'true';
					console.log('[directional media]', 'ensureManagedVideoLoaded:source-src', JSON.stringify({
						slideId: video.closest('[data-deck-slide]')?.getAttribute('data-deck-slide') || null,
						sources,
					}));
					video.load();
				}
			}

			function syncManagedSlideVideos() {
				const shouldAllowPlayback = !document.hidden && !isOverviewActive();
				const preloadDistance = 3;

				getManagedSlideVideos().forEach((video) => {
					const logicalDistance = getVideoLogicalDistance(video);
					const shouldPreload = logicalDistance <= preloadDistance;
					if (shouldPreload) {
						ensureManagedVideoLoaded(video);
					}
					const shouldPlay = shouldAllowPlayback && isVideoOnActiveSlide(video) && isVideoInViewport(video);
					console.log('[directional media]', 'syncManagedSlideVideos', JSON.stringify({
						slideId: video.closest('[data-deck-slide]')?.getAttribute('data-deck-slide') || null,
						src: video.getAttribute('src'),
						dataSrc: video.getAttribute('data-src'),
						currentSrc: video.currentSrc || null,
						paused: video.paused,
						readyState: video.readyState,
						logicalDistance,
						shouldPreload,
						shouldAllowPlayback,
						shouldPlay,
						onActiveSlide: isVideoOnActiveSlide(video),
						inViewport: isVideoInViewport(video),
					}));

					if (shouldPlay) {
						if (video.paused) {
							const playPromise = video.play();
							if (playPromise && typeof playPromise.catch === 'function') {
								playPromise.catch(() => {});
							}
						}
						delete video.dataset.pausedByDirectionalDeck;
						return;
					}

					if (!video.paused) {
						video.dataset.pausedByDirectionalDeck = 'true';
						video.pause();
					}
				});
			}

			function syncTransposedOverview() {
				// Overview behavior now lives in the transposed Reveal fork.
			}

			function installTransposedOverviewHooks() {
				// Overview behavior now lives in the transposed Reveal fork.
			}

				function handleTransposedArrowKeys(event) {
					const keyCode = event.keyCode;

				if (![37, 38, 39, 40, 72, 74, 75, 76].includes(keyCode)) {
					return;
				}

				if (event.defaultPrevented || event.ctrlKey || event.metaKey) {
					return;
				}

				const activeElement = document.activeElement;
				const activeElementIsEditable = activeElement && (
					activeElement.isContentEditable === true ||
					/input|textarea/i.test(activeElement.tagName || '')
				);

					if (activeElementIsEditable) {
						return;
					}

					if (Reveal.isOverlayOpen()) {
						return;
					}

					const indices = getLogicalIndices();

				event.preventDefault();
				event.stopImmediatePropagation();

				if (keyCode === 37 || keyCode === 72) {
					if (event.shiftKey) {
						slideLogical(0, indices.v, indices.f);
					}
					else {
						navigateLogical('left');
					}
				}
				else if (keyCode === 39 || keyCode === 76) {
					if (event.shiftKey) {
						slideLogical(getGroupLength(indices.v) - 1, indices.v, indices.f);
					}
					else {
						navigateLogical('right');
					}
				}
				else if (keyCode === 38 || keyCode === 75) {
					if (event.shiftKey) {
						slideLogical(indices.h, 0, indices.f);
					}
					else {
						navigateLogical('up');
					}
				}
				else if (keyCode === 40 || keyCode === 74) {
					if (event.shiftKey) {
						slideLogical(indices.h, groupSizes.length - 1, indices.f);
					}
					else {
						navigateLogical('down');
					}
				}
			}

			function bumpControl(direction) {
				const control = controlsRoot()?.querySelector(`.deck_control-${direction}`);
				if (!control) {
					return;
				}

				control.classList.remove('deck_control-bump');
				void control.offsetWidth;
				control.classList.add('deck_control-bump');
			}

			function updateHelperTip() {
				if (!helperTip || isDualMode || isMobileDeck) {
					if (helperTip) {
						helperTip.classList.add('deck_helper-tip-hidden');
						helperTip.innerHTML = '';
					}
					return;
				}

				const indices = getLogicalIndices();
				const isOverviewMode = Reveal.getRevealElement().classList.contains('overview');
				const isTopLevelSlide = indices.h === 0;
				const isFirstSlide = indices.h === 0 && indices.v === 0;

				if (!isOverviewMode && isFirstSlide) {
					helperTip.classList.add('deck_helper-tip-hidden');
					helperTip.innerHTML = '';
					return;
				}

				helperTip.classList.remove('deck_helper-tip-hidden');
				helperTip.innerHTML = isOverviewMode
					? `Press ${escTipIcon} to exit overview mode.`
					: isTopLevelSlide
						? 'Press Right to see project design samples.'
						: `Press ${escTipIcon} to enter overview mode.`;
			}

			function getNavigationDirection(previousSlide, currentSlide) {
				if (!previousSlide || !currentSlide) {
					return null;
				}

				const previous = getLogicalIndices(previousSlide);
				const current = getLogicalIndices(currentSlide);

				if (current.h !== previous.h) {
					return current.h > previous.h ? 'right' : 'left';
				}

				if (current.v !== previous.v) {
					return current.v > previous.v ? 'down' : 'up';
				}

				return null;
			}

			function getIndicesFromSlideElement(slideElement) {
				if (!slideElement) {
					return null;
				}

				return getLogicalIndices(slideElement);
			}

			function notifyParent(type, data = {}) {
				if (!isDualMode || window.parent === window) {
					return;
				}

				window.parent.postMessage({
					source: 'directional-deck',
					mode: isOverviewDeck ? 'overview' : 'normal',
					type,
					...data,
				}, '*');
			}

			function isOverviewMode() {
				return Reveal.getRevealElement().classList.contains('overview');
			}

			function preventOverviewPinch(event) {
				if (!isDualMode && isOverviewMode()) {
					event.preventDefault();
				}
			}

			function preventOverviewMultitouch(event) {
				if (!isDualMode && isOverviewMode() && event.touches && event.touches.length > 1) {
					event.preventDefault();
				}
			}

			function forwardParentPinch(type, data = {}) {
				if (!isDualMode) {
					return;
				}

				notifyParent('pinch', {
					pinchType: type,
					...data,
				});
			}

			function forwardParentSwipe(data = {}) {
				if (!isDualMode) {
					return;
				}

				notifyParent('wheel-nav', data);
			}

			if (isDualMode) {
				document.addEventListener('keydown', (event) => {
					if (event.key === 'Escape') {
						event.preventDefault();
						event.stopImmediatePropagation();
						notifyParent('toggle-request');
					}
				}, true);

				document.addEventListener('wheel', (event) => {
					if (event.ctrlKey) {
						event.preventDefault();
						event.stopImmediatePropagation();
						forwardParentPinch('wheel', {
							deltaY: event.deltaY,
						});
					}
					else {
						event.preventDefault();
						event.stopImmediatePropagation();
						forwardParentSwipe({
							deltaX: event.deltaX,
							deltaY: event.deltaY,
						});
					}
				}, { passive: false, capture: true });

				document.addEventListener('gesturestart', (event) => {
					event.preventDefault();
					forwardParentPinch('gesturestart', {
						scale: event.scale || 1,
					});
				}, { passive: false, capture: true });

				document.addEventListener('gesturechange', (event) => {
					event.preventDefault();
					forwardParentPinch('gesturechange', {
						scale: event.scale || 1,
					});
				}, { passive: false, capture: true });

				document.addEventListener('gestureend', (event) => {
					event.preventDefault();
					forwardParentPinch('gestureend', {
						scale: event.scale || 1,
					});
				}, { passive: false, capture: true });

				if (isOverviewDeck) {
					document.addEventListener('click', (event) => {
						if (!Reveal.getRevealElement().classList.contains('overview')) {
							return;
						}

						const slideElement = event.target.closest('.slides section');
						if (!slideElement || slideElement.classList.contains('stack')) {
							return;
						}

						const indices = getIndicesFromSlideElement(slideElement);
						if (!indices) {
							return;
						}

						const rect = slideElement.getBoundingClientRect();
						const clickCenter = {
							x: rect.left + (rect.width / 2),
							y: rect.top + (rect.height / 2),
						};

						event.preventDefault();
						event.stopImmediatePropagation();
						notifyParent('open-normal', {
							indices,
							clickCenter,
						});
					}, true);
				}
			}

			document.addEventListener('keydown', handleTransposedArrowKeys, true);
			document.addEventListener('gesturestart', preventOverviewPinch, { passive: false });
			document.addEventListener('gesturechange', preventOverviewPinch, { passive: false });
			document.addEventListener('gestureend', preventOverviewPinch, { passive: false });
			document.addEventListener('touchstart', preventOverviewMultitouch, { passive: false });
			document.addEventListener('touchmove', preventOverviewMultitouch, { passive: false });

			const keyboardBindings = {
				37: () => {},
				38: () => {},
				39: () => {},
				40: () => {},
				70: () => {},
				72: () => {},
				74: () => {},
				75: () => {},
				76: () => {},
				78: () => {},
				80: () => {},
			};

			Reveal.initialize(isDualMode ? {
				...revealCanvas,
				hash: false,
				controls: !isTouchDevice,
				help: !isTouchDevice,
				keyboard: keyboardBindings,
				keyboardCondition: allowNonPauseKeyboardInput,
				progress: false,
				center: false,
				overview: isOverviewDeck,
				zoom: !isOverviewDeck,
				transition: 'fade',
				transitionSpeed: 'fast',
				plugins: isOverviewDeck ? [] : [RevealZoom],
			} : isMobileDeck ? {
				...revealCanvas,
				hash: false,
				controls: false,
				help: false,
				keyboard: false,
				progress: false,
				center: false,
				overview: false,
				touch: false,
				zoom: false,
				transition: 'fade',
				transitionSpeed: 'fast',
				plugins: [],
			} : {
				...revealCanvas,
				hash: true,
				controls: !isTouchDevice,
				help: !isTouchDevice,
				keyboard: keyboardBindings,
				keyboardCondition: allowNonPauseKeyboardInput,
				progress: true,
				center: false,
				overview: true,
				zoom: true,
				transition: 'fade',
				transitionSpeed: 'fast',
				plugins: [RevealZoom],
				});

			const transposedDeck = new Proxy(Reveal, {
				get(target, property) {
					if (property === 'left') {
						return () => navigateLogical('left');
					}

					if (property === 'right') {
						return () => navigateLogical('right');
					}

					if (property === 'up') {
						return () => navigateLogical('up');
					}

					if (property === 'down') {
						return () => navigateLogical('down');
					}

					if (property === 'slide') {
						return (h, v, f) => slideLogical(h, v, f);
					}

					if (property === 'getIndices') {
						return (slideElement) => getLogicalIndices(slideElement);
					}

					if (property === 'availableRoutes') {
						return () => getLogicalAvailableRoutes();
					}

					const value = target[property];
					return typeof value === 'function' ? value.bind(target) : value;
				},
			});

			window.revealDeck = transposedDeck;
			installTransposedOverviewHooks();
			syncDirectionalRuntimeClasses();

			if (isMobileDeck) {
				const revealElement = Reveal.getRevealElement();
				revealElement.addEventListener('touchstart', handleMobileTouchStart, { passive: true });
				revealElement.addEventListener('touchmove', handleMobileTouchMove, { passive: false });
				revealElement.addEventListener('touchend', handleMobileTouchEnd, { passive: true });
				revealElement.addEventListener('touchcancel', handleMobileTouchEnd, { passive: true });

				window.addEventListener('hashchange', () => {
					applyMobileDeckHash();
				});
			}

			if (isDualMode) {
				Reveal.on('ready', () => {
					if (isOverviewDeck) {
						requestAnimationFrame(() => {
							Reveal.toggleOverview();
							requestAnimationFrame(() => {
								notifyParent('ready', {
									indices: getLogicalIndices(),
								});
							});
						});
					} else {
						notifyParent('ready', {
							indices: getLogicalIndices(),
						});
					}
				});

				Reveal.on('slidechanged', (event) => {
					const logicalIndices = getLogicalIndices();
					notifyParent('slidechanged', {
						indexh: logicalIndices.h,
						indexv: logicalIndices.v,
						indexf: event.indexf || 0,
					});
				});

			} else if (isMobileDeck) {
				Reveal.on('ready', () => {
					const initialHash = parseMobileDeckHash();
					if (initialHash) {
						applyMobileDeckHash();
					}
					else {
						replaceMobileDeckHash(getLogicalIndices());
					}
				});

				Reveal.on('slidechanged', () => {
					replaceMobileDeckHash(getLogicalIndices());
				});

			}

			Reveal.on('ready', () => {
				syncDirectionalRuntimeClasses();
				updateHelperTip();
				syncTransposedOverview();
				requestAnimationFrame(() => {
					syncManagedSlideVideos();
				});
			});
			Reveal.on('overviewshown', () => {
				syncDirectionalRuntimeClasses();
				updateHelperTip();
				requestAnimationFrame(() => {
					syncTransposedOverview();
					syncManagedSlideVideos();
				});
			});
			Reveal.on('overviewhidden', () => {
				syncDirectionalRuntimeClasses();
				updateHelperTip();
				requestAnimationFrame(() => {
					syncManagedSlideVideos();
				});
			});
			Reveal.on('slidechanged', (event) => {
				syncDirectionalRuntimeClasses();
				const logicalIndices = getLogicalIndices();
				if (!isOverviewActive()) {
					logicalGroupProgress.set(logicalIndices.v, logicalIndices.h);
				}
				const direction = getNavigationDirection(event.previousSlide, event.currentSlide);
				if (direction) {
					bumpControl(direction);
				}

				updateHelperTip();
				syncTransposedOverview();
				requestAnimationFrame(() => {
					syncManagedSlideVideos();
				});
			});

			window.addEventListener('resize', () => {
				requestAnimationFrame(() => {
					syncDirectionalRuntimeClasses();
					syncTransposedOverview();
					syncManagedSlideVideos();
				});
			});
			window.visualViewport?.addEventListener('resize', () => {
				requestAnimationFrame(() => {
					syncDirectionalRuntimeClasses();
					syncManagedSlideVideos();
				});
			});
			window.addEventListener('scroll', syncManagedSlideVideos, { passive: true });
			window.visualViewport?.addEventListener('scroll', syncManagedSlideVideos, { passive: true });
			document.addEventListener('visibilitychange', syncManagedSlideVideos);

			updateHelperTip();
