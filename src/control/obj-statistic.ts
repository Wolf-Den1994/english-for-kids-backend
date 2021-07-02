import cards from '../cards';
import { CATEGORY, NAME_LOCALSTORAGE } from '../utils/consts';
import { ICards, IFullCars } from '../utils/interfaces';
import { objApp } from './objs';

export const fullCards: IFullCars[] = [];
const infoLocal = localStorage.getItem(NAME_LOCALSTORAGE);
if (infoLocal) {
  fullCards.push(...JSON.parse(infoLocal));
} else {
  for (let i = 1; i < cards.length; i++) {
    cards[i].forEach((elem: string | ICards) => {
      if (typeof elem === 'object') {
        fullCards.push({
          number: objApp.countCards,
          category: cards[CATEGORY][i - 1],
          word: elem.word,
          translation: elem.translation,
          image: elem.image,
          audioSrc: elem.audioSrc,
          train: 0,
          play: 0,
          errors: 0,
          answers: 0,
          percent: 0,
        });
      }
      objApp.countCards++;
    });
  }
}

export const dispatchInfo = (info: IFullCars[]): void => {
  localStorage.setItem(NAME_LOCALSTORAGE, JSON.stringify(info));
};
dispatchInfo(fullCards);
