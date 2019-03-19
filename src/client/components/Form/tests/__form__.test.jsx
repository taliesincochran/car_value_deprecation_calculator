/* eslint-disable no-undef */
import * as React from 'react';
import { shallow } from 'enzyme';

import Form from '../index';

describe('Form', () => {
  it('renders without crashing', (done) => {
    const component = <Form formName="myForm"><div>Hello</div></Form>;
    const wrapper = shallow(component);
    const form = wrapper.find('form');
    expect(form.props()).toMatchObject({ name: 'myForm' });
    done();
  });
});
