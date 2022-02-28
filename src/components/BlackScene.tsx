import React from 'react'

export interface IBlackSceneProps {
  opacity: number
  duration: number
}

const useBlackScene = (
  show: boolean,
  duration: number = 500
): [() => Promise<void>, () => Promise<void>, IBlackSceneProps] => {
  const [opacity, setOpacity] = React.useState(show ? 1 : 0)

  const showBlackScene = async () => {
    setOpacity(1)
    await new Promise((resolve) => setTimeout(resolve, duration))
  }

  const hideBlackScene = async () => {
    setOpacity(0)
    await new Promise((resolve) => setTimeout(resolve, duration))
  }

  return [showBlackScene, hideBlackScene, { opacity, duration }]
}

export const BlackScene: React.FC<IBlackSceneProps> = ({
  opacity,
  duration,
}) => {
  return (
    <div
      className="fixed w-full h-full bg-black z-50 transition-opacity ease-in-out"
      style={{
        opacity,
        transitionDuration: `${duration}ms`,
        pointerEvents: opacity > 0 ? 'auto' : 'none',
      }}
    ></div>
  )
}
export default useBlackScene
