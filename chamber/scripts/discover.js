import { places } from "../data/places.mjs";

const placesContainer = document.querySelector("#places");
const visitMessage = document.querySelector("#visit-message");
const millisecondsPerDay = 24 * 60 * 60 * 1000;

function createPlaceCard(place) {
    const card = document.createElement("article");
    card.className = "place-card";

    const title = document.createElement("h2");
    title.textContent = place.name;

    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.src = place.image;
    image.alt = place.alt;
    image.width = 300;
    image.height = 200;
    image.loading = "lazy";
    figure.appendChild(image);

    const address = document.createElement("address");
    address.textContent = place.address;

    const description = document.createElement("p");
    description.className = "place-description";
    description.textContent = place.description;

    const details = document.createElement("p");
    details.className = "place-details";
    details.textContent = place.details;
    details.hidden = true;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Learn More";
    button.setAttribute("aria-expanded", "false");
    button.addEventListener("click", () => {
        const isExpanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!isExpanded));
        button.textContent = isExpanded ? "Learn More" : "Show Less";
        details.hidden = isExpanded;
    });

    card.append(title, figure, address, description, details, button);
    return card;
}

places.forEach((place) => {
    placesContainer.appendChild(createPlaceCard(place));
});

function showVisitMessage() {
    const now = Date.now();

    try {
        const previousVisit = Number(localStorage.getItem("discover-last-visit"));

        if (!previousVisit) {
            visitMessage.textContent = "Welcome! Let us know if you have any questions.";
        } else {
            const elapsedTime = now - previousVisit;

            if (elapsedTime < millisecondsPerDay) {
                visitMessage.textContent = "Back so soon! Awesome!";
            } else {
                const elapsedDays = Math.floor(elapsedTime / millisecondsPerDay);
                const dayLabel = elapsedDays === 1 ? "day" : "days";
                visitMessage.textContent = `You last visited ${elapsedDays} ${dayLabel} ago.`;
            }
        }

        localStorage.setItem("discover-last-visit", String(now));
    } catch {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    }
}

showVisitMessage();
