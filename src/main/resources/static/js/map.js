let map = null;
let markers = [];

function changeJellyAlert(beach_id) {
    // 알람 초기화
    $("div.jelly-list > div.jelly-character").removeClass("jelly-alert");
    $("div.jelly-list > div.jelly-character > div.jelly-rate").hide();
    $("div.jelly-list > div.jelly-character > div.jelly-density").removeClass("jelly-density-high").removeClass("jelly-density-low");

    // 알람이 아니면 끝
    if (!alertObj[beach_id]) return;

    // 알람 셋팅
    alertObj[beach_id].forEach(item => {
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

function addMarker(lat, lng, type, beach_id) {
    var url_list = ["/images/alert_00.png", "/images/alert_01.png"];

    // 마커 작업
    const position = new naver.maps.LatLng(lat, lng);
    const markerOptions = {
        position: position.destinationPoint(90, 15),
        map: map,
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

    markers.push(marker);
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
    oceanInfoList.forEach(item => {
        addMarker(item.oceanLat, item.oceanLon, !alertObj[item.id] ? 0 : 1, item.id);
    });

    // 드롭다운 이벤트 리스너
    const dropdown = document.getElementById('alert-location');
    dropdown.addEventListener('change', function () {
        const selectedRegion = this.value;
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
