import React, { Component,Fragment }  from 'react';
import Layout from './container/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import { Route,Switch } from 'react-router-dom'; 
import Orders from './container//Orders/Orders';
import Auth from './container/Auth/Auth';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';
import Logout from './container/Logout/Logout';

class App extends Component {

   componentDidMount(){
      this.props.onTryAutoSignUp();
   }

   render() {
      // console.log(1);
      const token = localStorage.getItem('token');
      // console.log(token);
      let elementsToBeRendered = ( <Switch>
             <Route path="/" exact component={BurgerBuilder} />
            <Route path="/auth" exact component={Auth} />
            </Switch>
      );
      if(token !== null)
      elementsToBeRendered = ( <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/order" exact component={Orders} />
        <Route path="/checkout" component={Checkout} />
        </Switch>
               );
      return <div>
         <Layout>
           {/* {elementsToBeRendered} */}
              <Switch>
               <Route path="/" exact component={BurgerBuilder} />
               <Route path="/logout" exact component={Logout} />
               <Route path="/order" exact component={Orders} />
               <Route path="/checkout" component={Checkout} />
               <Route path="/" exact component={BurgerBuilder} />
               <Route path="/auth" exact component={Auth} />
               </Switch>
         </Layout>       
      </div>;
   }
}

const mapDispatchToProps = dispatch =>{
   return {
      onTryAutoSignUp : ()=>dispatch(actions.authCheckState())
   }
}

export default connect( null , mapDispatchToProps )(App);