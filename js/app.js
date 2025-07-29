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

/** 고래 이미지 마우스 근접 시 hover 효과 */
function setupWhaleHoverEffect() {
  const whale = document.querySelector(".whale-image");
  if (!whale) return;

  const hoverRadius = 100;
  window.addEventListener("mousemove", (e) => {
    const rect = whale.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
    whale.classList.toggle("hover-effect", distance < hoverRadius);
  });
}
