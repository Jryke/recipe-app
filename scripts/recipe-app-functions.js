'use strict'

const getSavedRecipes = () => {
    const recipesJSON = JSON.parse(localStorage.getItem('recipes'))
    if (recipesJSON === null) {
        return []
    } else {
        return recipesJSON
    }
}

const saveRecipes = () => localStorage.setItem('recipes', JSON.stringify(recipesArray))

const filterRecipes = () => {
    if (filters.sortBy === 'recipesWithAllIngredients') {
        let filteredRecipes = []
        recipesArray.forEach((recipe) => {
            let hasAllIngredients = true
            recipe.ingredients.forEach((ingredient) => {
                const checkForIngredient = ingredient.have
                if (!checkForIngredient) {
                    hasAllIngredients = false
                }
            })
            if (hasAllIngredients) {
                filteredRecipes.push(recipe)
            }
        })
        return filteredRecipes
    } else {
        return recipesArray
    }
}

const searchRecipes = () => {

    let searchedRecipes = []
    
    recipesArray.forEach((recipe) => {
        if (recipe.name.toLowerCase().includes(filters.searchText.toLowerCase())) {
            searchedRecipes.push(recipe)
        }
    })

    return searchedRecipes
    
}

const haveIngredientsMessage = (recipe) => {

    if (recipe.ingredients.length < 1) {
        return '***There are no ingredients listed for this recipe***'
    } else {
        const haveIngredients = recipe.ingredients.filter(ingredient => ingredient.have === true)

        if (haveIngredients.length === recipe.ingredients.length) {
            return 'You have all of the ingredients'
        } else if (haveIngredients.length === 0) {
            return 'You have none of the ingredients'
        } else {
            return 'You have some of the ingredients'
        }
    }
}

const renderRecipes = () => {

    const filteredRecipes = filterRecipes()
    const searchedRecipes = searchRecipes()
    const filteredAndSearchedRecipes = []

    filteredRecipes.forEach((filteredRecipe) => {
        searchedRecipes.forEach((searchedRecipe) => {
            if (filteredRecipe === searchedRecipe) {
                filteredAndSearchedRecipes.push(filteredRecipe)
            }
        })
    })

    if (filteredAndSearchedRecipes.length > 0) {
        document.querySelector('#recipes-list').textContent = ''
        const recipeListEl = document.querySelector('#recipes-list')

        filteredAndSearchedRecipes.forEach((recipe) => {
            const recipeBoxEl = document.createElement('a')
            recipeBoxEl.setAttribute('href', `edit.html#${recipe.id}`)
            recipeBoxEl.classList.add('recipe-box')
            const recipeNameEl = document.createElement('h2')
            recipeNameEl.classList.add('recipe')
            recipeNameEl.textContent = recipe.name
            const haveIngredientsEl = document.createElement('p')
            haveIngredientsEl.classList.add('have-ingredients-message')
            haveIngredientsEl.textContent = haveIngredientsMessage(recipe)
            
            recipeListEl.appendChild(recipeBoxEl)
            recipeBoxEl.appendChild(recipeNameEl)
            recipeNameEl.appendChild(haveIngredientsEl)
        })

    return recipeListEl

    } else {
        document.querySelector('#recipes-list').textContent = 'There are no recipes to show'
    }
}

const deleteRecipe = (id) => {
    const recipeIndex = recipesArray.findIndex((recipe) => recipe.id === id)

    if (recipeIndex > -1) {
        recipesArray.splice(recipeIndex, 1)
    }
}

const renderRecipeName = () => {
    if (currentRecipe.name.length > 0) {
        document.querySelector('#recipe-name').value = currentRecipe.name
    }
}

const renderInstructions = () => {
    const instructionsListEl = document.querySelector('#steps')
    instructionsListEl.innerHTML = currentRecipe.instructions

    return instructionsListEl

}

const renderIngredients = () => {
    const ingredientsListEl = document.querySelector('#ingredients-div')

    if (currentRecipe.ingredients.length < 1) {
        ingredientsListEl.innerHTML = 'No ingredients added to recipe yet'
    } else {
        ingredientsListEl.innerHTML = ''
    }

    currentRecipe.ingredients.forEach((ingredient, index) => {
        const ingredientEl = document.createElement('div')
        const checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        if(ingredient.have) {
            checkbox.setAttribute('checked', true)
        }
        const ingredientNameEl = document.createElement('span')
        ingredientNameEl.textContent = ingredient.ingredient
        const deleteButton = document.createElement('button')
        deleteButton.classList.add('remove-button')
        deleteButton.textContent = 'remove'
    
        ingredientEl.appendChild(checkbox)
        ingredientEl.appendChild(ingredientNameEl)
        ingredientNameEl.appendChild(deleteButton)
        ingredientsListEl.appendChild(ingredientEl)

        checkbox.addEventListener('click', () => {
            if (ingredient.have) {
                ingredient.have = false
            } else {
                ingredient.have = true
            }
            saveRecipes()
        })

        deleteButton.addEventListener('click', () => {
            currentRecipe.ingredients.splice(index, 1)
            saveRecipes()
            renderIngredients()
        })
    })

    return ingredientsListEl
}

const generateEditPage = () => {
    renderRecipeName()
    renderInstructions()
    renderIngredients()
}
