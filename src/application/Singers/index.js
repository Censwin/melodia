import React, { useState } from 'react'
import Horizen from '../../baseUI/horizen-item'
import { categoryTypes, alphaTypes } from '../../api/config'
import { NavContainer } from './style'

function Singers() {
  const [_categ, setCateg] = useState('')
  const [_alpha, setAlpha] = useState('')
  return (
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
  )
}

export default React.memo(Singers)
