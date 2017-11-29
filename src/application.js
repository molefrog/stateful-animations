import React from 'react'
import ReactDOM from 'react-dom'

import Presentation from './presentation'
import { injectGlobal } from 'styled-components'

injectGlobal`
  body {
    margin: 0;
    padding: 0;
  }
`

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Presentation />, document.querySelector('.application'))
})
