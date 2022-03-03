import useBlackScene, { BlackScene } from '../src/components/BlackScene'

import BackgroundImage from '../src/components/BackgroundImage'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import type { NextPage } from 'next'
import React from 'react'
import getMusicChannel from '../src/backgroundMusic'
import showGirl from '../public/images/showgirl_Half.png'

interface IButtonProps {
  href: string
}

const Button: React.FC<IButtonProps> = ({ children, href }) => {
  return (
    <Link href={href} passHref>
      <button className="w-full h-full bg-black bg-opacity-50 shadow-xl">
        {children}
      </button>
    </Link>
  )
}

const Page: NextPage = () => {
  // 黑场淡入
  const [_, hideBlackScene, blackSceneProps] = useBlackScene(true)
  React.useEffect(() => {
    const timeout = setTimeout(hideBlackScene, 0)
    return () => clearTimeout(timeout)
  }, [hideBlackScene])

  // 背景音乐
  React.useEffect(() => {
    const channel = getMusicChannel('background')
    channel.fetchAndPlay('/audio/ChapterSelect.mp3')
  }, [])

  return (
    <>
      <Head>
        <title>主界面 - PhiCommunity</title>
      </Head>

      <BackgroundImage filter="" />
      <BlackScene {...blackSceneProps} />

      <div className="fixed bottom-0 left-10 w-1/2 h-4/5">
        <Image src={showGirl} alt="看板娘" layout="fill" objectFit="contain" />
      </div>

      <style jsx>{`
        .right-area {
          top: 10%;
          bottom: 10%;
          left: 50%;
          right: 5%;
          transform: perspective(50vw) rotateY(-15deg);
        }
        @media (min-width: 900px) {
          .right-area {
            right: 10%;
          }
        }
      `}</style>

      <div
        className={`fixed right-area
        grid grid-cols-2 grid-rows-5 gap-4 
        justify-items-stretch justify-center
        text-white`}
      >
        <div className="col-span-2 row-span-2 text-5xl">
          <Button href="/song-select">开始游玩</Button>
        </div>
        <div className="col-span-2 row-span-2 text-4xl">
          <Button href="/cache-control">缓存管理</Button>
        </div>
        <div className="col-span-1 text-3xl md:text-4xl">
          <Button href="/settings">设置</Button>
        </div>
        <div className="col-span-1 text-3xl md:text-4xl">
          <Button href="https://github.com/HanHan233/PhiCommunity-Charts-Repo">
            上传谱面
          </Button>
        </div>
      </div>
    </>
  )
}

export default Page
