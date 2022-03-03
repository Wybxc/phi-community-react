import getSongList, { ISongMetadata } from '../src/api/getSongList'

import Back from '../src/components/Back'
import BackgroundImage from '../src/components/BackgroundImage'
import Head from 'next/head'
import Image from 'next/image'
import LeftArea from '../src/components/LeftArea'
import Loading from '../src/components/Loading'
import type { NextPage } from 'next'
import React from 'react'
import { useRouter } from 'next/router'

const getSongItemHeight = (
  item: ISongMetadata | number,
  viewportHeight: number
) => {
  if (typeof item === 'number') return (item * viewportHeight) / 100
  return 80
}

const renderSongItem = (
  item: ISongMetadata | number,
  index: number,
  state: number,
  dispatch: React.Dispatch<number>
) => {
  if (typeof item === 'number') return <></> // 占位符
  return (
    <div
      className={
        '-mx-8 px-6 py-2 my-2 select-none cursor-pointer' +
        (state === index ? ' bg-white text-black' : '')
      }
      onClick={() => dispatch(index)}
    >
      <div className="text-2xl">{item.name}</div>
      <div className="text-xm truncate">{item.artist}</div>
    </div>
  )
}

const Page: NextPage = () => {
  /**
   * 歌曲的元信息(`meta.json`)列表。其中数字表示占位符。
   */
  const [songList, setSongList] = React.useState<
    (ISongMetadata | number)[] | null
  >(null)

  React.useEffect(() => {
    getSongList().then((sl) => setSongList([10, ...sl, 40])) // 在前后添加占位符
  }, [])

  const [active, setActive] = React.useState(1)

  const focusItemChange = (state: number, action: number) => {
    setActive(action)
    return action
  }

  if (songList === null)
    return (
      <>
        <Head>
          <title>加载中 - PhiCommunity</title>
        </Head>
        <Loading />
      </>
    )

  const song = songList[active] as ISongMetadata
  const illustration = `https://cdn.jsdelivr.net/gh/HanHan233/PhiCommunity-Charts-Repo@main/${song.codename}/${song.illustration}`

  return (
    <>
      <Head>
        <title>歌曲选择 - PhiCommunity</title>
      </Head>
      <LeftArea
        leftRatio={0.4}
        items={songList}
        getHeight={getSongItemHeight}
        renderItem={renderSongItem}
        reducer={focusItemChange}
        initState={active}
      />
      <BackgroundImage src={illustration} />
      <Back href="/chapter-select" />
      <div className="fixed illustration">
        <style jsx>{`
          .illustration {
            left: 55%;
            right: 4rem;
            top: 20%;
          }

          @media (max-width: 768px) {
            .illustration {
              right: 2rem;
            }
          }

          @media (max-height: 500px) {
            .illustration {
              top: 10%;
            }
          }
        `}</style>
        <div className="absolute w-full" style={{ paddingBottom: '75%' }}>
          <div>
            <Image
              src={illustration}
              alt="曲绘"
              layout="fill"
              objectFit="cover"
            ></Image>
          </div>
        </div>
      </div>
      <div className="fixed level skew">
        <style jsx>{`
          .level {
            left: 50%;
            right: -10em;
            top: 80%;
          }

          @media (max-height: 500px) {
            .level {
              top: 75%;
            }
          }

          .skew {
            transform: skewX(-10deg);
          }

          .normal {
            transform: skewX(10deg);
          }
        `}</style>
        <ul
          className={`w-full h-full flex flex-row 
          bg-black bg-opacity-50 text-white text-3xl`}
        >
          {['EZ', 'HD', 'IN', 'AT']
            .filter((level) => typeof song[`chart${level}`] !== 'undefined')
            .map((level) => (
              <li key={level} className="flex-none normal px-8 py-4">
                {level}
              </li>
            ))}
        </ul>
      </div>
    </>
  )
}

export default Page
