// src/ducks/activity.js
// @flow
export type ShowType = {
  type: 'ACTIVITY/SHOW',
  textContent?: string,
  timeout?: number
};

export type HideType = {
  type: 'ACTIVITY/HIDE'
};

/**
FIXME: we should be using explicit types for our actions, but its not working

export type ActionType =
  ( ShowType
  | HideType );

*/

export type ActionType = {
  type: string,
  textContent?: string,
  timeout?: number
};

export const types = {
  SHOW: 'ACTIVITY/SHOW',
  HIDE: 'ACTIVITY/HIDE'
};

// action creators
export type ActionCreatorsType = {
  show: (textContent: string, timeout: number)=> ShowType,
  hide: ()=> HideType
};

export const actions = {
  show: (textContent: string, timeout: number): ShowType => ({
    type: types.SHOW,
    textContent,
    timeout
  }),
  hide: (): HideType => ({ type: types.HIDE })
};

// default reducer state
export const initialState = {
  visible: false,
  textContent: null,
  timeout: 60
};

export type StateType = {
  visible: boolean,
  textContent: ?string,
  timeout: ?number
};

const defaultAction = { type: '' };

// activity reducer
export function reducer(
  state: StateType = initialState,
  action: ActionType = defaultAction
): StateType {
  switch (action.type) {
    case types.SHOW:
      return { visible: true, textContent: action.textContent, timeout: action.timeout };

    case types.HIDE:
      return { visible: false, textContent: null, timeout: null };

    default:
      return state;
  }
}
