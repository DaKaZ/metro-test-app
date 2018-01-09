// src/ducks/scope.js
// @flow

export type StateType = {
  id: number,
  code?: string,
  description?: string,
  office_code?: string,
  active?: boolean,
  created_at?: string,
  updated_at?: string,
  ancestry?: string,
  ancestry_depth?: number,
  hidden?: boolean,
  people?: Array<*>,
  children: Array<StateType>
};

export type SetType = {
  type: 'SCOPE/SET',
  scope: StateType
};

export type LoadType = {
  type: 'SCOPE/LOAD'
};

export type ActionType = {
  type: string,
  scope: StateType
};

export const types = {
  SET: 'SCOPE/SET',
  LOAD: 'SCOPE/LOAD'
};

// action creators
export type ActionCreatorsType = {
  setScope: (scope: StateType)=> SetType,
  loadScope: ()=> LoadType
};

export const actions = {
  setScope: (scope: StateType): SetType => ({
    type: types.SET,
    scope
  }),
  loadScope: (): LoadType => ({
    type: types.LOAD
  })
};

// default reducer state
export const initialState = { id: 0, children: [] };

const defaultAction = { type: '', scope: initialState };

// activity reducer
export function reducer(
  state: StateType = initialState,
  action: ActionType = defaultAction
): StateType {
  switch (action.type) {
    case types.SET:
      return action.scope;

    default:
      return state;
  }
}
