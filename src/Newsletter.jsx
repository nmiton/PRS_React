import React from "react";
import "./Newsletter.css";
import "./App.css";


function Field ({name, value, onChange, children}) {
    return (
        <div className="form-wrapper">
                <label className="form-text-label" htmlFor={name}>{children}</label>
                <input className="form-text-input" type="text" value={value} id={name} name={name} onChange={onChange}/>
        </div>
    )
}

function Checkbox ({name, checked, onChange, children}){
    return (
        <div className="form-check"> 
            <label htmlFor={name} className="form-check-label">{children}</label>
            <input type="checkbox" checked={checked} className="form-check-input" id={name} name={name} onChange={onChange}/> 
        </div>
    )
}

class Form extends React.Component {

    constructor (props){
        super(props)
        this.state={
            nom:'',
            prenom:'',
            email: '',
            newsletter:false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange (e) {
        const name = e.target.name
        console.log(name);
        const type = e.target.type
        
        const value = type === 'checkbox' ? e.target.checked : e.target.value
        this.setState({
            [name] : value
        })
        
    }

    handleSubmit (e) {
        e.preventDefault()
        const data = JSON.stringify(this.state)
        // console.log(data);
        this.setState({
            nom : "",
            prenom : "",
            email : '',
            newsletter : false
        })
    }

    render () {
        return (
            <form className="form-newsletter" onSubmit={this.handleSubmit}>
                <h3 className="form-title">S'abonner à la newsletter :</h3>
                <Field name="nom" value={this.state.nom} onChange={this.handleChange}>Nom :</Field>
                <Field name="prenom" value={this.state.prenom} onChange={this.handleChange}>Prénom :</Field>
                <Field name="email" value={this.state.email} onChange={this.handleChange}>Adresse email :</Field>
                <Checkbox name="newsletter" checked={this.state.newsletter} onChange={this.handleChange}>S'abonner à la newsletter ?</Checkbox>
                <button className="btn-newsletter"type="submit">Envoyer</button>
            </form>
        )
    }
}

export const Newsletter = () => {
    return(
        <div className="newsletter-wrapper">
            <Form/>
        </div>
    )
}

