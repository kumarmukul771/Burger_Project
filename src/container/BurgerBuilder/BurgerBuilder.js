import React,{ Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxillary';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/Burger/BuildControls/BuildControls';
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../component//UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { withRouter, Redirect } from 'react-router-dom';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component{

    state = {
        purchasable : false,
        purchasing : false,
    }

    updatePurchasable(ingredients){
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((arr,el)=>{
            return arr+el;
        },0);

        return sum>0;
    }

    purchaseHandler = ()=>{
        console.log(this.props.isAuthenticated)
        if(!this.props.isAuthenticated)
        this.props.history.push("/auth")
        else
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = ()=>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = ()=>{

        // const queryParams = [];
        // for(let i in this.props.ings){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        // }
        // queryParams.push(encodeURIComponent('price') + '=' +encodeURIComponent(this.props.price))
        // console.log(queryParams);

        // const queryString =queryParams.join('&');
        // console.log(queryString);
        this.props.history.push('/checkout');
    }

    componentDidMount(){
        this.props.initializeIngredients()
    }

    render(){
        // console.log(this.props);
        let burger = <Spinner /> ;
        let orderSummary = null;
        const disabledInfo = {
            ...this.props.ings
        }

        if(this.props.error) burger = <p>Burger Ingredients could not be loaded</p>

        if(this.props.ings){
            // console.log(this.props.ings);
            // console.log("RT");

            burger = (
                <Aux>
                    <Burger ingredient={this.props.ings} />
                    <BuildControls 
                    totalPrice={this.props.price}
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    purchasable={this.updatePurchasable(this.props.ings)}
                    ordered={this.purchaseHandler}
                    isAuth={this.props.isAuthenticated}
                    disabledInfo = {disabledInfo}/>
                </Aux>
            )

            orderSummary = <OrderSummary 
            totalPrice={this.props.price}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            ingredients={this.props.ings}/>;
        }

        if(this.props.loading)
         orderSummary= <Spinner/>

        for(let key in disabledInfo)
        disabledInfo[key] = disabledInfo[key] <=0 ; 
        return (
            <Aux>
                <Modal show={this.state.purchasing} removed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal> 
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state =>{
    // console.log(state);
    return {
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error,
        loading : state.burgerBuilder.loading,
        isAuthenticated : state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch =>{
    return {
        onIngredientAdded : (ingredient) => dispatch(burgerBuilderActions.addIngredient(ingredient)),
        onIngredientRemoved : (ingredient) => dispatch(burgerBuilderActions.removeIngredient(ingredient)),
        initializeIngredients : () => dispatch(burgerBuilderActions.initIngredient())
    }
}

export default withErrorHandler(connect( mapStateToProps , mapDispatchToProps )(withRouter(BurgerBuilder)),axios);