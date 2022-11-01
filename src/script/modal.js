import * as config from "./config.js";
import { cloneDeep } from "lodash";
export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
  },
  recipeN: {},
  servings: "",
  bookmarks: [],
};
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const response = await fetch(
      `${config.API_URL}?search=${query}&key=${config.KEY}`
    );
    const { data } = await response.json();
    state.search.results = data.recipes.map((entry) => {
      return {
        id: entry.id,
        title: entry.title,
        image: entry.image_url,
        publisher: entry.publsher,
      };
    });
  } catch (err) {
    console.error(err);
  }
};

export const loadRecipe = async function (id) {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?&key=${config.KEY}`
    );
    const { data } = await response.json();
    state.recipe = {
      id: data.recipe.id,
      title: data.recipe.title,
      ingredients: data.recipe.ingredients,
      cookingTime: data.recipe.cooking_time,
      servings: data.recipe.servings,
      publisher: data.recipe.publisher,
      sourceUrl: data.recipe.source_url,
      // bookmarked: false,
    };
    state.servings = data.recipe.servings;
  } catch (err) {
    console.error(err);
  }
};

export const loadServings = function (servings = 8) {
  state.recipe.servings = servings;

  const newIng = state.recipe.ingredients.map((entry) => {
    return {
      quantity: entry.quantity
        ? (entry.quantity / state.servings) * servings
        : null,
      unit: entry.unit ? entry.unit : "",
      description: entry.description,
    };
  });
  state.recipeN = cloneDeep(state.recipe);
  state.recipeN.ingredients = newIng;
};
//// Bookmarks ///////////////////////
export const addBookmarks = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  storeBookmarks();
};

export const deleteBookmarks = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  storeBookmarks();
};

function storeBookmarks() {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
}
function loadBookmarks() {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
}
loadBookmarks();
const clearBookmarks = function () {
  localStorage.clear("bookmarks");
};
// clearBookmarks();
//////////////////////////////////////////
