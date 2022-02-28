/**
 * 背景图像属性。
 */
export interface IBackgroundImageProps {
  /**
   * 图像的 URL。
   */
  src?: string
  /**
   * 图像的滤镜。
   */
  filter?: string
}

/**
 * 背景图像。
 * @param props 属性。
 */
const BackgroundImage: React.FC<IBackgroundImageProps> = ({
  src = '/images/ElementSqare.Half.Size.webp',
  filter = 'blur(10px) brightness(0.5)',
}) => {
  return (
    <div
      className="fixed w-full h-full left-0 top-0 pointer-events-none transition-all duration-300 ease-in-out"
      style={{
        background: `#999 url(${src}) center center no-repeat fixed`,
        backgroundSize: 'cover',
        filter: filter,
        zIndex: -10,
      }}
    ></div>
  )
}

export default BackgroundImage
