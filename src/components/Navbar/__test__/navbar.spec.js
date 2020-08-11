import React from 'react';
import { shallow } from 'enzyme';
import Navbar from '../Navbar';

describe('--------- Navbar specification -------', () => {
  it('Should render without crashing', () => {
    const component = shallow(<Navbar />);
    const wrapper = component.find(`[data-test='navbar']`);
    expect(wrapper.length).toBe(1);
  });
});