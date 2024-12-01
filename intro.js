// Typing Effect Script
const headerText = "I am CT3, welcome to my vlog page, explore a day in a life of an alien on Earth.";
let j = 0;

function typewriterHeader() {
    console.log("Starting header typing..."); // Debugging log
    const headerElement = document.getElementById('header-text');
    if (headerElement) {
        if (j < headerText.length) {
            headerElement.innerHTML += headerText.charAt(j);
            j++;
            setTimeout(typewriterHeader, 50); // Adjust speed here
        } else {
            console.log("Header typing finished."); // Debugging log
        }
    } else {
        console.error("Element with ID 'header-text' not found.");
    }
}

window.onload = function() {
    console.log("Window loaded.");
    typewriterHeader(); // Start typing header text
};
