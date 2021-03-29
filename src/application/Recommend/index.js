import React from 'react'
import Silder from '../../components/silder'
export default function Recommend() {
  //mock 数据
  const bannerList = [1,2,3,4].map (item => {
    return { imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg" }
  });
  return (
    <div>
      <Silder bannerList={bannerList}></Silder>
      <h1>Recommend</h1>
    </div>
  )
}
