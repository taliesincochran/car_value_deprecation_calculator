/* eslint-disable no-undef */
import * as React from 'react';
import { mount } from 'enzyme';

import Main from '../Main';


describe('Main', () => {
  it('renders without crashing', (done) => {
    const component = <Main formName="name" />;
    const wrapper = mount(component);
    expect(wrapper.props()).toMatchObject({ formName: 'name' });
    done();
  });
});
