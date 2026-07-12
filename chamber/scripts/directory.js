const membersContainer = document.querySelector("#members");
const memberCount = document.querySelector("#member-count");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

const membershipLabels = {
    1: "Member",
    2: "Silver",
    3: "Gold"
};

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load member data.");
        }

        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        membersContainer.innerHTML = `<p class="error-message">${error.message}</p>`;
        memberCount.textContent = "Member data unavailable";
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = "";
    memberCount.textContent = `${members.length} chamber members`;

    members.forEach((member) => {
        const card = document.createElement("article");
        card.classList.add("member-card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} business image" width="360" height="203" loading="lazy">
            <div>
                <h3>${member.name}</h3>
                <p class="member-description">${member.description}</p>
                <span class="member-level">${membershipLabels[member.membershipLevel]}</span>
            </div>
            <div>
                <p>${member.address}</p>
                <p>${member.phone}</p>
            </div>
            <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
        `;

        membersContainer.appendChild(card);
    });
}

function setView(view) {
    const isGrid = view === "grid";
    membersContainer.className = isGrid ? "members-grid" : "members-list";
    gridButton.classList.toggle("active", isGrid);
    listButton.classList.toggle("active", !isGrid);
    gridButton.setAttribute("aria-pressed", isGrid);
    listButton.setAttribute("aria-pressed", !isGrid);
}

gridButton.addEventListener("click", () => setView("grid"));
listButton.addEventListener("click", () => setView("list"));

getMembers();
