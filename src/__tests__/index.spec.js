import React from 'react';
import renderer from 'react-test-renderer';

import Index from '../index';

describe('<Index />', () => {
  it('renders without crashing', () => {
    const wrapper = renderer.create(<Index />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
