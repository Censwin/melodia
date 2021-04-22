import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getRankList } from './store'
import { filterIndex } from './../../api/utils'
import { List, ListItem, SongList } from './style'
function Rank(props) {
  const { rankList: list, loading } = props
  const { getRankListDataDispatch } = props
  let ranklist = list ? list.toJS() : []

  useEffect(() => {
    if (!ranklist.length) {
      getRankListDataDispatch()
    }
  }, [])
  let globalStartIndex = filterIndex(ranklist)
  let guanfangBrand = ranklist.slice(0, globalStartIndex)
  let globalBrand = ranklist.slice(globalStartIndex)
  console.log(guanfangBrand)
  console.log(globalBrand)

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {list.map((item, index) => (
          <li key={item.first + index}>
            {`${index + 1}、${item.first} —— ${item.second}`}
          </li>
        ))}
      </SongList>
    ) : null
  }
  const renderRankList = (list, isGlobal) => {
    return (
      <List>
        {list.map((item) => {
          return (
            <ListItem key={item.id} tracks={item.tracks}>
              <div className="imgWrapper">
                <img src={item.coverImgUrl} alt="" />
                <div className="decorate"></div>
                <span className="update_frequecy">{item.updateFrequency}</span>
              </div>
              {renderSongList(item.tracks)}
            </ListItem>
          )
        })}
      </List>
    )
  }

  return (<div>
    <h1>官方榜</h1>
    {renderRankList(guanfangBrand)}
    <h1>全球榜</h1>
    {renderRankList(globalBrand)}
    </div>)
}

const mapStateToProps = (state) => ({
  rankList: state.getIn(['rankReducer', 'rankList']),
  loading: state.getIn(['rankReducer', 'loading']),
})

const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDataDispatch() {
      dispatch(getRankList())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank))
