import axios from 'axios';

export default class PixabayAPI {
  #API_KEY = '33040565-62ebb5be52a9ae7dffb1334f6';
  #BASE_URL = 'https://pixabay.com/api/';
  constructor() {
    this.perPage = 12;
    this.page = 1;
  }

  fetchImagesByKey(keyWord, page=this.page) {
    return axios.get(
      `${this.#BASE_URL}?key=${this.#API_KEY}&q=${keyWord}&per_page=${
        this.perPage
      }&page=${page}`
    );
  }
}
