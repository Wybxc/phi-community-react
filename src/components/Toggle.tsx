import { VscCheck as CheckIcon } from 'react-icons/vsc'
import React from 'react'

export interface IToggleProps {
  className?: string
  style?: React.CSSProperties
  defaultValue?: boolean
  onChange?: (value: boolean) => void
}

/**
 * Phi 风格的开关组件。
 */
const Toggle: React.FC<IToggleProps> = ({
  className,
  style,
  defaultValue = false,
  onChange,
}) => {
  const [value, setValue] = React.useState(defaultValue)

  React.useEffect(() => {
    if (onChange) onChange(value)
  }, [onChange, value])

  return (
    <div
      className={
        'relative bg-black bg-opacity-50' + (className ? ` ${className}` : '')
      }
      style={{
        width: '3rem',
        height: '1.5rem',
        transform: 'skewX(-10deg)',
        ...style,
      }}
      onClick={() => setValue((value) => !value)}
    >
      <div
        className="absolute bg-white cursor-pointer transition-all"
        style={{
          marginTop: '-0.1rem',
          marginLeft: value ? '1.5rem' : '0rem',
          width: '1.5rem',
          height: '1.7rem',
        }}
      ></div>
      <div
        className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-10 transition-opacity"
        style={{
          opacity: value ? 1 : 0,
        }}
      >
        <div className="pt-1 pl-1" style={{ fontSize: '0.9rem' }}>
          <CheckIcon />
        </div>
      </div>
    </div>
  )
}

export default Toggle
