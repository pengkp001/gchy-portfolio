// 초기 상태에서 body에 locked 클래스 추가
document.body.classList.add("locked");

function startExperience() {
  // 스크롤 가능하게 만들기
  document.body.classList.remove("locked");

  const sound = document.getElementById("squeak-sound");
  if (sound) sound.play();

  const forestImg = document.querySelector(".overlay img");
  if (forestImg) {
    console.log(
      "Forest img opacity:",
      window.getComputedStyle(forestImg).opacity
    );
    console.log(
      "Forest img display:",
      window.getComputedStyle(forestImg).display
    );
  }

  document.querySelector("#about").scrollIntoView({ behavior: "smooth" });
}

window.addEventListener("load", () => {
  document.body.classList.add("locked");
});
