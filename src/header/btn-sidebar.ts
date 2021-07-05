import { Tags } from '../utils/enums';
import { header } from '../utils/get-elems';

export const renderBtnSidebar = (): void => {
  const btnSidebar = document.createElement(Tags.DIV);
  btnSidebar.className = 'btn-sidebar';
  header().append(btnSidebar);

  const input = document.createElement(Tags.INPUT);
  input.id = 'menu__toggle';
  input.type = 'checkbox';
  btnSidebar.append(input);

  const label = document.createElement(Tags.LABEL);
  label.className = 'menu__btn';
  label.htmlFor = 'menu__toggle';
  btnSidebar.append(label);

  const span = document.createElement(Tags.SPAN);
  label.append(span);
};
