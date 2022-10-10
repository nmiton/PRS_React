import React from "react";
import "./Increment.css";

class Clock extends React.Component {
    
    constructor (props) {
        super(props)
        this.state = {date: new Date()}
        this.timer = null
    }

    componentDidMount () {
        this.timer = window.setInterval(this.tick.bind(this), 1000)
    }

    componentwillUnmount () {
        window.clearInterval(this.timer)
    }

    tick () {
        this.setState({date: new Date()})
    }

    render () {
        return <div className="clock">
            Nous sommes le {this.state.date.toLocaleDateString()}, il est {this.state.date.toLocaleTimeString()}
        </div>
    }
}

class Decrementer extends React.Component {
    
    constructor (props) {
        super(props)
        this.state = {n: props.start}
        this.timer = null
    }

    componentDidMount () {
        this.timer = window.setInterval(this.tick.bind(this), 1000)
    }

    componentwillUnmount () {
        window.clearInterval(this.timer)
    }

    decrement (){
        this.setState(function (state, props){
            return {n : state.n - props.step};
        })
    }

    tick () {
        this.setState({date: new Date()})
        this.decrement();
    }

    render () {
        return <div className="decrement">
            <label>Compte à rebours : {this.state.n}</label>
        </div>
    }
}

Decrementer.defaultProps = {
    start : 100,
    step : 1,
}

class Incrementer extends React.Component {
    
    constructor (props) {
        super(props)
        this.state = {n: props.start, timer : null}
    }

    componentDidMount () {
        this.play();
    }

    componentwillUnmount () {
        this.pause();
    }

    increment (){
        this.setState((state, props)=>({n : state.n + props.step}));

    }

    tick () {
        this.setState({date: new Date()});
    }

    pause () {
        window.clearInterval(this.state.timer);
        this.setState({
            timer : null
        })
    }

    play () {
        this.setState({
            timer : window.setInterval(this.increment.bind(this), 1000)
        })
    }

    reset (){
        this.setState({
            timer : window.setInterval(this.increment.bind(this), 1000),
            n : 0,
        })
    }

    toggle (){
        return this.state.timer ? this.state.pause() : this.state.play()
    }

    label (){
        return this.state.timer ? 'Pause' : "Lecture"
    }

    render () {
        return <div className="increment">
            <button className="btn-increment" onClick={this.pause.bind(this)}>Pause</button>
            <label className="label-incre">Valeur : {this.state.n} </label>
            <button className="btn-increment" onClick={this.reset.bind(this)}>Reset</button>
            {/* <button className="btn-increment" onClick={this.toggle.bind(this)}>{this.label}</button>   */}
        </div>
    }
}

Incrementer.defaultProps = {
    start : 0,
    step : 1,
}

class ManualIncrementer extends React.Component{
    constructor (props) {
        super(props)
        this.state = {n: 0}
    }

    increment (){
        this.setState(function (state, props){
            return {n : state.n + 1};
        })
    }

    render (){
        return(
            <div className="manual-increment">
                <span className="span-valeur">Valeur : {this.state.n}</span>
                <button className="btn-manual-increment" onClick={this.increment.bind(this)}>
                    Incrémenter
                </button>
            </div>
        )
    }
}

export const Increment = () => {
    return(
        <div className="first-container">
            <p className="dev-warning">Revoir Timer + Pause</p>
            <Clock/>
            <Decrementer start="100" step="1"/>
            <ManualIncrementer/>
            <Incrementer/>
        </div>
    )
}

