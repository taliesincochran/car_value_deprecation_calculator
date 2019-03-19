/* eslint-disable no-undef */
import * as React from 'react';
import { shallow } from 'enzyme';

import Input from '../index';

const handleChange = (event) => {
  const { name, value } = event.target;
  console.log(name, value);
};
/**
 *  This will throw a warning in the test,
 *  it seems to think that the oneOf[number, string]
 *  means an array...
 */
describe('Input', () => {
  it('renders without crashing', (done) => {
    const component = <Input formName="name" name="myInput" inputType="text" text="some text" value={['stuff', 0]} required onChange={handleChange} />;
    const wrapper = shallow(component);
    const input = wrapper.find('input');
    expect(input.props()).toMatchObject({ name: 'myInput' });
    done();
  });
});
