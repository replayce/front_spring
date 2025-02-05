function edit_del_Post(mode,id,num,pass) {
    //let boardId = "{{board.boardId}}";
    //let content = document.getElementById("content").value;
    const writerNumber = document.getElementById('writerNumber').value;
    const writerPassword = document.getElementById('writerPassword').value;


    if (!writerNumber || !writerPassword) {
        alert("핸드폰 번호와 비밀번호를 모두 입력해야 합니다.");
        return;
    } else if(writerNumber!=num || writerPassword!=pass){
        alert("핸드폰 번호나 비밀번호가 일치하지 않습니다.");
        return;
    }

    if(mode === "edit"){
        fetch(`/main/board/${id}`, {
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
    }else{
        if (confirm("정말 삭제하시겠습니까?")) {
            fetch(`/board/${id}`, {
                method: "DELETE"
            })
            .then(response => {
                if (response.ok) {
                    alert("게시글이 삭제되었습니다.");
                    window.location.href = "/board";
                } else {
                    alert("삭제에 실패하였습니다.");
                }
            })
            .catch(error => console.error("Error:", error));
        }
    }
}

// 검색 팝업 열기
function openVeriPopup(mode,id,num,pass) {
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

    document.getElementById("title").innerHTML = (mode === "del")?"삭제":"수정";

    // 엔터키 입력 시 삭제 실행 (핸드폰 번호, 비밀번호 input에 이벤트 추가)
    document.getElementById("writerNumber").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            edit_del_Post(mode,id,num,pass);
        }
    });
    document.getElementById("writerPassword").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            edit_del_Post(mode,id,num,pass);
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