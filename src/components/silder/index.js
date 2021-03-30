import React, { useState, useEffect } from 'react'
// css 样式
import { SilderContainer } from './style'
// 引入swiper
import Swiper, {Pagination, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.css'
Swiper.use([Pagination, Autoplay ])

function Silder(props) {
  const [sliderSwiper, setSliderSwiper] = useState(void 0)
  const { bannerList } = props
  useEffect(() => {
    if (bannerList.length > 0 && !sliderSwiper) {
      const newSwiper = new Swiper('.slider-container', {
        loop: false,
        autoplay: { // 自动滑动
          delay: 3000, //3秒切换一次
          disableOnInteraction: false, //
        },
        pagination: {
          el: '.swiper-pagination',
        },
      })
      setSliderSwiper(newSwiper)
    }
  }, [bannerList.length, sliderSwiper])
  return (
    <SilderContainer>
      <div className="before"></div>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {
            bannerList.map((item, index) => {
              return (
                <div className="swiper-slide" key={item.imageUrl+index}>
                  <img src={item.imageUrl} width="100%" height="100%" alt="推荐" />
                </div>
              )
            })
          }
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </SilderContainer>
  )
}

export default React.memo(Silder)
