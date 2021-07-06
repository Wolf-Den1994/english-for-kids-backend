import { renderCategory } from '../category/category';
import { getFullCardsNow } from '../control/obj-statistic';
import { removeFinal } from '../finish/finish';
import { renderFooter } from '../footer/footer';
import { selectionHandler } from '../handler/handler';
import { switchState } from '../handler/switch-state';
import { renderBtnSidebar } from '../header/btn-sidebar';
import { renderHeader } from '../header/header';
import { renderSwitcher } from '../header/switcher';
import { renderOverlay } from '../overlay/overlay';
import { renderRoot } from '../root/root';
import { onNavigate } from '../routing/routes';
import { handlerMenu, handlerSideBar } from '../sidebar/handler';
import { renderSidebar } from '../sidebar/sidebar';
import { ElemClasses } from '../utils/enums';
import { inputSwitcher, label, menu, root } from '../utils/get-elems';
import { removeClassList } from '../utils/remove-class';

export const rederectOnHome = (): void => {
  document.body.innerHTML = '';
  onNavigate('/');
};

export const renderMain = (): void => {
  renderHeader();
  renderBtnSidebar();
  renderSwitcher();
  renderSidebar();
  renderRoot();
  renderCategory();
  renderOverlay();
  renderFooter();
  getFullCardsNow();
  removeClassList(document.body, ElemClasses.HIDDEN_MODAL);
  label().addEventListener('click', handlerSideBar);
  menu().addEventListener('click', handlerMenu);
  inputSwitcher().addEventListener('change', switchState);
  root().addEventListener('click', selectionHandler);
  removeFinal();
};
