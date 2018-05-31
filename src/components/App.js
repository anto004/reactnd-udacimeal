import React, { Component } from "react";
import {connect} from "react-redux";
import {addRecipe, removeFromCalendar} from "../actions/index";
import {capitalize} from "../utils/helpers"
import CalendarIcon from "react-icons/lib/fa/calendar-plus-o"
import Modal from "react-modal";
import ArrowRightIcon from "react-icons/lib/fa/arrow-circle-right";
import Loading from "react-loading"
import {fetchRecipes} from "../utils/api";
import FoodList from "../components/FoodList";

class App extends Component {
    state = {
        foodModalOpen: false,
        meal: null,
        day: null,
        food: null,
        loadingFood: false
    };

    openFoodModal = ({meal, day}) => {
        this.setState(() => ({
            foodModalOpen: true,
            meal,
            day
        }))
    };

    closeFoodModal = () => {
        this.setState(() => ({
            foodModalOpen: false,
            meal: null,
            day: null,
            food: null
        }))
    };

    searchFood = (e) => {
        if(!this.input.value){
            return
        }

        e.preventDefault()

        this.setState(() => ({
            loadingFood: true
        }));

        fetchRecipes(this.input.value)
            .then((food) => this.setState(() => ({
                    food,
                    loadingFood: false
                }))
            )
    };
    render() {
        const {foodModalOpen, loadingFood, food} = this.state; // coming from react state
        const {calendar, remove, selectRecipe} = this.props; // coming from redux
        const mealOrder = ["breakfast", "lunch", "dinner"];

        return (
            <div className="container">

                <ul className="meal-types">
                    {mealOrder.map((mealType) => (
                        <li key={mealType} className="subheader">
                            {capitalize(mealType)}
                        </li>
                    ))}
                </ul>

                <div className="calendar">
                    <div className="days">
                        {calendar.map(({day}) => (
                            <h3 key={day} className="subheader">
                                {capitalize((day))}
                            </h3>
                        ))}
                    </div>
                    <div className="icon-grid">
                        {calendar.map(({day, meals}) => (
                            <ul key={day}>
                                {mealOrder.map((meal) => (
                                    <li key={meal} className="meal">
                                        {meals[meal]
                                            ? <div className="food-item">
                                                <img src={meals[meal].image} alt={meals[meal].label}/>
                                                <button onClick={() => remove({meal, day})}>Clear</button>
                                              </div>
                                            :<button className="icon-btn" onClick={() => this.openFoodModal({meal, day})}>
                                                <CalendarIcon size={30}/>
                                            </button>}
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>

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