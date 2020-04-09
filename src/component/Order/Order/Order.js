import React from 'react';
import classes from './Order.css';

const Order = (props)=>{
    const ingredients = [];

    for(let key in props.ingredients){
        ingredients.push({
            name : key,
            value : props.ingredients[key]
        })
    }
    const opIngredients = ingredients.map(ig =>{
        console.log(ig);
        return <p key={ig.name} style={{
            textTransform : 'capitalize',
            display : 'inline-block',
            margin : '0 8px',
            border : '1px solid #ccc',
            padding : '5px'
        }}>{ig.name} : {ig.value}</p>
})
    return (
    <div className={classes.Order}>
        {opIngredients}
        <p>Price : <strong>{props.price}</strong></p>
    </div>
    )
};

export default Order;