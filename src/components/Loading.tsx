import BackgroundImage from './BackgroundImage'
import React from 'react'
import tips from '../tips.json'

/**
 * 加载页面。
 */
const Loading: React.FC = () => {
  const randomIndex = React.useMemo(
    () => Math.floor(Math.random() * tips.length),
    []
  )
  return (
    <>
      <BackgroundImage filter="blur(1px) brightness(0.9)" zIndex={10} />
      <div
        className="fixed left-4 bottom-4 w-3/4 text-white z-20"
        style={{
          textShadow: '0 0 5px #000',
        }}
      >
        Tip: {tips[randomIndex]}
      </div>
      <style jsx>{`
        @keyframes loadingBarBGAnim {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }
      `}</style>
      <div className="fixed right-4 bottom-4 z-20">
        <div className="absolute w-full h-full overflow-hidden">
          <div
            className="absolute w-full h-full bg-white"
            style={{
              animation: 'loadingBarBGAnim 1s linear infinite',
            }}
          ></div>
        </div>
        <div className="mix-blend-difference text-white px-1">Loading...</div>
      </div>
    </>
  )
}
export default Loading
