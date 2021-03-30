import React from 'react'
import { ListWrapper, List, ListItem } from './style';

function RecommendList(props) {
  const {list} = props;
  console.log(list);
  return (
    <ListWrapper>
      <h1>推荐歌单</h1>
      <List>
        {
          list.map((item, index) => {
            return (
              <ListItem key={item.id + index}>
                <div className="imgWrapper">
                  <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music"/>
                  <div className="played_total">
                    <i className="iconfont play">&#xe885;</i>
                    <span className="count">{item.playCount}</span>
                  </div>
                </div>
              </ListItem>
            )
          })
        }
      </List>
    </ListWrapper>
  )
}

export default React.memo(RecommendList)
