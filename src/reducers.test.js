import {
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_FAILED
} from './constants';

import * as reducers from './reducers';
import * as actions from './actions';

describe('searchRobots', () => {
  const initialStateSearch = {
    searchField: ''
  }

  it('returns the initial state', () => {
    expect(reducers.searchRobots(undefined, [])).toEqual({ searchField: '' });
  });

  it('handles CHANGE_SEARCH_FIELD', () => {
    expect(reducers.searchRobots(initialStateSearch, actions.setSearchField('abc'))).toEqual({
      searchField: 'abc'
    });
  });
});

describe('requestRobots', () => {
  const initialStateRobots = {
    isPending: false,
    robots: [],
    error: ''
  }

  it('returns the initial state', () => {
    expect(reducers.requestRobots(undefined, [])).toEqual(initialStateRobots);
  });

  it('handles REQUEST_ROBOTS_PENDING action', () => {
    expect(reducers.requestRobots(initialStateRobots , {
      type: REQUEST_ROBOTS_PENDING
    })).toEqual({
      robots: [],
      isPending: true,
      error: ''
    });
  });

  it('handles REQUEST_ROBOTS_SUCCESS action', () => {
    expect(reducers.requestRobots(initialStateRobots , {
      type: REQUEST_ROBOTS_SUCCESS,
      payload: [{
        id: '123',
        name: 'jon',
        email: 'jon@north.com'
      }]
    })).toEqual({
      robots: [{
        id: '123',
        name: 'jon',
        email: 'jon@north.com'
      }],
      isPending: false,
      error: ''
    });
  });

  it('handles REQUEST_ROBOTS_FAILED action', () => {
    expect(reducers.requestRobots(initialStateRobots , {
      type: REQUEST_ROBOTS_FAILED,
      payload: 'NOOO'
    })).toEqual({
      robots: [],
      isPending: false,
      error: 'NOOO'
    });
  });
});