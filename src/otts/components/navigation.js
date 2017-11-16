import React from 'react'
import styled from 'styled-components'

const Navigation = ({ slides, currentSlideIndex, onSelectSlide, ...props }) => {
  return (
    <NavigationBody>
      <PresentationName>{props.presentationName}</PresentationName>

      <TableOfContents>
        {slides.map((slide, index) => (
          <SlideItem
            key={index}
            current={index === currentSlideIndex}
            future={index > currentSlideIndex}
            onClick={() => onSelectSlide(index)}
          >
            {slide.name || `Slide #${index}`}
          </SlideItem>
        ))}
      </TableOfContents>
    </NavigationBody>
  )
}

const NavigationBody = styled.div`
  flex-shrink: 0;
  width: 240px;
  padding: 20px 24px;

  display: flex;
  flex-flow: column nowrap;
`

const PresentationName = styled.div`
  font-size: 26px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
  margin-bottom: 24px;
  padding-bottom: 12px;
  padding-right: 20px;
  flex-shrink: 0;
`

const TableOfContents = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  overflow-y: auto;
`

const SlideItem = styled.div`
  margin-bottom: 5px;
  cursor: pointer;
  color: #666;
  padding: 5px 0;

  ${props =>
    props.current &&
    `
    color: black;
    text-shadow: 1px 2px 0px yellow;
  `} ${props =>
      props.future &&
      `
    color: #e0e0e0;
  `};
`

export default Navigation
