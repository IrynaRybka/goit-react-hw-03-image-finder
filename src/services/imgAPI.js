// import axios from "axios";
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '31302238-3bbf3bf14ed620b40113bc545';
async function fetchImg(query, page) {
  // const fetchData = new URLSearchParams({
  //   key: KEY,
  //   q: query,
  //   image_type: 'photo',
  //   orientation: 'horizontal',
  //   safesearch: 'true',
  //   per_page: 12,
  //   page,
  // });
  // const fetchData = await axios.get(`${BASE_URL}?q=${query}&page=${page}&key=${KEY}&${fetchData}`);
  // return console.log(`This fetch: ${fetchData.data}`) ;
 const fetchData = fetch(
  `${BASE_URL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
)

  return await fetchData.then(res => {
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

console.log(`This result fetch function ${api}`)
export default api;

