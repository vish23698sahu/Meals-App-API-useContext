import React from 'react'
import { useGlobalContext } from '../context'

const Modal = () => {
    const { selectedMeal, closeModal } = useGlobalContext();

    const { strMealThumb: mealImage, strMeal: mealTitle, strInstructions: text, strSource: mealSource } = selectedMeal

    return (
        <aside className='modal-overlay'>
            <div className='modal-container'>
                <button className='btn btn-hipster close-btn' onClick={closeModal} >close</button>
                <img src={mealImage} alt={mealTitle} rel='noreferrer' className='img modal-img' />

                <div className='modal-content'>
                    <h4>{mealTitle}</h4>
                    <p>Cooking Instructions</p>
                    <p>{text}</p>
                    <a href={mealSource} target='_blank' rel='noreferrer'>Original source</a>
                </div>

            </div>
        </aside>
    )
}

export default Modal