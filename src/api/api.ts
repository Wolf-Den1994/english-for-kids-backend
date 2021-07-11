import { IUserData } from '../utils/interfaces';

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

export async function putCards(data: IDataPut): Promise<void> {
  const response = await fetch(`${baseURL}/api/cards`, {
    method: 'PUT',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (response.ok === true) {
    const card = await response.text();
    // eslint-disable-next-line no-console
    console.log(card);
  }
}

export async function deleteCards(id: string): Promise<void> {
  const response = await fetch(`${baseURL}/api/cards/${id}`, {
    method: 'DELETE',
    headers: { Accept: 'application/json' },
  });
  if (response.ok === true) {
    const card = await response.text();
    // eslint-disable-next-line no-console
    console.log(card);
  }
}

export async function createCards(newCategory: string): Promise<void> {
  const response = await fetch(`${baseURL}/api/cards/`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ newCategory }),
  });
  if (response.ok === true) {
    const card = await response.text();
    // eslint-disable-next-line no-console
    console.log(card);
  }
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
