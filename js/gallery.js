// 모달 열기 버튼 클릭 이벤트 연결
document.querySelectorAll(".view-btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();

    // 버튼이 속한 갤러리 아이템 또는 카드 찾기
    const item = button.closest(".gallery-item, .card");
    if (!item) return;

    // 데이터 속성 읽기
    const title = item.dataset.title || "";
    const description = item.dataset.description || item.dataset.desc || "";
    const imgs = (item.dataset.imgs || item.dataset.img || "")
      .split(",")
      .map((s) => s.trim());
    const imgDescs = (item.dataset.imgDescs || "")
      .split(",")
      .map((s) => s.trim());
    const link = item.dataset.link || "#";

    // 모달 내용 세팅
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-description").textContent = description;

    const modalImages = document.getElementById("modal-images");
    modalImages.innerHTML = "";
    imgs.forEach((src, i) => {
      if (!src) return;
      const img = document.createElement("img");
      img.src = src;
      img.alt = imgDescs[i] || "";
      img.style.maxWidth = "100%";
      img.style.marginBottom = "10px";
      modalImages.appendChild(img);
    });

    const modalLink = document.getElementById("modal-link");
    modalLink.href = link;

    // 모달 보이기
    document.getElementById("modal").classList.remove("hidden");
  });
});

// 모달 닫기 이벤트
document.querySelector("#modal .close").addEventListener("click", () => {
  document.getElementById("modal").classList.add("hidden");
});

// 모달 바깥 클릭 시 닫기
document.getElementById("modal").addEventListener("click", (e) => {
  if (e.target.id === "modal") {
    document.getElementById("modal").classList.add("hidden");
  }
});
