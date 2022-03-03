interface IFileSchema {
  type: 'file'
  name: string
  hash: string
  time: string
  size: number
}

interface IDirectorySchema {
  type: 'directory'
  name: string
  files: (IFileSchema | IDirectorySchema)[]
}

interface IPackageSchema {
  default: string | null
  files: (IFileSchema | IDirectorySchema)[]
}

export interface ISongMetadata {
  name: string
  codename: string
  artist: string
  musicFile: string
  illustration: string
  chartDesigner: string
  illustrator: string
  sliceAudioStart: string
  [key: string]: string
}

/**
 * 获取曲目列表。
 */
const getSongList = async () => {
  const response = await fetch(
    'https://data.jsdelivr.com/v1/package/gh/HanHan233/PhiCommunity-Charts-Repo@main/tree'
  )
  const charts: IPackageSchema = await response.json()
  const folders = charts.files
    .map((dir: IFileSchema | IDirectorySchema) => {
      if (dir.type !== 'directory' || dir.name.charAt(0) === '.') return null
      return dir.name
    })
    .filter((x) => x !== null) as string[]
  const songsResponse = await Promise.all(
    folders.map((folder) =>
      fetch(
        `https://cdn.jsdelivr.net/gh/HanHan233/PhiCommunity-Charts-Repo@main/${folder}/meta.json`
      )
    )
  )
  const songsMetadata = (await Promise.all(
    songsResponse.map((response) => response.json())
  )) as ISongMetadata[]
  return songsMetadata
}

export default getSongList
