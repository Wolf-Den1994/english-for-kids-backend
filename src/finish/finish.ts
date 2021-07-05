import { renderCategory } from '../category/category';
import { objGame } from '../control/obj-game';
import { changeActiveLink } from '../handler/links-active';
import { sound } from '../play/sound';
import { changePage } from '../store/actions';
import { store } from '../store/store';
import { addClassList } from '../utils/add-class';
import { ElemClasses, IndexSounds, NumberPage, Tags } from '../utils/enums';
import { removeClassList } from '../utils/remove-class';
import { header, overlay, root } from '../utils/get-elems';

const ZERO_ERRORS = 0;
const TIME_SHOW_FINAL = 2500;

export const removeFinal = (): void => {
  objGame.counterErrors = 0;
  removeClassList(root(), ElemClasses.HIDDEN);
  removeClassList(overlay(), ElemClasses.WINNER);
  removeClassList(overlay(), ElemClasses.LOSER);
  overlay().innerHTML = '';
  removeClassList(document.body, ElemClasses.HIDDEN);
  removeClassList(header(), ElemClasses.HIDDEN);
  store.dispatch(changePage(NumberPage.MAIN));
  changeActiveLink(NumberPage.MAIN);
  renderCategory();
};

export const renderFinish = (): void => {
  addClassList(root(), ElemClasses.HIDDEN);
  if (objGame.counterErrors === ZERO_ERRORS) {
    addClassList(overlay(), ElemClasses.WINNER);
    sound(`./audio/success.mp3`, IndexSounds.SECOND);
  } else {
    addClassList(overlay(), ElemClasses.LOSER);
    const plural = objGame.counterErrors === 1 ? 'error' : 'errors';
    const paragraf = document.createElement(Tags.P);
    paragraf.className = 'final-text';
    paragraf.innerHTML = `${objGame.counterErrors} ${plural}`;
    overlay().append(paragraf);
    sound(`./audio/failure.mp3`, IndexSounds.SECOND);
  }
  addClassList(document.body, ElemClasses.HIDDEN);
  addClassList(header(), ElemClasses.HIDDEN);

  setTimeout(() => {
    removeFinal();
  }, TIME_SHOW_FINAL);
};
