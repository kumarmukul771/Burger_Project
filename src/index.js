import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore , applyMiddleware , compose , combineReducers } from 'redux';
import { Provider } from 'react-redux';
import burgerBuilderReducer from './store/reducer/burgerBuilder';
import thunk from 'redux-thunk';
import orderReducer from './store/reducer/order';
import authReducer from './store/reducer/Auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    burgerBuilder : burgerBuilderReducer ,
    order : orderReducer ,
    auth : authReducer
});

const store = createStore(rootReducer , composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
    <App  />
    </BrowserRouter>
    </Provider>, document.getElementById('root'));
    
registerServiceWorker();
