import React,{useEffect, useState} from 'react'
import axios from 'axios'

const Planets = ({id, submitState}) =>{

    const [responseState, setResponseState] = useState(null)

    useEffect(()=>{
        setResponseState(null)
        axios.get(`https://swapi.co/api/planets/${id}`)
            .then(res =>{
                setResponseState(res.data)
            })
            .catch(err => setResponseState(false))
    },[submitState])

    switch(responseState){
        case null:
            return(
                <h1>Loading...</h1>
            )
        case false:
            return(
                <h1>These are not the droids you're looking for</h1>
            )
        default:
            return(
                <div>
                    <h1>Name: {responseState.name}</h1>
                    <h1>Height: {responseState.diameter}</h1>
                    <h1>Mass: {responseState.climate}</h1>
                    <h1>World: {responseState.gravity}</h1>
                    <h1>Terrain: {responseState.terrain}</h1>
                </div>
            )
    }

}
export default Planets;