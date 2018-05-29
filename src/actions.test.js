import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import fetchMock from 'fetch-mock'

import {
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_FAILEDq
} from './constants';

import * as actions from './actions';

const mockStore = configureMockStore([thunkMiddleware]);

describe('setSearchField', () => {
  it('creates an action to search robots', () => {
    const text = 'woo!';
    const expectedAction = {
      type: CHANGE_SEARCH_FIELD,
      payload: text
    };
    expect(actions.setSearchField(text)).toEqual(expectedAction);
  });
});

describe('requestRobots', () => {
  it('handles pending requesting robots api', () => {
    const store = mockStore();
    store.dispatch(actions.requestRobots());
    const action = store.getActions();
    const expectedAction = {
      type: REQUEST_ROBOTS_PENDING
    };
    expect(action[0]).toEqual(expectedAction);
  });

  it('handles success requesting robots api', () => {
    fetchMock
      .getOnce('https://jsonplaceholder.typicode.com/users', {
        body: [{
          "id": 1,
          "name": "Leanne Graham",
          "username": "Bret",
          "email": "Sincere@april.biz",
        }],
        headers: {
          'content-type': 'application/json'
        }
      })

    const expectedActions = [{
        type: REQUEST_ROBOTS_PENDING
      },
      {
        type: REQUEST_ROBOTS_SUCCESS,
        payload: [{
          "id": 1,
          "name": "Leanne Graham",
          "username": "Bret",
          "email": "Sincere@april.biz",
        }]
      }
    ];

    const store = mockStore({
      robots: []
    });
    return store.dispatch(actions.requestRobots())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
  });
});