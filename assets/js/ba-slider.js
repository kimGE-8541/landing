/*!
 * Before & After Slider Module
 * -------------------------------------------
 * 재사용 가이드:
 * 1) HTML 구조는 .ba-slider > .ba-slider__viewport > .ba-slider__track > .ba-slide 를 유지
 * 2) 슬라이드 추가/삭제는 .ba-slide 블록 단위로 처리
 * 3) 페이지 내 여러 개 슬라이더가 있어도 자동으로 각각 동작
 */

(function ($) {
  "use strict";

  /**
   * 특정 슬라이더 요소를 초기화한다.
   * @param {jQuery} $slider - .ba-slider 루트 요소
   */
  function initBaSlider($slider) {
    var $viewport = $slider.find(".ba-slider__viewport");
    var $track = $slider.find(".ba-slider__track");
    var $slides = $slider.find(".ba-slide");
    var $prevBtn = $slider.find(".ba-slider__nav--prev");
    var $nextBtn = $slider.find(".ba-slider__nav--next");

    var totalSlides = $slides.length;
    var currentIndex = 0;

    if (totalSlides <= 1) {
      // 슬라이드가 1개 이하일 때 네비게이션 버튼 비활성화
      $prevBtn.prop("disabled", true);
      $nextBtn.prop("disabled", true);
      return;
    }

    /**
     * 현재 인덱스에 맞춰 트랙을 이동한다.
     */
    function updatePosition() {
      // viewport의 실제 가로폭만큼 이동
      var slideWidth = $viewport.innerWidth();
      var translateX = -(currentIndex * slideWidth);
      $track.css("transform", "translateX(" + translateX + "px)");
    }

    /**
     * 다음 슬라이드로 이동 (마지막 -> 첫 번째 루프)
     */
    function goNext() {
      currentIndex = (currentIndex + 1) % totalSlides;
      updatePosition();
    }

    /**
     * 이전 슬라이드로 이동 (첫 번째 -> 마지막 루프)
     */
    function goPrev() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updatePosition();
    }

    // 버튼 이벤트 연결
    $nextBtn.on("click", goNext);
    $prevBtn.on("click", goPrev);

    // 반응형 대응: 화면 리사이즈 시 현재 슬라이드 위치 재계산
    $(window).on("resize", function () {
      updatePosition();
    });

    // 초기 위치 세팅
    updatePosition();
  }

  $(function () {
    // 페이지 내 모든 .ba-slider 모듈을 자동 초기화
    $(".ba-slider").each(function () {
      initBaSlider($(this));
    });
  });
})(jQuery);
