import { VscCheck as CheckIcon } from 'react-icons/vsc'
import { NextRouter } from 'next/router'
import React from 'react'

export interface ISlideConfig {
  type: 'slide'
  title: string
  codename: string
  range: [number, number]
  defaultValue: number
  offset?: number
}

export interface IToggleConfig {
  type: 'toggle'
  title: string
  codename: string
  defaultValue?: boolean
}

export interface IButtonConfig {
  type: 'button'
  title: string
  onClick: (
    setInner: React.Dispatch<React.SetStateAction<string | React.ReactElement>>,
    router: NextRouter
  ) => void
}

export interface IPlaceholderConfig {
  type: 'placeholder'
  height: number
}

export type IConfig =
  | ISlideConfig
  | IToggleConfig
  | IButtonConfig
  | IPlaceholderConfig

const settings: IConfig[] = [
  {
    type: 'placeholder',
    height: 5, // 防止最上面的选项跑出屏幕
  },
  {
    type: 'slide',
    title: '谱面延时(ms)',
    codename: 'input-offset',
    range: [-500, 500],
    defaultValue: 0,
    offset: 5,
  },
  {
    type: 'button',
    title: '根据声音调整偏移率',
    onClick(_, router) {
      router.push('/settings/calibrate')
    },
  },
  {
    type: 'placeholder',
    height: 2,
  },
  {
    type: 'slide',
    title: '按键缩放',
    codename: 'select-scale-ratio',
    range: [1, 5],
    defaultValue: 3,
  },
  {
    type: 'slide',
    title: '背景亮度',
    codename: 'select-global-alpha',
    range: [1, 5],
    defaultValue: 3,
  },
  {
    type: 'toggle',
    title: '开启多押辅助',
    codename: 'highLight',
    defaultValue: true,
  },
  {
    type: 'toggle',
    title: '开启打击音效',
    codename: 'hitSong',
    defaultValue: true,
  },
  {
    type: 'toggle',
    title: '游玩时自动全屏',
    codename: 'autoFullscreen',
    defaultValue: true,
  },
  {
    type: 'toggle',
    title: '开启FC/AP指示器',
    codename: 'lineColor',
  },
  //下面就是模拟器其他的功能了
  {
    type: 'toggle',
    title: '使用游玩友好型Note',
    codename: 'usePlayerFriendlyUI',
  },
  {
    type: 'slide',
    title: '界面宽高比',
    codename: 'select-aspect-ratio',
    range: [1, 8],
    defaultValue: 8,
  },
  {
    type: 'button',
    title: '界面宽高比数值说明',
    onClick() {
      alert(
        `1=>5:4     (1.25)
2=>4:3     (1.333333)
3=>10:7   (1.428571)
4=>19:13 (1.461538)
5=>8:5     (1.6)
6=>5:3     (1.666667)
7=>22:13 (1.692308)
8=>16:9   (1.777778)`
      )
    },
  },
  {
    type: 'placeholder',
    height: 2,
  },
  {
    type: 'toggle',
    title: '开启HyperMode',
    codename: 'hyperMode',
  },
  {
    type: 'toggle',
    title: '启用旧版本打歌界面UI',
    codename: 'useOldUI',
  },
  {
    type: 'toggle',
    title: '背景模糊显示',
    codename: 'imageBlur',
    defaultValue: true,
  },
  // {
  // 	type: 'toggle',
  // 	title: '显示过渡动画',
  // 	codename: 'showTransition',
  // },
  {
    type: 'toggle',
    title: '启用AutoPlay',
    codename: 'autoplay',
  },
  {
    type: 'toggle',
    title: '开启触摸反馈',
    codename: 'feedback',
  },
  {
    type: 'toggle',
    title: '显示定位点',
    codename: 'showPoint',
  },
  // {
  // 	type: 'button',
  // 	title: '观看教学',
  // 	onClick() {
  // 		location.href = '../whilePlaying/index.html?play=introduction&l=ez&c=official';
  // 	},
  // },
  {
    type: 'button',
    title: '关于我们',
    onClick(_, router) {
      // router.push('/about')
      window.location.href = 'https://phi.han-han.xyz/aboutUs/index.html'
    },
  },
  {
    type: 'button',
    title: '清除全部数据',
    onClick(_, router) {
      window.localStorage.clear()
      router.reload()
    },
  },
  {
    type: 'button',
    title: '导出本地数据到剪贴板',
    onClick(setInner) {
      navigator.clipboard.writeText(JSON.stringify(localStorage))
      setInner(
        <span>
          <CheckIcon className="inline" /> 成功
        </span>
      )
      const timeout = setTimeout(() => {
        setInner('导出本地数据到剪贴板')
        clearTimeout(timeout)
      }, 2000)
    },
  },
  {
    type: 'button',
    title: '从剪贴板导入数据',
    onClick(setInner, router) {
      navigator.clipboard.readText().then((clipText) => {
        try {
          const clipTextObj = JSON.parse(clipText)
          const clipTextObjKeys = Object.keys(clipTextObj)
          for (const keys in clipTextObjKeys) {
            console.log(keys, clipTextObj[keys])
            localStorage.setItem(
              clipTextObjKeys[keys],
              clipTextObj[clipTextObjKeys[keys]]
            )
          }
          setInner(
            <span>
              <CheckIcon className="inline" /> 成功
            </span>
          )
          const timeout = setTimeout(() => {
            setInner('从剪贴板导入数据')
            clearTimeout(timeout)
          }, 2000)
          router.reload() // 重新加载
        } catch (error) {
          alert('导入失败，请检查剪贴板内容是否正确!\n' + error)
        }
      })
    },
  },
  {
    type: 'placeholder',
    height: 40, // 保证最下面的选项可以露出来
  },
]

export default settings
