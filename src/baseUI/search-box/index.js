import React, { useRef, useState, useEffect,useMemo } from 'react'
import styled from 'styled-components/macro'
import style from '../../assets/global-style'
import { debounce } from './../../api/utils'

const SearchBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 3px 6px;
  padding-right: 10px;
  height: 50px;
  .input-wrapper{
      background: ${style['border-color']};
      border-radius: 35px;
      flex: 1;
      margin: 0 5px;
      padding-left: 1em;
    .box {
      line-height: 35px;
      background: ${style['border-color']};
      font-size: ${style['font-size-m']};
      outline: none;
      border: none;
    }
  }
  
  /* .icon-delete {
    font-size: 16px;
    color: ${style['background-color']};
  } */
`

function SearchBox(props) {
  const inputRef = useRef()
  const [query, setQuery] = useState('')
  const { topQuery } = props // 父组件传递的热门搜索关键词
  const { handleSearch } = props // 搜索回调
  useEffect(() => {
    inputRef.current.focus()
  }, [])
  useEffect(() => {
    handleQueryDebounce(query)
  }, [query])
  
  useEffect(() => {
    if (topQuery !== query) {
      handleQueryDebounce(topQuery)
    }
  }, [topQuery])

  let handleQueryDebounce = useMemo(
    () => debounce(handleSearch, 500),
    [handleSearch]
  )

  const handleChange = (e) => {
    const value = e.currentTarget.value
    setQuery(value)
  }
  return (
    <SearchBoxWrapper>
      <div className="input-wrapper">
      <i className="iconfont search">&#xe62b;</i>
      <input
        ref={inputRef}
        className="box"
        placeholder="搜索歌曲、歌手、专辑"
        value={query}
        onChange={handleChange}
      />
      </div>
      <span onClick={() => props.back()}>返回</span>
      {/* {query && (
        <i className="iconfont icon-delete" onClick={clearQuery}>
          &#xe600;
        </i>
      )} */}
    </SearchBoxWrapper>
  )
}

export default React.memo(SearchBox)
