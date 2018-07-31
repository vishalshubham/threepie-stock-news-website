import APIGateway from 'src/client/scripts/gateway/APIGateway';
import { makeSagaTask } from 'src/client/scripts/store/utils/sagaHelpers';
import { basicCaller } from 'src/client/scripts/store/utils/apiHelpers';
import * as Moment from 'moment';
import { LOGIN_SESSION_ACTION } from 'src/client/scripts/store/actions';

export const loginSessionTask = makeSagaTask(LOGIN_SESSION_ACTION,
  basicCaller(APIGateway.loginSession, {}, [], 30000)
);
