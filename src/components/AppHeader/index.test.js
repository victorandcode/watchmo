import React from 'react';
import { shallow } from 'enzyme';
import AppHeader from './index';

it('renders without crashing', () => {
    const wrapper = shallow(<AppHeader/>);
    expect(wrapper).toHaveLength(1);
})

it('updates state when search is opened', () => {
    const wrapper = shallow(<AppHeader shouldTriggerBigSearch={true}/>);
    wrapper.instance().setSearchIsOpened(true);
    expect(wrapper.state('bigSearchIsActive')).toEqual(true);
})

it('updates state when search is closed', () => {
    const wrapper = shallow(<AppHeader shouldTriggerBigSearch={false}/>);
    wrapper.instance().setSearchIsOpened(false);
    expect(wrapper.state('bigSearchIsActive')).toEqual(false);
})

