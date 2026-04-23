function getDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;
  document.getElementById("date").textContent = today;
}
function getTime() {
  let time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  time = hours + ":" + minutes + ":" + seconds;
  document.getElementById("time").textContent = time;
}

getDate();
getTime();

setInterval(getDate, 1000);
setInterval(getTime, 1000);

// Dashboart title from Localstorage
const dashboardTitle = document.getElementById("dashboard-title");
const titleButton = document.getElementById("dashboard-title-btn");
const titleButtonLabel = document.getElementById("title-btn-label");

const savedTitle = localStorage.getItem("dashboard-title");

  if (savedTitle) {
    dashboardTitle.textContent = savedTitle;
  } else {
    dashboardTitle.textContent = "Antonio's Dashboard";
    localStorage.setItem("dashboard-title", "Antonio's Dashboard");
  }

// Click handler for the title edit button
  titleButton.addEventListener("click", function() {
    if(titleButtonLabel.textContent.trim() === "Edit") {
        dashboardTitle.contentEditable = "true";
        dashboardTitle.focus();
        titleButtonLabel.textContent = "Save";
    }
    else
    {
        const newTitle = dashboardTitle.textContent.trim();
        
            if (newTitle !== "") {
              dashboardTitle.textContent = newTitle;
              localStorage.setItem("dashboard-title", newTitle);
            } else {
                const fallbackTitle = "Antonio's Dashboard";
                dashboardTitle.textContent = fallbackTitle;
                localStorage.setItem("dashboard-title", fallbackTitle);
            }

        dashboardTitle.contentEditable = "false";
        titleButton.textContent = "Edit";
    }
  });