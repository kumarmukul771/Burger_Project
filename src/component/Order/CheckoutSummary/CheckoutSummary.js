import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';


const checkoutSummary = (props)=>{
    return (
        <div>
            <h1 style={{textAlign : 'center'}}>We hope it tastes delicious!</h1>
            <div style={{width : "100%",textAlign : "center"}}>
            <Burger ingredient={props.ingredient}/>
            <Button btnType={"Danger"} clicked={props.cancelPurchase}>CANCEL</Button>
            <Button btnType={"Success"} clicked={props.continuePurchase}>CONTINUE</Button>
            </div>
            
        </div>
    )
}

export default checkoutSummary;