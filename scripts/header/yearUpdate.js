function updateYear() {
    const yearElement = document.getElementById('dateYear');
    // Only update if the element is found
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerText = currentYear;
    }
}

// Update the year immediately on page load
updateYear();

// Set up an interval to update the year at the start of each new year
// Assuming the page stays open across years, which is unlikely but possible
const now = new Date();
const startOfNextYear = new Date(now.getFullYear() + 1, 0, 1);
const millisecondsTillNextYear = startOfNextYear - now;

setTimeout(() => {
    updateYear();
    // Use setInterval only if the element exists
    if (document.getElementById('dateYear')) {
        setInterval(updateYear, 365 * 24 * 60 * 60 * 1000); // Update yearly
    }
}, millisecondsTillNextYear);