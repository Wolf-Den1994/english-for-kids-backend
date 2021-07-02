import { Tags } from '../utils/enums';
import { header } from './header';

export const switcher = document.createElement(Tags.DIV);
switcher.className = 'switcher';
header.append(switcher);

export const label = document.createElement(Tags.LABEL);
label.className = 'switch';
switcher.append(label);

export const input = document.createElement(Tags.INPUT);
input.type = 'checkbox';
input.id = 'togBtn';
input.checked = true;
label.append(input);

const div = document.createElement(Tags.DIV);
div.className = 'slider round';
label.append(div);
