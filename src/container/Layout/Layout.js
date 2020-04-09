import React , { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxillary';
import classes from './Layout.css';
import Toolbar from '../../component/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../component/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    
    render(){
        // console.log(this.props);
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAuthenticated}/>
                <SideDrawer isAuth={this.props.isAuthenticated}/>
                <main className={classes.Content}>{this.props.children}</main>
            </Aux>
        )
    }  
};

const mapStateToProps = state=>{
    return {
        isAuthenticated : state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);