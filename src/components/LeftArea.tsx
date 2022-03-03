import { VariableSizeList as List } from 'react-window'
import React from 'react'

const sin10 = Math.sin((10 / 180) * Math.PI)
const cos10 = Math.cos((10 / 180) * Math.PI)

interface IViewportSize {
  viewportHeight: number
  viewportWidth: number
}

interface ILeftAreaProps<T, TState, TAction> {
  /**
   * 左栏占屏幕宽度的比例。
   */
  leftRatio: number
  /**
   * 左栏中的项。
   */
  items: T[]
  /**
   * 计算项的高度的函数。
   */
  getHeight: (item: T, viewportHeight: number) => number
  /**
   * 渲染项的函数。
   */
  renderItem: (
    item: T,
    index: number,
    state: TState,
    dispatch: React.Dispatch<TAction>
  ) => React.ReactElement | null
  reducer: React.Reducer<TState, TAction>
  initState: TState
}

const ListItem: React.FC<{
  width: number
  style: React.CSSProperties
}> = ({ children, width, style }) => {
  return (
    <div style={style}>
      <div className="px-4" style={{ width, transform: 'rotate(-10deg)' }}>
        {children}
      </div>
    </div>
  )
}

const LeftAreaContent = <T, TState, TAction>({
  viewportHeight,
  viewportWidth,
  leftRatio,
  items,
  getHeight,
  renderItem,
  reducer,
  initState,
}: ILeftAreaProps<T, TState, TAction> & IViewportSize) => {
  const [state, dispatch] = React.useReducer<React.Reducer<TState, TAction>>(
    reducer,
    initState
  )
  const heightGetter = React.useCallback(
    (index: number) => getHeight(items[index], viewportHeight),
    [items, getHeight, viewportHeight]
  )

  const itemRenderer = React.useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const item = renderItem(items[index], index, state, dispatch)
      return item ? (
        <ListItem style={style} width={leftRatio * viewportWidth}>
          {item}
        </ListItem>
      ) : null
    },
    [items, leftRatio, renderItem, state, viewportWidth]
  )

  const left = -leftRatio * viewportWidth * sin10

  return (
    <div
      className="fixed left-0 top-0 bg-black bg-opacity-50 text-white"
      style={{
        transform: `translate(15vw, ${left}px) rotate(10deg)`,
        transformOrigin: 'top left',
      }} // 左边栏倾斜
    >
      <div
        className="overflow-hidden"
        style={{ width: leftRatio * viewportWidth }}
      >
        <List
          height={
            viewportHeight / cos10 + leftRatio * viewportWidth * sin10 + 20
          }
          itemCount={items.length}
          itemSize={heightGetter}
          width={leftRatio * viewportWidth + 20 /* +20 为了隐藏滚动条 */}
        >
          {itemRenderer}
        </List>
      </div>
    </div>
  )
}

/**
 * 10deg 倾斜的左栏。
 */
const LeftArea = <T, TState, TAction>(
  props: ILeftAreaProps<T, TState, TAction>
) => {
  const [viewportSize, setViewportSize] = React.useState<IViewportSize | null>(
    null
  )
  React.useEffect(() => {
    const onResize = () =>
      setViewportSize({
        viewportHeight: window.innerHeight,
        viewportWidth: window.innerWidth,
      })

    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, []) // 延迟获取 window.viewportHeight，用于服务端渲染

  return <>{viewportSize && <LeftAreaContent {...props} {...viewportSize} />}</>
}

export default LeftArea

export const noReducer = {
  reducer: (s: null) => s,
  initState: null,
}
