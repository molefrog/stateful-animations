import styled, { css } from 'styled-components'

const Caption = styled.div`
  font-size: 28px;
  max-width: 70%;
  text-align: center;

  ${props =>
    props.color &&
    css`
      color: ${props.color};
    `}
}
`

export default Caption
