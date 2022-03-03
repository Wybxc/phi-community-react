import React, { HTMLAttributes } from 'react'

import BackgroundImage from '../src/components/BackgroundImage'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import type { NextPage } from 'next'

const Button: React.FC<HTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button
      className="border p-4 m-2 font-bold"
      style={{ fontSize: '1.1rem' }}
      {...props}
    >
      {children}
    </button>
  )
}

const Popup: React.FC<{ open: boolean; close: () => any }> = ({
  open,
  close,
  children,
}) => {
  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes slideDown {
          from {
            transform: translateY(-10%);
            opacity: 0.3;
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
      <div
        style={{
          display: open ? 'block' : 'none',
          animation: 'fadeIn 0.5s ease',
        }}
        className="w-screen h-screen fixed top-0 left-0 z-50 bg-white bg-opacity-40"
        onClick={close}
      >
        <div
          className="absolute top-10 sm:top-20 bottom-16 sm:bottom-36 inset-x-8 sm:inset-x-16 bg-white py-8 flex flex-col items-center p-4"
          style={{
            animation: 'slideDown 0.5s ease',
          }}
        >
          {children}
        </div>
        <p className="absolute bottom-4 sm:bottom-20 inset-x-0 text-white text-center m-4">
          点击区域外任意处关闭
        </p>
      </div>
    </>
  )
}

const Index: NextPage = () => {
  const [showChangeLog, setShowChangeLog] = React.useState(false)
  const [showDevRequirement, setShowDevRequirement] = React.useState(false)

  return (
    <div className="overflow-hidden">
      <Head>
        <title>准备开始……</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BackgroundImage filter="contrast(0.6) brightness(0.6)" />
      <main className="w-screen h-screen px-20 py-16">
        <div className="container h-full flex flex-col justify-center items-center border-y-2 text-white">
          <h1 className="text-4xl font-bold my-6">准备开始……</h1>
          <p>
            在开始前，请先调整好设备音量，下方是一段测试音频，点击左侧的三角形以开始播放。
          </p>
          <audio src="/audio/TapToStart.mp3" controls className="my-8"></audio>
          <p>
            顺带一提，由于本项目变更较为频繁，所以可能在某些时候可能需要您清除浏览器缓存来修复一些错误。
          </p>
          <div className="mt-4 container flex flex-row flex-wrap justify-center">
            <Link href="/tap-to-start" passHref>
              <Button
                onClick={() => {
                  try {
                    document.documentElement.requestFullscreen?.()
                    screen.orientation?.lock('landscape')
                  } catch (_) {}
                }}
              >
                开始游玩
              </Button>
            </Link>
            <Button onClick={() => alert('尚未实现')}>添加到主屏幕</Button>
          </div>
          <div className="container flex flex-row flex-wrap justify-center">
            <Link href="https://github.com/Wybxc/PhiCommunity" passHref>
              <Button>查看GitHub仓库</Button>
            </Link>
            <Button onClick={() => setShowChangeLog(true)}>查看变更记录</Button>
            <Button onClick={() => setShowDevRequirement(true)}>
              设备要求
            </Button>
          </div>
        </div>
      </main>
      <Popup open={showChangeLog} close={() => setShowChangeLog(false)}>
        <h2 className="text-2xl font-bold mb-8">变更记录(仅显示最近30次)</h2>
        <a
          href="https://github.com/HanHan233/PhiCommunity/commits/main"
          className="no-underline border-b border-dotted border-gray-700 my-8"
          target="_blank"
          rel="noreferrer"
        >
          点击此处查看所有提交
        </a>
        <Image
          src="https://repobeats.axiom.co/api/embed/8d2203c93b7bb141dff3abc99bd0d0b3a58d85f9.svg"
          alt="变更情况总览"
          width={813}
          height={320}
        />
        <br />
        <br />
      </Popup>
      <Popup
        open={showDevRequirement}
        close={() => setShowDevRequirement(false)}
      >
        <h2 className="text-2xl font-bold mb-8">设备要求</h2>
        <table className="table-auto border-collapse">
          <tr>
            <td className="border border-gray-400 p-1">Windows</td>
            <td className="border border-gray-400 p-1">
              Chromium内核为90以上(经测试测试MSEdge
              98无问题)，FireFox内核90+(经测试测试FireFox98(Iceraven
              1.15)无问题)
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-1">Android</td>
            <td className="border border-gray-400 p-1">
              Chromium内核为90以上(经测试测试MSEdge
              97无问题)，FireFox内核90+(经测试测试FireFox98无问题)
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-1">iOS</td>
            <td className="border border-gray-400 p-1">
              iOS版本15以上，由于Apple系统限制，您无法通过安装其他浏览器解决问题
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-1">MacOS</td>
            <td className="border border-gray-400 p-1">
              Safari版本15以上，或者安装其他浏览器，要求参见Windows部分
            </td>
          </tr>
        </table>
      </Popup>
    </div>
  )
}

export default Index
