import './presentation.scss'

import Presentation from './components/presentation'
import Slide from './components/slide'

// Export individual building blocks
import Code from './blocks/code'
import FigureCaption from './blocks/figure-caption'
import { TextSlide, IframeSlide } from './blocks/text-slide'

export { Slide, Presentation, Code, FigureCaption, TextSlide, IframeSlide }
