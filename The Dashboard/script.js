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
titleButton.addEventListener("click", function () {
  if (titleButtonLabel.textContent.trim() === "Edit") {
    dashboardTitle.contentEditable = "true";
    dashboardTitle.focus();
    titleButtonLabel.textContent = "Save";
  } else {
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
    titleButtonLabel.textContent = "Edit";
  }
});

// Make the textarea saved and rendered by Localstorage
const textarea = document.getElementById("notes-text");
const savedNotes = localStorage.getItem("dashboard-notes");

if (savedNotes) {
  textarea.value = savedNotes;
}

// Adding an input to the textarea to save the notes in Localstorage whenever the user types something
textarea.addEventListener("input", function () {
  localStorage.setItem("dashboard-notes", textarea.value);
});

// Bookmarks functionality
const bookmarkForm = document.getElementById("bookmark-form");
const bookmarkTitleInput = document.getElementById("bookmark-title");
const bookmarkUrlInput = document.getElementById("bookmark-url");
const bookmarksList = document.getElementById("bookmarks-list");

let bookmarks =JSON.parse(localStorage.getItem("dashboard-bookmarks")) || [];

// Calling the default bookmarks and the saved bookmarks from localstorage
function renderBookmarks() {
  bookmarksList.innerHTML = "";

  bookmarks.forEach((bookmark) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    const removeBtn = document.createElement("button");

    
    link.href = bookmark.url;
    link.textContent = bookmark.title;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    
    removeBtn.textContent = "🗑️";
    removeBtn.type = "button";

    removeBtn.addEventListener("click", function() {
      bookmarks = bookmarks.filter(b => b.url !== bookmark.url);
      localStorage.setItem("dashboard-bookmarks", JSON.stringify(bookmarks));
      renderBookmarks();
    });

    li.appendChild(link);
    removeBtn.classList.add("remove-btn");
    li.appendChild(removeBtn);
    bookmarksList.appendChild(li);
  });
}

// Event listener for the bookmark form submission
bookmarkForm.addEventListener("submit", function (event) {
  event.preventDefault();
  
  const title = bookmarkTitleInput.value.trim();
  const url = bookmarkUrlInput.value.trim();
  
  if (title === "" && url === "") {
    return;
  }

  const newBookmark = { title, url };

  bookmarks.push(newBookmark);
  localStorage.setItem("dashboard-bookmarks", JSON.stringify(bookmarks));
  
  renderBookmarks();

  bookmarkTitleInput.value = "";
  bookmarkUrlInput.value = "";
});

// Weather widget
const weatherWidget = document.getElementById("weather-widget");

if("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code&timezone=auto`)
    
  .then(response => response.json())
  .then(data => {
    const temperature = data.current.temperature_2m;
    const windSpeed = data.current.wind_speed_10m;
    const weatherCode = data.current.weather_code;

    
    
    weatherWidget.innerHTML = `
<p><strong>Temperature</strong>: ${temperature}°C</p>
<p><strong>Wind Speed</strong>: ${windSpeed} km/h</p>
<p><strong>Weather</strong>: ${weatherCodeInHumanLanguage(weatherCode)}</p>`;
  })
  .catch(error => {
    weatherWidget.textContent = "Unable to fetch weather data.";
    console.error("Error fetching weather data:", error);
  });

  function weatherCodeInHumanLanguage(code) {
    const weatherCodes = {
      // All the weather codes from Open-Meteo API with their corresponding human-readable descriptions
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Depositing rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      56: "Light freezing drizzle",
      57: "Dense freezing drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      66: "Light freezing rain",
      67: "Heavy freezing rain",
      71: "Slight snow fall",
      73: "Moderate snow fall",
      75: "Heavy snow fall",
      77: "Snow grains",
      80: "Slight rain showers",
      81: "Moderate rain showers",
      82: "Violent rain showers",
      85: "Slight snow showers",
      86: "Heavy snow showers",
      95: "Thunderstorm",
      96: "Thunderstorm with slight hail",
      99: "Thunderstorm with heavy hail"
    };
    return weatherCodes[code] || "Unknown weather";
  }

},
  function(error) {
    weatherWidget.textContent= "Unable to retrieve your location.";
    console.error("Error retrieving location:", error);
  }
  );
} else {
  weatherWidget.textContent = "Geolocation is not supported by this browser.";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
