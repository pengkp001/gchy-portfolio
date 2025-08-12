document.addEventListener("DOMContentLoaded", () => {
  // ===== 탭 필터 =====
  const tabs = document.querySelectorAll(".tab");
  const cards = document.querySelectorAll(".work-card");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const filter = tab.dataset.filter; // 'all' | 'web' | 'app' ...
      tabs.forEach((t) => t.setAttribute("aria-selected", "false"));
      tab.setAttribute("aria-selected", "true");

      cards.forEach((card) => {
        card.style.display =
          filter === "all" || card.dataset.cat === filter ? "" : "none";
      });
    });
  });

  // ===== 모달 참조 =====
  const modal = document.getElementById("workModal");
  const sheet = modal?.querySelector(".sheet");
  const mTitle = document.getElementById("mTitle");
  const mDesc = document.getElementById("mDesc");
  const mImgs = document.getElementById("mImgs");
  const mLinks = document.getElementById("mLinks");
  const mClose = document.getElementById("mClose");

  if (!modal || !sheet || !mTitle || !mDesc || !mImgs || !mLinks || !mClose) {
    console.warn("[WORK] 모달 필수 요소가 없습니다. ID/클래스 확인!");
    return;
  }

  // ===== 카테고리별 버튼 이름 =====
  const modalBtnNames = {
    web: { main: "피그마 열기", sub: "원본 사이트" },
    app: { main: "피그마 열기", sub: "프로젝트 소개" },
    clone: { main: "클론코딩", sub: "원본 사이트" },
    shop: { main: "쇼핑몰 보기", sub: "브랜드 사이트" },
    graphic: { main: "노션 열기", sub: "피그마 열기" },
    default: { main: "열기", sub: "바로가기" },
  };

  function makeLinkBtn(href, label) {
    const a = document.createElement("a");
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = label;
    a.className = "modal-link-btn";
    return a;
  }

  function openWorkModal(card) {
    const cat = card.dataset.cat || "default";
    const names = modalBtnNames[cat] || modalBtnNames.default;

    const title = card.dataset.title || "";
    const desc = card.dataset.description || card.dataset.desc || "";
    const imgs = (card.dataset.imgs || card.dataset.img || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const proto = card.dataset.link || ""; // data-link
    const extEl = card.querySelector(".ext[href]"); // 카드 내부 외부링크
    const origin = extEl ? extEl.getAttribute("href") : ""; // a.ext href

    // 제목/설명
    mTitle.textContent = title;
    mDesc.textContent = desc;

    // 이미지
    mImgs.innerHTML = "";
    imgs.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.alt = title;
      img.style.width = "100%";
      img.style.display = "block";
      img.style.borderRadius = "8px";
      img.style.marginTop = "12px";
      mImgs.appendChild(img);
    });

    // 링크 버튼 (카테고리별 라벨 적용)
    mLinks.innerHTML = "";
    if (proto) mLinks.appendChild(makeLinkBtn(proto, names.main));
    if (origin) mLinks.appendChild(makeLinkBtn(origin, names.sub));

    // 열기
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // 카드 내 썸네일/버튼/오버레이 클릭 → 모달 열기 (외부 링크 .ext 는 제외)
  const grid = document.querySelector(".work-grid");
  if (grid) {
    grid.addEventListener("click", (e) => {
      if (e.target.closest(".ext")) return; // 외부 링크는 통과
      const trigger = e.target.closest(".open-modal-btn, .thumb, .overlay");
      if (!trigger) return;
      const card = trigger.closest(".work-card");
      if (!card) return;
      e.preventDefault();
      e.stopPropagation();
      openWorkModal(card);
    });
  }

  // 닫기
  mClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (!sheet.contains(e.target)) closeModal(); // 바깥 클릭 닫기
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
  });
});
