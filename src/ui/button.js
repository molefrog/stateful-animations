import React from 'react'

import './button.scss'

const Button = ({ icon, children, onClick }) =>
  <button className='button' onClick={onClick}>
    {icon && <span className='button__icon'>{icon}</span>}
    {children}
  </button>

export default Button
