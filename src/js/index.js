import Search from './models/Search';
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

elements.searchForm.addEventListener('submit', submitHandler);

function submitHandler(e) {
  e.preventDefault();
  searchCtrl();
}

elements.searchResPages.addEventListener('click', onClickHandler);

function onClickHandler(e) {
  const btn = e.target.closest('.btn-inline');

  if (btn) {
    const goToPage = parseInt(btn.dataset.goto);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
}
