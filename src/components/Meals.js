import React, { useState } from 'react'
import { useGlobalContext } from '../context'
import { AiOutlineHeart } from 'react-icons/ai'

const Meals = () => {
    const { meals, loading } = useGlobalContext()

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
                <img src={mealImage} className="img" />
                <footer>
                    <h5>{mealTitle}</h5>
                    <button className='like-btn'><AiOutlineHeart /> </button>
                </footer>
            </article>
        })}
    </section>
}


const MealsOld = () => {
    const [findbyName, setFindByName] = useState('');
    let randomMeal;
    const { meals } = useGlobalContext()
    console.log('Console from Meals : ', meals)

    const getMealbyName = async () => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${findbyName}`)
            const data = await response.json()
            console.log(data.meals)
        } catch (error) {
            console.log(error)
        }
    }

    const getRandomMeal = async () => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
            const data = await response.json();
            console.log('Random Meal : ', data)
            randomMeal = data
        } catch (error) {
            console.log()
        }
    }

    return (
        <main>
            <div>Meals Component</div>
            <div>
                {meals.map((meal) => (
                    <div>
                        {meal.strMeal}
                    </div>
                ))}
            </div>

            <label>Enter letters to find meals</label>
            <input id='byName' onChange={(e) => setFindByName(e.target.value)} />
            <button onClick={getMealbyName} >Find</button><br />
            <button onClick={getRandomMeal}>Get a random Meal</button>
        </main>
    )
}

export default Meals