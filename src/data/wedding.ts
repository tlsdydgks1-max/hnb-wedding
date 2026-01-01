export const WEDDING = {
  couple: {
    groom: { name: "신용한", name2: "용한", parents: "신기덕 · 한영미" },
    bride: { name: "유예빈", name2: "예빈", parents: "조미선" },
  },

  date: {
    /** 👀 화면 표시용 */
    full: "2027.03.22 SAT. 1:30 PM",
    month: "03",
    day: "22",

    /** 🧠 로직용 (핵심) */
    at: new Date("2027-03-22T13:30:00"), // 로컬 기준
  },

  venue: {
    full: "더 베뉴지 서울 2층 아트홀",
    name: "더 베뉴지 서울",
    address: "서울특별시 강서구 강서로 388",
    detail: "2층 아트홀",

    location: {
      lat: 37.560158,
      lng: 126.839322,
      naver: 33499928,
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
            line: "5호선",
            color: "purple",
            description: "발산역 3번 출구 도보 1분",
          },
          {
            line: "9호선",
            color: "gold",
            description: "양천향교역 6번 출구 도보 10분",
          },
        ],
      },

      bus: {
        lines: [
          {
            type: "간선",
            numbers: ["601", "605", "652", "654", "661"],
          },
          {
            type: "지선",
            numbers: ["6630", "6632", "6642", "6645", "6648", "6657", "6712"],
          },
        ],
      },

      parking: {
        description: "지하 1~3층 / 3시간 무료",
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
        desc: "2027년 3월 22일 (토) 오후 1시 30분",
      },
      {
        key: "meal",
        icon: "Utensils",
        title: "식사 안내",
        desc: "예식 후 5층 연회장에서 피로연이 있습니다.",
      },
      {
        key: "entry",
        icon: "Clock",
        title: "입장 안내",
        desc: "예식 30분 전부터 입장 가능합니다.",
      },
      {
        key: "etc",
        icon: "Info",
        title: "기타 안내",
        desc: "주례 없는 예식으로 진행됩니다.",
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
