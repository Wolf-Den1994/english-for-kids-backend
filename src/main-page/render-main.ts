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
import { handlerMenu, handlerSideBar } from '../sidebar/handler';
import { renderSidebar } from '../sidebar/sidebar';
import { ElemClasses, Events } from '../utils/enums';
import {
  inputSwitcher,
  label,
  menu,
  root,
} from '../utils/get-elems';
import { removeClassList } from '../utils/remove-class';

export const renderMain = async (): Promise<void> => {
  renderHeader();
  renderBtnSidebar();
  renderSwitcher();
  await renderSidebar();
  renderRoot();
  renderCategory();
  renderOverlay();
  renderFooter();
  getFullCardsNow();
  removeClassList(document.body, ElemClasses.HIDDEN_MODAL);
  label().addEventListener(Events.CLICK, handlerSideBar);
  menu().addEventListener(Events.CLICK, handlerMenu);
  inputSwitcher().addEventListener(Events.CHANGE, switchState);
  root().addEventListener(Events.CLICK, selectionHandler);
  removeFinal();
};
