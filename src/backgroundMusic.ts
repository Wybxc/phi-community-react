import {
  AudioContext,
  IAudioBufferSourceNode,
  IAudioContext,
} from 'standardized-audio-context'

/**
 * 背景音乐通道。
 */
export class Channel {
  /**
   * 通道使用的音频上下文。
   */
  audioContext: IAudioContext = new AudioContext()
  /**
   * 当前的音源。
   */
  source: IAudioBufferSourceNode<IAudioContext> | null = null
  /**
   * 当前音乐的 url。
   */
  url: string = ''
  /**
   * 音量控制器。
   */
  gain = this.audioContext.createGain()

  constructor() {
    this.gain.connect(this.audioContext.destination)
  }

  /**
   * 获取并播放指定的音乐，如果当前正在播放，则停止并替换。
   * @param url 音乐的 url。
   * @param loop 是否循环。
   * @param forceReplay 是否强制重新播放，即使当前正在播放的音乐与 url 相同。
   * @param onEnded 播放结束时的回调。
   */
  async fetchAndPlay(
    url: string,
    loop: boolean = true,
    forceReplay: boolean = false,
    onEnded?: () => void
  ) {
    if (this.audioContext.state === 'suspended') this.resume()

    if (this.url === url && !forceReplay) return

    this.url = url
    const response = await fetch(url)
    const buffer = await response.arrayBuffer()
    if (this.source) {
      this.source.stop()
    }
    const source = this.audioContext.createBufferSource()
    source.buffer = await this.audioContext.decodeAudioData(buffer)
    source.loop = loop
    source.connect(this.gain)
    source.start(0)
    if (onEnded) source.addEventListener('ended', onEnded)
    this.source = source
  }

  /**
   * 暂停。
   */
  pause() {
    if (this.audioContext.state === 'running') this.audioContext.suspend()
  }

  /**
   * 恢复。
   */
  resume() {
    if (this.audioContext.state === 'suspended') this.audioContext.resume()
  }

  /**
   * 音量。
   */
  get volume() {
    return this.gain.gain.value
  }

  set volume(value: number) {
    this.gain.gain.value = value
  }

  /**
   * 当前时间码。
   */
  get time() {
    return this.audioContext.currentTime
  }
}

const channels = new Map<string, Channel>()

/**
 * 获取指定通道。
 * @param name 通道名称。
 * @returns 通道。
 */
const getMusicChannel = (name: string): Channel => {
  let channel = channels.get(name)
  if (!channel) {
    channel = new Channel()
    channels.set(name, channel)
  }
  return channel
}

export default getMusicChannel
