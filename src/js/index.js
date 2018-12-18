import Search from './models/Search';

/**
 * State:
 * - Search
 * - Current recipe
 * - Shopping list
 * - Liked
 */
const state = {};

const searchCtrl = async () => {
  const query = 'pizza';

  if (query) {
    state.search = new Search(query);
    await state.search.getResults();

    console.log(state.search.result);
  }
};

document.querySelector('.search').addEventListener('submit', submitHandler);

function submitHandler(e) {
  e.preventDefault();
  searchCtrl();
}
