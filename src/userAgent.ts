import React from 'react'
import parseUserAgent from 'ua-parser-js'

/**
 * 分析获取 UserAgent 中的信息。
 */
const useUserAgent = () => {
  const [version, setVersion] = React.useState('未获取/获取失败')
  const [device, setDevice] = React.useState('未获取/获取失败')

  React.useEffect(() => {
    const getVersion = async () => {
      const response = await fetch(
        'https://api.github.com/repos/Wybxc/PhiCommunity/commits?per_page=1'
      )
      const json = await response.json()
      if (json[0]) setVersion(json[0].sha.slice(0, 7))
    }
    getVersion()
  }, [])

  React.useEffect(() => {
    const userAgentData = parseUserAgent(navigator.userAgent)
    setDevice(
      `Platform: ${userAgentData.os.name}; Device: ${userAgentData.device.type}`
    )
  }, [])

  return { version, device }
}

export default useUserAgent
