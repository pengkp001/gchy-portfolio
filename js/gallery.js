document.addEventListener("DOMContentLoaded", () => {
  const g = document.querySelector("#wolk-gallery .gallery-grid");
  const modal = document.getElementById("workModal"); // 같은 모달 재사용
  const mTitle = document.getElementById("mTitle");
  const mDesc = document.getElementById("mDesc");
  const mImgs = document.getElementById("mImgs");
  const mLinks = document.getElementById("mLinks");
  const mClose = document.getElementById("mClose");

  if (g) {
    g.addEventListener("click", (e) => {
      const trigger = e.target.closest(".view-btn, img");
      if (!trigger) return;
      const item = trigger.closest(".gallery-item");
      if (!item) return;
      e.preventDefault();

      const title = item.dataset.title || "";
      const desc = item.dataset.desc || item.dataset.description || "";
      const imgs = (item.dataset.imgs || item.dataset.img || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const link = item.dataset.link || "";

      // 주입
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

      mLinks.innerHTML = "";
      if (link && link !== "#") {
        const a = document.createElement("a");
        a.className = "link-btn";
        a.href = link;
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = "관련 링크 열기 ↗";
        mLinks.appendChild(a);
      }

      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });
  }

  // 닫기는 기존 work 모달 close 핸들러 그대로 사용
});

document.querySelectorAll(".gallery-item, .work-card").forEach((item) => {
  item.addEventListener("click", (e) => {
    // 버튼이나 이미지 클릭 시만 동작
    if (!e.target.closest(".view-btn, .open-modal-btn, img")) return;

    const title = item.dataset.title || "";
    const desc = item.dataset.desc || item.dataset.description || "";
    const imgs = (item.dataset.imgs || item.dataset.img || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const link = item.dataset.link || "";

    // 모달 내용 채우기
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-description").textContent = desc;

    const imgBox = document.getElementById("modal-images");
    imgBox.innerHTML = "";
    imgs.forEach((src) => {
      const im = new Image();
      im.src = src;
      im.alt = title;
      im.style.maxWidth = "100%";
      im.style.marginBottom = "10px";
      imgBox.appendChild(im);
    });

    const linkBtn = document.getElementById("modal-link");
    if (link && link !== "#") {
      linkBtn.href = link;
      linkBtn.style.display = "inline-block";
    } else {
      linkBtn.style.display = "none";
    }

    // 모달 열기
    const modal = document.getElementById("modal");
    modal.classList.remove("hidden");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // 스크롤 막기
  });
});

// 닫기 이벤트
document.querySelector("#modal .close").addEventListener("click", () => {
  document.getElementById("modal").classList.add("hidden");
  document.getElementById("modal").style.display = "none";
  document.body.style.overflow = ""; // 스크롤 복구
});

// 바깥 클릭 닫기
document.getElementById("modal").addEventListener("click", (e) => {
  if (e.target.id === "modal") {
    document.getElementById("modal").classList.add("hidden");
    document.getElementById("modal").style.display = "none";
    document.body.style.overflow = "";
  }
});
