import React from 'react'
import styled from 'styled-components'
import { Slide, BuiltWithPresa } from 'presa'

const LinksSlide = () => (
  <Slide name="Ссылка на презентацию">
    презентация
    <LinkWrap>
      <LinkIcon>👉 </LinkIcon>
      <FinalLink
        target="_blank"
        href="https://molefrog.com/stateful-animations"
      >
        molefrog.com/stateful-animations
      </FinalLink>
    </LinkWrap>
    исходники
    <LinkWrap>
      <LinkIcon>⭐️ </LinkIcon>
      <FinalLink
        target="_blank"
        href="https://github.com/molefrog/stateful-animations"
      >
        github.com/molefrog/stateful-animations
      </FinalLink>
    </LinkWrap>
    библиотека для презентаций на React
    <LinkWrap>
      <LinkIcon>🔥 </LinkIcon>
      <FinalLink target="_blank" href="http://github.com/molefrog/presa">
        github.com/molefrog/presa
      </FinalLink>
    </LinkWrap>
    <Footer>
      <BuiltWithPresa size={18} />
      <OwnContacts>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://twitter.com/@mlfrg"
        >
          @mlfrg
        </a>
        {' · '}
        <a rel="noopener noreferrer" target="_blank" href="https://resume.io">
          resume.io
        </a>
      </OwnContacts>
    </Footer>
  </Slide>
)

export default LinksSlide

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 140px;
  margin-bottom: 10px;
`

const OwnContacts = styled.div`
  font-size: 22px;
  font-weight: 500;
  &,
  a {
    color: #3f5ffb;
  }
`

const LinkWrap = styled.div`
  display: flex;
  margin-top: 4px;
  margin-bottom: 32px;
`

const LinkIcon = styled.div`
  font-size: 36px;
  margin-right: 10px;
`

const FinalLink = styled.a`
  font-size: 32px;
  font-weight: 500;
  text-decoration: underline;
  color: #333;
  padding: 0 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #333;
    color: white;
  }
`
