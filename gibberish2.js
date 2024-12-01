// Original English text
const englishText = `
    NAME : CT3<br>
    BIRTH-DATE : 2000 BC<br>
    MBTI : INTJ-T<br>
    JOB : VLOGGER<br>
    FROM : NEPTUNE-T3<br>
    FAV-PET : FISH<br>
    FAV-PLANET : SATURN<br>
    FAV-FOOD : N/A<br>
    UNFAV-FOOD : FISH<br>
`;

// Gibberish text (initial state)
const gibberishText = `
    Na-Mal : CT3<br>
    Mway-Ya : [NULL][ENDOFTEXT]-[NULL][ENDOFTEXT]-[SPACE][NULL][ENDOFTEXT]<br>
    MBTI : INTJ-T<br>
    POSITION-NT3 : A-HTOO-AGENT<br>
    POSITION-EARTH : VLOGGER<br>
    Bal-Ka : NEPTUNE-T3<br>
    fav-aYong : A-NI-YONG<br>
    fav-taRateson : NGAAAAA<br>
    fav-planet : SATURN<br>
    fav-food : N/A<br>
    defav-food : NGAAAAA<br>
`;

// Initially set text to gibberish
let isGibberish = true;
const introText = document.getElementById('intro-text');
introText.innerHTML = gibberishText;  // Initially set gibberish

// Function to toggle between gibberish and English text
function toggleTranslation() {
    const button = document.getElementById('translate-btn');
    
    // Toggle text between gibberish and English
    if (isGibberish) {
        introText.innerHTML = englishText;
        button.innerHTML = 'De-Translate'; // Button text change when translated
    } else {
        introText.innerHTML = gibberishText;
        button.innerHTML = 'Translate'; // Button text change when gibberish
    }

    // Toggle the state to track the current text state
    isGibberish = !isGibberish;

    // Optional: Apply button style transitions (if needed)
    button.style.transition = 'background 0.3s ease, transform 0.2s ease'; // Ensures smooth transitions
}
