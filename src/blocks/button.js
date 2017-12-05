import React from 'react'

import styled from 'styled-components'
import { rgba } from 'polished'

const Button = ({ icon, children, ...props }) => (
  <ButtonContainer {...props}>
    {icon && <ButtonIcon>{icon}</ButtonIcon>}
    {children}
  </ButtonContainer>
)

const borderColor = '#edbfc0'

const ButtonIcon = styled.span`
  font-size: 24px;
  line-height: 21px;
  vertical-align: middle;
  margin-right: 8px;
`

const ButtonContainer = styled.button`
  border-radius: 6px;
  border: 3px solid ${borderColor};

  display: inline-flex;
  align-items: center;

  cursor: pointer;
  user-select: none;
  outline: none;

  background-color: white;
  color: black;
  font-family: inherit;

  padding: 9px 11px;
  font-size: 18px;
  margin: 4px;

  &:hover {
    background-color: ${rgba(borderColor, 0.01)};
  }

  &:active {
    background-color: ${rgba(borderColor, 0.1)};
  }

  ${props =>
    props.checked &&
    `
      &,
      &:active,
      &:hover {
        background-color: ${rgba('#6edda4', 0.2)};
      }
    `};
`

export default Button
