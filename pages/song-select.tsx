import getSongList, { ISongMetadata } from '../src/api/getSongList'

import BackgroundImage from '../src/components/BackgroundImage'
import Head from 'next/head'
import LeftArea from '../src/components/LeftArea'
import Loading from '../src/components/Loading'
import type { NextPage } from 'next'
import React from 'react'
import { useRouter } from 'next/router'

const focusItemChange = (state: number, action: number) => {
  return action
}

const getSongItemHeight = (
  item: ISongMetadata | number,
  viewportHeight: number
) => {
  if (typeof item === 'number') return (item * viewportHeight) / 100
  return 80
}

const renderSongItem = (item: ISongMetadata | number, index: number) => {
  if (typeof item === 'number') return <></> // 占位符
  return (
    <div className="-mx-6 px-4">
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
  return (
    <>
      <Head>
        <title>歌曲选择 - PhiCommunity</title>
      </Head>
      {songList === null ? (
        <Loading />
      ) : (
        <LeftArea
          leftRatio={0.4}
          items={songList}
          getHeight={getSongItemHeight}
          renderItem={renderSongItem}
        />
      )}
    </>
  )
}

export default Page
