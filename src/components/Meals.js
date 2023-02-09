import React from 'react'
import { useGlobalContext } from '../context'


const Meals = () => {
    const context = useGlobalContext()
    console.log(context)

    return (
        <div>Meals Component</div>

    )
}

export default Meals