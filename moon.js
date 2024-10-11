let moonPhaseCache = null;
let emojiCache = null;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchMoonPhaseData = async () => {
    if (moonPhaseCache) {
        displayMoonPhase(moonPhaseCache);
        fetchMoonPhaseEmoji(); // Optionally fetch emoji
        return;
    }

    try {
        const response = await fetch("https://moon-phase.p.rapidapi.com/basic", {
            method: "GET",
            headers: {
                "x-rapidapi-host": "moon-phase.p.rapidapi.com",
                "x-rapidapi-key": "263b46dcd4msh61f3d6e8602a659p186d24jsnc7aaf0c31491" // Keep this secure
            }
        });

        if (!response.ok) {
            const errorResponse = await response.text();
            throw new Error(`HTTP error ${response.status}: ${errorResponse}`);
        }

        const data = await response.json();
        moonPhaseCache = data.phase_name; // Cache the moon phase
        displayMoonPhase(moonPhaseCache);
        
        await delay(1000); // Delay before next call
        fetchMoonPhaseEmoji();
    } catch (error) {
        console.error("Error fetching moon phase data:", error);
        displayMoonPhase("Error fetching moon phase data");
    }
};

const fetchMoonPhaseEmoji = async () => {
    if (emojiCache) {
        displayMoonPhaseEmoji(emojiCache);
        return;
    }

    const url = 'https://moon-phase.p.rapidapi.com/emoji';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '263b46dcd4msh61f3d6e8602a659p186d24jsnc7aaf0c31491', // Keep this secure
            'x-rapidapi-host': 'moon-phase.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorResponse = await response.text();
            throw new Error(`HTTP error ${response.status}: ${errorResponse}`);
        }
        
        const result = await response.text();
        emojiCache = result; // Cache the emoji
        displayMoonPhaseEmoji(emojiCache);
    } catch (error) {
        console.error("Error fetching moon phase emoji:", error);
    }
};

const displayMoonPhase = (text) => {
    const phaseTextElement = document.getElementById("phase-text");
    if (phaseTextElement) {
        phaseTextElement.innerText = text;
    } else {
        console.error("Element with ID 'phase-text' not found.");
    }
};

const displayMoonPhaseEmoji = (emoji) => {
    const emojiTextElement = document.getElementById("emoji-text");
    if (emojiTextElement) {
        emojiTextElement.innerText = emoji; // Display the emoji in a separate element
    } else {
        console.error("Element with ID 'emoji-text' not found.");
    }
};

fetchMoonPhaseData();
