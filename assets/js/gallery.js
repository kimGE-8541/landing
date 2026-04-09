/**
 * Thumbs Gallery — 클릭 시 메인 이미지 교체 + 짧은 페이드인
 * 의존성 없음 (Vanilla JS)
 */
(function () {
  'use strict';

  var FADE_MS = 280;
  var SELECTOR_ROOT = '.gallery-module';

  /**
   * 단일 갤러리 루트에 이벤트 바인딩
   * @param {HTMLElement} root
   */
  function initGallery(root) {
    var mainImg = root.querySelector('.gallery-module__main-img');
    var mainTitle = root.querySelector('.gallery-module__title');
    var mainDesc = root.querySelector('.gallery-module__desc');
    var thumbs = root.querySelectorAll('.gallery-module__thumb');

    if (!mainImg || !thumbs.length) return;

    /**
     * 썸네일 활성 상태만 갱신
     * @param {HTMLElement} activeBtn
     */
    function setActiveThumb(activeBtn) {
      thumbs.forEach(function (btn) {
        var on = btn === activeBtn;
        btn.classList.toggle('is-active', on);
        btn.classList.toggle('active', on);
        if (btn.hasAttribute('aria-pressed')) {
          btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        }
      });
    }

    /**
     * 제목/설명 텍스트 변경 + 페이드 인
     * @param {string} title
     * @param {string} desc
     * @param {boolean} [silent] true면 페이드 없이 즉시 반영
     */
    function swapText(title, desc, silent) {
      if (!mainTitle || !mainDesc) return;

      var nextTitle = title || '';
      var nextDesc = desc || '';

      if (silent) {
        mainTitle.textContent = nextTitle;
        mainDesc.textContent = nextDesc;
        return;
      }

      mainTitle.classList.add('is-fading');
      mainDesc.classList.add('is-fading');

      window.setTimeout(function () {
        mainTitle.textContent = nextTitle;
        mainDesc.textContent = nextDesc;
        mainTitle.classList.remove('is-fading');
        mainDesc.classList.remove('is-fading');
      }, 140);
    }

    /**
     * 메인 이미지 src 변경 + 페이드 인
     * @param {string} src
     * @param {string} alt
     * @param {boolean} [silent] true면 페이드 없이 즉시 반영 (초기 동기화용)
     */
    function swapMain(src, alt, silent) {
      if (silent) {
        mainImg.src = src;
        if (alt !== undefined && alt !== null) {
          mainImg.alt = alt;
        }
        return;
      }

      mainImg.classList.add('is-fading');

      window.setTimeout(function () {
        mainImg.src = src;
        if (alt !== undefined && alt !== null) {
          mainImg.alt = alt;
        }
        // 새 이미지 로드 후 페이드 인 (이미 캐시된 경우도 동작)
        var done = function () {
          mainImg.removeEventListener('load', done);
          mainImg.removeEventListener('error', done);
          mainImg.classList.remove('is-fading');
        };
        mainImg.addEventListener('load', done);
        mainImg.addEventListener('error', done);
        if (mainImg.complete) {
          window.requestAnimationFrame(done);
        }
      }, FADE_MS);
    }

    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var img = thumb.querySelector('.gallery-module__thumb-img');
        if (!img) return;

        var fullSrc = thumb.getAttribute('data-full-src') || img.src;
        var alt = img.getAttribute('alt') || '';
        var title = thumb.getAttribute('data-title') || alt;
        var desc = thumb.getAttribute('data-desc') || '';

        setActiveThumb(thumb);
        swapMain(fullSrc, alt, false);
        swapText(title, desc, false);
      });
    });

    // 초기 활성: .is-active 가 있으면 그대로, 없으면 첫 번째
    var initial = root.querySelector('.gallery-module__thumb.is-active');
    if (!initial && thumbs[0]) {
      thumbs[0].classList.add('is-active');
      initial = thumbs[0];
    }

    // 로드 시 메인 영역을 활성 썸네일의 큰 이미지와 맞춤 (페이드 없음)
    if (initial) {
      var initImg = initial.querySelector('.gallery-module__thumb-img');
      if (initImg) {
        var initSrc = initial.getAttribute('data-full-src') || initImg.src;
        var initTitle = initial.getAttribute('data-title') || initImg.getAttribute('alt') || '';
        var initDesc = initial.getAttribute('data-desc') || '';
        swapMain(initSrc, initImg.getAttribute('alt') || '', true);
        swapText(initTitle, initDesc, true);
      }
      setActiveThumb(initial);
    }
  }

  /**
   * 페이지 내 모든 갤러리 초기화
   */
  function initAll() {
    document.querySelectorAll(SELECTOR_ROOT).forEach(initGallery);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
