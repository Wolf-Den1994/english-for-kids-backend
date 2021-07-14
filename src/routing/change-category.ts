import {
  getWordsByCategory,
  getCategory,
} from '../api/api';
import { handlingClicks } from '../page-works/handling-clicks-categ';
import { head } from '../shareit/head';
import { ElemClasses, Tags } from '../utils/enums';
import { removeClassList } from '../utils/remove-class';

export const changeCategory = `${head('categ')}`;

export const renderCategPage = async (): Promise<void> => {
  removeClassList(document.body, ElemClasses.HIDDEN_MODAL);

  const cards = await getCategory();
  // const words = await getWords();
  const main = document.querySelector('.categ-main') as HTMLElement;
  const arrWordsOnCategory = [];

  for (let i = 0; i < cards.length; i++) {
    // const categLength = await ;
    // console.log(categLength)
    arrWordsOnCategory.push(getWordsByCategory(cards[i].categoryName));
  }
  const arrWordsInCategory = await Promise.all(arrWordsOnCategory)
  // console.log(arrWordsOnCategory)

  for (let i = 0; i < cards.length; i++) {
    const card = document.createElement(Tags.DIV);
    card.className = 'categ-card';
    card.id = `${cards[i].categoryName}`;
    main.append(card);

    const name = document.createElement(Tags.P);
    name.className = 'categ-name';
    name.innerHTML = `${cards[i].categoryName}`;
    card.append(name);

    const count = document.createElement(Tags.P);
    count.className = 'categ-count';
    count.innerHTML = `
        <span class="categ-words">WORDS:</span> 
        ${arrWordsInCategory[i].length}
      `;
    card.append(count);

    const divBtns = document.createElement(Tags.DIV);
    divBtns.className = 'categ-btns';
    card.append(divBtns);

    const btnUpdate = document.createElement(Tags.BUTTON);
    btnUpdate.className = 'categ-bnt-update';
    btnUpdate.innerHTML = 'Update';
    divBtns.append(btnUpdate);

    const btnAdd = document.createElement(Tags.BUTTON);
    btnAdd.className = 'categ-bnt-add';
    btnAdd.innerHTML = 'Add word';
    divBtns.append(btnAdd);

    const btnRemove = document.createElement(Tags.SPAN);
    btnRemove.className = 'categ-bnt-remove';
    card.append(btnRemove);
  }

  const card = document.createElement(Tags.DIV);
  card.className = 'categ-card categ-card-new';
  main.append(card);

  const name = document.createElement(Tags.P);
  name.className = 'categ-name categ-name-new';
  name.innerHTML = `Create new Category`;
  card.append(name);

  handlingClicks(main, cards);
};
