interface trackInterface {
    type: string
    name: string
    size: number
}

interface importFilesInterface {
    type: string
    file: FileSystemFileHandle
}

interface storeFileInterface {
    id: string
    file: File
    tags: unknown
    cover: Blob
}

interface legacyFileWrapper {
    type: 'file'
    file: File
}

export type FileLegacy = legacyFileWrapper
export type Track = trackInterface
export type storeFile = storeFileInterface
export type importFiles =  Array<importFilesInterface> | Array<legacyFileWrapper>