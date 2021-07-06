// import { tickets } from "../api/api";
import { getCards } from '../api/api';
import { CATEGORY } from '../utils/consts';
import { ElemClasses, Tags } from '../utils/enums';
import { removeClassList } from '../utils/remove-class';

export const changeCategory = `
  <header class="categ-header">
    <nav class="categ-menu">
      <a href="#" class="categ-link categ-link-categ">Categories</a>
      <a href="#" class="categ-link categ-link-words">Words</a>
    </nav>
    <a href="#" class="categ-link categ-link-out">Log out</a>
  </header>
  <main class="categ-main"></main>
`;

export const renderCateg = async (): Promise<void> => {
  removeClassList(document.body, ElemClasses.HIDDEN_MODAL);

  const cards = await getCards('/api/cards');
  const main = document.querySelector('.categ-main') as HTMLElement;

  for (let i = 0; i < cards[CATEGORY].length; i++) {
    const card = document.createElement(Tags.DIV);
    card.className = 'categ-card';
    main.append(card);

    const name = document.createElement(Tags.P);
    name.className = 'categ-name';
    name.innerHTML = `${cards[CATEGORY][i]}`;
    card.append(name);

    const count = document.createElement(Tags.P);
    count.className = 'categ-count';
    count.innerHTML = `<span class="categ-words">WORDS:</span> ${
      cards[i + 1].length
    }`;
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
};
