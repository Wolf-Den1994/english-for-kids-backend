import { NumberPage } from '../utils/enums';
import { TypeStateApp } from '../utils/types';
import { CHANGE_MODE, CHANGE_PAGE } from './action-types';

interface ITypeState {
  type: string;
  mode?: TypeStateApp;
  page?: NumberPage;
}

export const changeMode = (mode: TypeStateApp): ITypeState => ({
  type: CHANGE_MODE,
  mode,
});

export const changePage = (page: NumberPage): ITypeState => ({
  type: CHANGE_PAGE,
  page,
});
