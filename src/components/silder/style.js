import styled from "styled-components";
import style from '../../assets/global-style'
export const SilderContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: auto;
  background: white;
  .before {
    width: 100%;
    height: 60%;
    position: absolute;
    top: 0;
    left: 0;
    background: ${style ["theme-color"]};
  }
  .slider-container {
    position: relative;
    width: 98%;
    height: 160px;
    overflow: hidden;
    margin: auto;
    border-radius: 5px;
    .swiper-pagination {
      background: ${style ["theme-color"]};
    }
  }
`