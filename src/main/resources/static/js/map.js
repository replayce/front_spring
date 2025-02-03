let map = null;
let markers = [];

function addMarker(lat, lng, type) {
    var url_list = ["/images/alert_00.png", "/images/alert_01.png"];

    //마커 작업
    const position = new naver.maps.LatLng(lat, lng);
    const markerOptions = {
        position: position.destinationPoint(90, 15),
        map: map,
        icon: {
            url: url_list[type],
            size: new naver.maps.Size(50, 50),
            scaledSize: new naver.maps.Size(50, 50),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(25, 25)
        }
    };
    //InfoWindow 작업

    const marker = new naver.maps.Marker(markerOptions);

//    const contentString = `
//        <div>
//            <h3>경보알림!</h3>
//            <p>현 위치 어디어디어디 해파리 출현 경보 1등급 발생</p>
//        </div>`;
//
//    const infowindow = new naver.maps.InfoWindow({
//        content: contentString
//    });

    naver.maps.Event.addListener(marker, "click", function() {
//        if (infowindow.getMap()) {
//            infowindow.close();
//        } else {
//            infowindow.open(map, marker);
//        }
    });

    markers.push(marker);
}

document.addEventListener("DOMContentLoaded", function(){
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

//    addMarker(35.198661, 129.160384);
    oceanInfoList.forEach(item => {
        var type = 0;  // 0:없음, 1:있음
        addMarker(item.oceanLat, item.oceanLon, type);
    });

    const htmlMarker = {
        content: `<div style="cursor:pointer;width:70px;height:70px;line-height:56px;font-size:26px;color:black;text-align:center;font-weight:bold;background:url(/images/N_alert_01.png);background-size:contain;"></div>`,
        size: new naver.maps.Size(70, 70),
        scaledSize: new naver.maps.Size(70, 70),
        anchor: new naver.maps.Point(35, 35),
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
        if (oceanInfoObj[selectedRegion]) {
            const { oceanLat, oceanLon } = oceanInfoObj[selectedRegion];
            const newCenter = new naver.maps.LatLng(oceanLat, oceanLon);
            map.setCenter(newCenter);
            map.setZoom(12); // 원하는 줌 레벨로 설정
        } else {
            alert("선택한 지역의 좌표 정보가 없습니다.");
        }
    });
});

window.navermap_authFailure = function () {
    alert("Naver Map Error");
}
