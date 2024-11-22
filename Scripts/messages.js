document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const content = document.getElementById("content");
    const error = document.getElementById("error");

    const renderMessages = (messages) => {
        messages.forEach((message) => {
            const messageDiv = document.createElement("div");
            messageDiv.classList.add("message");

            const title = document.createElement("h3");
            title.textContent = message.title;

            const body = document.createElement("p");
            body.textContent = message.body;

            messageDiv.appendChild(title);
            messageDiv.appendChild(body);
            content.appendChild(messageDiv);
        });
    };

    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Ошибка сети");
            }
            return response.json();
        })
        .then((data) => {

            // Generate a random number of messages to display
            const numberOfMessages = Math.floor(Math.random() * data.length) + 1;

            // Shuffle the array and select a random subset
            const shuffledMessages = data.sort(() => 0.5 - Math.random());
            const selectedMessages = shuffledMessages.slice(0, numberOfMessages);

            renderMessages(selectedMessages);
            preloader.style.display = "none";
        })
        .catch((err) => {
            preloader.style.display = "none";
            error.textContent = `⚠ Что-то пошло не так: ${err.message}`;
        });
});