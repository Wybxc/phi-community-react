import { VscArrowLeft as ArrowLeftIcon } from 'react-icons/vsc'
import Link from 'next/link'
import { useRouter } from 'next/router'

export interface IBackProps {
  href?: string
}

const Back: React.FC<IBackProps> = ({ href }) => {
  const router = useRouter()

  const inner = (
    <div className="h-full w-full text-4xl pl-3">
      <ArrowLeftIcon className="text-white inline-block" />
    </div>
  )

  const boxClassName =
    'fixed top-2 left-0 w-16 h-12 bg-black bg-opacity-75 border-white border-r-4 cursor-pointer'

  return href ? (
    <div className={boxClassName}>
      <Link href={href}>{inner}</Link>
    </div>
  ) : (
    <div className={boxClassName} onClick={() => router.back()}>
      {inner}
    </div>
  )
}

export default Back
