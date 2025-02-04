document.addEventListener("DOMContentLoaded", function () {
    getAllBoards(); // 페이지 로드 시 전체 게시글을 불러오기

    const searchInput = document.getElementById("searchQuery");
    if (searchInput) {  // ✅ searchInput이 존재하는지 확인
        searchInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") { // 엔터 키 입력 감지
                searchBoards();
            }
        });
    }
});

// 전체 게시글 불러오기 함수
function getAllBoards() {
    fetch("http://localhost:8081/api/board")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.result && data.result.length > 0) {
                updateBoardList(data.result);
            } else {
                console.warn("게시글이 없습니다.");
            }
        })
        .catch(error => {
            console.error("게시글 불러오기 오류:", error);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    const jellyCharacters = document.querySelectorAll(".jelly-character");

    jellyCharacters.forEach(jelly => {
        jelly.addEventListener("click", function (event) {
            event.preventDefault(); // 기본 클릭 효과 방지 (검정 테두리 제거)
            this.blur(); // 기본 포커스 상태 제거
            this.classList.toggle("selected-jelly"); // 클릭 시 초록색 테두리 추가/제거
        });
    });
});

// 검색 팝업 열기
function openSearchPopup() {
    const popupContent = `
        <div id="search-popup">
            <h2>제보 내역 검색</h2>
            <div class="input-container">
                <div class="input-group">
                    <label for="writer">제보자 이름</label>
                    <input type="text" id="writer">
                </div>
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
    const writer = document.getElementById('writer').value;
    const writerNumber = document.getElementById('writerNumber').value;
    const writerPassword = document.getElementById('writerPassword').value;

    if (!writer || !writerNumber || !writerPassword) {
        alert("모든 필드를 입력해야 합니다.");
        return;
    }

    fetch(`http://localhost:8081/api/board/search?writer=${encodeURIComponent(writer)}&writerNumber=${encodeURIComponent(writerNumber)}&writerPassword=${encodeURIComponent(writerPassword)}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.result && data.result.length > 0) {
            updateBoardList(data.result);
            closePopup();
        } else {
            alert('게시글을 찾을 수 없습니다.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('검색 중 오류가 발생했습니다.');
    });
}

// 검색 기능 (내용, 위치, 해파리 종류, 독성을 모두 포함)
function searchBoards() {
    const searchQuery = document.getElementById('searchQuery').value.trim();

    if (!searchQuery) {
        getAllBoards();  // 검색어가 없으면 전체 게시글 다시 불러오기
        return;
    }

    fetch(`http://localhost:8081/api/board/search/query?query=${encodeURIComponent(searchQuery)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.result && data.result.length > 0) {
                updateBoardList(data.result);
            } else {
                alert('검색 결과가 없습니다.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('검색 중 오류가 발생했습니다.');
        });
}

// 검색 버튼 클릭 이벤트 추가
document.querySelector('.search-button').addEventListener('click', searchBoards);

// 게시판 업데이트
function updateBoardList(boards) {
    const boardList = document.querySelector('.board-content-list');
    boardList.innerHTML = '';

    boards.forEach(board => {
        const boardRow = `
            <div class="board-row">
                <span class="no">${board.boardId}</span>
                <span class="icon"><img src="/images/jelly_icons/노무라입깃.png" alt="해파리 아이콘"></span>
                <span class="loc">${board.location}</span>
                <span class="jelly-name">${board.jelly}</span>
                <span class="report-time">${board.formattedTime}</span>
                <span class="informant">${board.writer}</span>
            </div>
        `;
        boardList.insertAdjacentHTML('beforeend', boardRow);
    });
}
