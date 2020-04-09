import React from 'react';
import classes from './Input.css';

const Input = (props)=> {
    let inputElement = null;
    let inputClass = [classes.inputElement]; 

    if(props.invalid && props.validate){
        inputClass.push(classes.Invalid);
    }

    switch(props.inputType)
    {
        case('input'):
        inputElement = <input 
        {...props.inputConfig} 
        className={inputClass.join(' ')} 
        onChange={props.change}/>;
        break;

        case('textarea'):
        inputElement = <textarea {...props.inputConfig} 
        className={inputClass.join(' ')} 
        onChange={props.change}/>;
        break;

        case('select'):
        inputElement = <select>
            {props.inputConfig.options.map(element =>(
                <option value={element.value} onChange={props.change}>{element.displayValue}</option>
            ))}
        </select>;
        break;
    }
    
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input;