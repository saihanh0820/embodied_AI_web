const noop = () => {};

if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: noop,
    removeListener: noop,
    addEventListener: noop,
    removeEventListener: noop,
    dispatchEvent: () => false
  });
}

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (callback) => window.setTimeout(() => callback(Date.now()), 16);
}

if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = (handle) => window.clearTimeout(handle);
}

if (typeof window.CustomEvent !== "function") {
  const CustomEventCompat = function (event, params = {}) {
    const customEvent = document.createEvent("CustomEvent");
    customEvent.initCustomEvent(event, Boolean(params.bubbles), Boolean(params.cancelable), params.detail);
    return customEvent;
  };
  CustomEventCompat.prototype = window.Event.prototype;
  window.CustomEvent = CustomEventCompat;
}

if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function (selector) {
    let element = this;
    while (element && element.nodeType === 1) {
      if (element.matches(selector)) return element;
      element = element.parentElement;
    }
    return null;
  };
}

if (!window.IntersectionObserver) {
  window.IntersectionObserver = class IntersectionObserverCompat {
    constructor(callback) {
      this.callback = callback;
      this.targets = new Set();
    }

    observe(target) {
      this.targets.add(target);
      window.setTimeout(() => {
        if (this.targets.has(target)) {
          this.callback([{ target, isIntersecting: true, intersectionRatio: 1 }], this);
        }
      }, 0);
    }

    unobserve(target) {
      this.targets.delete(target);
    }

    disconnect() {
      this.targets.clear();
    }

    takeRecords() {
      return [];
    }
  };
}
