import Image from 'next/image'
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
  /**
   * 图像的 zIndex。
   */
  zIndex?: number
}

/**
 * 背景图像。
 * @param props 属性。
 */
const BackgroundImage: React.FC<IBackgroundImageProps> = ({
  src = '/images/ElementSqare.Half.Size.webp',
  filter = 'blur(10px) brightness(0.5)',
  zIndex = -10,
}) => {
  return (
    <div
      className="fixed w-full h-full left-0 top-0 pointer-events-none transition-all duration-300 ease-in-out"
      style={{ zIndex: zIndex, filter: filter }}
    >
      <Image src={src} layout="fill" objectFit="cover" alt="背景图片" />
    </div>
  )
}

export default BackgroundImage
