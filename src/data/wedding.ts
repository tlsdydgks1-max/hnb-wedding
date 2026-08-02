export const WEDDING = {
  couple: {
    groom: { name: "신용한", name2: "용한", parents: "신기덕 · 한영미" },
    bride: { name: "유예빈", name2: "예빈", parents: "조미선" },
  },

  date: {
    /** 👀 화면 표시용 */
    full: "2027.02.13 SAT. 5:00 PM",
    month: "02",
    day: "13",

    /** 🧠 로직용 (핵심) */
    at: new Date("2027-02-13T17:00:00"), // 로컬 기준
  },

  venue: {
    full: "라비에벨웨딩 9층 오페라홀",
    name: "라비에벨웨딩",
    address: "경기 부천시 원미구 길주로 105",
    detail: "9층 오페라홀",

    location: {
      lat: 37.5058,
      lng: 126.7538,
      naver: 12945535,
    },

    navigation: {
      naverMap: "https://map.naver.com/v5/",
      kakaoNavi: "kakaonavi://navigate",
      tmap: "tmap://route",
    },

    transport: {
      subway: {
        lines: [
          {
            line: "7호선",
            color: "green",
            description: "상동역 7번, 8번 출구와 바로 연결",
          },
          {
            line: "1호선",
            color: "blue",
            description:
              "송내역 2번 출구 (버스로 15분 정도 소요 / 버스노선: 16, 37, 83, 87)",
          },
        ],
      },

      bus: {
        lines: [
          {
            type: "상동역7번출구",
            numbers: ["5-4", "16", "33", "50-1", "83"],
          },
          {
            type: "상동역8번출구",
            numbers: [
              "6-2",
              "23-2",
              "24",
              "37",
              "50-1",
              "52",
              "59",
              "59-1",
              "66",
              "70",
              "87",
            ],
          },
          {
            type: "광역버스",
            numbers: [
              "9300(강남역)",
              "8906(범계역)",
              "8106(분당)",
              "1001(고양교통)",
              "1601(홍대)",
            ],
          },
        ],
      },

      parking: {
        description:
          "본 건물 지하 2층~지하 4층, 건물 앞 하이파킹 공영주차장 이용 가능 / 하객 2시간 무료",
      },
    },
  },

  hero: {
    image: "/images/img1.jpg",
  },

  gallery: Array.from({ length: 14 }, (_, i) => `/images/img${i + 2}.jpg`),

  ceremony: {
    info: [
      {
        key: "datetime",
        icon: "Calendar",
        title: "예식 시간",
        desc: "2027년 2월 13일 (토) 오후 5시",
      },
      {
        key: "meal",
        icon: "Utensils",
        title: "식사 안내",
        desc: "식사는 예식 30분 전부터 2시간 30분 동안 이용 가능합니다. (오후 4시 30분~오후 7시)",
      },
      {
        key: "atm",
        icon: "Landmark",
        title: "ATM 안내",
        desc: "본 건물 1층 하나은행, 2층 국민은행, 9층 로비 중앙에 웨딩홀 ATM기가 있습니다.",
      },
      {
        key: "parking",
        icon: "CircleParking",
        title: "주차 안내",
        desc: "주차는 본 건물 내 지하 2층 ~ 지하 4층 주차장, 건물 앞 하이파킹 공영주차장 이용 가능합니다.\n하객 2시간 무료입니다.",
      },
    ],
  },

  accounts: [
    {
      side: "GROOM",
      title: "신랑측 계좌번호",
      rows: [
        { label: "신용한", bank: "카카오뱅크", number: "3333-10-3320915" },
        // { label: "신기덕", bank: "국민은행", number: "000000-00-000000" },
      ],
    },
    {
      side: "BRIDE",
      title: "신부측 계좌번호",
      rows: [
        { label: "유예빈", bank: "토스뱅크", number: "1000-2345-6789" },
        // { label: "조미선", bank: "신한은행", number: "000-000-000000" },
      ],
    },
  ],
} as const;
