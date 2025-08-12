/** 프로필 섹션 페이드인 */
function fadeInProfileSection() {
  const section = document.querySelector(".profile-section");
  if (!section) return;

  section.style.opacity = 0;
  setTimeout(() => {
    section.style.transition = "opacity 1s ease-in";
    section.style.opacity = 1;
  }, 500);
}

/** 배경 색상 스크롤에 따라 변화 */
function setupScrollBackgroundTransition() {
  const startColor = { r: 58, g: 142, b: 220 }; // #3a8edc
  const endColor = { r: 11, g: 29, b: 58 }; // #0b1d3a

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const t = Math.min(scrollTop / docHeight, 1);

    const r = Math.round(lerp(startColor.r, endColor.r, t));
    const g = Math.round(lerp(startColor.g, endColor.g, t));
    const b = Math.round(lerp(startColor.b, endColor.b, t));

    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  });

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu-bar");
  const intro = document.getElementById("intro");

  if (!menu || !intro) return;

  // 해시로 #about, #work 등 바로 진입하면 즉시 보이기
  if (location.hash && location.hash !== "#intro") {
    menu.classList.add("visible");
  }

  // intro가 화면에 보이는 동안은 숨기고, 벗어나면 보이기
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
        menu.classList.remove("visible"); // 인트로 보임 → 숨김
      } else {
        menu.classList.add("visible"); // 인트로 안 보임 → 보임
      }
    },
    {
      root: null,
      threshold: [0, 0.1], // 10% 이하만 보여도 "보이는 것"으로 간주
      rootMargin: "-80px 0px 0px 0px", // 네비 높이만큼 여유 (상단 80px)
    }
  );

  io.observe(intro);
});
