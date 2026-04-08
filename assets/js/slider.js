/**
 * Card Slider (Swiper)
 * - 범용적으로 붙여 쓸 수 있도록 옵션을 한 곳에 모아둡니다.
 * - HTML에서 id="vibeCardSwiper"만 유지하면 그대로 동작합니다.
 *
 * ✅ 자주 수정하는 옵션:
 * - direction: "vertical" | "horizontal"
 * - slidesPerView: 1.2 ~ 2.2 추천 (카드가 세로로 길수록 1.x가 보기 좋음)
 * - spaceBetween: 카드 간격(px)
 * - speed: 전환 속도(ms)
 * - autoplay: 자동재생 여부
 */

(function initVibeCardSwiper() {
  const root = document.querySelector("#vibeCardSwiper");
  if (!root) return;

  // 네비게이션/페이지네이션 요소 (원치 않으면 HTML에서 제거 + 아래 설정도 제거)
  const prevEl = root.querySelector(".vibeSlider__btn--prev");
  const nextEl = root.querySelector(".vibeSlider__btn--next");
  const paginationEl = root.querySelector(".vibeSlider__pagination");

  // Swiper 인스턴스 생성
  // 참고: loop 사용 시 슬라이드 개수가 너무 적으면(2~3개) 루프가 어색할 수 있어요.
  // 최소 4개 이상 권장.
  // eslint-disable-next-line no-new
  new Swiper(root, {
    // ✅ 요구사항: Infinite loop
    loop: true,

    // ✅ 가로 슬라이드 버전
    direction: "horizontal",

    // 중앙 카드가 항상 기준(활성)으로 잡히게
    centeredSlides: true,

    // 카드 일부가 좌/우로 보이게 해서 "캐러셀 느낌"을 살림
    slidesPerView: 1.25,
    spaceBetween: 18,

    // UX
    speed: 520,
    grabCursor: true,
    watchSlidesProgress: true,

    // 마우스 휠로 스크롤 이동
    // - 가로 캐러셀이라 보통 trackpad/휠로도 좌우 이동이 되면 편합니다.
    // - 페이지 스크롤과의 충돌이 싫으면 releaseOnEdges를 false로 바꾸세요.
    mousewheel: {
      forceToAxis: true,
      releaseOnEdges: true,
      sensitivity: 0.9,
    },

    // 키보드 접근성
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    // 클릭한 슬라이드를 활성으로
    slideToClickedSlide: true,

    // 필요하면 자동재생을 켜세요.
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    //   pauseOnMouseEnter: true,
    // },

    // 네비게이션/페이지네이션
    navigation:
      prevEl && nextEl
        ? {
            prevEl,
            nextEl,
          }
        : undefined,
    pagination: paginationEl
      ? {
          el: paginationEl,
          clickable: true,
        }
      : undefined,

    // 반응형: 화면이 넓으면 더 많이 보이게
    breakpoints: {
      520: {
        slidesPerView: 1.35,
        spaceBetween: 18,
      },
      820: {
        slidesPerView: 1.6,
        spaceBetween: 20,
      },
      1100: {
        slidesPerView: 1.9,
        spaceBetween: 22,
      },
    },
  });
})();

