const formData = new URLSearchParams(window.location.search);

const submittedFields = {
    "submitted-first-name": "first-name",
    "submitted-last-name": "last-name",
    "submitted-email": "email",
    "submitted-phone": "phone",
    "submitted-organization": "organization"
};

Object.entries(submittedFields).forEach(([elementId, parameterName]) => {
    const element = document.querySelector(`#${elementId}`);
    element.textContent = formData.get(parameterName) || "Not provided";
});

const submittedTimestamp = document.querySelector("#submitted-timestamp");
const timestampValue = formData.get("timestamp");
const timestampDate = new Date(timestampValue);

submittedTimestamp.textContent = timestampValue && !Number.isNaN(timestampDate.getTime())
    ? new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
        timeStyle: "short"
    }).format(timestampDate)
    : "Not provided";
