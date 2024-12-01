function toggleTranslation(blockId) {
    const block = document.getElementById(blockId);
    const textElement = block.querySelector('.gibberish-text');
    const buttonElement = block.querySelector('.translate-button');

    const gibberishText = textElement.getAttribute('data-gibberish');
    const englishText = textElement.getAttribute('data-english');

    // Toggle between gibberish and English
    if (textElement.textContent === gibberishText) {
        textElement.textContent = englishText;
        buttonElement.textContent = "De-translate";
    } 
    else {
        textElement.textContent = gibberishText;
        buttonElement.textContent = "Translate";
    }
}