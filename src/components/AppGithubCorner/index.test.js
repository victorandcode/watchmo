import React from 'react';
import { shallow } from 'enzyme';
import AppGithubCorner from './index';
import { GITHUB_URL } from '../../constants';

let wrapper;

beforeEach(() => {
    wrapper = shallow(<AppGithubCorner/>);
})

it('renders without crashing', () => {
    expect(wrapper).toHaveLength(1)
})

it('renders GithubCorner with appropriate URL', () => {
    expect(wrapper.find('GithubCorner').first().prop('href')).toEqual(GITHUB_URL);
    expect(wrapper.find('GithubCorner').at(1).prop('href')).toEqual(GITHUB_URL);
})