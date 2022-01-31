const sampleData = [
    {
      index: 0,
      title: "버거먹자",
      description: "버스정거장에서 함께",
      name: "비오는날 걸어가는 길",
      image: [
        `${process.env.REACT_APP_SERVER_HOST}/uploadsample/01-1.png`,
        `${process.env.REACT_APP_SERVER_HOST}/uploadsample/01-2.png`,
        `${process.env.REACT_APP_SERVER_HOST}/uploadsample/01-3.jpg`
      ],
      //uploads\\1638536293451_20210918_153347_HDR.jpg
      point: [
        {lat: 37.5726055, lng: 126.9908312},
        {lat: 37.5725031, lng: 126.9889064},
        {lat: 37.5679752, lng: 126.9899728},
        {lat: 37.5663478, lng: 126.990968}
      ],
      startTime: "2021-09-11 18:47:30",
      endTime: "2021-09-11 19:12:08",
      visitType: "MOVE",
      actitiyType: "WALKING",
      useFlag: true
    },
    {
      index: 1,
      title: "바스버거",
      description: "바스버거에는 탐욕버거가 있답니다",
      name: "바스버거 을지로점",
      image: [
        `${process.env.REACT_APP_SERVER_HOST}/uploadsample/02-1.png`
      ],
      point: [
        {lat: 37.5656279, lng: 126.9912272}
      ],
      startTime: "2021-09-11 19:12:08",
      endTime: "2021-09-11 20:26:18",
      visitType: "STAY",
      actitiyType: "",
      useFlag: true
    },
    {
      index: 2,
      title: "날씨좋을때 산책하기!",
      description: "청계천 아랫길을 느긋하게",
      name: "청계천",
      image: [
        `${process.env.REACT_APP_SERVER_HOST}/uploadsample/03-1.jpg`,
        `${process.env.REACT_APP_SERVER_HOST}/uploadsample/03-2.jpg`
      ],
      point: [
        {lat: 37.566318, lng: 126.9922482},
        {lat: 37.5686643, lng: 126.9924873},
        {lat: 37.5712841, lng: 127.0253485}
      ],
      startTime: "2021-09-11 20:26:18",
      endTime: "2021-09-11 21:23:45",
      visitType: "MOVE",
      actitiyType: "WALKING",
      useFlag: true
    },
    {
      index: 3,
      title: "여긴어디지?",
      description: "벤치에서 휴식",
      name: "청계천 어딘가?",
      image: [
        `${process.env.REACT_APP_SERVER_HOST}/uploadsample/04-1.jpg`,
        `${process.env.REACT_APP_SERVER_HOST}/uploadsample/04-2.jpg`
      ],
      point: [
        {lat: 37.5713521, lng: 127.0246275}
      ],
      startTime: "2021-09-11 21:23:45",
      endTime: "2021-09-11 21:47:20",
      visitType: "STAY",
      actitiyType: "",
      useFlag: true
    }
  ]

  export default sampleData