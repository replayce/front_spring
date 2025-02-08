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
        if (event.key === "Enter" && !event.shiftKey) { // ✅ Shift + Enter일 때만 줄바꿈 허용
            event.preventDefault(); // ✅ 엔터 기본 동작 막기 (줄바꿈 방지)
            sendMessage(); // ✅ 메시지 전송
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
        autoResize(userInputField);
        chatbox.scrollTop = chatbox.scrollHeight;

        // ✅ "젤파리가 생각 중이에요..." 로딩 메시지 추가
        let loadingMessage = document.createElement("div");
        loadingMessage.classList.add("bot-message-container");
        loadingMessage.innerHTML = `
            <img src="/images/jelly_icons_noname/보름달물_noname.png" class="bot-message-icon">
            <div class="bot-message typing-animation">젤파리가 생각 중이에요... 🤔💭</div>
        `;
        chatbox.appendChild(loadingMessage);
        chatbox.scrollTop = chatbox.scrollHeight;

        // ✅ API 주소를 백엔드에서 받아온 값으로 설정
        fetch(`${apiHost}/api/chat?question=${encodeURIComponent(userInput)}`)
            .then(response => response.text())
            .then(answer => {
                // ✅ "로딩 중" 메시지 삭제
                chatbox.removeChild(loadingMessage);

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
                chatbox.removeChild(loadingMessage);
                let errorMessage = `
                    <div class="bot-message-container">
                        <img src="/images/jelly_icons_noname/보름달물_noname.png" class="bot-message-icon">
                        <div class="bot-message">오류가 발생했습니다.</div>
                    </div>
                `;
                chatbox.innerHTML += errorMessage;
            });
    }

    // ✅ 입력창 자동 높이 조절 기능 유지
    const userInput = document.getElementById("userInput");

    if (userInput) {
        userInput.addEventListener("input", function () {
            autoResize(this);
        });
    }

    function autoResize(textarea) {
        textarea.style.height = "auto"; // ✅ 높이를 초기화
        textarea.style.height = (textarea.scrollHeight) + "px"; // ✅ 입력 내용에 따라 높이 조절
    }

});
