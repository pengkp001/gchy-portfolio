document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("메시지가 전송되었습니다!");
});

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-tabs button");
  const portfolioCards = document.querySelectorAll(".portfolio-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // active 버튼 바꾸기
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      portfolioCards.forEach((card) => {
        if (filter === "all") {
          card.classList.remove("hidden");
        } else {
          const category = card.getAttribute("data-category");
          if (category === filter) {
            card.classList.remove("hidden");
          } else {
            card.classList.add("hidden");
          }
        }
      });
    });
  });
});

document.querySelectorAll(".nav-inner a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 50, // 메뉴바 높이만큼 보정
        behavior: "smooth",
      });
    }
  });
});

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});
