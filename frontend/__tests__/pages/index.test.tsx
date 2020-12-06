// https://github.com/vjwilson/enzyme-example-jest
// https://enzymejs.github.io/enzyme/docs/api/shallow.html

import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Link from 'next/link';

import Index from '../../pages/index';

Enzyme.configure({ adapter: new Adapter() });

test('Index page has a link to /login.', async () => {
  const wrapper = shallow(<Index />);
  expect(wrapper.find(Link).prop('href')).toBe('/login');
});
