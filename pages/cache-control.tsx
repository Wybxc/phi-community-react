import type { NextPage } from 'next'
import React from 'react'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
  const router = useRouter()
  React.useEffect(() => {
    alert('尚未完成')
    router.back()
  }, [router])
  return <></>
}

export default Page
