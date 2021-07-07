import { onNavigate } from '../routing/routes';
import { linkCateg, linkOut, linkWords } from '../utils/get-elems-categ';

export const rederectOnHome = (): void => {
  document.body.innerHTML = '';
  onNavigate('/');
};

export const rederectOnCategPage = (): void => {
  document.body.innerHTML = '';
  onNavigate('/categoty');
};

export const rederectOnWordsPage = (): void => {
  document.body.innerHTML = '';
  onNavigate('/words');
};

const addListeners = () => {
  linkOut().addEventListener('click', rederectOnHome);
  linkCateg().addEventListener('click', rederectOnCategPage);
  linkWords().addEventListener('click', rederectOnWordsPage);
};

export const workCategPage = (): void => {
  addListeners();
};

export const workWordsPage = (): void => {
  addListeners();
};
