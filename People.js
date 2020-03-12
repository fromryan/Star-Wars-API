import React,{useEffect, useState} from 'react'
import {navigate} from '@reach/router'
import axios from 'axios'

const People = ({id,submitState}) =>{

    const [responseState, setResponseState] = useState(null)

    const clickHandler = () =>{
        navigate("/planets/"+responseState.world_id)
    }

    useEffect(()=>{
        setResponseState(null)
        axios.get(`https://swapi.co/api/people/${id}`)
            .then(res =>{
                const {data:personData} = res;
                return axios.get(personData.homeworld)
                    .then(worldResp => {
                        const {data: worldData} = worldResp
                        setResponseState({
                            'name' : personData.name,
                            'height' : personData.height,
                            'mass' : personData.mass,
                            'hair_color' : personData.hair_color,
                            'world' : worldData.name,
                            'world_id': worldData.url[worldData.url.length-2],
                            'terrain' : worldData.terrain
                        })
                    })
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
                    <h1>Height: {responseState.height}</h1>
                    <h1>Mass: {responseState.mass}</h1>
                    <h1 onClick={clickHandler}>{responseState.world}</h1>
                    <h1>Terrain: {responseState.terrain}</h1>
                </div>
            )
    }
}
export default People;