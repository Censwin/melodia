import React, { useState } from 'react'
import Horizen from '../../baseUI/horizen-item'
import { categoryTypes, alphaTypes } from '../../api/config'
import { NavContainer,ListContainer,List,ListItem } from './style'
import Scroll from './../../baseUI/scroll/index'

const singerList = [1,2,3,4,5,6,7,8,9,10,11,12].map(item => {
  return {
    picUrl: "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
    name: "隔壁老樊",
    accountId: 277313426,
  }
})

const renderSingerList = () => {
  return (
    <List>
      {
        singerList.map((item, index) => {
          return (
            <ListItem key={item.accountId + "" +index}>
              <div className="img_wrapper">
                <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
              </div>
            </ListItem>
          )
        })
      }
    </List>
  )
}

function Singers() {
  const [_categ, setCateg] = useState('')
  const [_alpha, setAlpha] = useState('')
  return (
    <div>
    <NavContainer>
      <Horizen
        list={categoryTypes}
        title={'分类 (默认热门):'}
        oldVal={_categ}
        handleClick={(key)=>setCateg(key)}
      ></Horizen>
      <Horizen
        list={alphaTypes}
        title={'首字母:'}
        oldVal={_alpha}
        handleClick={(key)=>setAlpha(key)}
      ></Horizen>
    </NavContainer>
    <ListContainer>
      <Scroll>
        { renderSingerList () }
      </Scroll>
    </ListContainer>
    </div>
  )
}

export default React.memo(Singers)
