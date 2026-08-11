export async function getExperiences() {
  try {
    const response = await fetch('data/experiences.json');

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.experiences || [];
  } catch (error) {
    console.error('Could not load experiences:', error);
    return [];
  }
}

export function createExperienceCard(item) {
  return `
    <article class="experience-card">
      <div class="card-top">
        <p class="card-category">${item.category}</p>
        <button class="detail-button" data-id="${item.id}" type="button">View details</button>
      </div>
      <h3>${item.title}</h3>
      <ul>
        <li><strong>Level:</strong> ${item.level}</li>
        <li><strong>Duration:</strong> ${item.duration}</li>
        <li><strong>Price:</strong> ${item.price}</li>
        <li><strong>Format:</strong> ${item.format}</li>
      </ul>
      <p class="card-description">${item.description}</p>
    </article>
  `;
}

export function renderDetails(dialog, item) {
  dialog.querySelector('[data-role="title"]').textContent = item.title;
  dialog.querySelector('[data-role="category"]').textContent = item.category;
  dialog.querySelector('[data-role="instructor"]').textContent = `Instructor: ${item.instructor}`;
  dialog.querySelector('[data-role="focus"]').textContent = `Focus: ${item.focus}`;
  dialog.querySelector('[data-role="schedule"]').textContent = `Schedule: ${item.schedule}`;
  dialog.querySelector('[data-role="description"]').textContent = item.description;
  dialog.querySelector('[data-role="level"]').textContent = `Level: ${item.level}`;
  dialog.querySelector('[data-role="price"]').textContent = `Price: ${item.price}`;
}
