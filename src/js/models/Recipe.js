import axios from 'axios';
import { key } from '../config';

class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const {
        data: { recipe },
      } = await axios(
        `https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`,
      );
      this.title = recipe.title;
      this.author = recipe.author;
      this.img = recipe.image_url;
      this.url = recipe.source_url;
      this.ingredients = recipe.ingredients;
    } catch (err) {
      console.log(err);
    }
  }

  calcTime() {
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServing() {
    this.serving = 4;
  }
}

export default Recipe;
