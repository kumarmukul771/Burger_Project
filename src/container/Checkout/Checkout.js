import React , { Component } from 'react';
import CheckoutSummary from '../../component/Order/CheckoutSummary/CheckoutSummary';
import { Route,Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Checkout extends Component{

    continuePurchaseHandler = ()=>{
        this.props.history.replace('/checkout/contact-data'); 
    }

    cancelPurchaseHandler = ()=>{
        this.props.history.goBack();
    }

    render(){
        console.log(this.props.purchased);
        let summary = <Redirect />;
        if(this.props.ings && !this.props.purchased )  
            summary = (
                <div>
                <CheckoutSummary 
                ingredient = {this.props.ings}
                continuePurchase = {this.continuePurchaseHandler}
                cancelPurchase = {this.cancelPurchaseHandler}
                />
                <Route 
                path={this.props.match.url + "/contact-data"} exact 
                component={ContactData} />
            </div>
            )
        else this.props.initPurchased(false);
        return summary;
    }
}
const mapStateToProps = state =>{
    return {
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        purchased : state.order.purchased
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        initPurchased : (purchased)=> dispatch(actions.initPurchased(purchased))
    }
}
export default connect( mapStateToProps , mapDispatchToProps )(Checkout);