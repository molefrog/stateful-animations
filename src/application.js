import React from 'react'
import ReactDOM from 'react-dom'

import Presentation from './presentation'
import 'styles/syntax-highlight.scss'

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Presentation />, document.querySelector('.application'))
})
