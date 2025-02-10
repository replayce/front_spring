document.addEventListener("DOMContentLoaded", function () {
    const chatbotToggle = document.getElementById("chatbotToggle");
    const chatbotContainer = document.getElementById("chatbotContainer");
    const footer = document.querySelector(".footer");

    function checkScroll() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPosition = window.scrollY + windowHeight;

        if (scrollPosition >= documentHeight - footer.offsetHeight) {
            chatbotToggle.classList.add("footer-fixed");
            chatbotContainer.classList.add("footer-fixed");
        } else {
            chatbotToggle.classList.remove("footer-fixed");
            chatbotContainer.classList.remove("footer-fixed");
        }
    }

    // ✅ 페이지 스크롤 감지
    window.addEventListener("scroll", checkScroll);
    checkScroll(); // 초기 실행

    // ✅ 챗봇 토글 이벤트 추가
    chatbotToggle.addEventListener("click", function () {
        chatbotContainer.classList.toggle("active");
    });
});
