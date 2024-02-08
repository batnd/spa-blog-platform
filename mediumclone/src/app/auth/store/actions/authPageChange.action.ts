import {createAction} from '@ngrx/store';
import {ActionTypes} from '../actionTypes';

export const authPageChangeAction = createAction(ActionTypes.CHANGE_PAGE);
