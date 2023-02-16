let today = new Date();
const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const currDayDiv = document.getElementById("currDay");
currDayDiv.textContent = days[today.getDay()];

const currDateDiv = document.getElementById("currDate");
currDateDiv.textContent = today.getDate();

const currMonthDiv = document.getElementById("month");
currMonthDiv.textContent = months[today.getMonth()];
localStorage.setItem("month", today.getMonth());

const currYearDiv = document.getElementById("year");
currYearDiv.textContent = today.getFullYear();
localStorage.setItem("year", today.getFullYear());

/* ------------------- current month page-------------------------*/
// 날짜 채우기
let firstDate = today.getDate();
let firstDay = today.getDay();

// 1일의 요일 구하는 func
function calDayofFirstDate(rawDate, rawDay) {
  if (rawDate > 7) {
    rawDate -= 7; // 2월의 경우 rawDate(28) %= 7로 하면 0이 나옴 => rawDate -= 7로 변경
  }
  while (rawDate > 1) {
    rawDate -= 1;
    rawDay -= 1;
    if (rawDay < 0) {
      rawDay = 6;
    }
  }
  return rawDay;
}

const dayofFirstDate = calDayofFirstDate(firstDate, firstDay);
localStorage.setItem("firstDay", dayofFirstDate);

// 달의 마지막 날짜 구하는 func
function calMonthLastDate(year, month) {
  const fullMonth = [1, 3, 5, 7, 8, 10, 12];
  let lastDate = 0;
  if (month === 2) {
    if (year % 4 === 0) {
      lastDate = 29;
    } else {
      lastDate = 28;
    }
  } else {
    for (var i = 0; i < fullMonth.length; i++) {
      if (month === fullMonth[i]) {
        lastDate = 31;
        break;
      } else {
        lastDate = 30;
      }
    }
  }
  return lastDate;
}

const month = today.getMonth() + 1;
const lastDateofCurrMonth = calMonthLastDate(today.getFullYear(), month);

// 달력 채우는 func
const boxes = document.querySelectorAll(".dates tbody td");
function drawCalendar(lastDateoftheMonth, dayofFirstDate) {
  let dayofLastDate = dayofFirstDate;
  for (var i = 0; i < lastDateoftheMonth; i++) {
    boxes[dayofFirstDate].textContent = i + 1;
    dayofFirstDate++;
    dayofLastDate++;
    if (dayofLastDate > 7) {
      dayofLastDate = 1;
    }
  }

  console.log(today.getFullYear());
  localStorage.setItem("finalDay", dayofLastDate - 1);
}

// 달력 그리기
drawCalendar(lastDateofCurrMonth, dayofFirstDate);

// 현재 날짜 페이지인 경우
function checkCurrent() {
  if (
    localStorage.getItem("month") == today.getMonth() &&
    localStorage.getItem("year") == today.getFullYear()
  ) {
    currDayDiv.textContent = days[today.getDay()];
    currDateDiv.textContent = today.getDate();
    for (var i = 0; i < boxes.length; i++) {
      const date = boxes[i].textContent;
      if (date == today.getDate()) {
        boxes[i].style.color = "red";
      }
    }
  } else {
    for (var i = 0; i < boxes.length; i++) {
      boxes[i].style.color = "black";
    }
  }
}

checkCurrent();
/* ------------------- button event-------------------------*/
const leftBtn = document.querySelector(".leftBtn");
const rightBtn = document.querySelector(".rightBtn");

// leftBtn 이벤트 구현
leftBtn.addEventListener("click", () => {
  const beforeMonth = localStorage.getItem("month"); // 중간에 refresh해야하기 때문에 let으로 선언
  let beforeYear = localStorage.getItem("year");
  let currMonth = beforeMonth - 1;

  // 월 + 연도
  if (currMonth < 0) {
    // 연도가 넘어갈 때
    localStorage.setItem("month", 11); // 다시 마지막 월부터 시작
    currMonth = parseInt(localStorage.getItem("month")); // 월 다시 불러오기(11이 됨)

    beforeYear -= 1;
    currYearDiv.textContent = beforeYear; // 연도 -1
    localStorage.setItem("year", beforeYear);
  }
  currMonthDiv.textContent = months[currMonth]; // 월 -1
  localStorage.setItem("month", currMonth);

  const actualMonth = currMonth + 1;

  //1일 구하기
  let thisMonthLastDate = calMonthLastDate(beforeYear, actualMonth);
  console.log(thisMonthLastDate);
  let dayofLastDate = localStorage.getItem("firstDay") - 1; // 2
  if (dayofLastDate < 0) {
    dayofLastDate = 6;
  }

  const dayofFirstDate = calDayofFirstDate(thisMonthLastDate, dayofLastDate);

  // 1일 요일정보 입력
  currDayDiv.textContent = days[dayofFirstDate];
  localStorage.setItem("firstDay", dayofFirstDate);

  // 1일 날짜 화면에 표시
  currDateDiv.textContent = 1;

  // draw cal
  // 달력 초기화
  for (var i = 0; i < 42; i++) {
    boxes[i].textContent = " ";
  }
  drawCalendar(thisMonthLastDate, dayofFirstDate);
  checkCurrent();
});

// rightBtn 이벤트 구현
rightBtn.addEventListener("click", () => {
  const beforeMonth = parseInt(localStorage.getItem("month")); // 중간에 refresh해야하기 때문에 let으로 선언
  let beforeYear = parseInt(localStorage.getItem("year"));

  let currMonth = parseInt(beforeMonth + 1);

  // 월 + 연도
  if (currMonth > 11) {
    // 연도가 넘어갈 때
    localStorage.setItem("month", 0); // 다시 마지막 월부터 시작
    currMonth = parseInt(localStorage.getItem("month")); // 월 다시 불러오기(0이 됨)

    beforeYear += 1;
    currYearDiv.textContent = beforeYear; // 연도 + 1
    localStorage.setItem("year", beforeYear);
  }
  currMonthDiv.textContent = months[currMonth]; // 월 + 1
  localStorage.setItem("month", currMonth);

  const actualMonth = currMonth + 1;
  console.log(actualMonth);
  const thisMonthLastDate = calMonthLastDate(beforeYear, actualMonth);
  console.log(thisMonthLastDate);

  //1일 구하기

  let dayofFirstDate = parseInt(localStorage.getItem("finalDay")) + 1; // 3
  if (dayofFirstDate > 6) {
    dayofFirstDate = 0;
  }

  // 1일 요일정보 입력
  currDayDiv.textContent = days[dayofFirstDate];
  localStorage.setItem("firstDay", dayofFirstDate);

  // 1일 날짜 화면에 표시
  currDateDiv.textContent = 1;

  // draw cal
  // 달력 초기화
  for (var i = 0; i < 42; i++) {
    boxes[i].textContent = " ";
  }
  drawCalendar(thisMonthLastDate, dayofFirstDate);
  checkCurrent();
});

// localstorage는 string 타입
// 겹치는 기능은 fucntion으로 정리
