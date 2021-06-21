const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;

const STATE_PAUSE = 0
const STATE_PLAYING = 1

export default class Lyric {
  constructor (lrc, handler = () => {}) {
    this.lrc = lrc;
    this.lines = [];// 这是解析后的数组，每一项包含对应的歌词和时间
    this.handler = hanlder;// 回调函数
    this.state = STATE_PAUSE;// 播放状态
    this.curLineIndex = 0;// 当前播放歌词所在的行数
    this.startStamp = 0;// 歌曲开始的时间戳

    this._initLines ();
  }
  _initLines () {
    // 解析
    
  }
}