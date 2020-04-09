import React , { Component } from 'react';
import Button from '../../component/UI/Button/Button';
import Input from '../../component/UI/Input/Input';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../component/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxillary';
import { Redirect } from 'react-router';

class Auth extends Component {
    state = {
        orderForm : {
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
            password : {
                elementType : 'input',
                elementConfig : {
                    type : 'password',
                    placeholder : 'Password',
                    value : ''
                },
                validation : {
                    required : true
                },
                valid : false,
                validate : false
            }
        },
        isSignup : true
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

    submitHandler = (event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.orderForm.email.elementConfig.value,
            this.state.orderForm.password.elementConfig.value,
            this.state.isSignup)
    }

    switchAuthHandler = ()=>{
        this.setState(prevState=>{
            return { isSignup : !prevState.isSignup }
        })
    }

    render(){
        let form = <Spinner />

        let disable = false;
        const formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id : key,
                config : this.state.orderForm[key]
            })

            if(!this.state.orderForm[key].valid) disable = true;
        }

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

        if(!this.props.loading)
            form = (
                <div className={classes.Auth}>
                <form>
                    {InputElements}
                    <Button 
                    btnType="Success"
                    disable={disable}
        clicked={this.submitHandler}>SIGN {this.state.isSignup ? 'UP' : 'IN'}</Button>
                </form>
                <Button 
                    btnType="Danger"
                    clicked={this.switchAuthHandler}>
                    SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}
                </Button>
            </div>
            )
        if(this.props.error)
            form = (<Aux>{this.props.error.message}</Aux>)
        if(this.props.isAuthenticated){
            if(this.props.ings)
            form=<Redirect to="/checkout" />
            else form = <Redirect to="/" />
        }
        

        return form;
    }
}

const mapStateToProps = state=>{
    return {
        loading : state.auth.loading,
        error : state.auth.error,
        isAuthenticated : state.auth.token !== null,
        ings : state.burgerBuilder.ingredients
    }
}
const mapDispatchToProps = dispatch=>{
    return {
        onAuth : (email , password , isSignup)=>dispatch(actions.auth(email , password , isSignup))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Auth);