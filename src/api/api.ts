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
    console.log(card);
  }
}
