/* eslint-disable no-undef */
import * as React from 'react';
import { shallow } from 'enzyme';
import jest from 'jest';

import Input from '../index';

describe('Input', () => {
  it('renders without crashing', (done) => {
    const mockFunction = jest.fn();
    const component = <Input formName="name" name="myInput" inputType="text" text="some text" value="value" required onChange={mockFunction} />;
    const wrapper = shallow(component);
    const input = wrapper.find('input');
    expect(input.props()).toMatchObject({ name: 'myInput' });
    done();
  });
});
