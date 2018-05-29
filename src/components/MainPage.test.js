import { shallow } from 'enzyme';
import React from 'react';
import MainPage from './MainPage';

let wrapper, wrapper2, wrapper3;
beforeEach(() => {
  const mockProps = {
    onRequestRobots: jest.fn(),
    robots: [{
      id: 1,
      name: 'Jon',
      email: 'jon@north.com'
    }],
    searchField: '',
    isPending: false
  }
  wrapper = shallow(<MainPage {...mockProps}/>)
});

it('renders MainPage', () => {
  expect(wrapper).toMatchSnapshot();
});

it('filters robots correctly', () => {
  const mockProps2 = {
    onRequestRobots: jest.fn(),
    robots: [{
      id: 1,
      name: 'Jon',
      email: 'jon@north.com'
    }],
    searchField: '',
    isPending: false
  }
  wrapper2 = shallow(<MainPage {...mockProps2}/>)
  expect(wrapper2.instance().filteredRobots()).toEqual([{
    id: 1,
    name: 'Jon',
    email: 'jon@north.com'
  }]);
});

it('filters robots correctly 2', () => {
  const mockProps2 = {
    onRequestRobots: jest.fn(),
    robots: [],
    searchField: '',
    isPending: false
  }
  const filteredRobots = [];
  wrapper2 = shallow(<MainPage {...mockProps2}/>)
  expect(wrapper2.instance().filteredRobots()).toEqual(filteredRobots);
});