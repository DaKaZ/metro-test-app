// src/ducks/auth.js
// @flow

import type { NavigationProp } from 'react-navigation';

export type UserType = {
  name: string,
  email: string
};

export type LoginRequestType = {
  type: 'AUTH/LOGIN_REQUEST',
  email: string,
  password: string
};

export type LoginSuccessType = {
  type: 'AUTH/LOGIN_SUCCESS',
  user: UserType,
  token: string
};

export type LoginFailureType = {
  type: 'AUTH/LOGIN_FAILURE',
  message: string
};

export type LogoutType = {
  type: 'AUTH/LOGOUT'
};

export type RootNavigationType = {
  type: 'AUTH/ROOT_NAVIGATION',
  rootNavigation: NavigationProp<*>
};

/**
FIXME: we should be using explicit types for our actions, but its not working

export type ActionType =
  ( LoginSuccessType
  | LoginRequestType
  | LoginFailureType
  | LogoutType
  | RootNavigationType );

*/

export type ActionType = {
  type: string,
  user?: UserType,
  email?: string,
  password?: string,
  message?: string,
  rootNavigation?: NavigationProp<*>,
  token?: string
};

export const types = {
  LOGIN_REQUEST: 'AUTH/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'AUTH/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'AUTH/LOGIN_FAILURE',
  LOGOUT: 'AUTH/LOGOUT',
  UPDATE_CURRENT_USER: 'AUTH/UPDATE_CURRENT_USER',
  ROOT_NAVIGATION: 'AUTH/ROOT_NAVIGATION'
};

// action creators
export type ActionCreatorsType = {
  loginRequest: (email: string, password: string)=> LoginRequestType,
  loginSuccess: (user: UserType, token: string)=> LoginSuccessType,
  loginFailure: (message: string)=> LoginFailureType,
  logout: ()=> LogoutType,
  setRootNavigation: (rootNavigation: NavigationProp<*>)=> RootNavigationType
};

export const actions = {
  loginRequest: (email: string, password: string): LoginRequestType => (
    { type: types.LOGIN_REQUEST, email, password }
  ),
  loginSuccess: (user: UserType, token: string): LoginSuccessType => (
    { type: types.LOGIN_SUCCESS, user, token }
  ),
  loginFailure: (message: string): LoginFailureType => ({ type: types.LOGIN_FAILURE, message }),
  logout: (): LogoutType => ({ type: types.LOGOUT }),
  setRootNavigation: (rootNavigation: NavigationProp<*>): RootNavigationType => (
    { type: types.ROOT_NAVIGATION, rootNavigation }
  )
};

export type StateType = {
  user: ?UserType,
  isLoading: boolean,
  error: ?string,
  apiToken: ?string,
  rootNavigation: ?NavigationProp<*>
};

// default authReducer state
export const initialState = {
  user: null,
  isLoading: false,
  error: null,
  apiToken: null,
  rootNavigation: null
};

const defaultAction = { type: '' };

// auth reducer
export function reducer(
  state: StateType = initialState,
  action: ActionType = defaultAction
): StateType {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return { ...state, isLoading: true };

    case types.LOGIN_SUCCESS:
      return { ...state, isLoading: false, user: action.user, error: null, apiToken: action.token };

    case types.LOGIN_FAILURE:
      return { ...state, isLoading: false, error: action.message, user: null };

    case types.LOGOUT:
      return { ...state, isLoading: false, user: null, error: null, apiToken: null };

    case types.ROOT_NAVIGATION:
      return { ...state, rootNavigation: action.rootNavigation };

    default:
      return state;
  }
}
