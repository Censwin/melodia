import React, { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { getName } from '../../../api/utils'
import { MiniPlayerContainer } from './style'
import ProgressCircle from '../../../baseUI/progress-circle'

function MiniPlayer(props) {
  const { song, fullScreen, playing, percent } = props
  const { toggleFullScreen, clickPlaying, nextSong } = props
  const miniPlayerRef = useRef()
  return (
    <CSSTransition
      in={!fullScreen}
      timeout={400}
      classNames="mini"
      onEnter={() => {
        miniPlayerRef.current.style.display = 'flex'
      }}
      onExited={() => {
        miniPlayerRef.current.style.display = 'none'
      }}
    >
      <MiniPlayerContainer
        ref={miniPlayerRef}
        onClick={() => toggleFullScreen(true)}
      >
        <div className="icon">
          <div className="imgWrapper">
            <img
              src={song.al.picUrl}
              alt="转转转"
              className={`play ${playing ? '' : 'pause'}`}
              width="40"
              height="40"
            />
          </div>
        </div>
        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{getName(song.ar)}</p>
        </div>
        <div className="control">
          <ProgressCircle radius={32} percent={percent}>
            <i
              className={`icon-mini iconfont icon-${playing ? 'pause' : 'play'}`}
              onClick={(e) => clickPlaying(e, !playing)}
              dangerouslySetInnerHTML={{
                __html: playing ? '&#xe650;' : '&#xe61e;',
              }}
            ></i>
          </ProgressCircle>
        </div>
        <div className="control" onClick={nextSong}>
          <i className="iconfont">&#xe640;</i>
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  )
}

export default React.memo(MiniPlayer)
