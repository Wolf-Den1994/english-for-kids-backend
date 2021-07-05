import { onNavigate } from '../routing/routes';
import { addClassList } from '../utils/add-class';
import { checkClass } from '../utils/check-class';
import { ElemClasses, Tags } from '../utils/enums';
import { getModal, header, overlay } from '../utils/get-elems';
import { removeClassList } from '../utils/remove-class';

const renderLoginModal = () => {
  const modal = document.createElement(Tags.DIV);
  modal.className = 'login-modal';
  header().append(modal);

  const modalTitle = document.createElement(Tags.TITLE2);
  modalTitle.className = 'login-modal-title';
  modalTitle.innerHTML = 'Login';
  modal.append(modalTitle);

  const divInputs = document.createElement(Tags.DIV);
  divInputs.className = 'login-modal-inputs';
  modal.append(divInputs);

  const inputLogin = document.createElement(Tags.INPUT);
  inputLogin.type = 'text';
  inputLogin.placeholder = 'Enter login (admin)';
  inputLogin.className = 'input-login';
  divInputs.append(inputLogin);

  const inputPassword = document.createElement(Tags.INPUT);
  inputPassword.type = 'password';
  inputPassword.placeholder = 'Enter password (admin)';
  inputPassword.className = 'input-password';
  divInputs.append(inputPassword);

  const divBtns = document.createElement(Tags.DIV);
  divBtns.className = 'login-modal-btns';
  modal.append(divBtns);

  const btnCancel = document.createElement(Tags.BUTTON);
  btnCancel.className = 'btn btn-modal btn-cancel';
  btnCancel.innerHTML = 'cancel';
  divBtns.append(btnCancel);

  const btnLogin = document.createElement(Tags.BUTTON);
  btnLogin.className = 'btn btn-modal btn-login';
  btnLogin.innerHTML = 'login';
  divBtns.append(btnLogin);
};

const removeClassHiddenModal = () => {
  removeClassList(overlay(), ElemClasses.HIDDEN_MODAL);
  removeClassList(document.body, ElemClasses.HIDDEN_MODAL);
};

const closeLoginModal = () => {
  const elems = getModal();
  header().children[2].remove();
  removeClassHiddenModal();
  elems.modal.removeEventListener('click', selectionHandlerModal);
  overlay().removeEventListener('click', closeLoginModal);
};

const checkUser = (login: string, password: string): void => {
  const superUser = '1'; // !!! !!! TODO change on admin !!! !!!
  if (login === superUser && password === superUser) {
    onNavigate('/categoty');
    const elem = document.querySelector('.elem') as HTMLElement;
    elem.onclick = () => {
      onNavigate('/');
    };
    // return false;
  }
};

const selectionHandlerModal = (event: Event) => {
  const targetElem = event.target as HTMLElement;
  const elems = getModal();
  if (checkClass(targetElem, ElemClasses.BTN_CANCEL)) {
    closeLoginModal();
  } else if (checkClass(targetElem, ElemClasses.BTN_LOGIN)) {
    checkUser(elems.inputLogin.value, elems.inputPassword.value);
  }
};

export const openLoginModal = (): void => {
  renderLoginModal();
  addClassList(overlay(), ElemClasses.HIDDEN_MODAL);
  addClassList(document.body, ElemClasses.HIDDEN_MODAL);

  const elems = getModal();
  elems.modal.addEventListener('click', selectionHandlerModal);
  overlay().addEventListener('click', closeLoginModal);
};
