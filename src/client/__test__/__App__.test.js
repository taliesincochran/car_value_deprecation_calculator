/* eslint-disable no-undef */
import * as React from 'react';
import { shallow } from 'enzyme';

import App from '../App';

describe('App', () => {
  it('renders without crashing', (done) => {
    const component = <App />;
    const wrapper = shallow(component);
    const div = wrapper.find('div');
    expect(div.props()).toMatchObject({ id: 'main' });
    done();
  });
});
