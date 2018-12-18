import axios from 'axios';

class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults(query) {
    const key = '75f5a247a695f874d3c6da3d9b65b1c6';
    try {
      const res = await axios(
        `https://www.food2fork.com/api/search?key=${key}&q=${this.query}`,
      );
      const { recipes } = res.data;
      this.result = recipes;
    } catch (error) {
      console.error(error);
    }
  }
}

export default Search;
