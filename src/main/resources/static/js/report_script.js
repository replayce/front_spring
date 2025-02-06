// ----------------------- 해파리 판별 & 이미지 업로드 ---------------------//

document.addEventListener("DOMContentLoaded", function () {
    // 🟢 "등록하기" 버튼 클릭 이벤트 등록
    document.querySelector(".submit-btn").addEventListener("click", function (event) {
        event.preventDefault(); // 기본 폼 제출 방지
        console.log("🚀 등록 버튼 클릭됨!");
        submitReport();
    });

    // 🟢 사진 업로드 시 실행 (해파리 판별 API 호출)
    document.getElementById("jellyfish-photo").addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            previewImage(file);
            uploadImageToServer(file);
        }
    });

    // 🟢 "이름 자동 생성" 버튼 클릭 시 실행 (랜덤 해파리 이름 생성)
    document.getElementById("auto-generate-btn").addEventListener("click", generateJellyfishNameWithOpenAI);
});

// 🟢 (1) 이미지 미리보기 함수
function previewImage(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("preview-image").src = e.target.result;
        document.getElementById("preview-image").style.display = "block";
        document.querySelector(".upload-text").style.display = "none";
    };
    reader.readAsDataURL(file);
}

// 🟢 (2) 스토리지에 이미지 업로드
async function uploadImageToServer(file) {
    let formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("/upload", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`이미지 업로드 실패: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        if (data.result) {
            console.log("🟢 이미지 업로드 성공:", data.result);
            document.getElementById("jellyfish-image-url").value = data.result;
            fetchJellyfishTypeFromAPI(data.result);
        } else {
            throw new Error("이미지 URL 없음");
        }
    } catch (error) {
        console.error("❌ 이미지 업로드 오류:", error);
    }
}

// 🟢 (3) Python 서버에 이미지 판별 요청
async function fetchJellyfishTypeFromAPI(imageUrl) {
    try {
        const response = await fetch(`http://localhost:8082/image/predict?imageUrl=${encodeURIComponent(imageUrl)}`, {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error(`AI 판별 실패: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        document.getElementById("jellyfish-type").value = data.result.jellyfish || "해파리 판별 실패 😢";
    } catch (error) {
        console.error("❌ 해파리 판별 오류:", error);
        document.getElementById("jellyfish-type").value = "해파리 판별 실패 😢";
    }
}

// 미래 시간 선택 불가능
function validateDateTime() {
    const dateInput = document.getElementById("date-input").value;
    const hourInput = parseInt(document.getElementById("hour-input").value, 10);
    const minuteInput = parseInt(document.getElementById("minute-input").value, 10);

    // 현재 시간 가져오기
    const now = new Date();
    const selectedDate = new Date(dateInput);

    // 선택한 날짜의 시간과 분 설정
    selectedDate.setHours(hourInput);
    selectedDate.setMinutes(minuteInput);

    // 🔴 미래 시간이면 등록 불가능
    if (selectedDate > now) {
        alert("❌ 미래 날짜 및 시간은 선택할 수 없습니다.");
        return false;
    }

    return true;
}


// 빈값 있으면 등록 불가능
function validateForm() {
    let requiredFields = [
        { id: "location-dropdown", name: "목격 위치" },
        { id: "date-input", name: "목격 날짜" },
        { id: "hour-input", name: "목격 시간" },
        { id: "minute-input", name: "목격 분" },
        { id: "reporter-name", name: "제보자 이름" },
        { id: "phone-number", name: "핸드폰 번호" },
        { id: "password", name: "비밀번호" },
        { id: "confirm-password", name: "비밀번호 확인" },
        { id: "jellyfish-type", name: "해파리" }
    ];

    for (let field of requiredFields) {
        let element = document.getElementById(field.id);
        let value = element?.value?.trim();

        if (!value) {
            alert(`❌ 입력되지 않은 값이 있습니다: ${field.name}`);
            return false;
        }
    }

    // 🔴 비밀번호 확인
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirm-password").value.trim();
    if (password !== confirmPassword) {
        alert("❌ 비밀번호가 일치하지 않습니다.");
        return false;
    }

    return true;
}

// 🟢 (4) 등록하기 요청
async function submitReport() {
    if (!validateForm()) {
        return; // ❌ 유효성 검사 실패 시 등록 중단
    }

    if (!validateDateTime()) {
        return; // ❌ 미래 날짜/시간/분이 입력되었으면 등록 중단
    }

    let reportData = {
        content: "",
        writer: document.getElementById("reporter-name").value,
        writerNumber: document.getElementById("phone-number").value,
        writerPassword: document.getElementById("password").value,
        imageUrl: document.getElementById("jellyfish-image-url").value,
        date: document.getElementById("date-input").value,
        hour: parseInt(document.getElementById("hour-input").value, 10),
        minute: parseInt(document.getElementById("minute-input").value, 10),
        location: document.getElementById("location-dropdown").value,
        jelly: document.getElementById("jellyfish-type").value,
        description: document.querySelector(".description").value.trim() || "", // 선택 입력 가능
    };

    try {
        const response = await fetch("/board", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reportData),
        });

        if (!response.ok) {
            throw new Error(`등록 실패: ${response.status} ${response.statusText}`);
        }

        alert("등록 성공!");
        window.location.href = "/board";
    } catch (error) {
        console.error("❌ 등록 오류:", error);
        alert("등록에 실패했습니다.");
    }
}

// ------------------ 해파리 판별 & 이미지 업로드 -------------------- //


// ------------------- 위치 기반 버튼 ----------------------//

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const locationField = document.getElementById("location-coordinates");
                const locationDropdown = document.getElementById("location-dropdown");

                // 위도·경도 입력 필드 업데이트
                locationField.value = `위도: ${latitude.toFixed(6)}, 경도: ${longitude.toFixed(6)}`;
                locationField.style.display = "block"; // 위치 정보를 보이게 설정

                // 미리 지정된 지역 목록 (위도, 경도 값 포함)
                const locations = [
                    { name: "부산", lat: 35.1796, lon: 129.0756 },
                    { name: "제주도", lat: 33.4996, lon: 126.5312 },
                    { name: "강릉", lat: 37.7518, lon: 128.8761 }
                ];

                // 현재 위치와 가장 가까운 지역 찾기
                let closestLocation = locations[0];
                let minDistance = getDistance(latitude, longitude, closestLocation.lat, closestLocation.lon);

                for (let i = 1; i < locations.length; i++) {
                    const distance = getDistance(latitude, longitude, locations[i].lat, locations[i].lon);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestLocation = locations[i];
                    }
                }

                // 가장 가까운 지역을 드롭다운에서 자동 선택
                for (let i = 0; i < locationDropdown.options.length; i++) {
                    if (locationDropdown.options[i].text === closestLocation.name) {
                        locationDropdown.selectedIndex = i;
                        break;
                    }
                }
            },
            function (error) {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert("위치 액세스 권한이 거부되었습니다. 위치 권한을 허용해주세요.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("위치 정보를 가져올 수 없습니다.");
                        break;
                    case error.TIMEOUT:
                        alert("위치 요청 시간이 초과되었습니다.");
                        break;
                    case error.UNKNOWN_ERROR:
                        alert("알 수 없는 오류가 발생했습니다.");
                        break;
                }
            }
        );
    } else {
        alert("이 브라우저에서는 위치 기반 서비스를 지원하지 않습니다.");
    }
}

// 두 지점 간 거리 계산 (Haversine 공식 사용)
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // 지구 반지름 (km)
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// 각도 → 라디안 변환 함수
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// ------------------- 위치 기반 버튼 ----------------------//

// ----------------- 이름 자동 생성 --------------------//

async function generateJellyfishNameWithOpenAI() {
    const apiKey = "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"; // 🔴 OpenAI API 키 입력
    const reporterInput = document.getElementById("reporter-name");

    console.log("🔵 OpenAI API 요청 시작...");

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "너는 해파리 이름을 만드는 AI야." },
                    { role: "user", content: "귀여운 해파리의 별명을 만들어줘. 아래 예시 중 '한 가지' 형식을 무작위로 선택해서 만들되, 반드시 '해파리'로 끝나야 하며 문장은 15자 이내로 짧고 자연스러워야 해.: " +
                            "\n\n1. '노란 모자 해파리' 같은 패션 스타일 " +
                            "\n2. '춤추는 파란 해파리' 같은 동작 기반 " +
                            "\n3. '빛나는 해파리' 같은 자연현상 기반 " +
                            "\n4. '바다의 요정 해파리' 같은 판타지 스타일 " +
                            "\n5. '핑크 솜사탕 해파리' 같은 색상과 질감 기반"
                    }
                ],
                max_tokens: 15,
                temperature: 0.7
            })
        });

        console.log("🟢 API 응답 상태 코드:", response.status);

        if (!response.ok) {
            const errorText = await response.text(); // ❗ 오류 메시지 가져오기
            console.error("❌ API 오류:", response.status, response.statusText, errorText);
            alert(`API 오류 발생: ${response.status} ${response.statusText}\n${errorText}`);
            return;
        }

        const data = await response.json();
        console.log("🟡 API 응답 데이터:", data);

        if (data.choices && data.choices[0] && data.choices[0].message) {
            // ✅ 불필요한 중복 제거
            let name = data.choices[0].message.content.trim().replace(/["']/g, "");

            // 🔴 "해" 또는 "해파"로 끝나면 "해파리"로 변환
            if (name.endsWith("해")) {
                name = name.replace(/해$/, "해파리");
            } else if (name.endsWith("해파")) {
                name = name.replace(/해파$/, "해파리");
            }

            // 🔴 "해 해파리" 같은 중복 방지
            name = name.replace(/해\s?해파리$/, "해파리");
            name = name.replace(/해파\s?해파리$/, "해파리");

            reporterInput.value = name;
            console.log("✅ 입력창 업데이트 완료:", reporterInput.value);
        } else {
            console.error("❌ API 응답이 비어 있음:", data);
            reporterInput.value = "이름 생성 실패 😢";
        }
    } catch (error) {
        console.error("❌ API 호출 오류:", error);
        alert("API 요청 중 오류 발생. 콘솔에서 로그를 확인하세요.");
    }
}

// 뒤로가기 버튼
function goBack() {
    console.log("🔙 뒤로 가기 버튼 클릭됨!");
    window.history.back(); // 🔴 이전 페이지로 이동
}


// 버튼 클릭 시 실행
document.getElementById("auto-generate-btn").addEventListener("click", generateJellyfishNameWithOpenAI);
