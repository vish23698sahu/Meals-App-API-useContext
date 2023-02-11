import React from 'react'
import { useGlobalContext } from '../context'

const Favourites = () => {
    const { favourites, selectMeal, removeFromFavourites } = useGlobalContext();

    return (
        <section className='favourites'>
            <div className='favourites-content' >
                <h4>Favourites</h4>
                <div className='favourites-container'>
                    {
                        favourites.map((item) => {
                            const { idMeal, strMealThumb: mealImg } = item;
                            return <div key={idMeal} className='favourite-item' >
                                <img src={mealImg} onClick={() => selectMeal(idMeal, true)} alt={item.strMeal} className='favourites-img img' />
                                <button className='remove-btn' onClick={() => removeFromFavourites(idMeal)}>remove</button>
                            </div>
                        })
                    }
                </div>
            </div>
        </section>

    )
}

export default Favourites