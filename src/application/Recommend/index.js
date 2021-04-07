import React,{useEffect} from 'react';
import Silder from '../../components/silder';
import RecommendList from '../../components/list';
import Scroll from '../../baseUI/scroll';
import {Content} from './style';
import { connect } from "react-redux";
import * as actionTypes from './store/actionCreators';
function Recommend(props) {
  const {bannerList, recommendList} = props;
  const {getBannerDataDispatch, getRecommendListDataDispatch} = props;
  console.log(props);
  useEffect(() => {
    getBannerDataDispatch()
    getRecommendListDataDispatch()
  }, [])
  const bannerListJS = bannerList ? bannerList.toJS () : [];
  const recommendListJS = recommendList ? recommendList.toJS () :[];
  return (
    <Content>
      <Scroll>
        <div>
          <Silder bannerList={bannerListJS}></Silder>
          <RecommendList list={recommendListJS}></RecommendList>
        </div>
      </Scroll>
    </Content>
  )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  // 不要在这里将数据 toJS
  // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  bannerList: state.getIn (['recommendReducer', 'bannerList']),
  recommendList: state.getIn (['recommendReducer', 'recommendList']),
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch () {
      dispatch (actionTypes.getBannerList ());
    },
    getRecommendListDataDispatch () {
      dispatch (actionTypes.getRecommendList ());
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))
