// 모달 열기 이벤트 - .view-btn, .open-modal-btn 모두 처리
document.querySelectorAll(".view-btn, .open-modal-btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();

    const item = button.closest(".gallery-item, .card");
    if (!item) return;

    const title = item.dataset.title || "";
    const description = item.dataset.description || item.dataset.desc || "";
    const imgs = (item.dataset.imgs || item.dataset.img || "")
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s); // 빈 값 제거
    const imgDescs = (item.dataset.imgDescs || "")
      .split(",")
      .map((s) => s.trim());
    const link = item.dataset.link || "#";

    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-description").textContent = description;

    const modalImages = document.getElementById("modal-images");
    modalImages.innerHTML = "";

    imgs.forEach((src, i) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = imgDescs[i] || "";
      img.style.maxWidth = "100%";
      img.style.marginBottom = "10px";
      modalImages.appendChild(img);
    });

    const modalLink = document.getElementById("modal-link");
    modalLink.href = link;

    // 모달 열기
    document.getElementById("modal").classList.remove("hidden");
    document.getElementById("modal").style.display = "flex";
  });
});

// 모달 닫기 이벤트 (X 버튼 클릭)
document.querySelector("#modal .close").addEventListener("click", () => {
  document.getElementById("modal").classList.add("hidden");
  document.getElementById("modal").style.display = "none";
});

// 모달 외부 클릭 시 닫기
document.getElementById("modal").addEventListener("click", (e) => {
  if (e.target.id === "modal" || e.target.classList.contains("modal-close")) {
    document.getElementById("modal").classList.add("hidden");
    document.getElementById("modal").style.display = "none";
  }
});
