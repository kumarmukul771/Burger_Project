import React , { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../component/UI/Button/Button';
import axios from '../../../axios';
import Input from '../../../component/UI/Input/Input';
import Spinner from '../../../component/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ContactData extends Component{
    state = {
        orderForm : {
            name: {
                elementType : 'input',
                elementConfig : {
                   type : 'text',
                   placeholder : 'Your Name',
                   value : '' 
                },
                validation : {
                    required : true
                },
                valid : false,
                validate : false
            },
            street: {
                elementType : 'input',
                elementConfig : {
                   type : 'text',
                   placeholder : 'Street',
                   value : '' 
                },
                validation : {
                    required : true
                },
                valid : false,
                validate : false
            },
            zipCode: {
                elementType : 'input',
                elementConfig : {
                   type : 'number',
                   placeholder : 'Pin Code',
                   value : '' 
                },
                validation : {
                    required : true,
                    length : 6
                },
                valid : false,
                validate : false
            },
            email: {
                elementType : 'input',
                elementConfig : {
                   type : 'email',
                   placeholder : 'Your Email',
                   value : '' 
                },
                validation : {
                    required : true
                },
                valid : false,
                validate : false
            },
            deliveryMethod : {
                elementType : 'select',
                elementConfig : {
                   options :[
                       {value : 'fastest' , displayValue : 'Fastest'},
                       {value : 'cheapest' , displayValue : 'Cheapest'}
                   ],
                   value : ''
                },
                valid : true,
                validate : false
            } 
        }
    }

    orderHandler = (event) =>{
        console.log("order clicked");
        event.preventDefault();

        this.setState( { loading: true } );
        const formData = {};

        for(let key in this.state.orderForm){
            formData[key] = this.state.orderForm[key].elementConfig.value ;
        }

        // console.log(this.state.orderForm);

        // console.log(formData);
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            customer: formData
        }

        // console.log(order);

        let isValidForm = true;

        for(let key in this.state.orderForm){
            // console.log(this.state.orderForm[key].valid)
            if(!this.state.orderForm[key].valid) isValidForm=false;
        }

        if(isValidForm){
            console.log('sendOrder');
            // this.props.setLoading(true);
            // axios.post( '/orders.json', order )
            // .then( response => {
            //     this.setState( { loading: false } );
            //     this.props.history.push('/');
            // } )
            // .catch( error => {
            //     this.setState( { loading: false } );
            // } );
            // this.props.sendOrder(order);
            this.props.onOrderBurger(order , this.props.token);
        }
        // else console.log(isValidForm)
    }

    checkValidity = ( value , rules )=>{
        let isValid = true ;

        if(rules.required){
            if(value.trim() == '') isValid=false;
        }
        if(rules.length){
            if(value.length != rules.length) isValid=false;
        }

        return isValid;
    }

    changedHandler = (event , key)=>{
        const updatedForm = {
            ...this.state.orderForm
        };

        const updatedElement={
            ...updatedForm[key]
        };

        updatedElement.elementConfig.value=event.target.value;
        updatedElement.validate=true;

        let inputValue = event.target.value;
        const validity = this.checkValidity(inputValue , updatedForm[key].validation);

        updatedElement.valid = validity;

                updatedForm[key]=updatedElement;

        // if(validity) console.log(updatedForm);

        this.setState({orderForm : updatedForm});
    }

    render(){
        let spinner=<Spinner />;
        let disable = false;

        const formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id : key,
                config : this.state.orderForm[key]
            })

            if(!this.state.orderForm[key].valid) disable = true;
        }


        // console.log(formElementArray[0].config.elementConfig);
        // console.log(this.props.loading);

        const InputElements = formElementArray.map(element =>(
            <Input 
            inputType={element.config.elementType} 
            label={element.id} 
            key={element.id}
            inputConfig={element.config.elementConfig} 
            invalid={!element.config.valid}
            validate={element.config.validate}
            change={(event)=>this.changedHandler(event , element.id)}/>
        ));

        // formElementArray.map(element=>console.log(element.id));

        return (
            <div className={classes.ContactData}>
                {this.props.loading ? spinner : 
                <form onSubmit={this.orderHandler}>
                    {InputElements}
                    <Button 
                    btnType="Success" 
                    clicked={this.orderHandler}
                    disable={disable}>Order</Button>
                </form>}
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        loading : state.order.loading,
        token : state.auth.token
    }
}

const mapDispatchToProps = dispatch=>{
    return {
        onOrderBurger : (orderData , token) =>dispatch(actions.purchaseBurger(orderData , token))
    }
}

export default connect( mapStateToProps , mapDispatchToProps )(ContactData);