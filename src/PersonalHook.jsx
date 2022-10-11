import React from "react";
import { useState, useEffect } from "react";
import './PersonalHook.css'

function useIncrement (start = 0, step = 1){
    const [count,setCount] = useState(start)

    const increment = function (){
        setCount(c => c + 1 )
    }

    return [count,increment]
} 

function useAutoIncrement (start = 0, step = 1){
    const [count,increment] = useIncrement(start, step)

    useEffect(function(){
        const timer = window.setInterval(function (){
            increment(c => c + step)
        },1000)
        return function(){
            clearInterval(timer)
        }
    }, [])
    return count
}

function Compteur () {
    const count = useAutoIncrement(0, 10)
    return (
        <button className="button-increment">Incrémenter : {count}</button>
    )
}

function useToggle (initialValue = true){
    const [value,setValue] = useState(initialValue) 
    const toggle = function (){
        setValue(v=>!v)
    }
    return[value, toggle]
}

function useFetch (url){
    const [state,setState] = useState({
        items : [],
        loading : true
    })

    useEffect(function(){
        (async function (){
            const response = await fetch(url)
            const responseData = await response.json()
            if (response.ok){
                setState({
                    items : responseData,
                    loading : false
                })
            }else{
                alert(JSON.stringify(responseData))
                setState(s => ({...s, loading : false}))
            }
        })()
    },[])

    return [state.loading, state.items]
}

function PostTable (){
    const [loading,items] = useFetch("https://jsonplaceholder.typicode.com/comments?_limit=10")

    if(loading){
        return 'Chargement...'
    }

    return(
        <table className="post-table">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Commentaire</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => 
                <tr key={item.id}>
                    <td>{item.name}</td>   
                    <td>{item.email}</td>
                    <td>{item.body}</td>     
                </tr>)}
            </tbody>
        </table>
    )
}

function TodoList (){
    const [loading,todos] = useFetch("https://jsonplaceholder.typicode.com/todos?_limit=10")

    if(loading){
        return 'Chargement...'
    }

    return(
        <ul className="todo-list">
            {todos.map(t => <li key={t.id}>{t.title}</li>)}
        </ul>
    )
}

function App () {
    const [countVisible,toggleCount] = useToggle(true)

    return (
        <div className="personal-hook-wrapper">
            <div className="count-visible-condition">
                <label>Afficher le Compteur</label>
                <input type="checkbox" onChange={toggleCount} checked={countVisible}/>
            </div>
            {countVisible && <Compteur/>}
            <TodoList/>
            <PostTable/>
        </div>
    )
}

export const PersonalHook = () => {
    return(
        <div className="count-wrapper">
            <App/>
        </div>
    )
}