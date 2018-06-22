import { Action } from 'src/client/scripts/store/actions/action';

export function createReducer(actionMap, initialState) {
  return function reducer(currentState = initialState, action: Action) {
    if (action.type in actionMap) {
      return actionMap[action.type](currentState, action);
    }
    return currentState;
  };
}
