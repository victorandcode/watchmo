import React from 'react';
import { shallow } from 'enzyme';
import Logo from './Logo';

let wrapper;

beforeEach(() => {
    wrapper = shallow(<Logo/>);
})

it('renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
})

it('href points to #', () => {
    expect(wrapper.find('a').prop('href')).toEqual('#');
})