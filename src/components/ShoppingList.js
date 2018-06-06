import React,{Component} from "react";
import PropTypes from "prop-types"

const ShoppingList = ({list, name}) => (
    <div className="ingredients-list">
        <h3 className="subheader">
            Your Shopping List {name}
        </h3>
        <ul>
            {list.map((item) => (
                <li key={item}>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);


ShoppingList.propTypes = {
    list: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired
};

export default ShoppingList;