// Calling showTime function at every second
setInterval(showTime, 1000);

function showTime() {
    // Getting current time and date
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    let am_pm = "AM";

    // Setting time for 12 Hrs format
    if (hour >= 12) {
        if (hour > 12) hour -= 12;
        am_pm = "PM";
    } else if (hour === 0) {
        hr = 12;
        am_pm = "AM";
    }

    hour =
        hour < 10 ? "0" + hour : hour;
    if(hour > 12 && am_pm === "PM") {hour = parseInt(hour) + 12;}
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;


    const currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();

    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;


    //let currentTime = hour + ":" + min + ":" + sec + am_pm;
    // Displaying the time
    document.getElementById(
        "clock"
    ).innerHTML = day + "/" + month + "/" + year + " " + hour + ":" + min + ":" + sec;
}

showTime();
