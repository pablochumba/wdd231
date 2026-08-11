const formData = new URLSearchParams(window.location.search);

const summary = document.querySelector('#confirmation-summary');

if (summary) {
  const fields = [
    ['Name', formData.get('name') || 'Unknown guest'],
    ['Email', formData.get('email') || 'No email provided'],
    ['Interest', formData.get('interest') || 'Not selected'],
    ['Goals', formData.get('goals') || 'No details provided']
  ];

  fields.forEach(([label, value]) => {
    const item = document.createElement('li');
    const fieldLabel = document.createElement('strong');

    fieldLabel.textContent = `${label}: `;
    item.append(fieldLabel, document.createTextNode(value));
    summary.appendChild(item);
  });
}
