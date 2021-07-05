import cards from '../cards';
import { objGame } from '../control/obj-game';
import { dispatchInfo, fullCards } from '../control/obj-statistic';
import { objApp } from '../control/objs';
import { gameProcess, startGame } from '../play/game';
import { playSound, sound } from '../play/sound';
import { resetStatistic } from '../statistic/reset';
import { sortStatistic } from '../statistic/sort';
import { changePage } from '../store/actions';
import { store } from '../store/store';
import { renderSubject } from '../subject/render';
import {
  copyFullCards,
  renderTrainDifficult,
} from '../train-difficult/render-train-difficult';
import { addClassList } from '../utils/add-class';
import { checkClass } from '../utils/check-class';
import { imgCategories } from '../utils/consts';
import { ElemClasses, IndexSounds, NumberPage, StateApp } from '../utils/enums';
import { getArrsElem } from '../utils/get-elems';
import { getWord } from '../utils/get-word';
import { ICards, IFullCars } from '../utils/interfaces';
import { removeClassList } from '../utils/remove-class';
import { changeActiveLink } from './links-active';

const checkClasses = (
  parent: HTMLDivElement,
  elem: HTMLElement,
  card: HTMLDivElement,
  parentClass: string,
): boolean => {
  if (
    checkClass(parent, parentClass) &&
    !checkClass(elem, ElemClasses.SVG) &&
    !checkClass(card, ElemClasses.HOVER)
  ) {
    return true;
  }
  return false;
};

const addListener = (card: HTMLDivElement): void => {
  const flipBack = function flipBackCard() {
    removeClassList(card, ElemClasses.HOVER);
    card.removeEventListener('mouseleave', flipBack);
  };
  card.addEventListener('mouseleave', flipBack);
};

const categotySelection = (card: HTMLDivElement): void => {
  const word: string = getWord(card);
  const index = imgCategories.indexOf(word) + 1;
  store.dispatch(changePage(index));
  changeActiveLink(index);
  renderSubject(index);
};

const workWithCards = (
  elem: HTMLElement,
  card: HTMLDivElement,
  front: HTMLDivElement,
): void => {
  if (card) {
    const parent = card.parentElement as HTMLDivElement;
    if (checkClass(parent, ElemClasses.CATEGOTY)) {
      categotySelection(card);
    } else if (checkClasses(parent, elem, card, ElemClasses.SUBJECT)) {
      if (front) {
        const word: string = getWord(front);
        const page = cards[store.getState().page] as ICards[];
        fullCards.forEach((item) => {
          if (item.word === word) {
            item.train++;
          }
        });
        dispatchInfo(fullCards);
        playSound(page, word);
      }
    } else if (checkClass(elem, ElemClasses.SVG)) {
      addClassList(card, ElemClasses.HOVER);
      addListener(card);
    }
  }
};

const workWithStatistic = (
  elem: HTMLElement,
  title: HTMLTableHeaderCellElement,
): void => {
  if (title) {
    sortStatistic(title);
  } else if (checkClass(elem, ElemClasses.BTN_RESET)) {
    resetStatistic();
  } else if (checkClass(elem, ElemClasses.BTN_DIFF)) {
    renderTrainDifficult();
  }
};

const workWithDiffTrain = (front: HTMLDivElement): void => {
  const word: string = getWord(front);
  const obj = copyFullCards.find((item) => item.word === word) as IFullCars;
  sound(obj.audioSrc, IndexSounds.FIRST);
};

export const selectionHandler = (event: Event): void => {
  const elems = getArrsElem();
  const elem = event.target as HTMLElement;
  const card = elem.closest(`.${ElemClasses.MAIN_CARD}`) as HTMLDivElement;
  const front = elem.closest(`.${ElemClasses.FRONT}`) as HTMLDivElement;
  const titleTh = elem.closest('.title-th') as HTMLTableHeaderCellElement;
  if (store.getState().mode === StateApp.TRAIN) {
    workWithCards(elem, card, front);
    if (store.getState().page === NumberPage.STATISTIC) {
      workWithStatistic(elem, titleTh);
    } else if (
      store.getState().page === NumberPage.DIFFICULT &&
      !objApp.empryDifficult
    ) {
      workWithDiffTrain(front);
    }
  } else if (store.getState().page === NumberPage.MAIN) {
    categotySelection(card);
  } else if (store.getState().page === NumberPage.STATISTIC) {
    workWithStatistic(elem, titleTh);
  } else if (checkClass(elem, ElemClasses.BTN_START_GAME)) {
    startGame(elem);
  } else if (checkClass(elem, ElemClasses.REPEAT)) {
    if (objGame.arrAudios.length > 0) {
      sound(objGame.arrAudios[0], IndexSounds.FIRST);
    }
  } else if (
    checkClass(elem, ElemClasses.IMG) &&
    !checkClass(elems.btnStartGame, ElemClasses.BTN_START_GAME) &&
    !checkClass(elem, ElemClasses.GREAT)
  ) {
    gameProcess(elem);
  }
};
