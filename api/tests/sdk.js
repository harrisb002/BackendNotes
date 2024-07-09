/*
    Testing Functionality
*/
import {getFavorites, getFavoriteWithID, createFavorite, deleteFavorite, replacingFavorite } from '../src/lib/sdk.js'
let result;

result = await getFavorites();
console.log(result);

result = await getFavoriteWithID(1);
console.log(result);

result = await getFavoriteWithID(5);
console.log(result);

const addedFav = {
  name: "Newly added name",
  url: "http://newerUrl.com",
};

result = await createFavorite(addedFav);
console.log("Created new Favorite with id: ", result);

result = await getFavorites();
console.log(result);

console.log("Deleting Favorite with id ", result[0].id);
result = await deleteFavorite(result[0].id);
console.log(result);

result = await getFavorites();
console.log(result);

const replacedFav = {
  name: "Newly replaced name",
  url: "http://replacedUrl.com",
};

console.log("Replacing Favorite with id ", result[10].id);
result = await replacingFavorite(result[10].id, replacedFav);
console.log(result);

result = await getFavorites();
console.log(result);
