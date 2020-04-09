import React , { Component } from 'react';
import Order from '../../component/Order/Order/Order'
import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import * as actions from '../../store/actions/index';
import Spinner from '../../component/UI/Spinner/Spinner';

class Orders extends Component{
    
    componentWillMount() {
        console.log(this.props.token);
        this.props.fetchOrders(this.props.token);
    }

    render(){
        console.log(this.props.loading);
        let orders = <Spinner />
        if(!this.props.loading)
        orders=this.props.orders.map((order)=>{
            return <Order  key={order.id} ingredients={order.ingredients} price={order.price}/>
        })
        console.log(orders)
        
        return (
            <div>
                {this.props.token ? orders : <Redirect to="/" />}
            </div>
        )
    }
}

const mapStateToProps = state=>{
    return{
        token : state.auth.token || localStorage.getItem('token'),
        orders : state.order.orders,
        loading : state.order.loading
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        fetchOrders : (token)=>dispatch(actions.fetchOrderStart(token))
    }
}

export default withErrorHandler(connect(mapStateToProps , mapDispatchToProps)(withRouter(Orders)) , axios);