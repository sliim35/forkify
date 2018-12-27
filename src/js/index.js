import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/**
 * State:
 * - Search
 * - Current recipe
 * - Shopping list
 * - Liked
 */
const state = {};

/**
 * Search Ctrl
 */
const searchCtrl = async () => {
  const query = searchView.getInput();

  if (query) {
    state.search = new Search(query);

    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    await state.search.getResults();

    clearLoader();
    searchView.renderResults(state.search.result);
  }
};

/**
 * Recipe Ctrl
 */
const recipeCtrl = async () => {
  const id = window.location.hash.replace('#', '');

  if (id) {
    state.recipe = new Recipe(id);
    await state.recipe.getRecipe();
    state.recipe.calcTime();
    state.recipe.calcServing();

    console.log(state.recipe);
  }
}

/**
 * Event listeners
 */
function onSearchFormSubmitHandler(e) {
  e.preventDefault();
  searchCtrl();
}

function onPaginationButtonClickHandler(e) {
  const btn = e.target.closest('.btn-inline');

  if (btn) {
    const goToPage = parseInt(btn.dataset.goto);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
}

elements.searchForm.addEventListener('submit', onSearchFormSubmitHandler);
elements.searchResPages.addEventListener('click', onPaginationButtonClickHandler);
['hashchange', 'load'].map(event => window.addEventListener(event, recipeCtrl));
