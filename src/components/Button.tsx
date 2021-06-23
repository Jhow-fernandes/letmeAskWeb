import { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

//SPRED OPERATOR, ESTAMOS PEGANDO TODAS AS PROPRIEDADES QUE ESSE BUTTON RECEBER.
export function Button(props: ButtonProps) {
  return (
    <button className="button" {...props} />
  );
}