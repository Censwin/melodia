import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { getRankList } from './store'


function Rank(props) {
  const {rankList, loading} = props
  const {getRanklist} = props
  useEffect(() => {
    getRanklist()
    console.log(rankList);
  }, [])
  return (
    <div>
      <h1>Rank</h1>
    </div>
  )
}

const mapStateToProps = (state) => ({
  rankList: state.getIn(['rankReducer','rankList']),
  loading: state.getIn(['rankReducer', 'loading'])
})

const mapDispatchToProps = (dispatch) => {
  return {
    getRanklist () {
      dispatch(getRankList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank))
