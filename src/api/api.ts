const baseURL = 'https://majestic-rocky-mountain-22221.herokuapp.com';

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
