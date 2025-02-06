// 전역 변수 (페이지네이션)
let currentPage = 1;
let pageSize = 12; // 항상 12개씩
// 전역 변수: 현재 검색어 (검색 모드 여부 확인)
let currentSearchQuery = "";
let totalPages = 1;

// 페이지 로드 시 전체 게시글 호출 (초기 상태: 검색어 없음)
document.addEventListener("DOMContentLoaded", function () {
    setupJellyFilters();
    getAllBoards(); // 기본: 1페이지, 12개
    const searchInput = document.getElementById("searchQuery");
    if (searchInput) {
        searchInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                initiateSearch(); // 엔터 시 검색
            }
        });
    }
});

// 해파리 필터 기능 초기화
function setupJellyFilters() {
    const jellyCharacters = document.querySelectorAll(".jelly-character");
    jellyCharacters.forEach(jelly => {
        jelly.addEventListener("click", function (event) {
            event.preventDefault();
            this.blur();
            // 토글 클래스로 초록색 테두리 적용
            this.classList.toggle("selected-jelly");
            console.log("✅ 선택된 해파리:", this.getAttribute("data-name"));
        });
    });
    const filterButton = document.querySelector(".filter");
    if (filterButton) {
        filterButton.addEventListener("click", function () {
            console.log("🔍 필터 적용 버튼 클릭됨!");
            applyJellyFilter();
        });
    }
}

// 선택된 해파리 필터 적용 함수
function applyJellyFilter(page = currentPage, size = pageSize) {
    const selectedJellies = [];
    // .selected-jelly가 적용된 요소(즉, <div class="jelly-character selected-jelly">)에서 data-name 값을 읽음
    document.querySelectorAll(".selected-jelly").forEach(jellyElem => {
        let jellyName = jellyElem.getAttribute("data-name") || "";
        // 만약 키워드에 불필요한 문자열(예: "해파리")가 붙어 있다면 제거
        jellyName = jellyName.replace("해파리", "").trim();
        if (jellyName) {
            selectedJellies.push(jellyName);
        }
    });
    console.log("🔥 선택된 해파리 목록:", selectedJellies);

    if (selectedJellies.length === 0) {
        console.log("📌 선택된 해파리가 없으므로 전체 게시글을 불러옵니다.");
        getAllBoards();
        return;
    }
    // 여러 개 선택된 경우 “|” 로 구분된 정규식 패턴 생성
    const encodedJellies = selectedJellies.map(encodeURIComponent).join(",");
    // 만약 백엔드에서 page와 size를 받도록 했다면 URL에 추가 (예시)
    const requestUrl = `${backend_url}/api/board/filter?jellies=${encodedJellies}&page=${page}&size=${size}`;
    console.log("🚀 API 요청 URL:", requestUrl);

    fetch(requestUrl)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (data.result && data.result.length > 0) {
                updateBoardList(data.result);
            } else {
                alert("필터에 해당하는 게시글이 없습니다.");
            }
        })
        .catch(error => {
            console.error("필터 적용 오류:", error);
            alert("필터 적용 중 오류가 발생했습니다.");
        });
}

// 전체 게시글 불러오기 함수
function getAllBoards(page = currentPage, size = pageSize) {
    currentSearchQuery = ""; // 전체 조회 모드
    currentPage = page;
    pageSize = size;
    const url = `${backend_url}/api/board?page=${page}&size=${size}`;
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            // 만약 totalPages 정보가 포함되어 있다면 업데이트
            if (data.totalPages !== undefined) {
                totalPages = data.totalPages;
                renderPagination(totalPages);
            }
            if (data.result && data.result.length > 0) {
                updateBoardList(data.result);
            } else {
                if (page > 1) {
                    alert("마지막 페이지입니다.");
                    currentPage = page - 1; // 이전 페이지로 복귀
                } else {
                    updateBoardList([]); // 1페이지에서 결과 없으면 빈 목록 표시
                }
            }
        })
        .catch(error => {
            console.error("게시글 불러오기 오류:", error);
        });
}


// --- 추가: 검색 시작 시 1페이지부터 실행하는 함수 ---
function initiateSearch() {
    currentPage = 1; // 검색 시작 시 1페이지로 초기화
    currentSearchQuery = document.getElementById('searchQuery').value.trim();
    searchBoards(currentPage, pageSize);
}

// 검색 기능 (내용, 위치, 해파리 종류, 독성 포함)
function searchBoards(page = currentPage, size = pageSize) {
    // currentPage는 initiateSearch()에서 이미 1로 초기화되었으므로 여기서 재설정하지 않음.
    const searchQuery = document.getElementById('searchQuery').value.trim();
    if (!searchQuery) {
        getAllBoards();
        return;
    }
    currentSearchQuery = searchQuery; // 현재 검색어 저장
    const url = `${backend_url}/api/board/search/query?query=${encodeURIComponent(searchQuery)}&page=${page}&size=${size}`;
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (data.result && data.result.length > 0) {
                updateBoardList(data.result);
            } else {
                if (page > 1) {
                    alert("마지막 페이지입니다.");
                    currentPage = page - 1; // 이전 페이지로 복귀
                } else {
                    alert("검색 결과가 없습니다.");
                    currentPage = 1;
                }
            }
        })
        .catch(error => {
            console.error('검색 오류:', error);
            alert('검색 중 오류가 발생했습니다.');
        });
}

// 내 글 검색 기능
function searchMyBoards(page = currentPage, size = pageSize) {
    currentPage = 1;  // 내 글 검색 시 반드시 1페이지부터
    const writerNumber = document.getElementById('writerNumber').value;
    const writerPassword = document.getElementById('writerPassword').value;
    if (!writerNumber || !writerPassword) {
        alert("핸드폰 번호와 비밀번호를 모두 입력해야 합니다.");
        return;
    }
    currentSearchQuery = ""; // 내 글 검색은 별도 모드
    const url = `${backend_url}/api/board/search?writerNumber=${encodeURIComponent(writerNumber)}&writerPassword=${encodeURIComponent(writerPassword)}&page=${currentPage}&size=${size}`;
    fetch(url)
        .then(async response => {
            const data = await response.json();
            if (!response.ok) throw new Error(data.details || "검색 중 오류가 발생했습니다.");
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

// 페이지 이동 함수
function nextPage() {
    let prevPage = currentPage;
    currentPage++;
    if (currentSearchQuery !== "") {
        searchBoards(currentPage, pageSize);
    } else {
        getAllBoards(currentPage, pageSize);
    }
    // updateCurrentPageDisplay()와 renderPagination()는
    // 검색/전체 호출 후 응답에서 업데이트하도록 하거나 여기서 호출
    updateCurrentPageDisplay();
}
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        if (currentSearchQuery !== "") {
            searchBoards(currentPage, pageSize);
        } else {
            getAllBoards(currentPage, pageSize);
        }
        updateCurrentPageDisplay();
    }
}
function updateCurrentPageDisplay() {
    const pageDisplay = document.getElementById("currentPageDisplay");
    if (pageDisplay) pageDisplay.textContent = currentPage;
}

// --- 추가: 페이지 번호 버튼 렌더링 (총 페이지 수를 받아서 최대 5개 번호 버튼 표시) ---
function renderPagination(totalPages) {
    const paginationContainer = document.getElementById("paginationNumbers");
    paginationContainer.innerHTML = ""; // 기존 내용 삭제
    // 최대 5개 버튼 표시
    const maxDisplay = Math.min(totalPages, 5);
    for (let i = 1; i <= maxDisplay; i++) {
        const span = document.createElement("span");
        span.classList.add("page-number");
        if (i === currentPage) {
            span.classList.add("active");
        }
        span.innerText = i;
        span.onclick = function() {
            currentPage = i;
            if (currentSearchQuery !== "") {
                searchBoards(currentPage, pageSize);
            } else {
                getAllBoards(currentPage, pageSize);
            }
            updateCurrentPageDisplay();
            renderPagination(totalPages);
        }
        paginationContainer.appendChild(span);
    }
}

// 검색 팝업 관련 (동일)
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
    document.getElementById("writerNumber").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            searchMyBoards();
            event.stopPropagation();
        }
    });
    document.getElementById("writerPassword").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            searchMyBoards();
            event.stopPropagation();
        }
    });
}
function closePopup() {
    document.getElementById('search-popup').remove();
    document.getElementById('popup-overlay').remove();
}
function togglePassword() {
    const passwordField = document.getElementById("writerPassword");
    const toggleIcon = document.querySelector(".toggle-password");
    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleIcon.textContent = "🙈";
    } else {
        passwordField.type = "password";
        toggleIcon.textContent = "👁️";
    }
}

// 게시판 목록 업데이트 함수
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
