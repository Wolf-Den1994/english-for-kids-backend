import cards from '../cards';
import { objGame } from '../control/obj-game';
import { objApp } from '../control/objs';
import { input } from '../header/switcher';
import { changeMode } from '../store/actions';
import { store } from '../store/store';
import { arrDifficultWord } from '../train-difficult/render-train-difficult';
import { addClassList } from '../utils/add-class';
import { changeClassList } from '../utils/change-class';
import { ElemClasses, NumberPage, StateApp } from '../utils/enums';
import { getArrsElem } from '../utils/get-elems';
import { ICards, IFullCars, IHTMLElems } from '../utils/interfaces';
import { removeClassList } from '../utils/remove-class';

const isPageCategory = (): boolean => {
  if (
    store.getState().page !== NumberPage.MAIN &&
    store.getState().page !== NumberPage.STATISTIC &&
    store.getState().page !== NumberPage.DIFFICULT
  ) {
    return true;
  }
  return false;
};

const changeStateOnTrain = (
  arr: IFullCars[] | ICards[],
  elems: IHTMLElems,
): void => {
  store.dispatch(changeMode(StateApp.TRAIN));
  elems.score.innerHTML = '';
  objGame.counterErrors = 0;
  addClassList(elems.btnStartGame, ElemClasses.PLAY);
  changeClassList(
    elems.btnStartGame,
    ElemClasses.REPEAT,
    ElemClasses.BTN_START_GAME,
  );
  for (let i = 0; i < arr.length; i++) {
    removeClassList(elems.arrSvgs[i], ElemClasses.PLAY);
    removeClassList(elems.arrParags[i], ElemClasses.PLAY);
    removeClassList(elems.arrImages[i], ElemClasses.PLAY);
    removeClassList(elems.arrImages[i], ElemClasses.GREAT);
  }
};

const changeStateOnPlay = (
  arr: IFullCars[] | ICards[],
  elems: IHTMLElems,
): void => {
  store.dispatch(changeMode(StateApp.PLAY));
  removeClassList(elems.btnStartGame, ElemClasses.PLAY);
  for (let i = 0; i < arr.length; i++) {
    addClassList(elems.arrSvgs[i], ElemClasses.PLAY);
    addClassList(elems.arrParags[i], ElemClasses.PLAY);
    addClassList(elems.arrImages[i], ElemClasses.PLAY);
  }
};

const switchState = (event: Event): void => {
  const elems = getArrsElem();
  const target = event.target as HTMLInputElement;
  if (target.checked) {
    store.dispatch(changeMode(StateApp.TRAIN));
    if (
      store.getState().page === NumberPage.DIFFICULT &&
      !objApp.empryDifficult
    ) {
      changeStateOnTrain(arrDifficultWord, elems);
    }
    if (isPageCategory()) {
      changeStateOnTrain(cards[store.getState().page] as ICards[], elems);
    }
  } else {
    store.dispatch(changeMode(StateApp.PLAY));
    if (
      store.getState().page === NumberPage.DIFFICULT &&
      !objApp.empryDifficult
    ) {
      changeStateOnPlay(arrDifficultWord, elems);
    }
    if (isPageCategory()) {
      changeStateOnPlay(cards[store.getState().page] as ICards[], elems);
    }
  }
};

input.addEventListener('change', switchState);
