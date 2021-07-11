import { createCards, deleteCards, putCards } from '../api/api';
import { onNavigate } from '../routing/routes';
import { changeAdminCategory } from '../store/actions';
import { store } from '../store/store';
import { addClassList } from '../utils/add-class';
import { checkClass } from '../utils/check-class';
import { Tags } from '../utils/enums';
import { inputText } from '../utils/get-elems-categ';
import { ICards } from '../utils/interfaces';
import { removeClassList } from '../utils/remove-class';

const renderTopLayer = (card: HTMLDivElement, action: string) => {
  const divsCard = document.querySelectorAll('.categ-card');
  divsCard.forEach((div) => {
    const isTopLayer = div.lastElementChild as HTMLElement;
    if (checkClass(isTopLayer, 'categ-top-layer')) {
      isTopLayer.remove();
      removeClassList(div, 'categ-hidden');
    }
  });

  addClassList(card, 'categ-hidden');

  const topLayer = document.createElement(Tags.DIV);
  topLayer.className = 'categ-top-layer';
  card.append(topLayer);

  const input = document.createElement(Tags.INPUT);
  input.type = 'text';
  input.placeholder = 'Category name';
  input.className = 'categ-top-layer-input';
  topLayer.append(input);

  const divBtns = document.createElement(Tags.DIV);
  divBtns.className = 'categ-top-layer-btns';
  topLayer.append(divBtns);

  const btnCancel = document.createElement(Tags.BUTTON);
  btnCancel.className = 'categ-top-layer-btn-cancel';
  btnCancel.innerHTML = 'Cancel';
  divBtns.append(btnCancel);

  const btnCreate = document.createElement(Tags.BUTTON);
  btnCreate.className =
    action === 'update'
      ? 'categ-top-layer-btn-update'
      : 'categ-top-layer-btn-create';
  btnCreate.innerHTML = 'Create';
  divBtns.append(btnCreate);
};

const updateCategoryName = async (card: HTMLElement) => {
  if (inputText().value) {
    await putCards({ oldName: card.id, newName: inputText().value });
    onNavigate('/category');
  }
};

const deleteCategoryByName = async (card: HTMLElement) => {
  await deleteCards(card.id);
  onNavigate('/category');
};

const createCategory = async () => {
  if (inputText().value) {
    await createCards(inputText().value);
    onNavigate('/category');
  }
};

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
  } else if (checkClass(target, 'categ-bnt-update')) {
    renderTopLayer(card, 'update');
    // cards[CATEGORY].map(item => item = item === idCard ? idCard : item)
  } else if (checkClass(target, 'categ-top-layer-btn-cancel')) {
    const topLayer = card.lastElementChild as HTMLElement;
    topLayer.remove();
  } else if (checkClass(target, 'categ-top-layer-btn-update')) {
    updateCategoryName(card);
  } else if (checkClass(target, 'categ-bnt-remove')) {
    deleteCategoryByName(card);
  } else if (checkClass(target, 'categ-card-new')) {
    renderTopLayer(card, 'create');
  } else if (checkClass(target, 'categ-top-layer-btn-create')) {
    createCategory();
  }
};

export const handlingClicks = (
  main: HTMLElement,
  cards: [string[], ...ICards[][]],
): void => {
  main.addEventListener('click', handlerClickPageCategory.bind(null, cards));
};
