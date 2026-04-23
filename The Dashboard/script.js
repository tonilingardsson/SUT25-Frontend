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
    
    link.href = bookmark.url;
    link.textContent = bookmark.title;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    
    li.appendChild(link);
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

renderBookmarks();