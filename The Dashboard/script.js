function getDate () {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    document.getElementById("date").innerHTML = today;
}
function getTime () {
    var time = new Date();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    time = hours + ':' + minutes + ':' + seconds;
    document.getElementById("time").innerHTML = time;
}

getDate();
getTime();

setInterval(getDate, 1000);
setInterval(getTime, 1000);

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}