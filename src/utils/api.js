const API_ID = process.env.REACT_APP_API_ID
const APP_KEY = process.env.REACT_APP_APP_KEY
// const API_ID = "41d370a0";
// const APP_KEY = "aee8026bd925da102b9a871b5276eb79";

export function fetchRecipes (food = '') {
    food = food.trim();
    console.log("API_ID", API_ID, " APP_KEY:", APP_KEY)
    return fetch(`https://api.edamam.com/search?q=${food}&app_id=${API_ID}&app_key=${APP_KEY}`)
        .then((res) => res.json())
        .then(({ hits }) => hits.map(({ recipe }) => recipe))
}
// https://api.edamam.com/search?q=pasta&app_id=41d370a0&app_key=aee8026bd925da102b9a871b5276eb79