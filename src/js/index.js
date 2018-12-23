import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

/**
 * State:
 * - Search
 * - Current recipe
 * - Shopping list
 * - Liked
 */
const state = {};

const searchCtrl = async () => {
  searchView.clearResults();
  const query = searchView.getInput();
  searchView.clearInput();

  if (query) {
    state.search = new Search(query);
    await state.search.getResults();

    searchView.renderResults(state.search.result);
  }
};

elements.searchForm.addEventListener('submit', submitHandler);

function submitHandler(e) {
  e.preventDefault();
  searchCtrl();
}
