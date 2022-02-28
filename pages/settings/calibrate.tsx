import BackgroundImage from '../../src/components/BackgroundImage'
import Head from 'next/head'
import type { NextPage } from 'next'
import React from 'react'

const Page: NextPage = () => {
  React.useEffect(() => {}, [])
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
            <button className="mt-8 mb-4 px-4 py-2 text-lg border-white border-2 norm">
              点击
            </button>
            <div
              className="flex flex-row justify-center items-center text-black"
              style={{ lineHeight: '2rem' }}
            >
              <div className="bg-white bg-opacity-50 w-12 h-8 shadow-inner mx-1">
                <p className="norm">10</p>
              </div>
              <div className="bg-white bg-opacity-50 w-12 h-8 shadow-inner mx-1">
                <p className="norm">-10</p>
              </div>
              <div className="bg-white bg-opacity-50 w-12 h-8 shadow-inner mx-1">
                <p className="norm">101</p>
              </div>
              <div className="bg-white bg-opacity-50 w-12 h-8 shadow-inner mx-1">
                <p className="norm">-</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row text-white text-lg">
            <button className="flex-1 py-2 border-white border-r">
              <p className="norm">开始</p>
            </button>
            <button className="flex-1 py-2 border-white border-l">
              <p className="norm">完成</p>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
