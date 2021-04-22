import styled from 'styled-components'
import style from './../../assets/global-style'

export const List = styled.ul`
  display: ${props => props.isGlobal ? "flex" : ""};
`

export const ListItem = styled.li`
  display: ${props => props.tracks && props.tracks.length ? "flex" : ""};
  .imgWrapper {
    width:  ${props => props.tracks && props.tracks.length ? "27vw": "32vw"};
    height: ${props => props.tracks && props.tracks.length ? "27vw": "32vw"};
    position: relative;
    .decorate {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 25px;
      background: linear-gradient(hsla (0,0%,100%,0),hsla (0,0%,43%,.4));
    }
    img {
      width: 100%;
      height: 100%;
    }
    .update_frequecy {
      position:absolute;
      bottom: 5px;
      left: 5px;
      font-size: ${style["font-size-ss"]};
      color: ${style["font-color-light"]};
    }
  }
`

export const SongList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 10px;
  >li {
    font-size: ${style ["font-size-s"]};
    color: grey;
  }
`

