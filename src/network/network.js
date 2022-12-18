import axios from "axios";
import { apiKey, baseUrl } from "../helpers/constants";

export const searchForBooksByAuthor = (authorName, startingIndex) => {
  const res = new Promise((resolve, reject) => {
    axios
      .get(
        `${baseUrl}?q=+inauthor:${authorName}&filter=free-ebooks&startIndex=${startingIndex}&projection=full&orderBy=newest&key=${apiKey}`
      )
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
  return res;
};

export const getBookDetails = (bookId) => {
  const res = new Promise((resolve, reject) => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes/${bookId}?projection=full&key=${apiKey}`
      )
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
  return res;
}
