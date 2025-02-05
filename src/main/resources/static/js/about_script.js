document.addEventListener("DOMContentLoaded", function () {
    const homeButton = document.getElementById("home-button");
    const overlay = document.querySelector(".overlay");
    const mainLogo = document.getElementById("main-logo");
    const leftLogo = document.querySelector(".logo-left");
    const rightLogo = document.querySelector(".logo-right");
    const enLogo = document.getElementById("en-logo");
    const jellyIcons = document.querySelectorAll(".jelly");
    const scrollIcon = document.getElementById("scroll-icon");

    homeButton.addEventListener("mouseenter", function () {
        // 배경 투명도 없애기
        overlay.style.background = "rgba(255, 255, 255, 0)";

        // 중앙 로고 변경 + 크기 조절 가능하게 설정
        mainLogo.src = "jellymully_logo_img.png";
        mainLogo.style.maxWidth = "200px"; // 마우스 올렸을 때 크기

        // 좌우 로고 숨기기
        leftLogo.style.opacity = "0";
        rightLogo.style.opacity = "0";

        // EN 로고 나타나기
        enLogo.style.opacity = "1";

        // 해파리 아이콘 나타나기
        jellyIcons.forEach(jelly => {
            jelly.style.opacity = "1";
        });
    });

    homeButton.addEventListener("mouseleave", function () {
        // 배경 원래대로
        overlay.style.background = "rgba(255, 255, 255, 0.7)";

        // 중앙 로고 원래대로 + 크기 원래대로
        mainLogo.src = "jellymully_logo_img_small.png";
        mainLogo.style.maxWidth = "200px"; // 기본 크기

        // 좌우 로고 다시 보이게
        leftLogo.style.opacity = "1";
        rightLogo.style.opacity = "1";

        // EN 로고 숨기기
        enLogo.style.opacity = "0";

        // 해파리 아이콘 숨기기
        jellyIcons.forEach(jelly => {
            jelly.style.opacity = "0";
        });
    });
});

// 스크롤 아이콘 기능 추가 (기존 코드 유지)
document.addEventListener("DOMContentLoaded", function () {
    const scrollIcon = document.getElementById("scroll-icon");

    if (scrollIcon) {
        scrollIcon.addEventListener("click", function () {
            window.scrollTo({
                top: window.innerHeight, // 한 화면 아래로 이동
                behavior: "smooth"
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const homeButton = document.getElementById("home-button");
    const overlay = document.querySelector(".overlay");
    const mainLogo = document.getElementById("main-logo");
    const leftLogo = document.querySelector(".logo-left");
    const rightLogo = document.querySelector(".logo-right");
    const enLogo = document.getElementById("en-logo");
    const jellyIcons = document.querySelectorAll(".jelly");
    const toggleBtn = document.getElementById("toggle-animation-btn");

    function activateAnimation() {
        overlay.style.background = "rgba(255, 255, 255, 0)";
        mainLogo.src = "jellymully_logo_img.png";
        mainLogo.style.maxWidth = "200px";
        leftLogo.style.opacity = "0";
        rightLogo.style.opacity = "0";
        enLogo.style.opacity = "1";
        jellyIcons.forEach(jelly => jelly.style.opacity = "1");
    }

    function deactivateAnimation() {
        overlay.style.background = "rgba(255, 255, 255, 0.7)";
        mainLogo.src = "jellymully_logo_img_small.png";
        mainLogo.style.maxWidth = "200px";
        leftLogo.style.opacity = "1";
        rightLogo.style.opacity = "1";
        enLogo.style.opacity = "0";
        jellyIcons.forEach(jelly => jelly.style.opacity = "0");
    }

    // Home 버튼 호버 시 애니메이션 실행 (PC용)
    homeButton.addEventListener("mouseenter", activateAnimation);
    homeButton.addEventListener("mouseleave", deactivateAnimation);

    // ON/OFF 스위치 클릭 시 애니메이션 토글
    toggleBtn.addEventListener("change", function () {
        if (toggleBtn.checked) {
            activateAnimation();
        } else {
            deactivateAnimation();
        }
    });
});



