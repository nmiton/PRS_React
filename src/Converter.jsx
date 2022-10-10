import React from "react";
import { Component } from "react";
import "./Converter.css";

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
return (celsius * 9 / 5) + 32;
}

function tryConvert(value, convert) {
    const input = parseFloat(value);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 100) / 100;
    return rounded.toString();
}

function BoilingVerdict(props) {
    if (props.celsius >=100) {
        return <p className="alert-boiling">L'eau bout !</p>;
    }
    else if (props.celsius >=36.5 && props.celsius <=37.5) {
        return <p className="info-boiling">C'est la température normal d'un être humain !</p>;
    }
        else if (props.celsius <=0) {
    return <p className="info-boiling">Brrr...il fait froid!</p>;
    }
    return null;
}

class TemperatureInput extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        const value = this.props.value;
        const scale = this.props.scale;
        return (
        <div className="container">
            <form>
                <div className= "form-group">
                <label><h3>Entrer une température en {scaleNames[scale]}: </h3></label>
                <input className="form-control" id="focusedInputed" type="text" value={value}
                        onChange={this.handleChange} />
                </div>
            </form>
            </div>
        
        );
    }
}

function Button ({type , children}){
    const className="btn btn-"+ type
    return <button className={className}>{children}</button>
}

function PrimaryButton ({children}){
    return <Button type="primary">{children}</Button>
}

function DoubleColumns ({left, right}){
    return (
        <div className="double-columns">
            <div className="double-col-left">{left}</div>
            <div className="double-col-right">{right}</div>

        </div>    
    )
}

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {value: '0', scale: 'c'};
    }

    handleCelsiusChange(value) {
        this.setState({scale: 'c', value});
    }

    handleFahrenheitChange(value) {
        this.setState({scale: 'f', value});
    }

    render() {
        const scale = this.state.scale;
        const value = this.state.value;
        const celsius = scale === 'f' ? tryConvert(value, toCelsius) : value;
        const fahrenheit = scale === 'c' ? tryConvert(value, toFahrenheit) : value;

        return (
        <div className="container">
            <DoubleColumns
                left={<TemperatureInput
                    scale="c"
                    value={celsius}
                    onChange={this.handleCelsiusChange} />}
                right={<TemperatureInput
                    scale="f"
                    value={fahrenheit}
                    onChange={this.handleFahrenheitChange} />}
            />
            <BoilingVerdict
                celsius={parseFloat(celsius)} />
        </div>
        );
    }
}

export const Converter = () => {
    return(
        <div className="converter-wrapper">
            <h3>Convertisseur Celsius / Fahrenheit :</h3>
            <Calculator/>
            <PrimaryButton>Envoyer</PrimaryButton>
        </div>
    )
}
