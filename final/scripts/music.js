import { getExperiences, createExperienceCard, renderDetails } from './data.js';

const list = document.querySelector('#music-list');
const dialog = document.querySelector('#experience-dialog');
const closeButton = document.querySelector('#close-dialog');
const filterButtons = document.querySelectorAll('[data-filter]');

let allExperiences = [];

function renderExperiences(items) {
  if (!list) return;

  list.innerHTML = items.map(createExperienceCard).join('');

  const detailButtons = document.querySelectorAll('.detail-button');

  detailButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = items.find((item) => String(item.id) === button.dataset.id);
      if (selected) {
        renderDetails(dialog, selected);
        dialog.showModal();
      }
    });
  });
}

function applyFilter(filterValue) {
  const filtered = allExperiences.filter((item) => {
    if (filterValue === 'all') return true;
    return item.level.toLowerCase() === filterValue.toLowerCase();
  });

  renderExperiences(filtered);
}

async function init() {
  allExperiences = (await getExperiences()).filter((item) => item.category === 'music');

  if (!allExperiences.length) {
    list.innerHTML = '<p class="empty-state">No music experiences are available right now.</p>';
    return;
  }

  renderExperiences(allExperiences);

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      applyFilter(button.dataset.filter);
    });
  });
}

if (closeButton) {
  closeButton.addEventListener('click', () => dialog.close());
}

if (dialog) {
  dialog.addEventListener('click', (event) => {
    const dialogArea = event.target;
    if (dialogArea === dialog) {
      dialog.close();
    }
  });
}

init();
