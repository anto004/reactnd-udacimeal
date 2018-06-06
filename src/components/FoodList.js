import React from "react";

function trim(str){
    return str.length > 16
        ? str.slice(0, 16) + "..."
        : str;
}

export default function FoodList({food, onSelect}){
    if(food.length === 0){
        return <p> Your Search has 0 results.</p>
    }

    return (
        <ul className="food-list">
            {food.map((item) => (
                <li key={item.label}
                    onClick={() => onSelect(item)}>
                    <h3>{trim(item.label)}</h3>
                    <img src={item.image} alt={item.label}/>
                    <div>{Math.floor(item.calories)} Calories</div>
                    <div>{item.source}</div>
                </li>
            ))}
        </ul>
    );
}