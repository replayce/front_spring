var selectedDate = null;

function isToday(date) {
    let today = new Date();
    return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
    );
}

document.addEventListener("DOMContentLoaded", function () {
    const serverTimeEl = document.getElementById("server-time");
    const datePrevBtn = document.getElementById("date-prev");
    const dateNextBtn = document.getElementById("date-next");
    const selectPre = document.getElementById("select-pre");
    const realtimeBtn = document.getElementById("realtime-button");

    let currentDate = new Date(); // 현재 날짜
    selectedDate = new Date(); // 선택한 날짜 (조정 가능)
    let maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7); // +7일까지 가능

    // 날짜 선택 드롭다운 초기화
    function updateDateDropdown() {
        selectPre.innerHTML = `<option value="" disabled selected>날짜 선택</option>`; // 초기값
        for (let i = 0; i <= 7; i++) {
            let tempDate = new Date();
            tempDate.setDate(tempDate.getDate() + i);
            let option = document.createElement("option");
            option.value = tempDate.toISOString().split("T")[0];
            option.textContent = formatDate(tempDate);
            selectPre.appendChild(option);
        }
    }

    function updateServerTime() {
        let now = new Date();
        if (isToday(selectedDate)) {
            // 오늘 날짜면 시계 형식으로 표시
            let timeStr = now.toLocaleTimeString("ko-KR", { hour12: false });
            serverTimeEl.textContent = now.toISOString().split("T")[0] + " " + timeStr;
        } else {
            // 다른 날짜면 날짜와 요일만 표시
            serverTimeEl.textContent = formatDate(selectedDate);
        }
    }

    function formatDate(date) {
        const days = ["일", "월", "화", "수", "목", "금", "토"];
        return date.toISOString().split("T")[0] + " (" + days[date.getDay()] + ")";
    }

    // 날짜 감소 (-1일)
    datePrevBtn.addEventListener("click", function () {
        selectedDate.setDate(selectedDate.getDate() - 1);
        if (selectedDate < currentDate) {
            selectedDate = new Date(currentDate); // 오늘보다 작아지지 않게
        }
        updateServerTime();
        changePredictDate(selectedDate.toISOString().split("T")[0]);
        changeJellyAlert($('#alert-location').val());
        updateJellyAlertCount();
    });

    // 날짜 증가 (+1일)
    dateNextBtn.addEventListener("click", function () {
        selectedDate.setDate(selectedDate.getDate() + 1);
        if (selectedDate > maxDate) {
            selectedDate = new Date(maxDate); // 최대 7일까지만 증가
        }
        updateServerTime();

        changePredictDate(selectedDate.toISOString().split("T")[0]);
        changeJellyAlert($('#alert-location').val());
        updateJellyAlertCount();
    });

    // 날짜 선택 드롭다운 기능
    selectPre.addEventListener("change", function () {
        selectedDate = new Date(this.value);
        updateServerTime();

        changePredictDate(selectedDate.toISOString().split("T")[0]);
        changeJellyAlert($('#alert-location').val());
        updateJellyAlertCount();
    });

    // 실시간 버튼: 오늘 날짜로 리셋
    realtimeBtn.addEventListener("click", function () {
        selectedDate = new Date();
        updateServerTime();

        changePredictDate(selectedDate.toISOString().split("T")[0]);
        changeJellyAlert($('#alert-location').val());
        updateJellyAlertCount();
    });

    // 1초마다 서버 시간 업데이트
    setInterval(updateServerTime, 1000);
    updateDateDropdown(); // 드롭다운 리스트 초기화
    updateServerTime(); // 초기 실행
});
