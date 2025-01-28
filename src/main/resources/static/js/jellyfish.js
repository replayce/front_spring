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

    // 슬라이드(아이콘) 이미지 추가 (클론 포함)
    function loadSliderImages() {
        // [1] 마지막 아이템 "클론"을 맨 앞에 추가 (index 넘기지 않음)
        const lastClone = createJellyDiv(jellyData[ totalItems - 1 ]);
        sliderImagesContainer.appendChild(lastClone);

        // [2] 모든 "실제" 아이템 추가 (index 부여)
        jellyData.forEach((jelly, index) => {
            const jellyDiv = createJellyDiv(jelly, index);
            sliderImagesContainer.appendChild(jellyDiv);
        });

        // [3] 첫 번째 아이템 "클론"을 맨 뒤에 추가 (index 넘기지 않음)
        const firstClone = createJellyDiv(jellyData[0]);
        sliderImagesContainer.appendChild(firstClone);
    }

    // 헬퍼 함수: 해파리 div 생성
    // index가 null이 아니면 data-index 부여 (실제 아이템)
    // index가 null이면(클론) data-index 없음
    function createJellyDiv(jelly, index = null) {
        const jellyDiv = document.createElement('div');
        jellyDiv.classList.add('jelly-character');

        const img = document.createElement('img');
        img.src = jelly.iconimage;
        img.alt = jelly.name;
        jellyDiv.appendChild(img);

        // 실제 해파리에만 data-index와 클릭 이벤트 부여
        if (index !== null) {
            jellyDiv.setAttribute('data-index', index);
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

    // 중앙 슬라이드 / 상세정보 업데이트
    function updateContent() {
        const jelly = jellyData[currentIndex];

        // [1] 슬라이더 위치 조정 (클론 감안해서 currentIndex + 1)
        const sliderWidth = 166;
        sliderImagesContainer.style.transition = 'transform 0.5s ease-in-out';
        sliderImagesContainer.style.transform = `translateX(-${(currentIndex + 1) * sliderWidth}px)`;

        // [2] 드롭다운도 현재 인덱스로
        jellySelect.value = currentIndex;

        // [3] 상세 정보 업데이트
        jellyImage.src = jelly.mainimage;
        jellyImage.alt = jelly.name;
        jellyDescription.textContent = jelly.description;
        jellyCountermeasures.textContent = jelly.countermeasures;

        // [4] 모든 슬라이드에 active 제거 -> 현재 인덱스 슬라이드만 active 부여
        const allSlides = document.querySelectorAll('.jelly-character');
        allSlides.forEach(slide => slide.classList.remove('active'));

        // data-index가 currentIndex와 같은 슬라이드에 active
        const currentSlide = document.querySelector(`.jelly-character[data-index="${currentIndex}"]`);
        if (currentSlide) {
            currentSlide.classList.add('active');
        }
    }

    // 화살표 클릭 이벤트 (좌측)
    leftArrow.addEventListener('click', () => {
        if (currentIndex <= 0) {
            currentIndex = totalItems - 1;
        } else {
            currentIndex--;
        }
        updateContent();
    });

    // 화살표 클릭 이벤트 (우측)
    rightArrow.addEventListener('click', () => {
        if (currentIndex >= totalItems - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateContent();
    });

    // 슬라이더 끝 도달 시, 무한 루핑 처리
    sliderImagesContainer.addEventListener('transitionend', () => {
        const slides = document.querySelectorAll('.jelly-character');

        // 만약 (currentIndex + 1) 위치의 슬라이드가 "클론" (data-index 없음)이라면 보정 필요
        if (slides[currentIndex + 1] &&
            !slides[currentIndex + 1].hasAttribute('data-index')) {

            // 왼쪽 끝을 넘었을 경우
            if (currentIndex === -1) {
                sliderImagesContainer.style.transition = 'none';
                currentIndex = totalItems - 1;
                sliderImagesContainer.style.transform =
                    `translateX(-${(currentIndex + 1) * 166}px)`;

                // 오른쪽 끝을 넘었을 경우
            } else if (currentIndex === totalItems) {
                sliderImagesContainer.style.transition = 'none';
                currentIndex = 0;
                sliderImagesContainer.style.transform =
                    `translateX(-${(currentIndex + 1) * 166}px)`;
            }

            // 한 프레임 뒤 transition 복구 (점프 시 애니메이션 방지)
            requestAnimationFrame(() => {
                sliderImagesContainer.style.transition = 'transform 0.5s ease-in-out';
            });

            // 인덱스 보정 후 재호출 -> .active 등 정상 적용
            updateContent();
        }
    });

    // 드롭다운 변경 시 해당 해파리로
    jellySelect.addEventListener('change', (e) => {
        const selectedIndex = parseInt(e.target.value);
        if (!isNaN(selectedIndex)) {
            currentIndex = selectedIndex;
            updateContent();
        }
    });

    // 초기 세팅
    loadSliderImages();   // 슬라이드/클론 로드
    loadDropdown();       // 드롭다운 로드

    // 첫 번째 실제 슬라이드 위치로 강제 이동
    sliderImagesContainer.style.transform = `translateX(-166px)`;

    // 해파리 데이터가 있다면 첫 번째(0번째) 아이템으로 업데이트
    if (jellyData.length > 0) {
        updateContent();
    }
});
