import React  from 'react';
import Aux from '../../../hoc/Auxillary';
import Button from '../../UI/Button/Button';

const orderSummary = (props)=>{
    const ingredientSummary = Object.keys(props.ingredients).map(
    igKey =>{
        // console.log(typeof igKey);
        return <li key={igKey}><span style={{'textTransform' : 'capitalize'}}>{igKey}</span>:{props.ingredients[igKey]}</li>}
    );
    // console.log(ingredientSummary); 
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Proceed to checkout?</p>
            <Button clicked={props.purchaseCanceled} btnType='Danger'>Cancel</Button>
            <Button clicked={props.purchaseContinue} btnType='Success'>Continue</Button>
            <strong>Total Price:{props.totalPrice}</strong>
        </Aux>
    )
}

export default orderSummary;