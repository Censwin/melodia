import React, {useEffect, forwardRef, useImperativeHandle, useRef} from 'react'
import styled  from 'styled-components/macro'
import { prefixStyle } from '../../api/utils'
import style from '../../assets/global-style'

const Container = styled.div`
  .icon_wrapper {
    position: fixed;
    z-index: 1000;
    margin-top: -10px;
    margin-left: -10px;
    color: ${style["theme-color"]};
    font-size: 14px;
    font-weight: bold;
    display: none;
    transition: transform 1s cubic-bezier(0.68,-0.37, 0.71, 1.09);
    transform: translate3d(0, 0, 0);
    >div {
      transition: transform 1s;
    }
  }
`

const MusicNode = forwardRef((props, ref) => {
  const iconRef = useRef();
  // 最大音符数量
  const ICON_NUMBER = 3;
  const transform = prefixStyle("transform");
  // 使用原声DOM操作
  const createNode = (text) => {
    const template = `<div class="icon_wrapper">${text}</div>`
    const tempNode = document.createElement('div')
    tempNode.innerHTML = template;
    return tempNode.firstChild;
  }

  useEffect(() => {
    for (let i = 0; i < ICON_NUMBER; i++) {
      const node = createNode(`<div class="iconfont">&#xe642;</div>`)
      iconRef.current.appendChild(node)
    }
    const domArray = [...iconRef.current.children]
    domArray.forEach(item => {
      item.running = false;
      item.addEventListener('transitionend', function () {
        this.style['display'] = 'none';
        this.style[transform] = `translate3d(0, 0, 0)`;
        this.running = false;
        let icon = this.querySelector('div');
        icon.style[transform] = `translate3d(0, 0, 0)`;
      }, false)
    })
  }, [])

  // 动画
  const startAnimation = ({x, y}) => {
    for (let i = 0; i < ICON_NUMBER; i++) {
      let domArray = [...iconRef.current.children];
      let item = domArray[i];
      // 选择一个空闲元素执行
      if (!item.running) {
        item.style.left = x + 'px'
        item.style.top = y + 'px'
        item.style.display = 'inline-block';
        setTimeout (() => {
          item.running = true;
          item.style[transform] = `translate3d(0, 300px, 0)  scale(.5, .5)`;
          let icon = item.querySelector("div");
          icon.style[transform] = `translate3d(80px, 0, 0)`;
        }, 20);
        break;
      }
    }
  }
  useImperativeHandle(ref, () => {
    return {
      startAnimation
    }
  })
  return (
    <Container id="ttt1" ref={iconRef}></Container>
  )
})

export default React.memo(MusicNode)
