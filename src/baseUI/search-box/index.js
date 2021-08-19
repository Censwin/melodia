import React, {useRef, useState, useEffect} from 'react'
import styled from'styled-components/macro';
import style from '../../assets/global-style';
import { debounce } from './../../api/utils';

const SearchBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  padding-right: 20px;
  height: 40px;
  background: ${style ["theme-color"]};
  .icon-back {
    font-size: 24px;
    color: ${style ["font-color-light"]};
  }
  .box {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: ${style ["theme-color"]};
    color: ${style ["highlight-background-color"]};
    font-size: ${style ["font-size-m"]};
    outline: none;
    border: none;
    border-bottom: 1px solid ${style ["border-color"]};
    &::placeholder {
      color: ${style ["font-color-light"]};
    }
  }
  .icon-delete {
    font-size: 16px;
    color: ${style ["background-color"]};
  }
`

function SearchBox(props) {
  const inputRef = useRef()
  const [query, setQuery] = useState("")
  const {topQuery} = props; // 父组件传递的热门搜索关键词
  const { handleQuery } = props; // 搜索回调
  useEffect(() => {
    inputRef.current.focus()
  }, [])
  useEffect(() => {
    handleSearch()
  }, [query])
  const handleChange = (e) => {
    const value = e.currentTarget.value
    setQuery(value)
  }
  const clearQuery = () => {

  }
  return (
    <SearchBoxWrapper>
      <i className="iconfont icon-back" onClick={() => props.back()}>&#xe655;</i>
      <input ref={inputRef} className="box" placeholder="搜索歌曲、歌手、专辑" value={query} onChange={handleChange}/>
      {query && <i className="iconfont icon-delete" onClick={clearQuery}>&#xe600;</i>}
    </SearchBoxWrapper>
  )
}

export default React.memo(SearchBox)
