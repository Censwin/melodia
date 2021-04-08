import React from 'react'
import styled, { keyframes } from 'styled-components'
import style from '../../assets/global-style'

const loading = keyframes`
  0%, 100% {
    transform: scale(0.0);
  }
  50% {
    transform: scale(1.0);
  }
`

const run = keyframes`
  0%{
      transform: rotateZ(0deg);
  }
  100%{
      transform: rotateZ(360deg);
  }
`
const LoadingWrapper = styled.div`
  position: fixed;
  z-index: 1000;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 60px;
  height: 30px;
  animation: ${run} 1.4s infinite ease-in;
  display: flex;
  justify-content: center;
  align-items: center;
  ._ball {
    box-sizing: border-box;
    margin: 5px;
    width: 25px;
    height: 20px;
    opacity: 0.6;
    border-radius: 50%;
    background-color: ${style['theme-color']};
  }
`

function Loading() {
  return (
    <LoadingWrapper>
      <div className="_ball"></div>
      <div className="_ball"></div>
    </LoadingWrapper>
  )
}

export default React.memo(Loading)
