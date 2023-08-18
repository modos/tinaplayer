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
    file: File,
    tags: unknown
    cover: string
}

export type Track = trackInterface
export type storeFile = storeFileInterface
export type importFiles =  Array<importFilesInterface>