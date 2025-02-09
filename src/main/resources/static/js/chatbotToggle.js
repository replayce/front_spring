document.addEventListener("DOMContentLoaded", function () {
    const chatbotToggle = document.getElementById("chatbotToggle");
    const chatbotContainer = document.getElementById("chatbotContainer");

    chatbotToggle.addEventListener("click", function () {
        chatbotContainer.classList.toggle("active");
    });
});
