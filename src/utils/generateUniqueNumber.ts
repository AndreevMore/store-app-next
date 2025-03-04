export function generateUniqueNumber() {
    const randomValues = new Uint32Array(1);  // Array with one random value
    crypto.getRandomValues(randomValues);  // Fill the array with random numbers
    return randomValues[0];  // Return the random number
}