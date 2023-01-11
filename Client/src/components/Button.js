import React, { useState } from "react";
import "./Button.css";
import { Link } from "react-router-dom";

const STYLES = [
  "btn--primary",
  "btn--outline",
  "btn--dropdown",
  "btn--black",
  "btn--table-not-selected",
  "btn--table-selected",
  "btn--test",
];

const SIZES = [
  "btn--medium",
  "btn--large",
  "btn--dropdown_size",
  "btn--black_size",
  "btn--table_size",
];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    // <Link to="/sign-up" className="btn-mobile">
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
    // </Link>
  );
};

export const Button2 = ({
  children,
  type,
  handleClick,
  button_style,
  button_size,
}) => {
  const [btnState, setBtnState] = useState(false);

  function handleClick() {
    setBtnState((btnState) => !btnState);
  }

  let toggleClass = btnState ? "selected" : "not-selected";

  return (
    <button
      // className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      className={`btn--table-${toggleClass}`}
      onClick={handleClick}
      type={type}
    >
      {children}
    </button>
  );
};
