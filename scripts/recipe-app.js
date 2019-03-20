'use strict'

let recipesArray = getSavedRecipes()

const filters = {
    searchText: '',
    sortBy: 'allRecipes'
}

renderRecipes()

// Recipe button to open edit.html and create new recipe
document.querySelector('#add-recipe-button').addEventListener('click', (e) => {
    const id = uuidv4()
    recipesArray.push({
        name: '',
        ingredients: [],
        instructions: '',
        id: id,
    })
    saveRecipes()
    location.assign(`/edit.html#${id}`)
})

// Toggle all recipes and recipes with all ingredients
document.querySelector('#all-ingredients-checkbox').addEventListener('change', (e) => {
    if (e.target.checked) {
        filters.sortBy = 'recipesWithAllIngredients'
        renderRecipes()
    } else {
        filters.sortBy = 'allRecipes'
        renderRecipes()
    }
})

// search box
document.querySelector('#search-box').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderRecipes()
})

// Make sure changes on both pages reflect on both pages
window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        recipesArray = JSON.parse(e.newValue)
        renderRecipes()
    }
})