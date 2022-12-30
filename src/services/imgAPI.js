const BASE_URL = 'https://pixabay.com/api/';
const KEY = '31302238-3bbf3bf14ed620b40113bc545';
function fetchImg(query) {
  return fetch(
    `${BASE_URL}?q=${query}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        new Error("Упс, что-то пошло не так. Перезагрузите страницу или введите другое название")
      );
    })
}
const api = {
  fetchImg,
};
export default api;

