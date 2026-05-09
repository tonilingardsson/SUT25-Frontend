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

//Helper function to render the bookmarks icons
function getBookmarkIcon(url, title) {
  const lowerUrl = url.toLowerCase();
  const lowerTitle = title.toLowerCase();
  const domain = (new URL(url)).hostname.replace("www.", "");
  const size = 32;

  if (lowerUrl.includes("google.com")) return "fa-brands fa-google";
  if (lowerUrl.includes("github.com")) return "fa-brands fa-github";
  if (lowerUrl.includes("youtube.com")) return "fa-brands fa-youtube";
  if (lowerUrl.includes("twitter.com") || lowerUrl.includes("x.com")) return "fa-brands fa-x-twitter";
  if (lowerUrl.includes("linkedin.com")) return "fa-brands fa-linkedin";
  if (lowerUrl.includes("facebook.com")) return "fa-brands fa-facebook";
  if (lowerUrl.includes("instagram.com")) return "fa-brands fa-instagram";
  if (lowerUrl.includes("spotify.com")) return "fa-brands fa-spotify";
  if (lowerUrl.includes("discord.com")) return "fa-brands fa-discord";
  if (lowerUrl.includes("reddit.com")) return "fa-brands fa-reddit";
  if (lowerUrl.includes("twitch.tv")) return "fa-brands fa-twitch";

  if (lowerTitle.includes("notion")) return "fa-solid fa-note-sticky";
  if (lowerTitle.includes("chatgpt")) return "fa-solid fa-robot";

  return "fa-solid fa-globe";
}

// Calling the default bookmarks and the saved bookmarks from localstorage
function renderBookmarks() {
  bookmarksList.innerHTML = "";

  bookmarks.forEach((bookmark) => {
    const leftSide = document.createElement("div");
    leftSide.classList.add("bookmark-left");

    const li = document.createElement("li");
    const removeBtn = document.createElement("button");
    
    const icon = document.createElement("i");
    icon.className = getBookmarkIcon(bookmark.url, bookmark.title);
    icon.classList.add("bookmark-icon");
    
    const link = document.createElement("a");
    link.href = bookmark.url;
    link.textContent = bookmark.title;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    
    // Adding a remove button for each bookmark
    removeBtn.textContent = "X";
    removeBtn.type = "button";
    
    removeBtn.addEventListener("click", function() {
      bookmarks = bookmarks.filter(b => b.url !== bookmark.url);
      localStorage.setItem("dashboard-bookmarks", JSON.stringify(bookmarks));
      renderBookmarks();
    });
    
    leftSide.appendChild(icon);
    leftSide.appendChild(link);
    li.appendChild(leftSide);
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
  
  if (title === "" || url === "") {
    return;
  }

  const newBookmark = { title, url };

  bookmarks.push(newBookmark);
  localStorage.setItem("dashboard-bookmarks", JSON.stringify(bookmarks));
  
  renderBookmarks();

  bookmarkTitleInput.value = "";
  bookmarkUrlInput.value = "";
});

renderBookmarks();

// Weather widget for today, tomorrow and the day after tomorrow using Open-Meteo API
const weatherWidget = document.getElementById("weather-widget");

if("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    
fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`)
    .then(response => response.json())
    .then(data => {
      const temperature = data.current.temperature_2m;
      const windSpeed = data.current.wind_speed_10m;
      const weatherCode = data.current.weather_code;

      const forecastRows = [
  {
    day: "Today",
    temperature: `${Math.round(data.current.temperature_2m)}°C`,
    weatherCode: data.current.weather_code
  },
  {
    day: "Tomorrow",
    temperature: `${Math.round(data.daily.temperature_2m_max[1])}° / ${Math.round(data.daily.temperature_2m_min[1])}°`,
    weatherCode: data.daily.weather_code[1]
  },
  {
    day: getDayLabel(2, data.daily.time[2]),
    temperature: `${Math.round(data.daily.temperature_2m_max[2])}° / ${Math.round(data.daily.temperature_2m_min[2])}°`,
    weatherCode: data.daily.weather_code[2]
  }
];
      
      weatherWidget.innerHTML = "";

forecastRows.forEach(function (row) {
  const visual = getWeatherVisual(row.weatherCode);

  const weatherRow = document.createElement("div");
  weatherRow.classList.add("weather-row");

  weatherRow.innerHTML = `
    <span class="weather-icon">${visual.icon}</span>
    <span class="weather-day">${row.day}</span>
    <span class="weather-temp">${row.temperature}</span>
    <span class="weather-desc">${visual.text}</span>
  `;

  weatherWidget.appendChild(weatherRow);
});
    })
    .catch(error => {
      weatherWidget.textContent = "Unable to fetch weather data.";
      console.error("Error fetching weather data:", error);
    });

    // Helper function to get the day label
    function getDayLabel(index, dateString) {
  if (index === 0) return "Today";
  if (index === 1) return "Tomorrow";

  const date = new Date(dateString);
  const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return weekdayNames[date.getDay()];
}

  // Helper function to get the weather icon and description based on the weather code
    function getWeatherVisual(code) {
  if (code === 0) return { icon: "☀️", text: "Clear" };
  if (code === 1 || code === 2) return { icon: "⛅", text: "Partly cloudy" };
  if (code === 3) return { icon: "☁️", text: "Overcast" };
  if (code === 45 || code === 48) return { icon: "🌫️", text: "Fog" };
  if ([51, 53, 55, 56, 57].includes(code)) return { icon: "🌦️", text: "Drizzle" };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { icon: "🌧️", text: "Rain" };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { icon: "❄️", text: "Snow" };
  if ([95, 96, 99].includes(code)) return { icon: "⛈️", text: "Storm" };

  return { icon: "🌤️", text: "Unknown" };
}

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

// Dark mode toggle functionality
const darkModeToggle = document.getElementById("darkModeToggle");
const themeIcon = document.getElementById("theme-icon");
const themeLabel = document.getElementById("theme-label");

function applyTheme(isDark) {
  document.body.classList.toggle("dark-mode", isDark);

  if (isDark) {
    themeIcon.className = "fas fa-sun";
    themeLabel.textContent = "Light Mode";
    localStorage.setItem("dashboard-theme", "dark");
  } else {
    themeIcon.className = "fas fa-moon";
    themeLabel.textContent = "Dark Mode";
    localStorage.setItem("dashboard-theme", "light");
  }
}

const savedTheme = localStorage.getItem("dashboard-theme");
if (savedTheme === "dark") {
  applyTheme(true);
} else {
  applyTheme(false);
}

darkModeToggle.addEventListener("click", function () {
  const isDark = document.body.classList.contains("dark-mode");
  applyTheme(!isDark);
});

// Unsplash background button
const changeBgButton = document.getElementById("change-bg-button");

// Restore the background image from Localstorage when the page loads
const savedBackground = localStorage.getItem("dashboard-background");
if (savedBackground) {
  document.body.style.backgroundImage = `url(${savedBackground})`;
}

changeBgButton.addEventListener("click", function() {
  changeBgButton.textContent = "Loading...";

  // Fetch a random portrait image from Unsplash API and set it as the background image, also save it in Localstorage
  fetch("https://api.unsplash.com/photos/random?orientation=portrait", {
    headers: {
Authorization: "Client-ID 7x7pTUgm0ovp1IbUFvs8PT_Kwch_SvM2qYNh2FshQbE"
    }
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    // Use the returned image URL to set the background image of the dashboard, also save it in Localstorage
    const imageUrl = data.urls.regular;

    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

    // Save the background image URL in Localstorage
    localStorage.setItem("dashboard-background", imageUrl);
  changeBgButton.textContent = "Change BG!";
})
    .catch(function (error) {
    console.error("Error fetching background image:" , error);
    changeBgButton.textContent = "Change BG!";
    alert("Error fetching background image. Please try again later.");
  })
})

// Crypto widget 

const cryptoWidget = document.getElementById("crypto-widget");

function updateCryptoPrices() {
  cryptoWidget.textContent = "Loading crypto prices...";

fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    const bitcoinPrice = data.bitcoin.usd;
    const ethereumPrice = data.ethereum.usd;
    const solanaPrice = data.solana.usd;

    cryptoWidget.innerHTML = `
      <p><i class="fa-brands fa-bitcoin"></i> Bitcoin is at <strong>$${bitcoinPrice.toLocaleString()}</strong>.</p>
      <p><i class="fa-brands fa-ethereum"></i> Ethereum is at <strong>$${ethereumPrice.toLocaleString()}</strong>.</p>
      <p><i class="fa-brands fa-solana"></i> Solana is at <strong>$${solanaPrice.toLocaleString()}</strong>.</p>
      <p><i class="fa-solid fa-poo"></i> Do not invest in meme coins!</p>
    `;
  })
    .catch(function (error) {
    console.error("Error fetching crypto data:", error);
    cryptoWidget.innerHTML = "Unable to fetch crypto data.";
  });
}

updateCryptoPrices();
setInterval(updateCryptoPrices, 5 * 60 * 1000);