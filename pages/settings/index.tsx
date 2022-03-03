import LeftArea, { noReducer } from '../../src/components/LeftArea'
import settings, { IButtonConfig, IConfig } from '../../src/setting'
import useBlackScene, { BlackScene } from '../../src/components/BlackScene'

import Back from '../../src/components/Back'
import BackgroundImage from '../../src/components/BackgroundImage'
import Head from 'next/head'
import Image from 'next/image'
import type { NextPage } from 'next'
import React from 'react'
import Slider from '../../src/components/Slider'
import Toggle from '../../src/components/Toggle'
import appIcon from '../../public/images/AppIcon.svg'
import getMusicChannel from '../../src/backgroundMusic'
import { useRouter } from 'next/router'
import useUserAgent from '../../src/userAgent'

/**
 * 自动缓存到 localStorage 中的 state。
 * @param codename localStorage 中的 key。
 * @param defaultValue 默认值。
 * @returns [value, setValue]。
 */
const useLocalStorage = <T,>(
  codename: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const storedValue: T | null = JSON.parse(
    (typeof window !== 'undefined' && localStorage.getItem(codename)) || 'null'
  ) // 判断 window 是否存在，用于服务端渲染
  const [value, setValue] = React.useState<T>(storedValue ?? defaultValue)

  React.useEffect(() => {
    localStorage.setItem(codename, JSON.stringify(value))
  }, [codename, value]) // value 变动时写入 localStorage

  return [value, setValue]
}

interface ISliderConfigProps {
  /**
   * 设置项名称。
   */
  title: string
  /**
   * 在 localStorage 中的 key。
   */
  codename: string
  /**
   * 滑动范围。
   */
  range?: [number, number]
  /**
   * 滑动步长。
   */
  step?: number
  /**
   * 按钮控制步长。
   */
  offset?: number
  /**
   * 默认值。
   */
  defaultValue?: number
}

/**
 * 滑条设置组件。
 */
const SliderConfig: React.FC<ISliderConfigProps> = ({
  title,
  codename,
  range: [min, max] = [0, 100],
  step = 1,
  offset = 5,
  defaultValue = 0,
}) => {
  const [value, setValue] = useLocalStorage(codename, defaultValue)
  return (
    <div className="mt-8">
      <div className="pl-2">
        <h3 className="float-left">{title}</h3>
        <p className="float-right">{value}</p>
        <div className="clear-both mb-2" />
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        controlStep={offset}
        defaultValue={value}
        onChange={setValue}
      />
    </div>
  )
}

interface IToggleConfigProps {
  /**
   * 设置项名称。
   */
  title: string
  /**
   * 在 localStorage 中的 key。
   */
  codename: string
  /**
   * 默认值。
   */
  defaultValue?: boolean
}

const ToggleConfig: React.FC<IToggleConfigProps> = ({
  title,
  codename,
  defaultValue = false,
}) => {
  const [value, setValue] = useLocalStorage(codename, defaultValue)
  return (
    <div className="mt-10">
      <div className="float-left">{title}</div>
      <Toggle
        className="float-right"
        defaultValue={value}
        onChange={setValue}
      />
    </div>
  )
}

interface IButtonConfigProps {
  /**
   * 名称。
   */
  title: string
  /**
   * 点击事件。
   */
  onClick: IButtonConfig['onClick']
}

const ButtonConfig: React.FC<IButtonConfigProps> = ({ title, onClick }) => {
  const [inner, setInner] = React.useState<string | React.ReactElement>(title)
  const router = useRouter()
  return (
    <button
      className="mt-10 border-solid border-2"
      onClick={() => onClick(setInner, router)}
    >
      <div className="block p-2">{inner}</div>
    </button>
  )
}

/**
 * 获得每个设置项所占的高度。
 * @param item 设置项。
 * @param viewportHeight 视口高度
 * @returns 柯里化函数，输入 index，返回高度。
 */
const getSettingItemHeight = (item: IConfig, viewportHeight: number) => {
  switch (item.type) {
    case 'toggle':
      return 65
    case 'slide':
      return 90
    case 'button':
      return 80
    case 'placeholder':
      return (item.height * viewportHeight) / 100
    default:
      return 65
  }
}

/**
 * 渲染设置项。
 * @param item 设置项。
 */
const renderSettingItem = (item: IConfig) => {
  switch (item.type) {
    case 'slide':
      return <SliderConfig {...item} />
    case 'toggle':
      return <ToggleConfig {...item} />
    case 'button':
      return <ButtonConfig {...item} />
  }
  return <div />
}

const Page: NextPage = () => {
  const { version, device } = useUserAgent()
  // 背景音乐
  React.useEffect(() => {
    const channel = getMusicChannel('background')
    channel.pause()
  }, [])

  // 黑场淡入
  const [_, hideBlackScene, blackSceneProps] = useBlackScene(true)

  React.useEffect(() => {
    const timeout = setTimeout(hideBlackScene, 0)
    return () => clearTimeout(timeout)
  }, [hideBlackScene])

  return (
    <>
      <Head>
        <title>设置 - PhiCommunity</title>
      </Head>

      <BackgroundImage filter="blur(10px)" />
      <BlackScene {...blackSceneProps} />

      <Back href="/chapter-select" />
      <LeftArea
        leftRatio={0.4}
        items={settings}
        getHeight={getSettingItemHeight}
        renderItem={renderSettingItem}
        {...noReducer}
      />
      <div className="fixed w-full h-full flex flex-col pointer-events-none">
        <div style={{ flex: '0 1 40%' }} /> {/* 上方空间 */}
        <div className=" flex-none text-center flex flex-row">
          <div style={{ flex: '1 0 45%' }} /> {/* 左侧空间 */}
          <div className="flex-none">
            <div>
              <Image src={appIcon} className="inline-block" alt="Logo" />
            </div>
            <div className="w-96">
              <p>PhiCommunity-React</p>
              <p>版本：{version}</p>
              <p>设备平台: {device}</p>
              <p>
                注意：此项目与厦门鸽游网络有限公司(Xiamen Pigeon Games Network
                Co., Ltd.)没有任何关系。
              </p>
            </div>
          </div>
          <div style={{ flex: '1 0 10%' }} /> {/* 右侧空间 */}
        </div>
        <div style={{ flex: '0 1 50%' }} /> {/* 下方空间 */}
      </div>
    </>
  )
}

export default Page
