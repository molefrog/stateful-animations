import styled, { css } from 'styled-components'

const Title = styled.h1`
  font-size: 52px;
  font-weight: bold;
  max-width: 65%;
  text-align: center;
  margin: 12px 0;

  ${props =>
    props.color &&
    css`
      color: ${props.color};
    `};
`

export default Title
