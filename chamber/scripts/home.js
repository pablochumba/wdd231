const spotlightContainer = document.querySelector("#spotlight-cards");

const spotlightMembershipLabels = {
    2: "Silver Member",
    3: "Gold Member"
};

async function getSpotlightMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load featured members.");
        }

        const data = await response.json();
        const eligibleMembers = data.members.filter((member) => [2, 3].includes(member.membershipLevel));
        const selectedMembers = shuffleMembers(eligibleMembers).slice(0, 3);

        displaySpotlights(selectedMembers);
    } catch (error) {
        spotlightContainer.innerHTML = `<p class="spotlight-error">${error.message}</p>`;
    }
}

function shuffleMembers(members) {
    const shuffledMembers = [...members];

    for (let index = shuffledMembers.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [shuffledMembers[index], shuffledMembers[randomIndex]] = [shuffledMembers[randomIndex], shuffledMembers[index]];
    }

    return shuffledMembers;
}

function displaySpotlights(members) {
    spotlightContainer.innerHTML = members.map((member) => `
        <article class="spotlight-card">
            <div class="spotlight-card-header">
                <h3>${member.name}</h3>
                <span class="spotlight-level">${spotlightMembershipLabels[member.membershipLevel]}</span>
            </div>
            <div class="spotlight-details">
                <img src="images/${member.image}" alt="${member.name} logo" width="80" height="80" loading="lazy">
                <address>
                    <p>${member.phone}</p>
                    <p>${member.address}</p>
                    <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
                </address>
            </div>
        </article>
    `).join("");
}

getSpotlightMembers();
