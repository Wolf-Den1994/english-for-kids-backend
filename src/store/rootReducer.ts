import { AnyAction } from 'redux';
import { NumberPage, StateApp } from '../utils/enums';
import { TypeStateApp } from '../utils/types';
import { CHANGE_MODE, CHANGE_PAGE } from './action-types';

interface PositionState {
  mode: TypeStateApp;
  page: number;
}

const initialState: PositionState = {
  mode: StateApp.TRAIN,
  page: NumberPage.MAIN,
};

export const rootReducer = (
  state = initialState,
  action: AnyAction,
): PositionState => {
  switch (action.type) {
    case CHANGE_MODE:
      return { ...state, mode: action.mode };

    case CHANGE_PAGE:
      return { ...state, page: action.page };

    default:
      return state;
  }
};
