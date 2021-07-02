import { objApp } from '../control/objs';
import { root } from '../root/root';
import { Tags } from '../utils/enums';
import { IFullCars } from '../utils/interfaces';
import { TypeOrder } from '../utils/types';
import { btnDifficultWord, btnReset } from './button';
import { mainStatistic } from './main';
import { table } from './table';
import { tbody } from './tbody';
import { renderTitleRow, trTitle } from './tr-title';

const cleareField = () => {
  root.innerHTML = '';
  tbody.innerHTML = '';
  table.innerHTML = '';
  trTitle.innerHTML = '';
  objApp.countStatistic = 1;
};

export const renderStatistic = (data: IFullCars[], order: TypeOrder): void => {
  cleareField();

  root.append(mainStatistic);
  mainStatistic.append(btnDifficultWord);
  mainStatistic.append(btnReset);
  mainStatistic.append(table);
  table.append(tbody);
  tbody.append(trTitle);
  renderTitleRow(order);

  for (let i = 0; i < data.length; i++) {
    const row = document.createElement(Tags.TR);
    row.className = 'row';
    row.innerHTML += `
      <td class="cell">${i + 1}</td>
      <td class="cell cell-word">${data[i].category}</td>
      <td class="cell cell-word">${data[i].word}</td>
      <td class="cell cell-word">${data[i].translation}</td>
      <td class="cell">${data[i].train}</td>
      <td class="cell">${data[i].answers}</td>
      <td class="cell">${data[i].errors}</td>
      <td class="cell">${Math.round(data[i].percent)}</td>
    `;
    tbody.append(row);
  }
};
