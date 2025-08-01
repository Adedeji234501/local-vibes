export function saveToFavorites(event) {
    let favorites = getFavorites();
    favorites.push(event);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

export function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}
