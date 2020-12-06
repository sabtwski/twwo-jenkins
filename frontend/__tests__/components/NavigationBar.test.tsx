// https://github.com/vjwilson/enzyme-example-jest
// https://enzymejs.github.io/enzyme/docs/api/shallow.html

import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Link from 'next/link';

import NavigationBar from '../../components/topBar/NavigationBar';

Enzyme.configure({ adapter: new Adapter() });

test('Home page has a link to /home.', async () => {
  const wrapper = shallow(<NavigationBar selectedMenuItem={1} />);
  expect(wrapper.find(Link).at(0).prop('href')).toBe('/home');
});

test('Home page has a link to /favorites.', async () => {
  const wrapper = shallow(<NavigationBar selectedMenuItem={2} />);
  expect(wrapper.find(Link).at(1).prop('href')).toBe('/favorites');
});

test('Home page has a link to /popular.', async () => {
  const wrapper = shallow(<NavigationBar selectedMenuItem={3} />);
  expect(wrapper.find(Link).at(2).prop('href')).toBe('/popular');
});
