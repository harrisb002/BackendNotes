/*
    Building an Software Dev Kit for Api
*/
const baseURL = "http://localhost:3000";

// Get all favorites
export const getFavorites = async () => {
  console.log("Getting all Favorites");
  const response = await fetch(`${baseURL}/favorites`);
  const json = await response.json();
  return json.favorites;
};

// Get a single fav
export const getFavoriteWithID = async (id) => {
  console.log("Getting all Favorites with id ", id);
  const response = await fetch(`${baseURL}/favorites/${id}`);
  const json = await response.json();
  return json.favorite;
};

// Adding a fav
export const createFavorite = async (favorite) => {
  const response = await fetch(`${baseURL}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(favorite),
  });
  const json = await response.json();
  return json.id;
};

// Replacing a fav
export const replacingFavorite = async (id, newBody) => {
  const response = await fetch(`${baseURL}/favorites/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newBody),
  });
  return response.status;
};

// Deleting a fav
export const deleteFavorite = async (id) => {
  const response = await fetch(`${baseURL}/favorites/${id}`, {
    method: "DELETE",
  });

  // Current Implementation currently only returns status code
  return response.status;
};