/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';
import PropTypes from 'prop-types';

/**
 * Form Component
 * @class Form
 */
class Form extends React.PureComponent {
  render() {
    const {
      formName,
      children
    } = this.props;
    return (
      <form
        className="infoBox"
        name={formName}
      >
        {children}
      </form>
    );
  }
}
Form.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  formName: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
export default Form;
