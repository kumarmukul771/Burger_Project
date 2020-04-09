import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props)=>{
// ===========================  Object.keys()  ================================= //
// Object has a keys method which extracts the keys of a given object and turns  that
// into an array i.e, if prop.ingredients={salad: 1, meat: 2, bacon: 1, cheese: 2}
// Object.keys(props.ingredient) =["salad", "meat", "bacon", "cheese"]

// Now map executes a function on each element of input array, now [...Array(3)] will
// give an array with 3 empty spaces , igKey=salad,meat,bacon,cheese , i=index.

// ========================  reduce() function  =============================== //
// arr=The initialValue, or the previously returned value of the function
// ,el=current value.The callback that reduce receives is
// executed on every element received after map , second arg that reduce 
// receives is the initial value of reduced value(second arg is optional)


// transformedIngredient if reduce is not applied
// Array(4)
// 0: Array(1)
// 0: {$$typeof:Symbol(react.element), key: "salad0", ref: null, props: {…}, type: ƒ, …}
// length: 1
// __proto__: Array(0)
// 1: (2) [{…}, {…}]
// 2: [{…}]
// 3: (2) [{…}, {…}]
// length: 4
// __proto__: Array(0)

// After reduce transformedIngredient is
// (6) [{…}, {…}, {…}, {…}, {…}, {…}]
// 0:
// $$typeof: Symbol(react.element)
// type: ƒ BurgerIngredient()
// key: "salad0"
// ref: null
// props: {type: "salad"}
// _owner: FiberNode {tag: 0, key: null, stateNode: null, elementType: ƒ, type: ƒ, …}
// _store: {validated: false}
// _self: {a: ƒ}
// _source: {fileName: "D:\React-app\Burger_Project\src\component\Burger\Burger.js", lineNumber: 33}
// __proto__: Object
// 1: {$$typeof: Symbol(react.element), key: "meat0", ref: null, props: {…}, type: ƒ, …}
// 2: {$$typeof: Symbol(react.element), key: "meat1", ref: null, props: {…}, type: ƒ, …}
// 3: {$$typeof: Symbol(react.element), key: "bacon0", ref: null, props: {…}, type: ƒ, …}
// 4: {$$typeof: Symbol(react.element), key: "cheese0", ref: null, props: {…}, type: ƒ, …}
// 5: {$$typeof: Symbol(react.element), key: "cheese1", ref: null, props: {…}, type: ƒ, …}
// length: 6
// __proto__: Array(0)
let transformedIngredient = Object.keys(props.ingredient).map(
    (igkey) =>{
        return [...Array(props.ingredient[igkey])].map(
            (_ ,i)=>{
                // console.log(i);
                return <BurgerIngredient key={igkey + i} type={igkey} />;
            });
    }).reduce((arr , el)=>{
        return arr.concat(el);
    },[]);
// console.log(transformedIngredient);

if(transformedIngredient.length === 0)
transformedIngredient = <p>Please start adding ingredient</p>

return (
    <div className={classes.Burger}>
        <BurgerIngredient type="bread-top" />
        {transformedIngredient}
        <BurgerIngredient type="bread-bottom" />
    </div>
);
}

export default Burger;