const jellyData = [
    {
        name: "노무라입깃해파리",
        iconimage: "/images/jelly_icons/노무라입깃.png",
        mainimage: "/images/jelly_images/노무라입깃.png",
        description: "노무라입깃 해파리는 독성이 강한 해파리로 주의가 필요합니다.",
        countermeasures: "피부에 닿으면 물로 씻어내고 즉시 병원을 방문하세요."
    },
    {
        name: "보름달물해파리",
        iconimage: "/images/jelly_icons/보름달물.png",
        mainimage: "/images/jelly_images/보름달물.png",
        description: "보름달물 해파리는 ... (상세 설명을 여기에 입력하세요)",
        countermeasures: "보름달물에 대한 대처 방안은 ... (대처 방안을 여기에 입력하세요)"
    },
    {
        name: "두빛보름달해파리",
        iconimage: "/images/jelly_icons/두빛보름달.png",
        mainimage: "/images/jelly_images/두빛보름달.jpg",
        description: "두빛보름달 해파리는 ... (상세 설명을 여기에 입력하세요)",
        countermeasures: "두빛보름달물에 대한 대처 방안은 ... (대처 방안을 여기에 입력하세요)"
    },
    {
        name: "야광원양해파리",
        iconimage: "/images/jelly_icons/야광원양.png",
        mainimage: "/images/jelly_images/야광원양.jpg",
        description: "야광원양 해파리는 ... (상세 설명을 여기에 입력하세요)",
        countermeasures: "야광원양에 대한 대처 방안은 ... (대처 방안을 여기에 입력하세요)"
    },
    {
        name: "유령해파리",
        iconimage: "/images/jelly_icons/유령.png",
        mainimage: "/images/jelly_images/유령.jpg",
        description: "유령 해파리는 ... (상세 설명을 여기에 입력하세요)",
        countermeasures: "유령에 대한 대처 방안은 ... (대처 방안을 여기에 입력하세요)"
    },
    {
        name: "작은상자해파리",
        iconimage: "/images/jelly_icons/작은상자.png",
        mainimage: "/images/jelly_images/작은상자.jpg",
        description: "크기: 3cm 내외의 소형종" +
            "형태 및 특징: 머리가 작은 박스 모양이며 투명하다. 머리 아래에 4개의 촉수가 붙어 있는데 평소에는 길게 늘어나 있지만 순식간에 짧게 오므라 들기도 한다. " +
            "움직임이 매우 빠르고 몸체가 투명하여 물 속에서 발견하기 어려울 때가 많다. 독성이 매우 강하여 주의가 요구된다." +
            "출현시기 및 분포: 6~9월까지 주로 한여름에 출현한다. 남해 앵강만 동해 제주도 일대에서 출현한다.",
        countermeasures: "채찍모양의 상처 주변부위가 급격히 부어오름. 식초를 이용한 응급처치 가능"
    },
    {
        name: "커튼원양해파리",
        iconimage: "/images/jelly_icons/커튼원양.png",
        mainimage: "/images/jelly_images/커튼원양.jpg",
        description: "커튼원양 해파리는 ... (상세 설명을 여기에 입력하세요)",
        countermeasures: "커튼원양에 대한 대처 방안은 ... (대처 방안을 여기에 입력하세요)"
    },
    {
        name: "푸른우산관해파리",
        iconimage: "/images/jelly_icons/푸른우산관.png",
        mainimage: "/images/jelly_images/푸른우산관.jpg",
        description: "푸른우산관 해파리는 ... (상세 설명을 여기에 입력하세요)",
        countermeasures: "푸른우산관에 대한 대처 방안은 ... (대처 방안을 여기에 입력하세요)"
    },
    {
        name: "기수식용(숲뿌리)해파리",
        iconimage: "/images/jelly_icons/기수식용(숲뿌리).png",
        mainimage: "/images/jelly_images/기수식용(숲뿌리).jpg",
        description: "기수식용(숲뿌리) 해파리는 ... (상세 설명을 여기에 입력하세요)",
        countermeasures: "기수식용(숲뿌리)에 대한 대처 방안은 ... (대처 방안을 여기에 입력하세요)"
    },
];

document.addEventListener('DOMContentLoaded', () => {
    const sliderImagesContainer = document.querySelector('.slider-images');
    const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow');
    const jellySelect = document.getElementById('jelly-select');
    const jellyImage = document.getElementById('jelly-image');
    const jellyDescription = document.getElementById('jelly-description-text');
    const jellyCountermeasures = document.getElementById('jelly-countermeasures-text');

    let currentIndex = 0;
    const visibleCount = 3; // 한 번에 보이는 아이콘 수
    const totalItems = jellyData.length;

    // 슬라이더 이미지 추가 (클론 포함)
    function loadSliderImages() {
        // 마지막 아이템 클론을 앞에 추가
        const lastClone = createJellyDiv(jellyData[jellyData.length -1], totalItems -1);
        sliderImagesContainer.appendChild(lastClone);

        // 모든 실제 아이템 추가
        jellyData.forEach((jelly, index) => {
            const jellyDiv = createJellyDiv(jelly, index);
            sliderImagesContainer.appendChild(jellyDiv);
        });

        // 첫 번째 아이템 클론을 뒤에 추가
        const firstClone = createJellyDiv(jellyData[0], 0);
        sliderImagesContainer.appendChild(firstClone);
    }

    // 헬퍼 함수: 해파리 div 생성
    function createJellyDiv(jelly, index = null) {
        const jellyDiv = document.createElement('div');
        jellyDiv.classList.add('jelly-character');

        const img = document.createElement('img');
        img.src = jelly.iconimage; // 파일 확장자 포함
        img.alt = jelly.name;

        jellyDiv.appendChild(img);
        if (index !== null) {
            jellyDiv.setAttribute('data-index', index);
            // 클릭 시 해당 해파리로 이동
            jellyDiv.addEventListener('click', () => {
                currentIndex = index;
                updateContent();
            });
        }
        return jellyDiv;
    }

    // 드롭다운 옵션 추가
    function loadDropdown() {
        jellyData.forEach((jelly, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = jelly.name;
            jellySelect.appendChild(option);
        });
    }

    // 콘텐츠 업데이트 함수 (해파리 이미지 업뎃)
    function updateContent() {
        const jelly = jellyData[currentIndex];
        // 슬라이더 위치 조정 (클론을 고려하여 +1)
        const sliderWidth = 166; // 각 이미지 너비 + 간격 (136 + 30)
        sliderImagesContainer.style.transition = 'transform 0.5s ease-in-out';
        sliderImagesContainer.style.transform = `translateX(-${(currentIndex +1) * sliderWidth}px)`;

        // 드롭다운 선택
        jellySelect.value = currentIndex;

        // 상세 정보 업데이트
        jellyImage.src = jelly.mainimage;
        jellyImage.alt = jelly.name;
        jellyDescription.textContent = jelly.description;
        jellyCountermeasures.textContent = jelly.countermeasures;
    }

    // 화살표 클릭 이벤트
    leftArrow.addEventListener('click', () => {
        if (currentIndex <= 0) {
            currentIndex = totalItems -1;
        } else {
            currentIndex--;
        }
        updateContent();
    });

    rightArrow.addEventListener('click', () => {
        if (currentIndex >= totalItems -1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateContent();
    });

    // 슬라이더의 끝에 도달했을 때 루핑 처리
    sliderImagesContainer.addEventListener('transitionend', () => {
        const slides = document.querySelectorAll('.jelly-character');
        if (slides[currentIndex +1].getAttribute('data-index') === null) {
            // 만약 현재 슬라이드가 클론 슬라이드라면
            sliderImagesContainer.style.transition = 'none';
            if (currentIndex === -1) { // 왼쪽 끝에서 왼쪽으로 이동할 때
                currentIndex = totalItems -1;
                sliderImagesContainer.style.transform = `translateX(-${(currentIndex +1) * 166}px)`;
            } else if (currentIndex === totalItems) { // 오른쪽 끝에서 오른쪽으로 이동할 때
                currentIndex = 0;
                sliderImagesContainer.style.transform = `translateX(-${(currentIndex +1) * 166}px)`;
            }
        }
    });

    // 드롭다운 변경 이벤트
    jellySelect.addEventListener('change', (e) => {
        const selectedIndex = parseInt(e.target.value);
        if (!isNaN(selectedIndex)) {
            currentIndex = selectedIndex;
            updateContent();
        }
    });

    // 초기 로드
    loadSliderImages();
    loadDropdown();

    // 첫 번째 실제 슬라이드 위치로 설정
    sliderImagesContainer.style.transform = `translateX(-166px)`;

    if(jellyData.length > 0)
        updateContent();
});