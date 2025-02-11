// 수정 및 삭제 확인 팝업 열기 (화면 중앙에 표시)
function openVeriPopup(mode, id, num, pass) {
    const popupContent = `
        <div id="popup-overlay" onclick="closePopup()"></div>
        <div id="search-popup">
            <h2 id="title">${mode === "del" ? "삭제" : "수정"} 확인</h2>
            <p class="popup-description">핸드폰 번호와 비밀번호를 입력하세요.</p>
            <div class="input-container">
                <div class="input-group">
                    <label for="writerNumber">핸드폰 번호</label>
                    <input type="text" id="writerNumber" placeholder="전화번호 입력">
                </div>
                <div class="input-group">
                    <label for="writerPassword">비밀번호</label>
                    <div class="password-container">
                        <input type="password" id="writerPassword" placeholder="비밀번호 입력">
                        <span class="toggle-password" onclick="togglePassword()">👁️</span>
                    </div>
                </div>
            </div>
            <div class="popup-buttons">
                <button class="confirm-btn" onclick="verifyUser('${mode}', ${id}, '${num}', '${pass}')">확인</button>
                <button class="close-btn" onclick="closePopup()">닫기</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', popupContent);

    // 팝업 띄울 때 포커스 자동 설정
    document.getElementById("writerNumber").focus();

    // 🔴 Enter 키를 누르면 확인 버튼이 자동 클릭되도록 이벤트 리스너 추가
    document.querySelectorAll("#writerNumber, #writerPassword").forEach((input) => {
        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); // 기본 엔터 동작 방지
                document.querySelector(".confirm-btn").click(); // 확인 버튼 클릭
            }
        });
    });
}


// 사용자 확인 후 수정 페이지 이동 or 삭제 실행
function verifyUser(mode, id, num, pass) {
    const writerNumber = document.getElementById("writerNumber").value.trim();
    const writerPassword = document.getElementById("writerPassword").value.trim();

    if (!writerNumber || !writerPassword) {
        alert("핸드폰 번호와 비밀번호를 모두 입력해야 합니다.");
        return;
    }
    if (writerNumber !== num || writerPassword !== pass) {
        alert("핸드폰 번호나 비밀번호가 일치하지 않습니다.");
        return;
    }

    closePopup(); // 입력이 맞으면 팝업 닫기

    if (mode === "edit") {
        // (1) localStorage에 "이 글은 수정 가능" 표시 저장
        localStorage.setItem(`board-${id}-editable`, "true")
        // (2) 수정 페이지로 이동 (URL에는 전화번호/비번 붙이지 않음)
        window.location.href = `/report/${id}`;
    } else {
        deletePost(id);
    }
}

// 팝업 닫기
function closePopup() {
    document.getElementById('search-popup').remove();
    document.getElementById('popup-overlay').remove();
}

function deletePost(boardId) {
    if (!confirm("정말 삭제하시겠습니까?")) ㄱㄷ셔구;

    fetch(`/board/${boardId}`, {
        method: "DELETE"
    })
        .then(response => {
            if (response.ok) {
                alert("게시글이 삭제되었습니다.");
                window.location.href = "/board";
            } else {
                alert("삭제에 실패하였습니다.")
            }
        })
        .catch(error => console.error("Error:", error));
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


// 해파리 이름 맞춰 이미지 매핑
document.addEventListener("DOMContentLoaded", function () {
    const jellyfishNameRaw = document.getElementById("jellyfish-name").textContent.trim(); // ✅ 올바르게 board.jelly 값 가져오기
    const jellyfishImage = document.getElementById("jellyfish-icon");

    console.log("board.jelly 값:", jellyfishNameRaw); // ✅ Mustache 변수가 정상적으로 가져오는지 확인

    // ✅ 해파리 이름을 `_noname.png` 파일명으로 변환하는 함수
    function getJellyfishImageFile(jellyfishName) {
        if (!jellyfishName) return "외계생물체.png"; // 값이 없으면 기본 이미지 반환
        return jellyfishName.replace(/해파리$/, "").trim() + "_noname.png";
    }

    // ✅ 변환된 이미지 파일명 설정
    const imageFileName = getJellyfishImageFile(jellyfishNameRaw);
    const imagePath = `/images/jelly_icons_noname/${imageFileName}`;

    console.log("변환된 이미지 파일명:", imageFileName); // ✅ 디버깅
    console.log("예상되는 이미지 경로:", imagePath); // ✅ 디버깅

    // ✅ 이미지가 존재하는지 확인 후 설정
    fetch(imagePath, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                jellyfishImage.src = imagePath; // ✅ 이미지가 존재하면 해당 이미지 사용
                console.log("이미지 로드 성공:", imagePath);
            } else {
                throw new Error("이미지 없음");
            }
        })
        .catch(() => {
            jellyfishImage.src = "/images/jelly_icons_noname/외계생물체.png"; // ❌ 없으면 기본 이미지 사용
            console.log("기본 이미지(외계생물체) 적용");
        });
});

// ✅ 도감 보기 버튼 클릭 가능하도록 전역 함수로 이동
function viewEncyclopedia(jellyfishName) {
    if (!jellyfishName) {
        console.error('jellyfishName is undefined or empty');
        return;
    }
    window.location.href = `/detail?jelly=${encodeURIComponent(jellyfishName)}`;
}