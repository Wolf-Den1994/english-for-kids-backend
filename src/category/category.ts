import { getCategory } from '../api/api';
import cards from '../cards';
import { objGame } from '../control/obj-game';
import { CATEGORY, imgCategories } from '../utils/consts';
import { Tags } from '../utils/enums';
import { root } from '../utils/get-elems';

export const renderCategory = async (): Promise<void> => {
  const categories = await getCategory();
  objGame.counterErrors = 0;
  root().innerHTML = '';

  const category = document.createElement(Tags.DIV);
  category.className = 'category';
  root().append(category);

  for (let i = 0; i < categories.length; i++) {
    const card = document.createElement(Tags.DIV);
    card.className = 'main-card';
    card.id = `${categories[i].categoryName}`;
    category.append(card);

    const img = document.createElement(Tags.IMG);
    img.src = `${categories[i].image}`;
    img.alt = `${imgCategories[i]}`;
    img.className = 'img-category';
    card.append(img);

    const p = document.createElement(Tags.P);
    p.className = 'text';
    p.innerHTML = `${categories[i].categoryName}`;
    card.append(p);
  }

  cards[CATEGORY].length = 0;
  for (let i = 0; i < categories.length; i++) {
    cards[CATEGORY].push(categories[i].categoryName);
  }
};
