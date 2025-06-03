import {dispatch, getState} from '.';

const NAMESPACE = 'history';

export const SET = `${NAMESPACE}/SET`;

export const setHistories = data => dispatch({ type: SET, data });

const initialState = {
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET:
      return { ...state, ...action.data };
    default:
      return state;
  }
};