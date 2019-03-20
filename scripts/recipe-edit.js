'use strict'

// EDIT PAGE
const recipeId = location.hash.substring(1)
const recipesArray = getSavedRecipes()
const currentRecipe = recipesArray.find((recipe) => recipe.id === recipeId)

// Go to index page button (edit page)
document.querySelector('#index-button').addEventListener('click', (e) => {
    location.assign('https://jryke.github.io/recipe-app/')
    saveRecipes()
})

// Input/Change recipe name
document.querySelector('#recipe-name').addEventListener('change', (e) => {
    currentRecipe.name = e.target.value
    saveRecipes()
})

// Add array of instructions for each recipe (input from DOM)
document.querySelector('#steps').addEventListener('input', (e) => {
    currentRecipe.instructions = e.target.value 
    saveRecipes()
})

// render ingredients & Add/Remove ingredients and checkbox for have boolean (input from DOM)
document.querySelector('#add-ingredient-input').addEventListener('change', (e) => {
    currentRecipe.ingredients.push({
        ingredient: e.target.value,
        have: false
    })
    e.target.value = ''
    saveRecipes()
    renderIngredients()
})

// Delete recipes from recipesArray (button in DOM)
document.querySelector('#delete-recipe').addEventListener('click', (e) => {
    deleteRecipe(recipeId)
    saveRecipes()
    location.assign('https://jryke.github.io/recipe-app/')
    // add bubble? to confirm user wants to delete recipe
})
