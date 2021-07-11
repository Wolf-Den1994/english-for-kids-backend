import { onNavigate } from '../routing/routes';
import { addClassList } from '../utils/add-class';
import { linkCateg, linkOut, linkWords } from '../utils/get-elems-categ';
import { removeClassList } from '../utils/remove-class';

export const rederectOnHome = (): void => {
  document.body.innerHTML = '';
  onNavigate('/');
};

export const rederectOnCategPage = (): void => {
  document.body.innerHTML = '';
  onNavigate('/category');
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
  removeClassList(linkWords(), 'categ-link-active');
  addClassList(linkCateg(), 'categ-link-active');
};

export const workWordsPage = (): void => {
  addListeners();
  removeClassList(linkCateg(), 'categ-link-active');
  addClassList(linkWords(), 'categ-link-active');
};
