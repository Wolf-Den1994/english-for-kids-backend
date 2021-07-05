import cards from '../cards';
import { renderCategory } from '../category/category';
import { fullCards } from '../control/obj-statistic';
import { changeActiveLink } from '../handler/links-active';
import { renderStatistic } from '../statistic/render-statistic';
import { changePage } from '../store/actions';
import { store } from '../store/store';
import { renderSubject } from '../subject/render';
import { addClassList } from '../utils/add-class';
import { checkClass } from '../utils/check-class';
import { CATEGORY } from '../utils/consts';
import { ElemClasses, NumberPage, Order } from '../utils/enums';
import { removeClassList } from '../utils/remove-class';
import { updateClassList } from '../utils/update-class';
import { list } from './sidebar';
import { openLoginModal } from '../login-modal/login-modal';
import { input, label, menu, overlay, sidebar } from '../utils/get-elems';

export const handlerMenu = (event: Event): void => {
  const target = event.target as HTMLElement;
  if (checkClass(target, ElemClasses.MENU_LINK)) {
    const index = list.indexOf(target.innerHTML);
    changeActiveLink(target);
    if (index === 0) {
      store.dispatch(changePage(NumberPage.MAIN));
      renderCategory();
    } else if (index <= cards[CATEGORY].length) {
      store.dispatch(changePage(index));
      renderSubject(store.getState().page);
    } else if (index === NumberPage.STATISTIC) {
      store.dispatch(changePage(NumberPage.STATISTIC));
      renderStatistic(fullCards, Order.DESC);
    } else {
      store.dispatch(changePage(NumberPage.LOGIN));
      openLoginModal();
    }
    closeSidebar();
  }
};

export const handlerSideBar = (event: Event): void => {
  event.preventDefault();
  if (checkClass(sidebar(), ElemClasses.HIDDEN)) {
    openSidebar();
  } else {
    closeSidebar();
  }
};

function openSidebar(): void {
  input().checked = true;
  updateClassList(label(), sidebar(), ElemClasses.HIDDEN);
  addClassList(overlay(), ElemClasses.HIDDEN);
  addClassList(document.body, ElemClasses.HIDDEN);
  overlay().addEventListener('click', handlerSideBar);
  menu().addEventListener('click', handlerMenu);
}

function closeSidebar(): void {
  input().checked = false;
  updateClassList(sidebar(), label(), ElemClasses.HIDDEN);
  removeClassList(overlay(), ElemClasses.HIDDEN);
  removeClassList(document.body, ElemClasses.HIDDEN);
  overlay().removeEventListener('click', handlerSideBar);
  menu().removeEventListener('click', handlerMenu);
}

// label().addEventListener('click', handlerSideBar);
// menu().addEventListener('click', handlerMenu);
