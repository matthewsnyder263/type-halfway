import React from 'react';


function BootstrapInput(props) {
  const { id, placeholder, labelText, value, onChange, type, name } = props;

  return (
    <div className="form-floating mb-3">

      <input
        value={value}
        onChange={onChange}
        required
        type={type}
        className="form-control"
        id={id}
        name={name}
      />
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
    </div>
  );
}

export default BootstrapInput;
