import * as modal from "./modal.js";

import searchResultsView from "./views/searchResultsView.js";
import recipeView from "./views/recipeView.js";
import bookmarksView from "./views/bookmarksView.js";
import bookmarkRender from "./views/bookmarkRender.js";

const controlSearchResults = async function () {
  try {
    await modal.loadSearchResults(searchResultsView.getQuery());
    searchResultsView.renderResults(modal.state.search.results);
  } catch (err) {
    console.error(err);
  }
};

const controlRecipeDisplay = async function (elId) {
  try {
    await modal.loadRecipe(elId);
    recipeView.renderResults(modal.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

function controlServings(serving) {
  modal.loadServings(serving);
  recipeView.renderResults(modal.state.recipeN);
}

function controlBookmarks() {
  if (!modal.state.recipe.bookmarked) modal.addBookmarks(modal.state.recipe);
  else modal.deleteBookmarks(modal.state.recipe.id);
  bookmarkRender.renderResults(modal.state.bookmarks);
  console.log(modal.state.bookmarks);
}

const init = function () {
  bookmarkRender.renderResults(controlBookmarks);
  recipeView.bookmarked(controlBookmarks);
  searchResultsView.searchSubmit(controlSearchResults);
  searchResultsView.clickedRecipe(controlRecipeDisplay);
  recipeView.servingVariations(controlServings);

  bookmarkRender.renderResults(modal.state.bookmarks);

  bookmarksView.toggleBookmarks();
};
init();
// bookmarksView.clickedRecipe(controlRecipeDisplay);
bookmarksView.clickedRecipe(controlRecipeDisplay);
