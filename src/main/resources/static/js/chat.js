document.addEventListener("DOMContentLoaded", function () {
    let apiHost = "";

    // ✅ 백엔드에서 API 주소 가져오기 (기존 코드 유지)
    fetch("/api/config/backend-host")
        .then(response => response.json())
        .then(config => {
            apiHost = config.apiHost;
            console.log("✅ API Host:", apiHost);
        })
        .catch(error => {
            console.error("❌ API 설정을 불러오는 중 오류 발생:", error);
        });

    document.getElementById("sendBtn").addEventListener("click", sendMessage);
    document.getElementById("userInput").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        let userInputField = document.getElementById("userInput");
        let userInput = userInputField.value.trim();
        if (userInput === "") return;

        let chatbox = document.getElementById("chatbox");

        // ✅ 사용자 메시지 추가
        let userMessage = `<div class="user-message">${userInput}</div>`;
        chatbox.innerHTML += userMessage;

        userInputField.value = "";
        chatbox.scrollTop = chatbox.scrollHeight;

        // ✅ API 주소를 백엔드에서 받아온 값으로 설정
        fetch(`${apiHost}/api/chat?question=${encodeURIComponent(userInput)}`)
            .then(response => response.text())
            .then(answer => {
                // ✅ 챗봇 메시지 왼쪽에 해파리 아이콘 추가
                let botMessage = `
                    <div class="bot-message-container">
                        <img src="/images/jelly_icons_noname/보름달물_noname.png" class="bot-message-icon">
                        <div class="bot-message">${answer}</div>
                    </div>
                `;
                chatbox.innerHTML += botMessage;
                chatbox.scrollTop = chatbox.scrollHeight;
            })
            .catch(error => {
                console.error("❌ API 요청 중 오류 발생:", error);
                let errorMessage = `
                    <div class="bot-message-container">
                        <img src="/images/jelly_icons_noname/보름달물_noname.png" class="bot-message-icon">
                        <div class="bot-message">오류가 발생했습니다.</div>
                    </div>
                `;
                chatbox.innerHTML += errorMessage;
            });
    }
});
