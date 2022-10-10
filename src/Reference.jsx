import React from "react";
import { Component } from "react";

import './Reference.css'

class Field extends Component{
    render(){
        return(
            <div className="label-input-wrapper">
                <label htmlFor="test">{this.props.label}</label>
                <input id="test" type="text" ref={this.props.forwardRef}/>
            </div>
        )
    }
}

const FieldWithRef = React.forwardRef((props,ref) =>{
    return <Field forwardRef={ref}{...props}/>
})

class Home extends Component {
    constructor(props){
        super(props)
        this.handleClick= this.handleClick.bind(this)
        this.input = React.createRef()
    }

    handleClick(e){
        console.log(this.input.current.value)
    }
    
    render() {
        return(
            <div className="test-wrapper">
                <FieldWithRef ref={this.input} label="Label :"/>
                <button onClick={this.handleClick}>Tester</button>
            </div>
        )        
    }
}

export const Reference = () => {
    return(
        <div className="ref-wrapper">
            <h3>Réferences :</h3>
            <Home/>
        </div>
    )
}