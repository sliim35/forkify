import axios from 'axios';

async function getResult(query) {
  const key = '75f5a247a695f874d3c6da3d9b65b1c6';
  try {
    const res = await axios(
      `https://www.food2fork.com/api/search?key=${key}&q=${query}`,
    );
    const { recipes } = res.data;
    console.log(recipes);
  } catch (error) {
    console.error(error);
  }
}

getResult('tomato pasta');
