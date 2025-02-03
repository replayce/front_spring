// ----------------------- 해파리 판별 ---------------------//
document.getElementById("jellyfish-photo").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("preview-image").src = e.target.result;
            document.getElementById("preview-image").style.display = "block";
            document.querySelector(".upload-text").style.display = "none";

            // 🟢 해파리 종류 입력창을 올바르게 선택하도록 수정
            const jellyfishTypeInput = document.getElementById("jellyfish-type"); 

            if (jellyfishTypeInput) {
                // 여기서 해파리 판별 AI API를 호출하여 이름을 자동 입력하도록 구현 가능
                fetchJellyfishTypeFromAPI(file).then(jellyfishName => {
                    jellyfishTypeInput.value = jellyfishName;
                }).catch(() => {
                    jellyfishTypeInput.value = "해파리 판별 실패 😢";
                });
            } else {
                console.error("❌ 해파리 입력창을 찾을 수 없음!");
            }
        };
        reader.readAsDataURL(file);
    }
});

// 🟢 해파리 판별 API 호출 함수 (실제 API 연결 필요)
async function fetchJellyfishTypeFromAPI(file) {
    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await fetch("YOUR_JELLYFISH_AI_API_URL", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`API 오류: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.jellyfish_name || "알 수 없는 해파리";
    } catch (error) {
        console.error("❌ 해파리 판별 오류:", error);
        return "해파리 판별 실패 😢";
    }
}
// ------------------ 해파리 판별 -------------------- //

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
    const apiKey = "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"; // 🔴 생성한 API 키를 안전한 곳에서 가져오기
    const reporterInput = document.getElementById("reporter-name");

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
                { role: "user", content: "귀여운 해파리의 별명을 만들어줘. 형식: '노란 모자 해파리' 또는 '파란 리본 해파리'." }
            ],
            max_tokens: 10,  // 비용 절감을 위해 10토큰 제한
            temperature: 0.7
        })
    });

    const data = await response.json();
    if (data.choices && data.choices[0] && data.choices[0].message) {
        reporterInput.value = data.choices[0].message.content.trim();
    } else {
        reporterInput.value = "이름 생성 실패 😢";
    }
}

// 버튼 클릭 시 실행
document.getElementById("auto-generate-btn").addEventListener("click", generateJellyfishNameWithOpenAI);
