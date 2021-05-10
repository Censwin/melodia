import React,{forwardRef, memo} from 'react';
import { getCount, getName, isEmptyObject } from '../../api/utils';
import {SongList, SongItem } from './style'
const SongsList = forwardRef((props, refs) => {
  const {songs} = props

  let renderSongList = (list) => {
    list.map((item, index) => {
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
    })
  }

  return (
    <SongList>
        <div className="first_line">
          <div className="play_all">
            <i className="iconfont">&#xe6e3;</i>
            <span>
              播放全部<span className="sum">(共{10}首)</span>
            </span>
          </div>
          <div className="markBill">
            <i className="iconfont">&#xe62d;</i>
            <span> 收藏 ({getCount(10000)})</span>
          </div>
        </div>
        <SongItem>
          {renderSongList(songs)}
        </SongItem>
      </SongList>
  )
})

export default memo(SongsList)
