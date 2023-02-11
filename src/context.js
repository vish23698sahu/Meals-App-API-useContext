import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?f='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'


const getFavouritesFromLocalstorage = () => {
    let favourites = localStorage.getItem('favourites')
    if (favourites)
        favourites = JSON.parse(localStorage.getItem('favourites'))
    else
        favourites = [];

    return favourites
}

const AppProvider = ({ children }) => {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [favourites, setFavourites] = useState(getFavouritesFromLocalstorage());

    const fetchMeals = async (url) => {
        setLoading(true)
        try {
            const response = await axios.get(url)
            if (response.data.meals)
                setMeals(response.data.meals)
            else
                setMeals([])
        } catch (error) {
            console.log(error.response)
        }
        setLoading(false);
    }

    const fetchRandomMeal = () => {
        fetchMeals(randomMealUrl);
    }

    const selectMeal = (idMeal, favouriteMeal) => {
        let meal;
        if (favouriteMeal)
            meal = favourites.find((meal) => meal.idMeal === idMeal)
        else
            meal = meals.find((meal) => meal.idMeal === idMeal)
        setSelectedMeal(meal)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const addToFavourites = (idMeal) => {
        const alreadyFavourite = favourites.find((meal) => meal.idMeal === idMeal)
        if (alreadyFavourite) return;
        const meal = meals.find((meal) => meal.idMeal === idMeal);
        const updatedFavourites = [...favourites, meal]
        setFavourites(updatedFavourites)
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites))
    }

    const removeFromFavourites = (idMeal) => {
        const updatedFavourites = favourites.filter((meal) => meal.idMeal !== idMeal)
        setFavourites(updatedFavourites)
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites))
    }

    useEffect(() => {
        fetchMeals(`${allMealsUrl}p`)
    }, [])

    useEffect(() => {
        if (!searchTerm) return;
        fetchMeals(`${allMealsUrl}${searchTerm}`);
    }, [searchTerm]);

    return <AppContext.Provider value={{
        loading, meals, setSearchTerm, fetchRandomMeal, showModal, selectedMeal,
        selectMeal, closeModal, favourites, addToFavourites, removeFromFavourites
    }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }
