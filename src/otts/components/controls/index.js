import React from 'react'
import styled from 'styled-components'

import SlideSwitcher from './slide-switcher'
import FullscreenToggle from './fullscreen-toggle'

const Controls = styled.div`
  margin-top: 26px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
`

const AdditionalControls = styled.div`
  margin-left: 8px;
`

const ControlsRoot = props => (
  <Controls>
    <SlideSwitcher {...props} />

    <AdditionalControls>
      <FullscreenToggle />
    </AdditionalControls>
  </Controls>
)

export default ControlsRoot
