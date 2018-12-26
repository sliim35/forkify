import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => (elements.searchInput.value = '');

export const clearResults = () => {
  elements.searchResList.innerHTML = '';
  elements.searchResPages.innerHTML = '';
};

const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];

  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }

      return acc + cur.length;
    }, 0);

    return `${newTitle.join(' ')}...`;
  }

  return title;
};

const renderRecipe = ({ recipe_id, image_url, title, publisher }) => {
  const output = `
    <li>
      <a class="results__link results__link--active" href="#${recipe_id}">
        <figure class="results__fig">
          <img src="${image_url}" alt="${title}">
        </figure>
        <div class="results__data">
          <h4 class="results__name">${limitRecipeTitle(title)}</h4>
          <p class="results__author">${publisher}</p>
        </div>
      </a>
    </li> 
  `;

  elements.searchResList.insertAdjacentHTML('beforeend', output);
};

const createButton = (page, type) =>
  `
    <button class="btn-inline results__btn--${type}" data-goto="${
    type === 'prev' ? page - 1 : page + 1
  }">
      <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
      <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${
          type === 'prev' ? 'left' : 'right'
        }"></use>
      </svg>
    </button>
  `;

const renderButtons = (numResults, resPerPage, page) => {
  const pages = Math.ceil(numResults / resPerPage);
  let button;

  if (page === 1 && pages > 1) {
    button = createButton(page, 'next');
  } else if (page < pages) {
    button = `
      ${createButton(page, 'prev')}
      ${createButton(page, 'next')}
    `;
  } else if (page === pages && pages > 1) {
    button = createButton(page, 'prev');
  }

  elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  recipes.slice(start, end).map(renderRecipe);

  renderButtons(recipes.length, resPerPage, page);
};
