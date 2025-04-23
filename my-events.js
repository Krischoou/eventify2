document.addEventListener("DOMContentLoaded", function () {
    const eventsContainer = document.getElementById("eventsContainer");

    try {
        let events = JSON.parse(localStorage.getItem("events")) || [];

        if (events.length === 0) {
            eventsContainer.innerHTML = "<p>Нямате записани събития.</p>";
        } else {
            events.forEach((event, index) => {
                const eventCard = document.createElement("div");
                eventCard.className = "event-card";
                eventCard.innerHTML = `
                    <h3>${event.name} (${event.type})</h3>
                    <p><strong>Дата:</strong> ${event.date}</p>
                    <p><strong>Локация:</strong> ${event.location}</p>
                    <p><strong>Описание:</strong> ${event.description}</p>
                    <p><strong>Гости:</strong> ${event.guests.join(", ") || "Няма добавени гости"}</p>
                    <button class="delete-btn" data-index="${index}">Изтрий</button>
                `;
                eventsContainer.appendChild(eventCard);
            });

            document.querySelectorAll(".delete-btn").forEach(button => {
                button.addEventListener("click", function () {
                    const index = this.getAttribute("data-index");
                    events.splice(index, 1);
                    localStorage.setItem("events", JSON.stringify(events));
                    location.reload();
                });
            });
        }
    } catch (error) {
        console.error("Грешка при зареждането на събития:", error);
    }
});
