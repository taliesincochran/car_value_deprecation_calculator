import * as React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
  const {
    name,
    value,
    onChange,
    inputType,
    text,
    required,
    formName
  } = props;
  return (
    <div className="smallBox">
      <label
        id={name}
        htmlFor={name}
      >
        {text}
        <input
          className="field"
          name={name}
          value={value}
          onChange={onChange}
          type={inputType}
          required={required}
          form={formName}
          placeholder={required ? 'Required' : 'Optional'}
          {...props}
        />
      </label>
    </div>
  );
};
export default Input;

Input.propTypes = {
  required: PropTypes.bool.isRequired,
  inputType: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired
};
