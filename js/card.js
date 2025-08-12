// 탭 버튼들
const tabs = document.querySelectorAll(".tab");
const cards = document.querySelectorAll(".work-card");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter; // 'all' or 'web' or 'app' ...

    // 탭 활성화 표시
    tabs.forEach((t) => t.setAttribute("aria-selected", "false"));
    tab.setAttribute("aria-selected", "true");

    // 카드 필터링
    cards.forEach((card) => {
      if (filter === "all" || card.dataset.cat === filter) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".work-grid");
  const modal = document.getElementById("workModal");
  const mTitle = document.getElementById("mTitle");
  const mDesc = document.getElementById("mDesc");
  const mImgs = document.getElementById("mImgs");
  const mLinks = document.getElementById("mLinks");
  const mClose = document.getElementById("mClose");

  // 진단 로그
  console.log(
    "[WORK] grid?",
    !!grid,
    "cards:",
    document.querySelectorAll(".work-card").length,
    "modal?",
    !!modal
  );

  if (!grid || !modal || !mTitle || !mDesc || !mImgs) {
    console.warn("필수 요소가 없습니다. 클래스/ID 오타 확인하세요.");
    return;
  }

  function openFrom(card) {
    const title = card.dataset.title || "";
    const desc = card.dataset.description || card.dataset.desc || "";
    const imgs = (card.dataset.imgs || card.dataset.img || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const link = card.dataset.link || ""; // 있으면 표시

    // 모달 채우기
    mTitle.textContent = title;
    mDesc.textContent = desc;
    mImgs.innerHTML = "";
    imgs.forEach((src) => {
      const im = new Image();
      im.src = src;
      im.alt = title;
      im.style.width = "100%";
      im.style.display = "block";
      im.style.borderRadius = "8px";
      im.style.marginTop = "12px";
      mImgs.appendChild(im);
    });

    // 링크 바 (선택)
    mLinks.innerHTML = "";
    if (link) {
      const a = document.createElement("a");
      a.href = link;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = "문서 열기 ↗";
      a.style.display = "inline-block";
      a.style.padding = "8px 10px";
      a.style.border = "1px solid rgba(0,0,0,.1)";
      a.style.borderRadius = "8px";
      a.style.textDecoration = "none";
      mLinks.appendChild(a);
    }

    // 열기 (인라인 display 쓰지 말고 클래스만)
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  // 이미지/오버레이/버튼 클릭 → 모달 열기 (외부 링크 .ext 는 제외)
  grid.addEventListener("click", (e) => {
    // 외부 링크는 통과
    if (e.target.closest(".ext")) return;

    const trigger = e.target.closest(".open-modal-btn, .thumb, .overlay");
    if (!trigger) return;

    const card = trigger.closest(".work-card");
    if (!card) return;

    e.preventDefault();
    e.stopPropagation();
    openFrom(card);
  });

  // 닫기 버튼
  mClose.addEventListener("click", closeModal);
  // 바깥(오버레이) 클릭 닫기: 시트 바깥 클릭만
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  // ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
  });
});

document.querySelectorAll(".open-modal-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = btn.closest(".work-card");

    const title = card.dataset.title || "";
    const desc = card.dataset.description || "";
    const imgs = (card.dataset.imgs || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    // ✅ 원본사이트(.ext)와 data-link 모두 가져오기
    const originEl = card.querySelector(".ext[href]");
    const origin = originEl ? originEl.getAttribute("href") : "";
    const proto = card.dataset.link || "";

    // 모달 내용 채우기
    document.getElementById("mTitle").textContent = title;
    document.getElementById("mDesc").textContent = desc;

    const mImgs = document.getElementById("mImgs");
    mImgs.innerHTML = "";
    imgs.forEach((src) => {
      const im = new Image();
      im.src = src;
      im.alt = title;
      im.style.width = "100%";
      mImgs.appendChild(im);
    });

    // ✅ 링크 버튼 채우기
    const mLinks = document.getElementById("mLinks");
    mLinks.innerHTML = "";
    if (origin) {
      const a = document.createElement("a");
      a.href = origin;
      a.target = "_blank";
      a.rel = "noopener";
      a.className = "link-btn";
      a.textContent = "원본사이트 열기";
      mLinks.appendChild(a);
    }
    if (proto) {
      const a = document.createElement("a");
      a.href = proto;
      a.target = "_blank";
      a.rel = "noopener";
      a.className = "link-btn";
      a.textContent = "프로토/문서 보기";
      mLinks.appendChild(a);
    }

    document.getElementById("workModal").classList.remove("hidden");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".work-grid");
  const modal = document.getElementById("workModal");
  const mTitle = document.getElementById("mTitle");
  const mDesc = document.getElementById("mDesc");
  const mImgs = document.getElementById("mImgs");
  const mLinks = document.getElementById("mLinks");
  const mClose = document.getElementById("mClose");

  function openFrom(card) {
    const title = card.dataset.title || "";
    const desc = card.dataset.description || card.dataset.desc || "";
    const imgs = (card.dataset.imgs || card.dataset.img || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    // ✅ 원본사이트(.ext) & 프로토/문서(data-link) 읽기
    const originEl = card.querySelector(".ext[href]");
    const origin = originEl ? originEl.getAttribute("href") : "";
    const proto = card.dataset.link || "";

    // 모달 내용 채우기
    mTitle.textContent = title;
    mDesc.textContent = desc;

    mImgs.innerHTML = "";
    imgs.forEach((src) => {
      const im = new Image();
      im.src = src;
      im.alt = title;
      im.style.width = "100%";
      im.style.display = "block";
      im.style.borderRadius = "8px";
      im.style.marginTop = "12px";
      mImgs.appendChild(im);
    });

    // ✅ 링크 버튼 채우기
    mLinks.innerHTML = "";
    if (origin) {
      const a = document.createElement("a");
      a.className = "link-btn";
      a.href = origin;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = "원본사이트 열기 ↗";
      mLinks.appendChild(a);
    }
    if (proto) {
      const a = document.createElement("a");
      a.className = "link-btn";
      a.href = proto;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = "프로토/문서 보기 ↗";
      mLinks.appendChild(a);
    }

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  // 이미지/자세히보기 클릭 시 오픈 (외부 링크 .ext 는 제외)
  grid.addEventListener("click", (e) => {
    if (e.target.closest(".ext")) return;
    const trigger = e.target.closest(".open-modal-btn, .thumb, .overlay");
    if (!trigger) return;
    const card = trigger.closest(".work-card");
    if (!card) return;
    e.preventDefault();
    openFrom(card);
  });

  // 닫기 & 바깥 클릭 & ESC
  mClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
  });
});
