import React, { Component } from 'react'
import styled from 'styled-components'

class FakeDialog extends Component {
  render() {
    return (
      <DialogBody>
        <CloseButton />

        <Avatar />
        <Header />

        <Line />
        <Line />
        <Line />

        <Buttons>
          <Button />
          <Button disabled />
        </Buttons>
      </DialogBody>
    )
  }
}

const Buttons = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 240px;
  margin-top: 22px;
`

const Button = styled.div`
  opacity: 0.5;
  background: linear-gradient(-180deg, #80c3f3 0%, #4a90e2 100%);
  border-radius: 100px;

  width: 114px;
  height: 30px;

  ${props =>
    props.disabled &&
    `
      opacity: 0.4;
      background: #E6E6E6;
      border-radius: 100px;
  `};
`

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 48px;
  opacity: 0.5;
  background-image: linear-gradient(-180deg, #a7f0d1 0%, #6edda4 100%);
  margin-top: 26px;
  margin-bottom: 24px;
`

const Line = styled.div`
  width: 240px;
  height: 10px;
  background: #f3f3f3;
  margin-bottom: 8px;
`

const Header = styled.div`
  background: #f3f3f3;
  width: 128px;
  height: 10px;
  margin-bottom: 18px;
`

const DialogBody = styled.div`
  width: 350px;
  height: 270px;
  border-radius: 12px;
  background: white;
  position: relative;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  box-shadow: 0 0px 1px 0 rgba(0, 0, 0, 0.1), 0 2px 3px 0 rgba(0, 0, 0, 0.05),
    0 2px 32px 0 rgba(0, 0, 0, 0.05);
`

const CloseButton = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 14px;
  right: 14px;

  background: url(./images/dialog-close.svg);
`

export default FakeDialog
