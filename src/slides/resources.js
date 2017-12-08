import React from 'react'
import { Slide } from 'presa'
import styled from 'styled-components'

const Video = ({ thumb, url, title, author }) => (
  <VideoItem href={url} target="_blank">
    <VideoThumb style={{ backgroundImage: `url(${thumb})` }} />
    <VideoName>{title}</VideoName>
    <VideoAuthor>{author}</VideoAuthor>
  </VideoItem>
)

class ResourcesSlide extends React.Component {
  render() {
    return (
      <Slide {...this.props}>
        <VideoGrid>
          <Video
            thumb={'./images/talks/anim-vdom.gif'}
            url="https://www.youtube.com/watch?v=W5AdUcJDHo0"
            title="Animating the Virtual DOM"
            author="Sarah Drasner · 2017"
          />
          <Video
            thumb={'./images/talks/fsm.gif'}
            url="https://www.youtube.com/watch?v=VU1NKX6Qkxc"
            title="Infinitely Better UIs with FA"
            author="David Khourshid · 2017"
          />
          <Video
            thumb={'./images/talks/immut-uis.gif'}
            url="https://www.youtube.com/watch?v=pLvrZPSzHxo"
            title="Immutable User Interfaces"
            author="Lee Byron · 2016"
          />
          <Video
            thumb={'./images/talks/aerotwist.gif'}
            url="https://www.youtube.com/watch?v=thNyy5eYfbc"
            title="High performance web UIs"
            author="Paul Lewis · 2016"
          />
          <Video
            thumb={'./images/talks/acko.gif'}
            url="https://www.youtube.com/watch?v=ONN3jBly364"
            title="Making things with Maths"
            author="Steven Wittens · 2012"
          />

          <Video
            thumb={'./images/talks/eyeo.gif'}
            url="https://vimeo.com/45526286"
            title="12 Projects for Eyeo"
            author="Robert Hodgin · 2012"
          />
        </VideoGrid>
      </Slide>
    )
  }
}

const VideoGrid = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const VideoAuthor = styled.div`
  font-size: 17px;
`

const VideoName = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 2px;
`

const VideoThumb = styled.div`
  width: 260px;
  height: 170px;

  margin-bottom: 10px;

  background-size: cover;
  background-position: top left;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.08),
    0px 0px 8px rgba(0, 0, 0, 0.05);

  border-radius: 4px;
`

const VideoItem = styled.a`
  margin: 0 11px;
  margin-bottom: 42px;
  text-decoration: none;
  color: inherit;

  &:hover {
    ${VideoThumb} {
      box-shadow: 0px 0px 0px 3px #3f5ffb;
    }
  }
`

export default ResourcesSlide
