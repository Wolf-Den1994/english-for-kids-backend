import { onNavigate } from '../routing/routes';
import { changeAdminCategory } from '../store/actions';
import { store } from '../store/store';
import { checkClass } from '../utils/check-class';
import { ICards } from '../utils/interfaces';

const handlerClickPageCategory = (
  cards: [string[], ...ICards[][]],
  event: Event,
) => {
  const target = event.target as HTMLElement;
  const card = target.closest('.categ-card') as HTMLDivElement;
  const idCard = card.id;
  // const index = cards[CATEGORY].indexOf(idCard);
  if (checkClass(target, 'categ-bnt-add')) {
    store.dispatch(changeAdminCategory(`${idCard}`));
    onNavigate('/words');
  }
};

export const handlingClicks = (
  main: HTMLElement,
  cards: [string[], ...ICards[][]],
): void => {
  main.addEventListener('click', handlerClickPageCategory.bind(null, cards));
};
