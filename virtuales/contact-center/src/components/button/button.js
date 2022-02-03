import './button.css';

const Button = ({ variant, onClick, icon, children, disabled, name }) => {
  return (
    <button
      className={`button button--${variant}`}
      onClick={onClick}
      disabled={disabled}
      name={name}
    >
      {icon ? (
        <img src={icon ? icon : ''} alt="" width="30" className="iconButton" />
      ) : (
        ''
      )}
      {children}
    </button>
  );
};

export default Button;
