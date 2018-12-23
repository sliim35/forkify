export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchResList: document.querySelector('.results__list'),
  searchRes: document.querySelector('.results'),
};

export const renderLoader = parent => {
  const output = `
    <div class='loader'>
      <svg>
        <use href="img/icons.svg#icon-cw">
        </use>
      </svg>
    </div>
  `;

  parent.insertAdjacentHTML('afterbegin', output);
};

export const clearLoader = () => {
  const loader = document.querySelector('.loader');

  if (loader) loader.parentElement.removeChild(loader);
};
