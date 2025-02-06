const jellyData = [
    {
        name: "노무라입깃해파리",
        iconimage: "/images/jelly_icons/노무라입깃.png",
        mainimage: "/images/jelly_images/노무라입깃.jpg",
        description: {
            size: "최대 길이 2m, 최대 무게 150kg",
            feature: "최대무게 150kg에 머리부분은 연한 갈색을 띄고 단단하며 촉수는 검붉은색이다. " +
                "입다리 부분에 부착된 촉수는 양이 매우 많고 길게 늘어뜨릴 수 있어 10m에 달하기도 한다. " +
                "입다리 표면에 있는 작은 구멍들이 입의 역할을 한다. 주로 동물플랑크톤을 먹이로 한다. " +
                "촉수의 양이 많아 한 개체만 출현해도 여러명에게 쏘임사고를 유발할 수 있다.",
            distribution: "우리나라 전역에서 출현. " +
                "6월경 제주 이남에서 가장 먼저 출현하기 시작하여 12월 초순까지 출현.",
        },
        countermeasures: "홍반을 동반한 채찍 모양의 상처를 유발함. <br>" +
            "독성이 강함."
    },
    {
        name: "보름달물해파리",
        iconimage: "/images/jelly_icons/보름달물.png",
        mainimage: "/images/jelly_images/보름달물.png",
        description: {
            size:"15cm 내외",
            feature:"몸체는 접시처럼 편평한 형태이며 전체적으로 반투명한 우유빛깔을 띄고 있다. " +
                "촉수는 길게 늘어뜨려도 2~3cm로 짧고 가늘며 몸체 가장자리를 따라서 촘촘히 붙어있다. " +
                "몸체의 가운데에 4개의 고리모양으로 있는 것이 위와 생식소이다. " +
                "우리나라 전역에서 가장 흔하게 볼 수 있는 종이다. ",
            distribution: "우리나라 전역에서 주로 늦봄부터 늦가을까지 출현 (5~11월)"
        },
        countermeasures: "독성은 약하나 사람에 따라 두드러기 등의 반응이 있을 수 있음."
    },
    {
        name: "두빛보름달해파리",
        iconimage: "/images/jelly_icons/두빛보름달.png",
        mainimage: "/images/jelly_images/두빛보름달.jpg",
        description: {
            size:"30cm 이상",
            feature:"우산은 펼쳤을때 반구형의 편평한 형태이고 움츠렸을때는 원형처럼 보인다. " +
                "우산의 젤리층이 매우 두꺼우며 우산 바깥쪽은 반투명한 흰색으로 보이나 안쪽은 아주 짙은 갈색이다.",
            distribution: "겨울철에 경북과 강원도 등지에서 출현."
        },
        countermeasures: "독성이 강함."
    },
    {
        name: "야광원양해파리",
        iconimage: "/images/jelly_icons/야광원양.png",
        mainimage: "/images/jelly_images/야광원양.jpg",
        description: {
            size:"10cm 내외",
            feature:"몸체는 투명하나 생식소가 분홍빛이나 노란색을 띄고 있어 전체적으로 분홍빛으로 보일 때가 많다. " +
                "다른 해파리들과는 달리 머리 바깥쪽 표면이 매끈하지 않고 자포낭이 있어 울퉁불퉁하다. " +
                "촉수 8개가 붙어있으며 머리와 촉수에 모두 자포가 있다.",
            distribution: "5~7월에 남해와 제주도 해역에서 출현."
        },
        countermeasures: "붉은 반점과 통증 유발. <br>" +
            "독성이 강함, 주의 필요."
    },
    {
        name: "유령해파리",
        iconimage: "/images/jelly_icons/유령.png",
        mainimage: "/images/jelly_images/유령.jpg",
        description: {
            size:"30-50cm 정도",
            feature:"전체적으로 우유빛의 흰색을 띄고 있다. " +
                "촉수의 색도 흰색이고 덩어리져 붙어있으며 점액질이 많다. " +
                "우산을 오므렸을 때 공같이 둥글게 보이는 것이 아니라 가장자리가 톱니처럼 홈이 있다.",
            distribution: "7~11월에 남해와 제주도 해역에서 출현."
        },
        countermeasures: "붉은 반점과 통증 유발. <br>" +
            "독성이 강함, 주의 필요."
    },
    {
        name: "작은상자해파리",
        iconimage: "/images/jelly_icons/작은상자.png",
        mainimage: "/images/jelly_images/작은상자.jpg",
        description: {
            size:"3cm 내외의 소형종",
            feature:"머리가 작은 박스 모양이며 투명하다. " +
                "머리 아래에 4개의 촉수가 붙어 있는데 평소에는 길게 늘어나 있지만 순식간에 짧게 오므라 들기도 한다. " +
                "움직임이 매우 빠르고 몸체가 투명하여 물 속에서 발견하기 어려울 때가 많다.",
            distribution: "6~9월까지 주로 한여름에 출현. " +
                "남해 앵강만, 동해, 제주도 일대에서 출현."
        },
        countermeasures: "채찍 모양의 상처, 주변부위가 급격히 부어오름. " +
            "식초를 이용한 응급처치 가능. <br>" +
            "독성이 매우 강함, 주의 필요."
    },
    {
        name: "커튼원양해파리",
        iconimage: "/images/jelly_icons/커튼원양.png",
        mainimage: "/images/jelly_images/커튼원양.jpg",
        description: {
            size:"10~30cm 정도",
            feature:"전체적으로 연한 갈색이고 머리에는 갈색의 세로 줄무늬가 있다. " +
                "어린 개체의 경우 줄무늬가 연하여 쉽게 눈에 띄지 않고 몸체는 약간 투명하다. " +
                "24개의 갈색촉수가 머리 아래쪽 가장자리를 따라 붙어 있으며 프릴모양의 하얀 입다리가 머리 안쪽 가운데에서 길게 늘어져 있다. ",
            distribution: "5~9월에 출현. " +
                "통영, 마산, 욕지도 등 주로 남해안과 포항 등 동해에서도 출현."
        },
        countermeasures: "붉은 반점과 통증 유발. <br>" +
            "독성이 강함, 주의 필요."
    },
    {
        name: "푸른우산관해파리",
        iconimage: "/images/jelly_icons/푸른우산관.png",
        mainimage: "/images/jelly_images/푸른우산관.jpg",
        description: {
            size:"직경 3cm 내외",
            feature:"우산의 형태는 동전처럼 얇고 납작하다. 주로 바다의 표층에 표류하며 우산의 아래쪽에는 많은 영양체들이 달려 있다. " +
                "일반적인 다른 해파리와는 달리 우산부분이 키틴질로 구성되어 있으며 표층에 떠서 생활한다.",
            distribution: "우리나라 남해안에 주로 분포하며 주로 7-8월 경의 한여름에 출현."
        },
        countermeasures: "독성은 약함."
    },
    {
        name: "기수식용(숲뿌리)해파리",
        iconimage: "/images/jelly_icons/기수식용(숲뿌리).png",
        mainimage: "/images/jelly_images/기수식용(숲뿌리).jpg",
        description: {
            size:"직경 30cm이상",
            feature:"“기수식용해파리”는 “숲뿌리해파리”의 공식 명칭으로 최근 학계에 등록되었다. " +
                "“기수식용해파리”라는 명칭은 식용이면서 주로 기수지역에 출현하는 특성을 반영하였다.",
            distribution: "늦봄에서 가을로 7월 ~ 11월 출현하며 주로 강화도 인근, 전남 해역에서 출현."
        },
        countermeasures: "독성은 약함."
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
        // jellyDescription.textContent = jelly.description;
        jellyDescription.innerHTML = `
            <h3>크기</h3>
            <p>${jelly.description.size}</p>
            <h3>특징</h3>
            <p>${jelly.description.feature}</p>
            <h3>출현 시기 및 분포</h3>
            <p>${jelly.description.distribution}</p>
          `;
        // jellyCountermeasures.textContent = jelly.countermeasures;
        jellyCountermeasures.innerHTML = jelly.countermeasures;

        const jellyNameBox = document.getElementById('jelly-name');
        if (jellyNameBox)
            jellyNameBox.textContent = jelly.name;

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

    // 메인에서 해파리 아이콘 이미지 선택시 도감 페이지 이동
    const params = new URLSearchParams(window.location.search);
    const jellyName = params.get('jelly');
    if (jellyName) {
        const foundIndex = jellyData.findIndex(j => j.name === jellyName);
        if (foundIndex >= 0) {
            currentIndex = foundIndex;
        }
    }

    // 첫 번째 실제 슬라이드 위치로 강제 이동
    sliderImagesContainer.style.transform = `translateX(-166px)`;

    function viewEncyclopedia(jellyfishName) {
        window.location.href = `/detail?jelly=${encodeURIComponent(jellyfishName)}`;
    }

    // 해파리 데이터가 있다면 첫 번째(0번째) 아이템으로 업데이트
    if (jellyData.length > 0) {
        updateContent();
    }
});
