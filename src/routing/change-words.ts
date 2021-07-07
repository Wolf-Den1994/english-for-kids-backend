import { getCards } from '../api/api';
import { head } from '../shareit/head';
import { changeAdminCategory } from '../store/actions';
import { store } from '../store/store';
import { CATEGORY } from '../utils/consts';
import { ElemClasses, Tags } from '../utils/enums';
import { selectTitle } from '../utils/get-elems-words';
import { ICards } from '../utils/interfaces';
import { removeClassList } from '../utils/remove-class';

const pointThisWords = (
  cards: [string[], ...ICards[][]],
  wrapper: HTMLDivElement,
  index: number,
) => {
  wrapper.innerHTML = '';

  cards[index + 1].forEach((item: string | ICards) => {
    if (typeof item === 'object') {
      const card = document.createElement(Tags.DIV);
      card.className = 'words-card';
      wrapper.append(card);

      const word = document.createElement(Tags.P);
      word.className = 'words-word';
      word.innerHTML = `<span class="words-bold">Word:</span> ${item.word}`;
      card.append(word);

      const translation = document.createElement(Tags.P);
      translation.className = 'words-translation';
      translation.innerHTML = `
        <span class="words-bold">
          Translation:
        </span> ${item.translation}
      `;
      card.append(translation);

      const soundFile = document.createElement(Tags.P);
      soundFile.className = 'words-sound';
      soundFile.innerHTML = `
        <span class="words-bold">
          Sound file:
        </span> ${item.audioSrc}
      `;
      card.append(soundFile);

      const imageTitle = document.createElement(Tags.P);
      imageTitle.className = 'words-image-title';
      imageTitle.innerHTML = '<span class="words-bold">Image:</span>';
      card.append(imageTitle);

      const image = document.createElement(Tags.IMG);
      image.className = `words-image words-image-${item.word}`;
      image.src = `./${item.image}`;
      image.alt = `${item.word}`;
      card.append(image);

      const btnChange = document.createElement(Tags.BUTTON);
      btnChange.className = 'words-btn-change';
      btnChange.innerHTML = 'Change';
      card.append(btnChange);

      const btnRemove = document.createElement(Tags.SPAN);
      btnRemove.className = 'words-bnt-remove';
      card.append(btnRemove);
    }
  });
};

const selectCategory = (
  cards: [string[], ...ICards[][]],
  wrapper: HTMLDivElement,
  event: Event,
) => {
  const target = event.target as HTMLSelectElement;

  const index = cards[CATEGORY].indexOf(target.value);
  store.dispatch(changeAdminCategory(target.value));

  pointThisWords(cards, wrapper, index);
};

export const changeWords = `${head('words')}`;

export const renderWordsPage = async (): Promise<void> => {
  removeClassList(document.body, ElemClasses.HIDDEN_MODAL);

  const cards = await getCards('/api/cards');
  const main = document.querySelector('.words-main') as HTMLElement;

  const wrapperSelect = document.createElement(Tags.DIV);
  wrapperSelect.className = 'words-wrapper-select';
  main.append(wrapperSelect);

  const categoryTitle = document.createElement(Tags.SPAN);
  categoryTitle.className = 'words-category-title';
  categoryTitle.innerHTML = 'Category';
  wrapperSelect.append(categoryTitle);

  const ElemselectTitle = document.createElement('select');
  ElemselectTitle.className = 'words-select-title';
  wrapperSelect.append(ElemselectTitle);

  for (let i = 0; i < cards[CATEGORY].length; i++) {
    const optionTitle = document.createElement('option');
    optionTitle.value = `${cards[CATEGORY][i]}`;
    optionTitle.innerHTML = `${cards[CATEGORY][i]}`;
    ElemselectTitle.append(optionTitle);
  }

  const wrapperCards = document.createElement(Tags.DIV);
  wrapperCards.className = 'words-wrapper-cards';
  main.append(wrapperCards);

  selectTitle().addEventListener(
    'change',
    selectCategory.bind(null, cards, wrapperCards),
  );

  const index = cards[CATEGORY].indexOf(store.getState().admCateg);
  selectTitle().value = `${store.getState().admCateg}`;

  pointThisWords(cards, wrapperCards, index);

  const card = document.createElement(Tags.DIV);
  card.className = 'words-card words-card-new';
  wrapperCards.append(card);

  const newWord = document.createElement(Tags.P);
  newWord.className = 'words-name words-name-new';
  newWord.innerHTML = `Add new word`;
  card.append(newWord);
};
