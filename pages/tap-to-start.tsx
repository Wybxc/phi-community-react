import useBlackScene, { BlackScene } from '../src/components/BlackScene'

import BackgroundImage from '../src/components/BackgroundImage'
import Head from 'next/head'
import Image from 'next/image'
import type { NextPage } from 'next'
import React from 'react'
import getMusicChannel from '../src/backgroundMusic'
import { useRouter } from 'next/router'
import useUserAgent from '../src/userAgent'

const Page: NextPage = () => {
  const { version, device } = useUserAgent()
  const [showBlackScene, _, blackSceneProps] = useBlackScene(false)
  const router = useRouter()

  // 背景音乐
  React.useEffect(() => {
    const channel = getMusicChannel('background')
    channel.fetchAndPlay('/audio/TapToStart.mp3')
  }, [])

  return (
    <>
      <Head>
        <title>点按以开始 - PhiCommunity</title>
      </Head>
      <BackgroundImage />
      <BlackScene {...blackSceneProps} />
      <main className="fixed w-full h-full text-white">
        <style jsx>{`
          @keyframes flash {
            40% {
              opacity: 0.3;
            }
            60% {
              opacity: 1;
            }
          }
        `}</style>
        <div
          className="fixed w-full h-full flex flex-col justify-center justify-items-center"
          onClick={async () => {
            await showBlackScene()
            // if (window.localStorage.length == 0) {
            //   router.push('/settings')
            // } else {
            //   router.push('/chapter-select')
            // }
            router.push('/settings')
          }}
        >
          <Image
            src="/images/Title.svg"
            alt="PhiCommunity"
            className="h-1/5 w-auto object-scale-down pointer-events-none"
            width="555px"
            height="187px"
          />
          <div
            className="m-10 text-center cursor-default pointer-events-none"
            style={{
              letterSpacing: '0.5em',
              animation: 'flash 5s ease infinite',
            }}
          >
            点击屏幕开始
          </div>
        </div>
        <div className="fixed bottom-0 w-full text-center">
          <p>版本：{version}</p>
          <p>设备平台: {device}</p>
          <p>
            注意：此项目与厦门鸽游网络有限公司(Xiamen Pigeon Games Network Co.,
            Ltd.)没有任何关系。
          </p>
        </div>
      </main>
    </>
  )
}

export default Page
