// Calling showTime function at every second
setInterval(showTime, 1000);

function showTime() {
    // Getting current time and date
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();

    hour = hour < 10 ? "0" + hour : hour;
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
