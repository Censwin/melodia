import React, { useEffect, useState,useRef } from 'react'
import { Container, TopDesc, Menu,SongList,SongItem } from './style'
import { CSSTransition } from 'react-transition-group'
import Header from '../../baseUI/header'
import { currentAlbum } from './mock'
import Scroll from '../../baseUI/scroll/index'
import defauleImg from '../../components/list/music.png'
import {getCount, getName} from '../../api/utils'


function Album(props) {
  const [showStatus, setShowStatus] = useState(true)
  const [isMarquee, setIsMarquee] = useState(false) // 跑马灯
  const [title, setTitle] = useState("歌单")
  useEffect(() => {})
  const HeaderProps = {
    title: '歌手',
    handleClick: () => {
      setShowStatus(false)
    },
    isMarquee
  }
  const handerEl = useRef()
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
        <Header ref={handerEl} {...HeaderProps} />
        <Scroll>
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
                    <img src={currentAlbum.creator.avatarUrl} alt=""/>
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
          <SongList>
            <div className="first_line">
              <div className="play_all">
                <i className="iconfont">&#xe6e3;</i>
                <span>播放全部<span className="sum">(共10首)</span></span>
              </div>
              <div className="markBill">
              <i className="iconfont">&#xe62d;</i>
              <span > 收藏 ({getCount (0)})</span>
              </div>
            </div>
            <SongItem>
              {
                currentAlbum.tracks.map((item, index) => {
                  return (
                    <li key={index}>
                      <span className="index">
                        {index + 1}
                      </span>
                      <div className="info">
                        <span>{item.name}</span>
                        <span>{ getName (item.ar) } - { item.al.name }</span>
                      </div>
                    </li>
                  )
                })
              }
            </SongItem>
          </SongList>
        </Scroll>
      </Container>
    </CSSTransition>
  )
}

export default React.memo(Album)
