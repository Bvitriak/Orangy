(function () {
  'use strict';

  (function () {
    var isInsideFormField = function (element) {
      return element && element.closest && element.closest('input, textarea');
    };
    document.addEventListener('contextmenu', function (event) { if (!isInsideFormField(event.target)) event.preventDefault(); });
    document.addEventListener('copy', function (event) { if (!isInsideFormField(event.target)) event.preventDefault(); });
    document.addEventListener('cut', function (event) { if (!isInsideFormField(event.target)) event.preventDefault(); });
    document.addEventListener('dragstart', function (event) { event.preventDefault(); });
  })();

  var hamburgerButton = document.getElementById('hamburger');
  var navigationOverlay = document.getElementById('navigationOverlay');
  var navigationCloseButton = document.getElementById('navigationClose');
  var bodyElement = document.body;

  function openMenu() {
    navigationOverlay.classList.add('is-open');
    navigationOverlay.setAttribute('aria-hidden', 'false');
    hamburgerButton.setAttribute('aria-expanded', 'true');
    bodyElement.classList.add('navigation-open');
  }
  function closeMenu() {
    navigationOverlay.classList.remove('is-open');
    navigationOverlay.setAttribute('aria-hidden', 'true');
    hamburgerButton.setAttribute('aria-expanded', 'false');
    bodyElement.classList.remove('navigation-open');
  }
  if (hamburgerButton && navigationOverlay) {
    hamburgerButton.addEventListener('click', openMenu);
  }
  if (navigationCloseButton) {
    navigationCloseButton.addEventListener('click', closeMenu);
  }
  navigationOverlay.querySelectorAll('[data-navigation-close]').forEach(function (element) {
    element.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && navigationOverlay.classList.contains('is-open')) {
      closeMenu();
    }
  });
  var desktopMediaQuery = window.matchMedia('(min-width: 1024px)');
  function handleMediaQueryChange(event) { if (event.matches) closeMenu(); }
  if (desktopMediaQuery.addEventListener) { desktopMediaQuery.addEventListener('change', handleMediaQueryChange); }
  else if (desktopMediaQuery.addListener) { desktopMediaQuery.addListener(handleMediaQueryChange); }

  (function () {
    var galleryTrack = document.querySelector('.gallery__track');
    if (!galleryTrack) return;
    var isDragging = false, startPointerX = 0, startScrollLeft = 0, hasMoved = false;

    galleryTrack.addEventListener('pointerdown', function (event) {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      isDragging = true;
      hasMoved = false;
      startPointerX = event.clientX;
      startScrollLeft = galleryTrack.scrollLeft;
      galleryTrack.classList.add('is-dragging');
      event.preventDefault();
    });
    window.addEventListener('pointermove', function (event) {
      if (!isDragging) return;
      var deltaX = event.clientX - startPointerX;
      if (Math.abs(deltaX) > 3) hasMoved = true;
      galleryTrack.scrollLeft = startScrollLeft - deltaX;
    });
    function endGalleryDrag() {
      if (!isDragging) return;
      isDragging = false;
      galleryTrack.classList.remove('is-dragging');
    }
    window.addEventListener('pointerup', endGalleryDrag);
    window.addEventListener('pointercancel', endGalleryDrag);
    galleryTrack.addEventListener('dragstart', function (event) { event.preventDefault(); });
    galleryTrack.addEventListener('click', function (event) {
      if (hasMoved) { event.preventDefault(); event.stopPropagation(); }
    }, true);
  })();

  (function () {
    var mapContainer = document.querySelector('.location__map');
    if (!mapContainer) return;
    var mapGuard = mapContainer.querySelector('.location__map-guard');
    if (!mapGuard) return;

    function activateMap() {
      mapContainer.classList.add('is-live');
      document.body.classList.add('map-live');
    }
    function releaseMap() {
      if (!mapContainer.classList.contains('is-live')) return;
      mapContainer.classList.remove('is-live');
      document.body.classList.remove('map-live');
    }
    mapGuard.addEventListener('click', activateMap);
    mapGuard.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activateMap(); }
    });
    document.addEventListener('pointermove', function (event) {
      if (!mapContainer.classList.contains('is-live')) return;
      var bounds = mapContainer.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) releaseMap();
    }, { passive: true });
  })();

  (function () {
    var scrollbarTrack = document.createElement('div');
    scrollbarTrack.className = 'scrollbar';
    var scrollbarThumb = document.createElement('div');
    scrollbarThumb.className = 'scrollbar__thumb';
    scrollbarTrack.appendChild(scrollbarThumb);
    document.body.appendChild(scrollbarTrack);

    var documentElement = document.documentElement;
    var minimumThumbHeight = 32;

    function measureScroll() {
      var viewportHeight = window.innerHeight;
      var documentHeight = documentElement.scrollHeight;
      var scrollPosition = window.scrollY || documentElement.scrollTop || 0;
      return {
        viewportHeight: viewportHeight,
        documentHeight: documentHeight,
        scrollPosition: scrollPosition,
        maximumScroll: documentHeight - viewportHeight
      };
    }
    function update() {
      var measurement = measureScroll();
      if (measurement.maximumScroll <= 1) { scrollbarTrack.classList.remove('is-active'); return; }
      scrollbarTrack.classList.add('is-active');
      var trackHeight = measurement.viewportHeight;
      var thumbHeight = Math.max(minimumThumbHeight, (measurement.viewportHeight / measurement.documentHeight) * trackHeight);
      var thumbOffset = (measurement.scrollPosition / measurement.maximumScroll) * (trackHeight - thumbHeight);
      scrollbarThumb.style.height = thumbHeight + 'px';
      scrollbarThumb.style.transform = 'translateY(' + thumbOffset + 'px)';
    }

    var isDraggingThumb = false, startPointerY = 0, startScrollTop = 0;
    scrollbarThumb.addEventListener('pointerdown', function (event) {
      isDraggingThumb = true;
      startPointerY = event.clientY;
      startScrollTop = window.scrollY || documentElement.scrollTop || 0;
      scrollbarTrack.classList.add('is-dragging');
      document.body.style.userSelect = 'none';
      documentElement.style.scrollBehavior = 'auto';
      if (scrollbarThumb.setPointerCapture) { try { scrollbarThumb.setPointerCapture(event.pointerId); } catch (error) {} }
      event.preventDefault();
    });
    window.addEventListener('pointermove', function (event) {
      if (!isDraggingThumb) return;
      var measurement = measureScroll();
      var trackHeight = measurement.viewportHeight;
      var thumbHeight = Math.max(minimumThumbHeight, (measurement.viewportHeight / measurement.documentHeight) * trackHeight);
      var scrollableDistance = trackHeight - thumbHeight;
      if (scrollableDistance <= 0) return;
      var targetScroll = startScrollTop + (event.clientY - startPointerY) * (measurement.maximumScroll / scrollableDistance);
      targetScroll = Math.max(0, Math.min(measurement.maximumScroll, targetScroll));
      window.scrollTo(0, targetScroll);
    });
    window.addEventListener('pointerup', function () {
      if (!isDraggingThumb) return;
      isDraggingThumb = false;
      scrollbarTrack.classList.remove('is-dragging');
      document.body.style.userSelect = '';
      documentElement.style.scrollBehavior = '';
    });

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    if ('ResizeObserver' in window) {
      try { new ResizeObserver(update).observe(document.body); } catch (error) {}
    }
    var lastKey = '';
    (function synchronize() {
      var measurement = measureScroll();
      var key = measurement.scrollPosition + '|' + measurement.documentHeight + '|' + measurement.viewportHeight;
      if (key !== lastKey) { lastKey = key; update(); }
      requestAnimationFrame(synchronize);
    })();
  })();

  if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
    var cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorDot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cursorDot);
    document.body.classList.add('has-custom-cursor');

    var targetX = window.innerWidth / 2, targetY = window.innerHeight / 2;
    var currentX = targetX, currentY = targetY;
    var hasSeenPointer = false;

    document.addEventListener('pointermove', function (event) {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      targetX = event.clientX;
      targetY = event.clientY;
      if (!hasSeenPointer) { currentX = targetX; currentY = targetY; hasSeenPointer = true; cursorDot.classList.add('is-visible'); }
    }, { passive: true });

    document.addEventListener('mouseleave', function () { cursorDot.classList.remove('is-visible'); });
    document.addEventListener('mouseenter', function () { cursorDot.classList.add('is-visible'); });

    var interactiveSelector = 'a, button, input, textarea, select, label, [role="button"]';
    document.addEventListener('pointerover', function (event) {
      if (event.target.closest && event.target.closest(interactiveSelector)) cursorDot.classList.add('is-active');
    });
    document.addEventListener('pointerout', function (event) {
      if (event.target.closest && event.target.closest(interactiveSelector)) cursorDot.classList.remove('is-active');
    });
    document.addEventListener('pointerdown', function () { cursorDot.classList.add('is-down'); });
    document.addEventListener('pointerup',   function () { cursorDot.classList.remove('is-down'); });

    (function renderCursor() {
      currentX += (targetX - currentX) * 0.35;
      currentY += (targetY - currentY) * 0.35;
      cursorDot.style.transform = 'translate3d(' + currentX + 'px,' + currentY + 'px,0) translate(-50%,-50%)';
      requestAnimationFrame(renderCursor);
    })();
  }

  (function () {
    var textareas = document.querySelectorAll('.contact-form textarea');
    if (!textareas.length) return;
    function growTextarea(textarea) {
      if (!textarea.value) { textarea.style.height = ''; return; }
      textarea.style.height = 'auto';
      var computedStyle = getComputedStyle(textarea);
      var verticalBorder = parseFloat(computedStyle.borderTopWidth) + parseFloat(computedStyle.borderBottomWidth);
      textarea.style.height = (textarea.scrollHeight + verticalBorder) + 'px';
    }
    Array.prototype.forEach.call(textareas, function (textarea) {
      textarea.addEventListener('input', function () { growTextarea(textarea); });
      growTextarea(textarea);
    });
    window.addEventListener('resize', function () {
      Array.prototype.forEach.call(textareas, growTextarea);
    });
    var contactForm = document.querySelector('.contact-form');
    if (contactForm) contactForm.addEventListener('reset', function () {
      setTimeout(function () { Array.prototype.forEach.call(textareas, growTextarea); }, 0);
    });
  })();

  var contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var submitButton = contactForm.querySelector('.button-submit');
      if (!submitButton) return;
      var originalText = submitButton.textContent;
      submitButton.textContent = 'Thank you!';
      submitButton.disabled = true;
      setTimeout(function () {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        contactForm.reset();
      }, 2200);
    });
  }
})();
