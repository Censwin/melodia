import styled from 'styled-components'

export const ListWrapper = styled.div`
  max-height: 100%;
  .title {
    line-height: 2em;
    font-weight: bold;
    padding-left: 1em;
    font-size: 1em;
  }
`

export const List = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

export const ListItem = styled.div`
  position: relative;
  width: 32%;
  margin-bottom: 2px;
  .imgWrapper {
    .decorate {
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
    }
    img {
      height: 100%;
      width: 100%;
      border-radius: 5px;
    }
    .played_total {
      position: absolute;
      top: 0;
      right: 0;
      padding: 1px 3px;
      font-size: 12px;
      color: #fff;
      .play {
        vertical-align: middle;
      }
    }
  }
  &:last-child:nth-child(3n - 1) {
    margin-right: calc(30% + 10% / 3)
  }
  &:last-child:nth-child(3n - 2) {
    margin-right: calc(60% + 20% / 3)
  }
`