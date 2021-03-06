import {combineReducers} from "redux";
import {
    ADD_RECIPE,
    REMOVE_FROM_CALENDAR
} from "../actions";

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

//saving recipe as redux state
//what state is passed here, is it a similar state like initialCalendarState
const food = (state = {"Dumplings": "Steamed"}, action) => {
    console.log("Calling food reducers: ");
    const {recipe} = action;
    switch(action.type){
        case ADD_RECIPE:
            console.log("Food Reducer State: ", state);
            return {
                ...state,
                [recipe.label]: recipe
            };

        default:
            return state;
    }
};

//saving state for a particular day, meal with value, label of the recipe
const calendar = (state = initialCalendarState, action) => {
    console.log("Calling calendar reducers: ");
    const {day, meal, recipe} = action;
    switch(action.type){
        case ADD_RECIPE:
            console.log("Calendar Reducer State: ", state);
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

export default combineReducers({
    food,
    calendar
})
