import cards from '../cards';
import { CATEGORY } from '../utils/consts';
import { ElemClasses, Tags } from '../utils/enums';

let isFirstLink = true;

const FIRST_PAGE = 'Main page';
const LAST_PAGE = 'Statistic';

export const list: string[] = cards[CATEGORY].slice();
list.unshift(FIRST_PAGE);
list.push(LAST_PAGE);

export const sidebar = document.createElement(Tags.ASIDE);
sidebar.className = `sidebar ${ElemClasses.HIDDEN}`;
document.body.append(sidebar);

export const menu = document.createElement(Tags.UL);
menu.className = 'menu';
sidebar.append(menu);

export const links: HTMLAnchorElement[] = [];

for (let i = 0; i < list.length; i++) {
  const link = document.createElement(Tags.LINK);
  link.className = `${ElemClasses.MENU_LINK}`;
  link.href = '#';
  link.innerHTML = `${list[i]}`;
  if (isFirstLink) {
    link.className = `${ElemClasses.MENU_LINK} ${ElemClasses.ACTIVE}`;
    isFirstLink = false;
  }
  links.push(link);
  menu.append(link);
}
