const yearElement = document.getElementById("currentyear");
const today = new Date();
const currentYear = today.getFullYear();
yearElement.textContent = currentYear;

const lastModifiedElement = document.getElementById("lastModified")
lastModifiedElement.textContent = "Last Modification: " + document.lastModified;

