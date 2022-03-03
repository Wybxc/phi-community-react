import getMusicChannel, { Channel } from '../../src/backgroundMusic'

import BackgroundImage from '../../src/components/BackgroundImage'
import Head from 'next/head'
import type { NextPage } from 'next'
import React from 'react'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
  const router = useRouter()
  // 偏移调整音乐
  const musicRef = React.useRef<string>()
  const channelRef = React.useRef<Channel>()
  React.useEffect(() => {
    const fetchMusic = async () => {
      const response = await fetch('/audio/Calibrate.mp3')
      musicRef.current = URL.createObjectURL(await response.blob())
      channelRef.current = getMusicChannel('calibrate')
    }
    fetchMusic()
  }, [])

  /**
   * 调整音频开始的时间码，null 表示未开始或已结束。
   */
  const [calibrateStartTime, setCalibrateStartTime] = React.useState<
    number | null
  >(null)
  /**
   * 开始按钮。
   */
  const start = async () => {
    const music = musicRef.current
    const channel = channelRef.current
    if (!music || !channel) {
      alert('校准音频尚在加载中，请稍后……')
      return
    }

    await channel.fetchAndPlay(music, false, true, () => {
      // 播放结束时
      setCalibrateStartTime(null)
    })
    setCalibrateStartTime(channel.time)
  }

  type sn = number | null
  type sn4 = [sn, sn, sn, sn]
  const [calibrateResult, setCalibrateResult] = React.useState<sn4>([
    null,
    null,
    null,
    null,
  ])
  /**
   * 校准点击按钮。
   */
  const calibrate = React.useCallback(() => {
    const channel = channelRef.current
    if (!channel || calibrateStartTime === null) {
      return
    }
    const currentTime = channel.time - calibrateStartTime

    let stage = 1
    if (currentTime > 0 && currentTime <= 2.2) stage = 1
    if (currentTime > 2.2 && currentTime <= 4.2) stage = 2
    if (currentTime > 4.2 && currentTime <= 6.2) stage = 3
    if (currentTime > 6.2 && currentTime <= 8.2) stage = 4

    const result = [...calibrateResult] as sn4 // 复制一份
    result[stage - 1] = Math.round((currentTime - stage * 2) * 1000)
    setCalibrateResult(result)
  }, [calibrateResult, calibrateStartTime])

  /**
   * 键盘是否已经按下。
   */
  const keyDownRef = React.useRef(false)
  React.useEffect(() => {
    const onKeyDown = () => {
      if (calibrateStartTime !== null && !keyDownRef.current) calibrate()
      keyDownRef.current = true
    }
    const onKeyUp = () => {
      keyDownRef.current = false
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
    }
  }, [calibrate, calibrateStartTime])

  /**
   * 完成按钮。
   */
  const finish = () => {
    if (!channelRef.current) {
      return
    }
    const channel = channelRef.current
    channel.pause()
    setCalibrateStartTime(null)

    const results = calibrateResult.filter((v) => v !== null) as number[]
    const result =
      results.length > 0
        ? Math.round(results.reduce((a, b) => a + b, 0) / results.length)
        : 0
    const save = confirm(
      `谱面延时即将被设置为 ${result} 毫秒。
是否确认？
单击“取消”以继续而不保存。`
    )
    if (save) {
      localStorage.setItem('input-offset', JSON.stringify(result))
    }
    router.push('/settings')
  }

  return (
    <>
      <Head>
        <title>偏移率设置 - PhiCommunity</title>
      </Head>

      <BackgroundImage filter="blur(10px)" />

      <style jsx>{`
        .skew {
          transform: skewX(-10deg);
        }
        .norm {
          transform: skewX(10deg);
        }
      `}</style>
      <div className="fixed w-full h-full skew flex flex-row justify-center items-center text-center">
        <div className="flex-none flex flex-col bg-black bg-opacity-50 text-white ">
          <div className="bg-black bg-opacity-50 text-lg py-4">
            <p className="norm">偏移率设置</p>
          </div>
          <div className="border-y-2 py-6 px-8">
            <div className="description text-sm norm">
              <p className="text-base">在每个第三拍点击按钮</p>
              <p>
                本结果仅供参考，实际效果可能会有所不同(触摸屏延迟可能需要手动调低)
              </p>
              <p>不同设备(键盘/鼠标/触摸)的结果可能会有所不同</p>
            </div>
            <button
              className="mt-8 mb-4 px-4 py-2 text-lg border-white border-2 norm"
              onClick={calibrate}
              disabled={calibrateStartTime === null}
            >
              点击
            </button>
            <div
              className="flex flex-row justify-center items-center text-black"
              style={{ lineHeight: '2rem' }}
            >
              <div className="bg-white bg-opacity-50 w-12 h-8 shadow-inner mx-1">
                <p className="norm">{calibrateResult[0] ?? '-'}</p>
              </div>
              <div className="bg-white bg-opacity-50 w-12 h-8 shadow-inner mx-1">
                <p className="norm">{calibrateResult[1] ?? '-'}</p>
              </div>
              <div className="bg-white bg-opacity-50 w-12 h-8 shadow-inner mx-1">
                <p className="norm">{calibrateResult[2] ?? '-'}</p>
              </div>
              <div className="bg-white bg-opacity-50 w-12 h-8 shadow-inner mx-1">
                <p className="norm">{calibrateResult[3] ?? '-'}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row text-white text-lg">
            <button
              className="flex-1 py-2 border-white border-r"
              onClick={start}
              disabled={calibrateStartTime !== null}
            >
              <p className="norm">开始</p>
            </button>
            <button
              className="flex-1 py-2 border-white border-l"
              onClick={finish}
            >
              <p className="norm">完成</p>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
