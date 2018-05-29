
export const ADD_RECIPE = "ADD_RECIPE";
export const REMOVE_FROM_CALENDAR = "REMOVE_FROM_CALENDAR";

/*
@param an object with day, recipe and meal object
 */
export const addRecipe = ({day, meal, recipe}) => ({
    type: ADD_RECIPE,
    day,
    meal,
    recipe
});

export const removeFormCalendar = ({day, meal}) => ({
    type: REMOVE_FROM_CALENDAR,
    day,
    meal
});



