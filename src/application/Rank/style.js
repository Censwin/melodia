import styled from 'styled-components'
import style from './../../assets/global-style'

export const Container = styled.div`
  position: fixed;
  top: 95px;
  bottom: 0;
  width: 100%;
  /* z-index: -1; */
  .offical,.global {
    margin: 10px 5px;
    padding-top: 15px;
    font-weight: 700;
    font-size: ${style ["font-size-m"]};
    color: ${style ["font-color-desc"]};
  }
`;

export const List = styled.ul`
  display: ${props => props.isGlobal ? "flex" : ""};
  padding: 0 5px;
  margin-top: 10px;
  flex-wrap: wrap;
  justify-content: space-around;
  &::after {
    content:"";
    display:block;
    width: 32vw;
  }
`

export const ListItem = styled.li`
  display: ${props => props.tracks && props.tracks.length ? "flex" : "block"};
  padding: 3px 0;
  border-bottom: 1px solid ${style ["border-color"]};
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

