import cards from '../cards';
import { objGame } from '../control/obj-game';
import { objApp } from '../control/objs';
import { changeMode } from '../store/actions';
import { store } from '../store/store';
import { arrDifficultWord } from '../train-difficult/render-train-difficult';
import { addClassList } from '../utils/add-class';
import { changeClassList } from '../utils/change-class';
import { ElemClasses, NumberPage, StateApp } from '../utils/enums';
import { getArrsElem } from '../utils/get-elems';
import { ICards, IFullCards, IHTMLElems } from '../utils/interfaces';
import { removeClassList } from '../utils/remove-class';

const isPageCategory = (): boolean =>
  store.getState().page !== NumberPage.MAIN &&
  store.getState().page !== NumberPage.STATISTIC &&
  store.getState().page !== NumberPage.DIFFICULT;

  const classIteration = (
    fn: (
      elemToAddClass: HTMLButtonElement | HTMLElement | Element,
      elemClass: string,
    ) => void,
    elems: IHTMLElems,
    arr: IFullCards[] | ICards[],
    classChanger?: (i: number) => void,
  ) => {
    for (let i = 0; i < arr.length; i++) {
      fn(elems.arrSvgs[i], ElemClasses.PLAY);
      fn(elems.arrParags[i], ElemClasses.PLAY);
      fn(elems.arrImages[i], ElemClasses.PLAY);
      classChanger && classChanger(i);
    }
  };

const changeStateOnTrain = (
  arr: IFullCards[] | ICards[],
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
  classIteration(removeClassList, elems, arr, (i: number) =>
    removeClassList(elems.arrImages[i], ElemClasses.GREAT),
  );
};

const changeStateOnPlay = (
  arr: IFullCards[] | ICards[],
  elems: IHTMLElems,
): void => {
  store.dispatch(changeMode(StateApp.PLAY));
  removeClassList(elems.btnStartGame, ElemClasses.PLAY);
  classIteration(addClassList, elems, arr);
};

export const switchState = (event: Event): void => {
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
