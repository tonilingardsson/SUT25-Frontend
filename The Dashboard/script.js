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

// Dashboard title from Localstorage
const dashboardTitle = document.getElementById("dashboard-title");
const savedTitle = localStorage.getItem("dashboard-title");

if (savedTitle) {
  dashboardTitle.textContent = savedTitle;
} else {
  dashboardTitle.textContent = "Antonio's Dashboard";
  localStorage.setItem("dashboard-title", "Antonio's Dashboard");
}

function saveDashboardTitle() {
  const newTitle = dashboardTitle.textContent.trim();

  if (newTitle !== "") {
    localStorage.setItem("dashboard-title", newTitle);
  } else {
    dashboardTitle.textContent = "Antonio's Dashboard";
    localStorage.setItem("dashboard-title", "Antonio's Dashboard");
  }

  dashboardTitle.contentEditable = "false";
}

dashboardTitle.addEventListener("click", function () {
  dashboardTitle.contentEditable = "true";
  dashboardTitle.focus();
});

dashboardTitle.addEventListener("blur", function () {
  saveDashboardTitle();
});

dashboardTitle.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    dashboardTitle.blur();
  }
});

// Notes saved in localStorage
const textarea = document.getElementById("notes-text");
const savedNotes = localStorage.getItem("dashboard-notes");

if (savedNotes) {
  textarea.value = savedNotes;
}

textarea.addEventListener("input", function () {
  localStorage.setItem("dashboard-notes", textarea.value);
});

// Bookmarks functionality
const bookmarkForm = document.getElementById("bookmark-form");
const bookmarkTitleInput = document.getElementById("bookmark-title");
const bookmarkUrlInput = document.getElementById("bookmark-url");
const bookmarksList = document.getElementById("bookmarks-list");

let bookmarks = JSON.parse(localStorage.getItem("dashboard-bookmarks")) || [];

//Helper function to render the bookmarks icons
function getBookmarkFavicon(url) {
  const domain = new URL(url).hostname.replace("www.", "");
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}

// Calling the default bookmarks and the saved bookmarks from localstorage
function renderBookmarks() {
  bookmarksList.innerHTML = "";

  bookmarks.forEach((bookmark) => {
    const li = document.createElement("li");
    li.classList.add("bookmark-item");

    const leftSide = document.createElement("div");
    leftSide.classList.add("bookmark-left");

    const icon = document.createElement("img");
    icon.src = getBookmarkFavicon(bookmark.url);
    icon.alt = `${bookmark.title} favicon`;
    icon.classList.add("bookmark-icon");

    const link = document.createElement("a");
    link.href = bookmark.url;
    link.textContent = bookmark.title;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.classList.add("bookmark-link");

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.type = "button";
    removeBtn.classList.add("remove-btn");

    removeBtn.addEventListener("click", function () {
      bookmarks = bookmarks.filter((b) => b.url !== bookmark.url);
      localStorage.setItem("dashboard-bookmarks", JSON.stringify(bookmarks));
      renderBookmarks();
    });

    leftSide.appendChild(icon);
    leftSide.appendChild(link);
    li.appendChild(leftSide);
    li.appendChild(removeBtn);
    bookmarksList.appendChild(li);
  });
}

// Event listener for the bookmark form submission
const bookmarkModal = document.getElementById("bookmark-modal");
const openBookmarkModalBtn = document.getElementById("open-bookmark-modal");
const closeBookmarkModalBtn = document.getElementById("close-bookmark-modal");
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
  bookmarkModal.close();
});


openBookmarkModalBtn.addEventListener("click", function () {
  bookmarkModal.showModal();
});

closeBookmarkModalBtn.addEventListener("click", function () {
  bookmarkModal.close();
});

renderBookmarks();

// Weather widget for today, tomorrow and the day after tomorrow using Open-Meteo API
const weatherWidget = document.getElementById("weather-widget");

// Helper function to get the day label
function getDayLabel(index, dateString) {
  if (index === 0) return "Today";
  if (index === 1) return "Tomorrow";

  const date = new Date(dateString);
  const weekdayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekdayNames[date.getDay()];
}

// Helper function to get the weather icon and description based on the weather code
function getWeatherVisual(code) {
  if (code === 0) return { icon: "☀️", text: "Clear" };
  if (code === 1 || code === 2) return { icon: "⛅", text: "Partly cloudy" };
  if (code === 3) return { icon: "☁️", text: "Overcast" };
  if (code === 45 || code === 48) return { icon: "🌫️", text: "Fog" };
  if ([51, 53, 55, 56, 57].includes(code))
    return { icon: "🌦️", text: "Drizzle" };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code))
    return { icon: "🌧️", text: "Rain" };
  if ([71, 73, 75, 77, 85, 86].includes(code))
    return { icon: "❄️", text: "Snow" };
  if ([95, 96, 99].includes(code)) return { icon: "⛈️", text: "Storm" };

  return { icon: "🌤️", text: "Unknown" };
}

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`,
      )
        .then((response) => response.json())
        .then((data) => {
          const temperature = data.current.temperature_2m;
          const windSpeed = data.current.wind_speed_10m;
          const weatherCode = data.current.weather_code;

          const forecastRows = [
            {
              day: "Today",
              temperature: `${Math.round(data.current.temperature_2m)}°C`,
              weatherCode: data.current.weather_code,
            },
            {
              day: "Tomorrow",
              temperature: `${Math.round(data.daily.temperature_2m_max[1])}° / ${Math.round(data.daily.temperature_2m_min[1])}°`,
              weatherCode: data.daily.weather_code[1],
            },
            {
              day: getDayLabel(2, data.daily.time[2]),
              temperature: `${Math.round(data.daily.temperature_2m_max[2])}° / ${Math.round(data.daily.temperature_2m_min[2])}°`,
              weatherCode: data.daily.weather_code[2],
            },
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
        .catch((error) => {
          weatherWidget.textContent = "Unable to fetch weather data.";
          console.error("Error fetching weather data:", error);
        });
    },
    function (error) {
      weatherWidget.textContent = "Unable to retrieve your location.";
      console.error("Error retrieving location:", error);
    },
  );
} else {
  weatherWidget.textContent = "Geolocation is not supported by this browser.";
}



// Unsplash background button
const changeBgButton = document.getElementById("change-bg-button");
const changeBgLabel = document.getElementById("change-bg-label");

// Restore the background image from Localstorage when the page loads
const savedBackground = localStorage.getItem("dashboard-background");
if (savedBackground) {
document.body.style.backgroundImage = `url(${savedBackground})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";}

changeBgButton.addEventListener("click", function () {
changeBgLabel.textContent = "Loading...";
  // Fetch a random portrait image from Unsplash API and set it as the background image, also save it in Localstorage
  fetch("https://api.unsplash.com/photos/random?orientation=portrait", {
    headers: {
      Authorization: "Client-ID 7x7pTUgm0ovp1IbUFvs8PT_Kwch_SvM2qYNh2FshQbE",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Use the returned image URL to set the background image of the dashboard, also save it in Localstorage
      const imageUrl = data.urls.regular;

      document.body.style.backgroundImage = `url(${imageUrl})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";

      // Save the background image URL in Localstorage
      localStorage.setItem("dashboard-background", imageUrl);
      changeBgLabel.textContent = "Change BG";
    })
    .catch(function (error) {
      console.error("Error fetching background image:", error);
      changeBgLabel.textContent = "Change BG";
      alert("Error fetching background image. Please try again later.");
    });
});

// Crypto widget

const cryptoWidget = document.getElementById("crypto-widget");

function updateCryptoPrices() {
  cryptoWidget.textContent = "Loading crypto prices...";

  fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd",
  )
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
