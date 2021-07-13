import { fullCards } from '../control/obj-statistic';
import { NAME_LOCALSTORAGE } from '../utils/consts';
import { Order } from '../utils/enums';
import { IFullCards } from '../utils/interfaces';
import { renderStatistic } from './render-statistic';

const cleanArr = (arr: IFullCards[]): void => {
  arr.forEach((item) => {
    item.train = 0;
    item.play = 0;
    item.errors = 0;
    item.answers = 0;
    item.percent = 0;
  });
};

export const resetStatistic = (): void => {
  cleanArr(fullCards);
  localStorage.setItem(NAME_LOCALSTORAGE, JSON.stringify(fullCards));
  renderStatistic(fullCards, Order.DESC);
};
