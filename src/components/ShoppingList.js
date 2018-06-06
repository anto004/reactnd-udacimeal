import React,{Component} from "react";
import PropTypes from "prop-types"

export default function ShoppingList({list}){
    ShoppingList.propTypes = {
        list: PropTypes.array.isRequired
    };

    return (
        <div className="ingredients-list">
            <h3 className="subheader">
                Your Shopping List
            </h3>
            <ul>
                {list.map((item) => (
                        <li key={item}>
                        {item}
                        </li>
                    ))
                }
            </ul>

        </div>
    )
}