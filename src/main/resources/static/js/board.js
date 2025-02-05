// 페이지네이션
// 전역 변수로 현재 페이지와 페이지 사이즈를 관리 (필요시 전역 상태 관리)
let currentPage = 1;
let pageSize = 12; // 기본값, 사용자가 변경할 수 있음

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

// 해파리 필터 기능 추가
function setupJellyFilters() {
    const jellyCharacters = document.querySelectorAll(".jelly-character");

    jellyCharacters.forEach(jelly => {
        jelly.addEventListener("click", function (event) {
            event.preventDefault(); //  기본 클릭 효과 방지
            this.blur(); //  기본 포커스 상태 제거
            this.classList.toggle("selected-jelly"); //  클릭 시 초록색 테두리 추가/제거
        });
    });

    //  필터 적용 버튼 이벤트 추가
    const filterButton = document.querySelector(".filter");
    if (filterButton) {
        filterButton.addEventListener("click", function () {
            console.log(" 필터 적용 버튼 클릭됨!"); // 버튼 클릭 이벤트 확인
            applyJellyFilter();
        });
    }
}

//  DOM이 로드된 후 해파리 필터 기능 초기화
document.addEventListener("DOMContentLoaded", function () {
    setupJellyFilters();
});


// 선택된 해파리 필터 적용 함수
function applyJellyFilter() {
    const selectedJellies = [];

    // 선택된 해파리 아이콘 찾기
    document.querySelectorAll(".selected-jelly img").forEach(jelly => {
        const jellyName = jelly.alt.trim(); //  이미지 alt 속성에서 해파리 이름 가져오기
        if (jellyName) {
            selectedJellies.push(jellyName);
        }
    });

    console.log("🔥 선택된 해파리 목록:", selectedJellies); //  디버깅 로그

    if (selectedJellies.length === 0) {
        console.log("📌 선택된 해파리가 없으므로 전체 게시글을 불러옵니다.");
        getAllBoards(); //  선택된 해파리가 없으면 전체 게시글 다시 불러오기
        return;
    }

    //  선택된 해파리를 올바르게 인코딩하여 API 요청
    const encodedJellies = encodeURIComponent(selectedJellies.join(","));
    const requestUrl = `${backend_url}/api/board/filter?jellies=${encodedJellies}`;

    console.log("🚀 API 요청 URL:", requestUrl); // URL 확인

    fetch(requestUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("📌 필터 적용 후 응답 데이터:", data); //  응답 데이터 확인

            if (data.result && data.result.length > 0) {
                updateBoardList(data.result);
            } else {
                alert("❌ 필터에 해당하는 게시글이 없습니다.");
            }
        })
        .catch(error => {
            console.error("⚠️ 필터 적용 오류:", error);
            alert("❌ 필터 적용 중 오류가 발생했습니다.");
        });
}


// 전체 게시글 불러오기 함수 (페이지네이션 적용)
function getAllBoards(page = currentPage, size = pageSize) {
    // 현재 페이지와 사이즈 갱신
    currentPage = page;
    pageSize = size;
    const url = `${backend_url}/api/board?page=${page}&size=${size}`;

    fetch(url)
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

// 예시로 추가하는 페이지 이동 함수(페이지네이션)
function nextPage() {
    currentPage++;
    getAllBoards(currentPage, pageSize);
    updateCurrentPageDisplay();
}
// 예시로 추가하는 페이지 이동 함수(페이지네이션)
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        getAllBoards(currentPage, pageSize);
        updateCurrentPageDisplay();
    }
}

// 페이지 번호를 화면에 표시하는 함수(페이지네이션)
function updateCurrentPageDisplay() {
    const pageDisplay = document.getElementById("currentPageDisplay");
    if (pageDisplay) {
        pageDisplay.textContent = currentPage;
    }
}

//페이지 사이즈 변경 함수(페이지네이션)
function changePageSize(newSize) {
    pageSize = parseInt(newSize);
    currentPage = 1; // 페이지 사이즈 변경 시 1페이지부터 시작
    getAllBoards(currentPage, pageSize);
    updateCurrentPageDisplay();
}

// 해파리 아이콘 클릭 시 초록 테두리
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

    fetch(`${backend_url}/api/board/search?writerNumber=${encodeURIComponent(writerNumber)}&writerPassword=${encodeURIComponent(writerPassword)}`)
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

// 검색 기능 (내용, 위치, 해파리 종류, 독성을 모두 포함)
function searchBoards() {
    const searchQuery = document.getElementById('searchQuery').value.trim();

    if (!searchQuery) {
        getAllBoards();  // 검색어가 없으면 전체 게시글 다시 불러오기
        return;
    }

    fetch(`${backend_url}/api/board/search/query?query=${encodeURIComponent(searchQuery)}`)
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
            <a href="/board/detail/${board.boardId}">
                <div class="board-row">
                    <span class="no">${board.boardId}</span>
                    <span class="icon"><img src="/images/jelly_icons/노무라입깃.png" alt="해파리 아이콘"></span>
                    <span class="loc">${board.location}</span>
                    <span class="jelly-name">${board.jelly}</span>
                    <span class="report-time">${board.formattedTime}</span>
                    <span class="informant">${board.writer}</span>
                </div>
            </a>
        `;
        boardList.insertAdjacentHTML('beforeend', boardRow);
    });
}
