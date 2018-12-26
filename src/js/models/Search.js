import axios from 'axios';
import { key } from '../config';

class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
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
