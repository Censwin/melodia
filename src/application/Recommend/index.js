import React, { useEffect, useRef } from 'react'
import Silder from '../../components/silder'
import RecommendList from '../../components/list'
import Scroll from '../../baseUI/scroll'
import { Content } from './style'
import { connect } from 'react-redux'
import * as actionTypes from './store/actionCreators'

import { forceCheck } from 'react-lazyload'

import Loading from '../../baseUI/loading/index'
import { renderRoutes } from 'react-router-config';

function Recommend(props) {
  const { bannerList, recommendList, isLoading } = props
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props
  const ref = useRef()
  // console.log(props)
  useEffect(() => {
    // 如果页面有数据，则不发请求
    //immutable 数据结构中长度属性 size
    // console.log(bannerList.toJS());
    // console.log(ref.current); // scroll 暴露相关刷新接口 使用ref进行接收
    if (!bannerList.size) {
      getBannerDataDispatch()
    }
    if (!recommendList.size) {
      getRecommendListDataDispatch()
      // ref.current.refresh()
    }
  }, [])
  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() : []
  console.log(props);
  return (
    <Content>
      <Scroll onScroll={forceCheck} ref={ref}>
        <div>
          <Silder bannerList={bannerListJS}></Silder>
          <RecommendList list={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      {isLoading && <Loading></Loading>}
      {renderRoutes(props.route.routes)}
    </Content>
  )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  // 不要在这里将数据 toJS
  // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  bannerList: state.getIn(['recommendReducer', 'bannerList']),
  recommendList: state.getIn(['recommendReducer', 'recommendList']),
  isLoading: state.getIn(['recommendReducer', 'isLoading']),
})
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList())
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Recommend))
