

export function shuffleArray(array) {
    // Shuffle the fracties (Using Fisher-Yates algorithm)
    for (let i = array.length - 1; i > 0; i--) {
        // j is a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    };

    return array;
}