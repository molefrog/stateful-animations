import React from 'react'
import ReactDOM from 'react-dom'

import Presentation from 'slides/presentation'

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(<Presentation />, document.querySelector('.application'))
})
