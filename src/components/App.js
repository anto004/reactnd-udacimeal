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
import TestReducer from "../reducers/TestReducer";
import ShoppingList from "../components/ShoppingList"

Modal.setAppElement('body');
class App extends Component {
    state = {
        foodModalOpen: false,
        meal: null,
        day: null,
        food: null,
        loadingFood: false,
        ingredientsModalOpen: false
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

    openIngredientsModal = () => {
        this.setState(() => ({
            ingredientsModalOpen: true
        }))
    };

    closeIngredientsModal = () => {
        this.setState(() => ({
            ingredientsModalOpen: false
        }))
    };

    searchFood = (e) => {
        if(!this.input.value){
            return
        }
        //TODO: jot down
        e.preventDefault();

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

    generateShoppingList = () => {
        return this.props.calendar.reduce(((result, {meals}) => {
                const {breakfast, lunch, dinner} = meals;
                breakfast && result.push(breakfast);
                lunch && result.push(lunch);
                dinner && result.push(dinner);
                console.log("result", result);

                return result;
            }
        ), [])
            .reduce(((ings, {ingredientLines}) => {
                    ings.concat(ingredientLines)
                }
            ), [])
    };
    render() {

        const generateTest = this.generateShoppingList();
        console.log("generateTest",generateTest);

        const {foodModalOpen, loadingFood, food, ingredientsModalOpen} = this.state; // coming from react state
        const {calendar, remove, selectRecipe} = this.props; // coming from redux
        const mealOrder = ["breakfast", "lunch", "dinner"];
        return (
            <div className="container">
                <div className="nav">
                    <h1 className="header">Udacimeals</h1>
                    <button
                        className="shopping-list"
                        onClick={this.openIngredientsModal}
                    >Shopping List</button>
                </div>
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
                                        {meal[meal]
                                            ? <div className="food-item">
                                                <img src={meals[meal].image} alt={meals[meal].label}/>
                                                <button onClick={() => remove({meal, day})}>Clear</button>
                                                {console.log("meals[meal]:", meals[meal], "day[meal]:", day[meal])}
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
                <Modal
                    className="modal"
                    overlayClassName="overlay"
                    isOpen={foodModalOpen}
                    onRequestClose={this.closeFoodModal}
                >
                    <div>
                        {loadingFood === true
                            ? <Loading delay={200} type="spin" color="#222" className="loading"/>
                            : <div className="search-container">
                                <h3 className="subheader">
                                    Find a meal for {capitalize(this.state.day)} {this.state.meal}
                                </h3>
                                <div className="search">
                                    <input
                                        className="food-input"
                                        type="text"
                                        placeholder="Search Foods"
                                        ref={(input) => this.input = input}
                                    />
                                    <button
                                        className="icon-btn"
                                        onClick={this.searchFood}>
                                        <ArrowRightIcon size={30}/>
                                    </button>
                                </div>
                                {food !== null && (
                                    <FoodList
                                        food={food}
                                        onSelect={(recipe) => {
                                            selectRecipe({day: this.state.day, meal: this.state.meal, recipe});
                                            this.closeFoodModal()
                                        }}
                                    />
                                )
                                }
                            </div>
                        }
                    </div>
                </Modal>
                <Modal
                    className="modal"
                    overlayClassName="overlay"
                    isOpen={ingredientsModalOpen}
                    onRequestClose={this.closeIngredientsModal}
                    contentLabel="Modal"
                >
                    {ingredientsModalOpen && <ShoppingList list={this.generateShoppingList()}/>}
                </Modal>
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
                mealAcc[mealItem] = calendar[day][mealItem] //create property mealItem
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
    const addRecipeFunc = (data) => {
        console.log("data", data);
        const x = addRecipe(data);
        console.log("addRecipe", x);

        return x;
    }
    return {
        selectRecipe: (data) => {
            console.log(dispatch);
            dispatch(addRecipeFunc(data))
        },
        removeRecipe: (data) => this.props.dispatch(removeFromCalendar(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)