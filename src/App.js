import React, { Component } from 'react';
import {connect} from "react-redux";
import {addRecipe, removeFromCalendar} from "./actions";

class App extends Component {
    render() {
        console.log("props: ", this.props);
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

        const reducer = (state = {}) => {
            const day = "monday";
            const meal = "lunch";
            const recipe = "pasta";
            return {
                ...state,
                [day]:{
                    ...state[day],
                    [meal]: recipe
                }
            }
        };
        console.log(reducer(initialCalendarState));
        return (
            <div>
               Hello World!
            </div>
        )
    }
}

// "pizza":{
//    INFO
// }


const mapStateToProps = ({calendar, food}) => {
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    return {
        calendar: days.map((day) => ({
            day,
            meals: Object.keys(calendar[day]).reduce((mealAcc, mealItem) => { // callback
                mealAcc[mealItem] = calendar[day][mealItem]
                    ? food[calendar[day][mealItem]] //  food[pizza] -> INFO
                    : null;
                return mealAcc;
            }, {}) // starting value
        }))
    };

    //Two other ways of getting
    // {
    //     day: "monday",
    //     meals:{
    //         "breakfast": null,
    //         "lunch": null,
    //         "dinner": null
    //     }
    // }
    //Method 1 spread operator
    // return {
    //     calendar: days.map((day) => ({
    //         day,
    //         meals: {...calendar[day]}
    //     }))
    // }
    //Method 2, cloning the calendar[day] object
    // return {
    //     calendar: days.map((day) => ({
    //         day,
    //         meals: Object.assign({}, calendar[day])
    //     }))
    // }
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectRecipe: (data) => this.props.dispatch(addRecipe(data)),
        removeRecipe: (data) => this.props.dispatch(removeFromCalendar(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)