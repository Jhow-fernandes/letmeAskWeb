import { ButtonHTMLAttributes } from 'react';

import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
};

//SPRED OPERATOR, ESTAMOS PEGANDO TODAS AS PROPRIEDADES QUE ESSE BUTTON RECEBER.
export function Button({isOutlined = false, ...props}: ButtonProps) {
  return (
    <button 
    className={`button ${isOutlined ? 'outlined' : ''}`}
    {...props} />
  );
}