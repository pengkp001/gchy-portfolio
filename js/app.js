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

/** 모달 열기 이벤트 - gallery-item, card 모두 처리 */
document.querySelectorAll(".open-modal-btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();

    // gallery-item 또는 card 둘 다 찾아서 처리
    const item = button.closest(".gallery-item, .card");
    if (!item) return;

    const title = item.dataset.title || "";
    // desc와 description 속성 모두 고려
    const description = item.dataset.description || item.dataset.desc || "";
    // imgs 또는 img 속성 모두 고려
    const imgs = (item.dataset.imgs || item.dataset.img || "")
      .split(",")
      .map((s) => s.trim());
    const imgDescs = (item.dataset.imgDescs || "")
      .split(",")
      .map((s) => s.trim());
    const link = item.dataset.link || "#";

    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-description").textContent = description;

    const modalImages = document.getElementById("modal-images");
    modalImages.innerHTML = "";

    imgs.forEach((src, i) => {
      if (!src) return;
      const img = document.createElement("img");
      img.src = src;
      img.alt = imgDescs[i] || "";
      modalImages.appendChild(img);
    });

    const modalLink = document.getElementById("modal-link");
    modalLink.href = link;

    document.getElementById("modal").style.display = "flex";
  });
});

/** 모달 닫기 */
document.getElementById("modal").addEventListener("click", (e) => {
  if (e.target.id === "modal" || e.target.classList.contains("modal-close")) {
    document.getElementById("modal").style.display = "none";
  }
});
