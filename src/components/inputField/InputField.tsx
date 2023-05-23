import { HTMLInputTypeAttribute, KeyboardEvent, useState } from 'react';
import './InputField.scss';

enum IconPosition {
  right = 'right',
  left = 'left',
}

type TInputField = {
  iconName?: string;
  value: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  required?: boolean;
  onClick?: () => void;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onPressEnter?: () => void;
  label?: string;
  name: string;
  iconPosition?: IconPosition;
};

function InputField({
  iconPosition = IconPosition.right,
  iconName,
  onClick,
  value,
  placeholder,
  onChange,
  onPressEnter,
  required = false,
  disabled,
  type = 'text',
  onFocus,
  onBlur,
  label,
  name,
}: TInputField) {
  const [isFocus, setIsFocus] = useState(false);
  const handlerOnPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onPressEnter?.();
    }
  };

  const handlerOnFocus = () => {
    setIsFocus(true);
    return onFocus?.();
  };

  const handlerOnBlur = () => {
    setIsFocus(false);
    return onBlur ? onBlur() : undefined;
  };

  return (
    <div className="wrapper-field">
      {!!label && <label htmlFor={name}>{label}</label>}
      <div
        className={`wrapper-input ${isFocus ? 'focus' : ''} ${
          value ? 'active-value' : ''
        }`}
      >
        {iconName && iconPosition !== 'right' && (
          <img
            alt=""
            src={iconName}
            className="icon"
            onClick={onClick || undefined}
          />
        )}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="field"
          placeholder={placeholder}
          type={type}
          required={required}
          name={name}
          id={name}
          disabled={disabled}
          onBlur={handlerOnBlur}
          onFocus={handlerOnFocus}
          onKeyDown={handlerOnPressEnter}
        />
        {iconName && iconPosition === 'right' && (
          <img
            alt=""
            src={iconName}
            className="icon"
            onClick={onClick || undefined}
          />
        )}
      </div>
    </div>
  );
}

export default InputField;
