// const text = "Hello,\nwelcome to my portfolio!";
// const target = document.getElementById("typing");
// const audio = document.getElementById("scribbleSound");
// let index = 0;

// function typeEffect() {
//   if (index < text.length) {
//     const char = text.charAt(index);

//     // 줄바꿈 처리
//     if (char === "\n") {
//       target.innerHTML += "<br>";
//     } else {
//       target.innerHTML += char;

//       // 효과음 재생
//       audio.currentTime = 0; // 매번 처음부터 재생
//       audio.play();
//     }

//     index++;
//     setTimeout(typeEffect, 100); // 타이핑 속도
//   }
// }

// typeEffect();

const typedTextElement = document.getElementById("typed-text");
// \n → <br>로 변환
const textToType = "Hello,\nwelcome to \nmy portfolio!".replace(/\n/g, "<br>");
let charIndex = 0;
const typingSpeed = 100;

function typeText() {
  if (charIndex < textToType.length) {
    if (textToType[charIndex] === "<") {
      let tag = "";
      while (charIndex < textToType.length && textToType[charIndex] !== ">") {
        tag += textToType[charIndex];
        charIndex++;
      }
      if (charIndex < textToType.length) {
        tag += ">";
        charIndex++;
      }
      typedTextElement.insertAdjacentHTML("beforeend", tag);
    } else {
      typedTextElement.insertAdjacentHTML("beforeend", textToType[charIndex]);
      charIndex++;
    }
    setTimeout(typeText, typingSpeed);
  }
}

typeText();

// 별빛 랜덤 생성
const starsContainer = document.getElementById("stars");
const starCount = 80;

for (let i = 0; i < starCount; i++) {
  const star = document.createElement("div");
  star.classList.add("star");
  const size = Math.random() * 2 + 1;
  star.style.width = size + "px";
  star.style.height = size + "px";
  star.style.top = Math.random() * 100 + "%";
  star.style.left = Math.random() * 100 + "%";
  star.style.animationDuration = Math.random() * 3 + 2 + "s";
  starsContainer.appendChild(star);
}

document.querySelector("#intro").scrollIntoView({
  behavior: "smooth",
});

window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 50;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(
      `.nav-inner a[href="#${sectionId}"]`
    );

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink.classList.add("active");
    } else {
      navLink.classList.remove("active");
    }
  });
});
