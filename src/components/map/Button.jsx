import "../../styles/map.css";

/* eslint-disable react/prop-types */
const Button = ({ children, type = "button", ...props }) => {
  return (
    <button type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;
