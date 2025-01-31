let map = null;
let markers = [];

// 지역별 좌표 데이터 -> 수정 필요함 (바닷가 쪽으로)
const regions = {
    "부산": { lat: 35.1796, lng: 129.0756 },
    "강릉": { lat: 37.7519, lng: 128.8761 },
    "영광": { lat: 35.3492, lng: 128.4613 },
    "속초": { lat: 38.2053, lng: 128.5912 },
    "통영": { lat: 34.8532, lng: 128.4163 },
    // 추후 지역 추가 가능
};

function addMarker(lat, lng) {
    //마커 작업
    const position = new naver.maps.LatLng(lat, lng);
    const markerOptions = {
        position: position.destinationPoint(90, 15),
        map: map,
        icon: {
            url: '/images/marker.png',
            size: new naver.maps.Size(50, 50),
            scaledSize: new naver.maps.Size(50, 50),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(25, 25)
        }
    };
    //InfoWindow 작업

    const marker = new naver.maps.Marker(markerOptions);

    const contentString = `
        <div>
            <h3>경보알림!</h3>
            <p>현 위치 어디어디어디 해파리 출현 경보 1등급 발생</p>
        </div>`;

    const infowindow = new naver.maps.InfoWindow({
        content: contentString
    });

    naver.maps.Event.addListener(marker, "click", function() {
        if (infowindow.getMap()) {
            infowindow.close();
        } else {
            infowindow.open(map, marker);
        }
    });

    markers.push(marker);
}

document.addEventListener("DOMContentLoaded", function(){
    const mapDiv = document.getElementById('main-map');

    const mapOptions = {
        center: new naver.maps.LatLng(35.158661, 129.160384),
        zoom: 10,
        minZoom: 7,
        zoomControl: true,
        zoomControlOptions: {
            position: naver.maps.Position.TOP_RIGHT
        }
    };

    map = new naver.maps.Map(mapDiv, mapOptions);

    // 초기 마커 추가
    addMarker(35.158661, 129.160384);
    addMarker(35.168661, 129.160384);
    addMarker(35.178661, 129.160384);
    addMarker(35.188661, 129.160384);
    addMarker(35.198661, 129.160384);

    const htmlMarker = {
        content: `<div style="cursor:pointer;width:50px;height:50px;line-height:42px;font-size:30px;color:black;text-align:center;font-weight:bold;background:url(/images/marker.png);background-size:contain;"></div>`,
        size: new naver.maps.Size(50, 50),
        scaledSize: new naver.maps.Size(50, 50),
        anchor: new naver.maps.Point(25, 25),
    };

    const markerClustering = new MarkerClustering({
        minClusterSize: 2,
        maxZoom: 13,
        map: map,
        markers: markers,
        disableClickZoom: false,
        gridSize: 120,
        icons: [htmlMarker],
        indexGenerator: [1000],
        stylingFunction: function(clusterMarker, count) {
            clusterMarker.getElement().querySelector('div').textContent = count;
        }
    });

    // 드롭다운 이벤트 리스너
    const dropdown = document.getElementById('alert-location');
    dropdown.addEventListener('change', function() {
        const selectedRegion = this.value;
        if (regions[selectedRegion]) {
            const { lat, lng } = regions[selectedRegion];
            const newCenter = new naver.maps.LatLng(lat, lng);
            map.setCenter(newCenter);
            map.setZoom(13); // 원하는 줌 레벨로 설정
        } else {
            alert("선택한 지역의 좌표 정보가 없습니다.");
        }
    });
});

window.navermap_authFailure = function () {
    alert("Naver Map Error");
}
