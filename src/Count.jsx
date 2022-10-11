import React from "react";
import { useState, useEffect } from "react";

function useIncrement (start, step){
    const [count,setCount] = useState(start)
    const increment = () => {
        setCount(c => c + step)
    }
    return [count,increment]
}

function MonCompteur (){
    const [count, increment] = useIncrement(0, 1)

    useEffect(()=>{
        const timer = window.setInterval(()=>{
            increment()
        },1000)

        return function(){
            clearInterval(timer)
        }
    }, [count])

    useEffect(()=>{
        document.title = "Compteur " + count
    },[count])

    return(
        <div className="increment">
            <button onClick={increment}> Incrémenter : {count} </button>
        </div>
    )
}

export const Compteur = () => {
    return(
        <div className="count-wrapper">
            <h3 className="title-wrapper">Compteur :</h3>
            <MonCompteur/>
        </div>
    )
}