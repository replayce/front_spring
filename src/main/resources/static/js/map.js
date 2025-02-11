let map = null;
let markers = [];
let markersObj = {};

function changePredictDate(date) {
    for (const key in markersObj) {
        markersObj[key].forEach(item => {
            item.setMap(null);
        });
    }

    // all reset 이후 진행해야 될 듯
    markersObj[date].forEach(item => {
        item.setMap(map);
    });
}

function changeJellyAlert(beach_id) {
    // 알람 초기화
    $("div.jelly-list > div.jelly-character").removeClass("jelly-alert");
    $("div.jelly-list > div.jelly-character > div.jelly-rate").hide();
    $("div.jelly-list > div.jelly-character > div.jelly-density").removeClass("jelly-density-high").removeClass("jelly-density-low");

    var selectedDateFormat = selectedDate.toISOString().split("T")[0];
    var selectObj = null;
    if (isToday(selectedDate)) {
        selectObj = alertObj[beach_id];
    }
    else {
        selectObj = futureObj[selectedDateFormat];
        if (selectObj) {
            selectObj = selectObj[beach_id];
        }
    }

    // 알람이 아니면 끝
    if (!selectObj) return;

    // 알람 셋팅
    selectObj.forEach(item => {
        var jellyDiv = $(`div.jelly-list > div.jelly-character[data-name="${item["jelly"]}"]`);
        jellyDiv.addClass("jelly-alert");
        jellyDiv.find("div.jelly-rate").text(`예측 출현율\n${parseInt(item["percentLoc"])}%`).show();
        if (item['densityPred'] == 1) {
            jellyDiv.find("div.jelly-density").addClass("jelly-density-low");
        } else {
            jellyDiv.find("div.jelly-density").addClass("jelly-density-high");
        }
    });
}

function addMarker(lat, lng, type, beach_id, is_view) {
    var url_list = ["/images/alert_00.png", "/images/alert_01.png"];

    // 마커 작업
    const position = new naver.maps.LatLng(lat, lng);
    const markerOptions = {
        position: position.destinationPoint(90, 15),
        map: is_view ? map : null,
        icon: {
            url: url_list[type],
            size: new naver.maps.Size(25, 25),
            scaledSize: new naver.maps.Size(25, 25),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(12.5, 12.5)
        }
    };

    const marker = new naver.maps.Marker(markerOptions);

    // 🔥 alert_00이면 둥둥 애니메이션, alert_01이면 떨리는 애니메이션 추가
    setTimeout(() => {
        const markerEl = marker.getElement();
        if (type === 0) {
            markerEl.classList.add("floating-marker");  // 둥둥 애니메이션 적용
        } else {
            markerEl.classList.add("shaking-marker");  // 떨림 애니메이션 적용
        }
    }, 500); // 마커가 생성된 후 애니메이션 추가

    naver.maps.Event.addListener(marker, "click", function(e) {
        // Select 변경
        $('#alert-location').val(beach_id);
        changeJellyAlert(beach_id);
    });

    return marker;
}

document.addEventListener("DOMContentLoaded", function () {
    const mapDiv = document.getElementById('main-map');

    const mapOptions = {
        center: new naver.maps.LatLng(35.909677, 127.885045),
        zoom: 7,
        minZoom: 7,
        zoomControl: true,
        zoomControlOptions: {
            position: naver.maps.Position.TOP_RIGHT
        }
    };

    map = new naver.maps.Map(mapDiv, mapOptions);

    // 마커 추가
    let todayDate = new Date();
    todayDate = todayDate.toISOString().split("T")[0];
    for (let i = 0; i <= 7; i++) {
        let tempDate = new Date();
        tempDate.setDate(tempDate.getDate() + i);
        markersObj[tempDate.toISOString().split("T")[0]] = [];
    }

    oceanInfoList.forEach(item => {
        for (const key in markersObj){
            if (key == todayDate) {
                markersObj[key].push(addMarker(item.oceanLat, item.oceanLon, !alertObj[item.id] ? 0 : 1, item.id, true));
            }
            else {
                type = !futureObj[key] ? 0 : !futureObj[key][item.id] ? 0 : 1;
                markersObj[key].push(addMarker(item.oceanLat, item.oceanLon, type, item.id, false));
            }
        }
    });

    // 드롭다운 이벤트 리스너
    const dropdown = document.getElementById('alert-location');
    dropdown.addEventListener('change', function () {
        const selectedRegion = this.value;
        if($(`#jelly-alert-dropdown option[value="${selectedRegion}"]`).length > 0) {
            $('#jelly-alert-dropdown').val(selectedRegion);
        }
        else {
            $('#jelly-alert-dropdown').val('');
        }

        if (oceanInfoObj[selectedRegion]) {
            const { oceanLat, oceanLon } = oceanInfoObj[selectedRegion];
            const newCenter = new naver.maps.LatLng(oceanLat, oceanLon);
            map.setCenter(newCenter);
            map.setZoom(12); // 원하는 줌 레벨로 설정

            changeJellyAlert(selectedRegion);
        } else {
            alert("선택한 지역의 좌표 정보가 없습니다.");
        }
    });
});

// 네이버 지도 API 오류 처리
window.navermap_authFailure = function () {
    alert("Naver Map Error");
};

// 예측된 해파리 출현 지역이 몇곳인지 //
function updateJellyAlertCount() {
    let alertKeys = Object.keys(alertObj);

    var tempDate = selectedDate;
    if (!selectedDate) {
        tempDate = new Date();
    }
    var selectedDateFormat = tempDate.toISOString().split("T")[0];
    if (isToday(tempDate)) {
        alertKeys = Object.keys(alertObj);
    }
    else {
        if (!futureObj[selectedDateFormat]) {
            alertKeys = [];
        }
        else {
            alertKeys = Object.keys(futureObj[selectedDateFormat]);
        }
    }

    let count = alertKeys.length;
    document.getElementById("jelly-alert-count").textContent = `예측 출현수: ${count} 지역`;

    let dropdown = document.getElementById("jelly-alert-dropdown");
    dropdown.innerHTML = `<option value="" selected disabled>출현 지역 선택</option>`;

    alertKeys.forEach(beachId => {
        if (oceanInfoObj[beachId]) {
            let option = document.createElement("option");
            option.value = beachId;
            option.textContent = oceanInfoObj[beachId].oceanTitle; // 해당 지역 이름
            dropdown.appendChild(option);
        }
    });
}

document.addEventListener("DOMContentLoaded", function(){
    const mapDiv = document.getElementById('main-map');

    // 예측된 해파리 지역 개수 초기화 및 드롭다운 목록 업데이트
    updateJellyAlertCount();

    // 드롭다운에서 특정 해파리 출현 지역 선택 시, 해당 지역으로 이동
    const dropdown = document.getElementById("jelly-alert-dropdown");
    dropdown.addEventListener("change", function() {
        let selectedRegion = this.value;

        $('#alert-location').val(selectedRegion);

        if (oceanInfoObj[selectedRegion]) {
            const { oceanLat, oceanLon } = oceanInfoObj[selectedRegion];
            const newCenter = new naver.maps.LatLng(oceanLat, oceanLon);
            map.setCenter(newCenter);
            map.setZoom(12); // 확대해서 보기

            changeJellyAlert(selectedRegion);
        }
    });
});

