import React from 'react'
import { useGlobalContext } from '../context'
import { AiOutlineHeart } from 'react-icons/ai'

const Meals = () => {
    const { meals, loading, selectMeal, addToFavourites } = useGlobalContext()

    if (loading) {
        return <section>
            <h3>Loading...</h3>
        </section>
    }

    if (meals.length < 1) {
        return <section>
            <h4>No meals matched your search term. Please try again.</h4>
        </section>
    }

    return <section className='section-center'>
        {meals.map((singleMeal) => {
            const { idMeal, strMeal: mealTitle, strMealThumb: mealImage } = singleMeal

            return <article key={idMeal} className="single-meal" >
                <img src={mealImage} className="img" alt={mealTitle} onClick={() => selectMeal(idMeal)} />
                <footer>
                    <h5>{mealTitle}</h5>
                    <button className='like-btn' onClick={() => addToFavourites(idMeal)}><AiOutlineHeart /> </button>
                </footer>
            </article>
        })}
    </section>
}

export default Meals