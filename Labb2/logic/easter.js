const secret = "horse";
let buffer = "";

document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    // adding the secret word to the buffer
    buffer += key;

    // the buffer may be max as long as the secret word
    if(buffer.length > secret.length) {
        buffer = buffer.slice(-secret.length);
    }

    // trigger when the buffer matches the secret
    if (buffer === secret) {
        const modal = document.getElementById("easter-modal");
        if (modal) {
            modal.style.display = "flex";
        }
    }
});

// Close the modal when X is clicked
document.querySelectorAll(".modal-close").forEach((btn) => {
    btn.addEventListener("click", (event) => {
        event.preventDefault();
        const modal = btn.closest(".modal");
        if (modal) {
            modal.style.display = "none";
        }
    });
});

const snakeBtn = document.getElementById("snake-trigger");

if (snakeBtn) {
    snakeBtn.addEventListener("click", () => {
        const modal = document.getElementById("snake-modal");
        if (modal) {
            modal.style.display = "flex";
        }
    });
}
