function editPost() {
    let boardId = "{{boardId}}";
    let content = document.getElementById("content").value;

    fetch(`/main/board/${boardId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: content
        })
    })
    .then(response => {
        if (response.ok) {
            alert("게시글이 수정되었습니다.");
            location.reload();
        } else {
            alert("수정에 실패하였습니다.");
        }
    })
    .catch(error => console.error("Error:", error));
}

function deletePost() {
    let boardId = "{{boardId}}";
    if (confirm("정말 삭제하시겠습니까?")) {
        fetch(`/main/board/${boardId}`, {
            method: "DELETE"
        })
        .then(response => {
            if (response.ok) {
                alert("게시글이 삭제되었습니다.");
                window.location.href = "/main/board";
            } else {
                alert("삭제에 실패하였습니다.");
            }
        })
        .catch(error => console.error("Error:", error));
    }
}

// 검색 팝업 열기
function openVeriPopup(is_edit) {
    const popupContent = `
        <div id="search-popup">
            <h2 id="title"></h2>
            <div class="input-container">
                <div class="input-group">
                    <label for="writerNumber">핸드폰 번호</label>
                    <input type="text" id="writerNumber">
                </div>
                <div class="input-group">
                    <label for="writerPassword">비밀번호</label>
                    <div class="password-container">
                        <input type="password" id="writerPassword">
                        <span class="toggle-password" onclick="togglePassword()">👁️</span>
                    </div>
                </div>
            </div>
            <div class="popup-buttons">
                <button class="search-btn" onclick="searchMyBoards()">검색</button>
                <button class="close-btn" onclick="closePopup()">닫기</button>
            </div>
        </div>
        <div id="popup-overlay" onclick="closePopup()"></div>
    `;
    document.body.insertAdjacentHTML('beforeend', popupContent);

    document.getElementById("title").innerHTML = (is_edit == 0)?"삭제":"수정";

    // 엔터키 입력 시 검색 실행 (핸드폰 번호, 비밀번호 input에 이벤트 추가)
    document.getElementById("writerNumber").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            searchMyBoards();
            event.stopPropagation();
            searchMyBoards();
        }
    });
    document.getElementById("writerPassword").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            searchMyBoards();
        }
    });
}

// 팝업 닫기
function closePopup() {
    document.getElementById('search-popup').remove();
    document.getElementById('popup-overlay').remove();
}

// 비밀번호 보이기/숨기기 기능
function togglePassword() {
    const passwordField = document.getElementById("writerPassword");
    const toggleIcon = document.querySelector(".toggle-password");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleIcon.textContent = "🙈"; // 눈 감은 아이콘
    } else {
        passwordField.type = "password";
        toggleIcon.textContent = "👁️"; // 눈 뜬 아이콘
    }
}

// 검색 기능
function searchMyBoards() {
    const writerNumber = document.getElementById('writerNumber').value;
    const writerPassword = document.getElementById('writerPassword').value;

    if (!writerNumber || !writerPassword) {
        alert("핸드폰 번호와 비밀번호를 모두 입력해야 합니다.");
        return;
    }

    fetch(`http://localhost:8081/api/board/search?writerNumber=${encodeURIComponent(writerNumber)}&writerPassword=${encodeURIComponent(writerPassword)}`)
    .then(async response => {
        const data = await response.json();
        if (!response.ok) {
            // 백엔드에서 throw한 에러 메시지(예: "비밀번호를 확인해 주세요.")를 사용
            throw new Error(data.details || "검색 중 오류가 발생했습니다.");
        }
        return data;
    })
    .then(data => {
        if (data.result && data.result.length > 0) {
            updateBoardList(data.result);
            closePopup();
        } else {
            alert("해당하는 제보 내역이 없습니다.");
        }
    })
    .catch(error => {
        alert(error.message);
    });
}