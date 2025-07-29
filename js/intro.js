const whale = document.querySelector(".whale-image");

window.addEventListener("mousemove", (e) => {
  const rect = whale.getBoundingClientRect();
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const distance = Math.sqrt((mouseX - centerX) ** 2 + (mouseY - centerY) ** 2);

  const hoverRadius = 120; // 원하는 거리만큼 조절 (단위: px)

  if (distance < hoverRadius) {
    whale.classList.add("hover-effect");
  } else {
    whale.classList.remove("hover-effect");
  }
});

whaleImage.addEventListener("click", () => {
  if (whaleImage.classList.contains("hovered")) {
    squeakSound.currentTime = 0;
    const playPromise = squeakSound.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log("Audio play error:", error);
      });
    }

    whaleImage.style.transition = "transform 0.2s ease";
    whaleImage.style.transform = "scale(1.1)";

    setTimeout(() => {
      whaleImage.style.transform = "";
    }, 200);
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const whale = document.querySelector(".whale-image");
  const overlay = document.querySelector(".color-overlay");
  const sound = document.getElementById("squeak-sound");

  whale.addEventListener("click", () => {
    // 소리 재생
    sound.currentTime = 0;
    sound.play();

    // 애니메이션 효과 추가
    whale.classList.add("clicked");
    overlay.classList.add("active");

    // 1초 후 애니메이션 클래스 제거
    setTimeout(() => {
      whale.classList.remove("clicked");
      overlay.classList.remove("active");
    }, 1000);
  });
});
