import React, { useEffect, useState, useRef } from 'react'
import { Container, TopDesc, Menu, SongList, SongItem } from './style'
import { CSSTransition } from 'react-transition-group'
import Header from '../../baseUI/header'
// import { currentAlbum } from './mock'
import Scroll from '../../baseUI/scroll/index'
import { getCount, getName, isEmptyObject } from '../../api/utils'
import { HEADER_HEIGHT } from './../../api/config'
import style from '../../assets/global-style'
import { connect } from 'react-redux'
import { getAlbunDetail, changeLoading } from './store'
import Loading from '../../baseUI/loading/index';
function Album(props) {
  const [showStatus, setShowStatus] = useState(true)
  const [isMarquee, setIsMarquee] = useState(false) // 跑马灯
  const [title, setTitle] = useState('歌单')

  // 获取url中的参数
  const id = props.match.params.id
  const { getAlbunDetailData } = props
  const { currentAlbum: currentAlbumImmutable, isLoading } = props
  useEffect(() => {
    getAlbunDetailData(id)
  }, [getAlbunDetailData, id])
  let currentAlbum = currentAlbumImmutable.toJS()
  const HeaderProps = {
    title,
    handleClick: () => {
      setShowStatus(false)
    },
    isMarquee,
  }
  const headerEl = useRef()
  const handleScroll = (pos) => {
    let minScrollY = -HEADER_HEIGHT
    let percent = Math.abs(pos.y / minScrollY)
    let headerDom = headerEl.current
    // 滑过顶部的高度开始变化
    if (pos.y < minScrollY) {
      headerDom.style.backgroundColor = style['theme-color']
      headerDom.style.opacity = Math.min(1, (percent - 1) / 2)
      setTitle(currentAlbum.name)
      setIsMarquee(true)
    } else {
      headerDom.style.backgroundColor = ''
      headerDom.style.opacity = 1
      setTitle('歌单')
      setIsMarquee(false)
    }
  }
  const RenderTopDesc = () => {
    return (
      <TopDesc background={currentAlbum.coverImgUrl}>
        <div className="background">
          <div className="filter"></div>
        </div>
        <div className="info_wrapper">
          <div className="imgWrapper">
            <div className="decorate"></div>
            <img src={currentAlbum.coverImgUrl} alt="" />
            <div className="play_count">
              <i className="iconfont play">&#xe885;</i>
              <span className="count">
                {Math.floor(100000 / 1000) / 10} 万{' '}
              </span>
            </div>
          </div>
          <div className="billName">
            <div className="title">{currentAlbum.name}</div>
            <div className="person">
              <div className="avatar">
                <img src={currentAlbum.creator.avatarUrl} alt="" />
              </div>
              <div className="name">{currentAlbum.creator.nickname}</div>
            </div>
          </div>
        </div>
        <Menu>
          <div>
            <i className="iconfont">&#xe6ad;</i>
            评论
          </div>
          <div>
            <i className="iconfont">&#xe86f;</i>
            点赞
          </div>
          <div>
            <i className="iconfont">&#xe62d;</i>
            收藏
          </div>
          <div>
            <i className="iconfont">&#xe606;</i>
            更多
          </div>
        </Menu>
      </TopDesc>
    )
  }

  const RenderSongList = () => {
    return (
      <SongList>
        <div className="first_line">
          <div className="play_all">
            <i className="iconfont">&#xe6e3;</i>
            <span>
              播放全部<span className="sum">(共{currentAlbum.tracks.length}首)</span>
            </span>
          </div>
          <div className="markBill">
            <i className="iconfont">&#xe62d;</i>
            <span> 收藏 ({getCount(currentAlbum.subscribedCount)})</span>
          </div>
        </div>
        <SongItem>
          {currentAlbum.tracks.map((item, index) => {
            return (
              <li key={index}>
                <span className="index">{index + 1}</span>
                <div className="info">
                  <span>{item.name}</span>
                  <span>
                    {getName(item.ar)} - {item.al.name}
                  </span>
                </div>
              </li>
            )
          })}
        </SongItem>
      </SongList>
    )
  }

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}
    >
      <Container>
        <Header ref={headerEl} {...HeaderProps} />
        {!isEmptyObject(currentAlbum) ? <Scroll bounceTop={false} onScroll={handleScroll}>
          <div>
            {RenderTopDesc()}
            {RenderSongList()}
          </div>
        </Scroll> : null}
        {isLoading && <Loading></Loading>}
      </Container>
    </CSSTransition>
  )
}

const mapStateToProps = (state) => {
  return {
    currentAlbum: state.getIn(['albumDetail', 'currentAlbum']),
    isLoading: state.getIn(['albumDetail', 'enterLoading'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAlbunDetailData(id) {
      dispatch(changeLoading(true))
      dispatch(getAlbunDetail(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album))
