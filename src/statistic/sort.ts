import { fullCards } from '../control/obj-statistic';
import { checkClass } from '../utils/check-class';
import { Order } from '../utils/enums';
import { IFullCars } from '../utils/interfaces';
import { TypeOrder } from '../utils/types';
import { renderStatistic } from './render-statistic';

export const sortCards: IFullCars[] = [];

const sortByTitle = (
  arr: IFullCars[],
  arg: keyof IFullCars,
  order: TypeOrder,
): void => {
  if (order === Order.ASC) {
    arr.sort((a, b) => (a[arg] > b[arg] ? 1 : -1));
  } else {
    arr.sort((a, b) => (a[arg] > b[arg] ? -1 : 1));
  }
};

const directionSorting = (
  cards: IFullCars[],
  column: keyof IFullCars,
  sortAside: TypeOrder,
  renderAside: TypeOrder,
): void => {
  sortByTitle(cards, column, sortAside);
  sortCards.push(...cards);
  renderStatistic(sortCards, renderAside);
};

export const sortStatistic = (title: HTMLTableHeaderCellElement): void => {
  sortCards.length = 0;
  const newFullCards = fullCards.slice();

  switch (true) {
    case checkClass(title, 'title-number'):
      checkClass(title, Order.DESC)
        ? directionSorting(newFullCards, 'number', Order.DESC, Order.ASC)
        : directionSorting(newFullCards, 'number', Order.ASC, Order.DESC);
      break;

    case checkClass(title, 'title-category'):
      checkClass(title, Order.DESC)
        ? directionSorting(newFullCards, 'category', Order.DESC, Order.ASC)
        : directionSorting(newFullCards, 'category', Order.ASC, Order.DESC);
      break;

    case checkClass(title, 'title-word'):
      checkClass(title, Order.DESC)
        ? directionSorting(newFullCards, 'word', Order.DESC, Order.ASC)
        : directionSorting(newFullCards, 'word', Order.ASC, Order.DESC);

      break;

    case checkClass(title, 'title-translate'):
      checkClass(title, Order.DESC)
        ? directionSorting(newFullCards, 'translation', Order.DESC, Order.ASC)
        : directionSorting(newFullCards, 'translation', Order.ASC, Order.DESC);
      break;

    case checkClass(title, 'title-train'):
      checkClass(title, Order.DESC)
        ? directionSorting(newFullCards, 'train', Order.DESC, Order.ASC)
        : directionSorting(newFullCards, 'train', Order.ASC, Order.DESC);
      break;

    case checkClass(title, 'title-play'):
      checkClass(title, Order.DESC)
        ? directionSorting(newFullCards, 'answers', Order.DESC, Order.ASC)
        : directionSorting(newFullCards, 'answers', Order.ASC, Order.DESC);
      break;

    case checkClass(title, 'title-errors'):
      checkClass(title, Order.DESC)
        ? directionSorting(newFullCards, 'errors', Order.DESC, Order.ASC)
        : directionSorting(newFullCards, 'errors', Order.ASC, Order.DESC);
      break;

    case checkClass(title, 'title-percent'):
      checkClass(title, Order.DESC)
        ? directionSorting(newFullCards, 'percent', Order.DESC, Order.ASC)
        : directionSorting(newFullCards, 'percent', Order.ASC, Order.DESC);
      break;

    default:
      break;
  }
};
