
// Find all language buttons
const languageButtons = document.querySelectorAll(".lang-btn");

// Function to translate the website
async function changeLanguage(language) {
    const response = await fetch(`translations/${language}.json`);
    const translations = await response.json();

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;

        if (translations[key] !== undefined) {
            element.textContent = translations[key];
        }
    });

    // Highlight the selected language button
    languageButtons.forEach(button => {
        const selected = button.dataset.lang === language;

        button.classList.toggle("active", selected);
        button.setAttribute("aria-pressed", selected);
    });

    // Update the HTML language
    document.documentElement.lang = language;

    // Remember the selected language
    localStorage.setItem("quickfresh-language", language);
}

// Listen for clicks on the language buttons
languageButtons.forEach(button => {
    button.addEventListener("click", () => {
        changeLanguage(button.dataset.lang);
    });
});

// Restore the saved language when the page loads

const savedLanguage = localStorage.getItem("quickfresh-language");

if (["mk", "en", "sq"].includes(savedLanguage)) {
    changeLanguage(savedLanguage);
} else {
    changeLanguage("mk");
}
