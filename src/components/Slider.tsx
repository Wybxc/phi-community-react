import RCSlider from 'rc-slider'
import React from 'react'

export interface ISliderProps {
  className?: string
  style?: React.CSSProperties
  min?: number
  max?: number
  step?: number
  controlStep?: number
  defaultValue?: number
  onChange?: (value: number) => void
}

/**
 * Phi 风格的滑块组件。
 */
const Slider: React.FC<ISliderProps> = ({
  className,
  style,
  min = 0,
  max = 100,
  step = 1,
  controlStep = 5,
  defaultValue = 0,
  onChange,
}) => {
  const [value, setValue] = React.useState(defaultValue)

  React.useEffect(() => {
    if (onChange) onChange(value)
  }, [onChange, value])

  const add = () => setValue((value) => value + controlStep)
  const minus = () => setValue((value) => value - controlStep)

  return (
    <div
      className={
        'container flex flex-row flex-nowrap' +
        (className ? ` ${className}` : '')
      }
      style={{
        transform: 'skewX(-10deg)',
        ...style,
      }}
    >
      <div
        className="flex-none bg-white text-black z-10 cursor-pointer"
        style={{
          width: '2rem',
          height: '2.2rem',
          marginTop: '-0.1rem',
        }}
        onClick={minus}
      >
        <p
          className="text-center select-none"
          style={{
            fontSize: '1.4rem',
            lineHeight: '2rem',
            transform: 'skewX(10deg)',
          }}
        >
          -
        </p>
      </div>
      <RCSlider
        min={min}
        max={max}
        step={step}
        defaultValue={defaultValue}
        value={value}
        onChange={setValue}
        className="flex-1 relative w-full" // 为了使 handle 定位的基准是 slider，而不是外部元素
        style={{
          touchAction: 'none',
          height: '2rem',
        }}
        railStyle={{
          backgroundColor: 'black',
          opacity: 0.5,
          width: '100%',
          height: '100%',
        }}
        trackStyle={{
          display: 'none',
        }}
        handleStyle={{
          position: 'absolute',
          height: '2.2rem',
          width: '2.2rem',
          backgroundColor: 'white',
          top: '-0.1rem',
          outline: 'none',
          cursor: 'pointer',
        }}
      />
      <div
        className="flex-none bg-white text-black z-10 cursor-pointer"
        style={{
          width: '2rem',
          height: '2.2rem',
          marginTop: '-0.1rem',
        }}
        onClick={add}
      >
        <p
          className="text-center select-none"
          style={{
            fontSize: '1.3rem',
            lineHeight: '2.2rem',
            transform: 'skewX(10deg)',
          }}
        >
          +
        </p>
      </div>
    </div>
  )
}

export default Slider
