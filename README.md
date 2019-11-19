# Recipe App
This app can create cooking recipes including the recipe name, ingredients and instructions to prepare the recipe.

https://jryke.github.io/recipe-app/

<a href="https://jryke.github.io/recipe-app/">
    <img src="https://github.com/Jryke/recipe-app/blob/gh-pages/images/recipe-app-views.png" />
</a>

## Main Page
The main page shows a list of recipes by name.  These recipes can be sorted by a text search or by selecting "Include only recipes with all ingredients".  Click on the recipe to view details or to edit the recipe.  

The "add recipe" button navigates to the edit page with empty recipe fields to be completed by the user.

## Edit Page

### Text Inputs
The recipe edit has 3 different text input fields.
* Recipe name (string)
* Recipe ingredients(array of strings)
  * Once submitted and rendered on the page, each recipe ingredient has a checkbox to indicate if the user/chef has the ingredient
  * All, some or none of the ingredients is rendered on the main page under the ingredient name
  * If the user/chef wants to remove an ingredient from the recipe, there is a "remove" button for each ingredient
* Recipe instructions (string)

### Buttons
* Go back to recipes list - saves the recipe information in local storage and navigates back to the main page of recipes
* Remove recipe - deletes the recipe from storage and navigates back to the main page of recipes
