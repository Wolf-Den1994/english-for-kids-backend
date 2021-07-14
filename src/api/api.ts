import { ICategoriesMongo, IUserData, IWordsMongo } from '../utils/interfaces';

// const baseURL = 'https://majestic-rocky-mountain-22221.herokuapp.com';
const baseURL = 'http://localhost';

export async function getCards(url: string): Promise<any> {
  // tickets.length = 0;
  // отправляет запрос и получаем ответ
  const response = await fetch(`${baseURL}${url}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  // если запрос прошел нормально
  const cards = await response.json();
  return cards;
}

interface IDataPut {
  oldName: string;
  newName: string;
}

export async function putCards(data: IDataPut): Promise<string | null> {
  const response = await fetch(`${baseURL}/api/cards`, {
    method: 'PUT',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (response.ok === true) {
    const card = await response.text();
    // eslint-disable-next-line no-console
    // console.log(card);
    return card;
  }
  return null;
}

export async function deleteCards(id: string): Promise<string | null> {
  const response = await fetch(`${baseURL}/api/cards/${id}`, {
    method: 'DELETE',
    headers: { Accept: 'application/json' },
  });
  if (response.ok === true) {
    const card = await response.text();
    // eslint-disable-next-line no-console
    // console.log(card);
    return card;
  }
  return null;
}

export async function createCards(newCategory: string): Promise<string | null> {
  const response = await fetch(`${baseURL}/api/cards/`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ newCategory }),
  });
  if (response.ok === true) {
    const card = await response.text();
    // eslint-disable-next-line no-console
    // console.log(card);
    return card;
  }
  return null;
}

export async function getCategory() {
  const response = await fetch(`${baseURL}/api/category`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  // если запрос прошел нормально
  const category: ICategoriesMongo[] = await response.json();
  // console.log(category);
  return category;
}

export async function getCategoryByName(name: string) {
  const response = await fetch(`${baseURL}/api/category/${name}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  // если запрос прошел нормально
  const category = await response.json();
  // console.log(category);
  return category;
}

export async function createCategory(formData: FormData) {
  const response = await fetch(`${baseURL}/api/category/`, {
    method: 'POST',
    body: formData,
  });
  const category = await response.json();
  return category;
}

export async function putCategoryByName(
  formData: FormData,
  name: string,
): Promise<string | null> {
  const response = await fetch(`${baseURL}/api/category/${name}`, {
    method: 'PUT',
    body: formData,
  });
  if (response.ok === true) {
    const card = await response.json();
    // eslint-disable-next-line no-console
    // console.log(card);
    return card;
  }
  return null;
}

export async function deleteCategory(name: string) {
  const response = await fetch(`${baseURL}/api/category/${name}`, {
    method: 'DELETE',
    headers: { Accept: 'application/json' },
  });
  if (response.ok === true) {
    const category = await response.json();
    // eslint-disable-next-line no-console
    // console.log(card);
    return category;
  }
  return null;
}

export async function getWords() {
  const response = await fetch(`${baseURL}/api/words`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  // если запрос прошел нормально
  const words: IWordsMongo[] = await response.json();
  // console.log(words);
  return words;
}

export async function getWordsByCategory(categ: string) {
  const response = await fetch(`${baseURL}/api/words/length/${categ}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  // если запрос прошел нормально
  const categLength: IWordsMongo[] = await response.json();
  // console.log(categLength);
  return categLength;
}

export async function createWord(formData: FormData) {
  console.log(formData);
  const response = await fetch(`${baseURL}/api/word/`, {
    method: 'POST',
    body: formData,
  });
  const word = await response.json();
  console.log(word);
  return word;
}

export async function deleteWord(name: string) {
  const response = await fetch(`${baseURL}/api/word/${name}`, {
    method: 'DELETE',
    headers: { Accept: 'application/json' },
  });
  if (response.ok === true) {
    const word = await response.json();
    // eslint-disable-next-line no-console
    // console.log(card);
    return word;
  }
  return null;
}

export async function putWordByName(
  formData: FormData,
  name: string,
): Promise<string | null> {
  const response = await fetch(`${baseURL}/api/word/${name}`, {
    method: 'PUT',
    body: formData,
  });
  if (response.ok === true) {
    const card = await response.json();
    // eslint-disable-next-line no-console
    console.log(card);
    return card;
  }
  return null;
}

export async function loginHandler(
  login?: string,
  password?: string,
): Promise<IUserData | undefined> {
  const response = await fetch(`${baseURL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password }),
  });
  if (response.ok === true) {
    const userData: IUserData = await response.json();
    return userData;
  }
  const error = await response.json();
  // eslint-disable-next-line no-console
  console.log(error.message);
  return undefined;
}
