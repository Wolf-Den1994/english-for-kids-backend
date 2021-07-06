import { getCards } from '../api/api';
import { NAME_LOCALSTORAGE } from '../utils/consts';
import { IFullCars } from '../utils/interfaces';

export const fullCards: IFullCars[] = [];
// const infoLocal = localStorage.getItem(NAME_LOCALSTORAGE);
export const getFullCardsNow = async (): Promise<void> => {
  const response = await getCards('/api/fullcards');
  if (response) {
    fullCards.push(...response);
  }
};
export const dispatchInfoOnBackend = (): void => {};

export const dispatchInfo = (info: IFullCars[]): void => {
  localStorage.setItem(NAME_LOCALSTORAGE, JSON.stringify(info));
};
dispatchInfo(fullCards);
