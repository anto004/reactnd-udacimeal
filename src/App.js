import React, { Component } from 'react';
import {connect} from "react-redux";

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
        mapStateToProps(initialCalendarState);
        return (
            <div>
               Hello World!
            </div>
        )
    }
}


const mapStateToProps = (calendar) => {
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    return {
        calendar: days.map((day) => ({
            day,
            meals: Object.keys(calendar[day]).reduce((mealAcc, mealItem) => {
                mealAcc[mealItem] = calendar[day][mealItem]
                    ? calendar[day][mealItem]
                    : null;
                return mealAcc;
            }, {})
        }))
    }

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

export default connect(mapStateToProps)(App)