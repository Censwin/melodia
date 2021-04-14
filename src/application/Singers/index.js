import React, { useState, useEffect } from 'react'
import Horizen from '../../baseUI/horizen-item'
import { categoryTypes, alphaTypes } from '../../api/config'
import { NavContainer, ListContainer, List, ListItem } from './style'
import Scroll from './../../baseUI/scroll/index'

import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList,
} from './store/actionCreators'
import { connect } from 'react-redux'

function Singers(props) {
  const [_categ, setCateg] = useState('-1')
  const [_alpha, setAlpha] = useState('')

  const {
    singerList,
    enterLoading,
    pullUpLoading,
    pullDownLoading,
    pageCount,
  } = props

  const {
    getHotSingerDispatch,
    updateDispatch,
    pullUpRefreshDispatch,
    pullDownRefreshDispatch,
  } = props

  useEffect(() => {
    // 如果页面有数据，则不发请求
    //immutable 数据结构中长度属性 size
    // console.log(bannerList.toJS());
    // console.log(ref.current); // scroll 暴露相关刷新接口 使用ref进行接收
    getHotSingerDispatch()
  }, [])

  const renderSingerList = () => {
    const list = singerList ? singerList.toJS(): [];
    return (
      <List>
        {list.map((item, index) => {
          return (
            <ListItem key={item.accountId + '' + index}>
              <div className="img_wrapper">
                <img
                  src={`${item.picUrl}?param=300x300`}
                  width="100%"
                  height="100%"
                  alt="music"
                />
              </div>
              <div className="name">{item.name}</div>
            </ListItem>
          )
        })}
      </List>
    )
  }

  const handleSetCate = (key) => {
    setCateg(key)
    updateDispatch(key, _alpha)
  }

  const handleSetAlpha = (key) => {
    setAlpha(key)
    updateDispatch(_categ, key)
  }

  return (
    <div>
      <NavContainer>
        <Horizen
          list={categoryTypes}
          title={'分类 (默认热门):'}
          oldVal={_categ}
          handleClick={(key) => handleSetCate(key)}
        ></Horizen>
        <Horizen
          list={alphaTypes}
          title={'首字母:'}
          oldVal={_alpha}
          handleClick={(key) => handleSetAlpha(key)}
        ></Horizen>
      </NavContainer>
      <ListContainer>
        <Scroll>{renderSingerList(singerList)}</Scroll>
      </ListContainer>
    </div>
  )
}

const mapStateToProps = (state) => ({
  singerList: state.getIn(['singersReducer', 'singerList']),
  enterLoading: state.getIn(['singersReducer', 'enterLoading']),
  pullUpLoading: state.getIn(['singersReducer', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singersReducer', 'pullDownLoading']),
  pageCount: state.getIn(['singersReducer', 'pageCount']),
})

const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList())
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0)) //由于改变了分类，所以pageCount清零
      dispatch(changeEnterLoading(true)) //loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
      dispatch(getSingerList(category, alpha))
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true))
      dispatch(changePageCount(count + 1))
      if (hot) {
        dispatch(refreshMoreHotSingerList())
      } else {
        dispatch(refreshMoreSingerList(category, alpha))
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      dispatch(changePullDownLoading(true))
      dispatch(changePageCount(0)) //属于重新获取数据
      if (category === '' && alpha === '') {
        dispatch(getHotSingerList())
      } else {
        dispatch(getSingerList(category, alpha))
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Singers)
