import {ADD_RECIPE, REMOVE_FROM_CALENDAR} from "../actions";
import {addRecipe} from "../actions";

const initialCalendarState = {
    monday: {
        breakfast: null,
        lunch: null,
        dinner: null
    },
    tuesday: {
        breakfast: null,
        lunch: null,
        dinner: null
    },
    wednesday: {
        breakfast: null,
        lunch: null,
        dinner: null
    },
    thursday: {
        breakfast: null,
        lunch: null,
        dinner: null
    },
    friday: {
        breakfast: null,
        lunch: null,
        dinner: null
    },
    saturday: {
        breakfast: null,
        lunch: null,
        dinner: null
    },
    sunday: {
        breakfast: null,
        lunch: null,
        dinner: null
    }
};

const TestCalendar = (state = initialCalendarState, action = {}) => {
    console.log("Test reducer: ");
    const {day, meal, recipe} = action;
    switch(action.type){
        case ADD_RECIPE:
            return {
                ...state, //all the other states will remain the same except for [day]
                [day]: {
                    ...state[day], //all the other state[day](breakfast, lunch, dinner) would remain the same except for[meal]
                    [meal]: recipe.label
                }
            };
        case REMOVE_FROM_CALENDAR:
            return {
                ...state, //all the other states will remain the same except for [day]
                [day]: {
                    ...state[day],
                    [meal]: null
                }
            };
        default:
            return state;
    }

};

export default TestCalendar;