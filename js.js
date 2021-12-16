var date = new Date();
var day = date.getDay();
var month = Number(date.getMonth) + 1;
var hour = String(date.getHours()).padStart(2, '0');
var minutes = String(date.getMinutes()).padStart(2, '0');
var seconds = String(date.getSeconds()).padStart(2, '0');
var endYear = new Date(date.getFullYear(), 11, 31);
var daysToEndYear = String(Math.ceil((endYear.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))).padStart(2, '0').padStart(3, '00');
var hoursToEndDay = String(24 - hour).padStart(2, '0');
var minusteToEndDay = String(60 - minutes).padStart(2, '0');
var secondsToEndDay = String(60 - seconds).padStart(2, '0');

if (hoursToEndDay == 24) {
    hoursToEndDay = 23;
    minusteToEndDay = 59;
} else if (minusteToEndDay == 60) {
    minusteToEndDay = 59;
} else if (secondsToEndDay == 60) {
    secondsToEndDay = 59;
}


const TIMER = `${daysToEndYear}:${hoursToEndDay}:${minusteToEndDay}:${secondsToEndDay}:${daysToEndYear}:${hoursToEndDay}:${minusteToEndDay}:${secondsToEndDay}`;
let arrTimer = TIMER.split(":");

hiddenDiv();
createAndSetElementSpan();
updateTimerSecond();

function createAndSetElementSpan() {
    let arrBoxFront = document.getElementsByClassName("front");
    let arrBoxBack = document.getElementsByClassName("back");

    for (var i = 0; i < arrBoxFront.length; ++i) {
        var span = document.createElement("span");
        span.classList.add("numberClock");
        span.innerHTML = arrTimer[i];
        arrBoxFront[i].appendChild(span);

        span = document.createElement("span");
        span.classList.add("numberClock");
        span.innerHTML = arrTimer[i];
        arrBoxBack[i].appendChild(span);
    }
}

function updateTimerSecond() {
    let count = secondsToEndDay;

    setInterval(function () {
        document.querySelector("#timer #seconds .front .numberClock").innerHTML = String(count).padStart(2, '0');
        
        --count;

        setTimeout(function () {
            document.querySelector("#timer #seconds .back .numberClock").innerHTML = String(count).padStart(2, '0');
        }, 400);

        if (count == -1) {
            document.querySelector("#timer #seconds .front .numberClock").innerHTML = "59";
            document.querySelector("#timer #seconds .back .numberClock").innerHTML = "59";
            count = 59;
            updateTimer("front");

            setTimeout(function () {
                updateTimer("back");
            }, 400);
        }
        animation("seconds");
    }, 1000);
}

function updateTimer(state) {
    let minutes = document.querySelector(`#minutes .${state} .numberClock`);
    let hours = document.querySelector(`#hours .${state} .numberClock`);
    let days = document.querySelector(`#days .${state} .numberClock`);

    if (hours.innerHTML == 0 && minutes.innerHTML == 0) {
        hours.innerHTML = "23";
        minutes.innerHTML = "59";
        animation("minutes");
        animation("hours");
        days.innerHTML = String(Number(days.innerHTML) - 1).padStart(2, '0').padStart(3, '00');
    } else if (minutes.innerHTML == 0) {
        minutes.innerHTML = "59";
        animation("minutes");
        hours.innerHTML = String(Number(hours.innerHTML) - 1).padStart(2, '0');
    } else {
        minutes.innerHTML = String(Number(minutes.innerHTML) - 1).padStart(2, '0');
        animation("minutes");
    }

    if(days.innerHTML == 366 || days.innerHTML == 365 || days.innerHTML == 364 || days.innerHTML == 363 || days.innerHTML == 362) {
        hiddenDiv();
    }
}

function animation(string) {
    let divNumberClock = document.querySelector(`#${string} .numberClock`);
    let frontNumberClock = document.querySelector(`#${string} .front`);
    
    divNumberClock.classList.add("rotate");
    frontNumberClock.classList.add("rotate");

    setTimeout(function () {
        divNumberClock.classList.remove("rotate");
        frontNumberClock.classList.remove("rotate");
    }, 600);
}

function hiddenDiv() {
    if((day == 1 || day == 2 || day == 3) && month == 1) {
        document.getElementsByClassName("happyYear")[0].classList.remove("hidden");
        document.getElementsByClassName("title")[0].classList.add("hidden");
        document.getElementById("timer").classList.add("hidden");

        var areaClock = document.getElementsByClassName("areaClock");
        for (const element of areaClock) {
            element.classList.add("hidden");
        }

    } else if(day > 4 && month == 1) {
        document.getElementsByClassName("happyYear")[0].classList.add("hidden");
        document.getElementsByClassName("title")[0].classList.remove("hidden");
        document.getElementById("timer").classList.remove("hidden");

        var areaClock = document.getElementsByClassName("areaClock");
        for (const element of areaClock) {
            element.classList.remove("hidden");
        }

    } else {
        document.getElementsByClassName("happyYear")[0].classList.add("hidden");
    }
}