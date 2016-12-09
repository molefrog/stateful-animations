import React from 'react'

import './button.scss'

const Button = ({ icon, children, onClick, checked }) =>
  <button className={`button ${checked ? 'button--checked' : ''}`}
    onClick={onClick}>
    {icon && <span className='button__icon'>{icon}</span>}
    {children}
  </button>

export default Button
