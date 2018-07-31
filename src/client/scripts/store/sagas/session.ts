import { takeLatest, call, take, select } from 'redux-saga/effects';
import { getFilters } from 'src/client/scripts/store/accessors/filters';
import { AppState } from 'src/client/scripts/store/state';
import { isEmpty } from 'lodash';
import { loginSessionTask } from 'src/client/scripts/store/tasks/session';
import { APP_START, LOGIN_SESSION } from 'src/client/scripts/store/actions';

export default function * sessionSaga() {
  try {
    yield take(APP_START);
    yield takeLatest(LOGIN_SESSION, loginSession);
  } catch (error) {
    console.error(`Error while running sessionSaga: ${error}`);
  }
}

export function* loginSession(action) {
  const session = yield select((state: AppState) => state.sessionState);
  if (!isEmpty(session.username) && !isEmpty(session.password)) {
    yield call(loginSessionTask, {
      username: session.username,
      password: session.password
    });
  }
}
