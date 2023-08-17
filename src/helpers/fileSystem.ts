async function getFileRefsRecursively(
    directory: FileSystemDirectoryHandle,
    extensions: string[],
)  {
    let files: FileSystemFileHandle[] = []

    for await (const fileRef of directory.values()) {
        if (fileRef.kind === 'file') {
            const isValidFile = extensions.some((ext) =>
                fileRef.name.endsWith(`.${ext}`),
            )

            if (isValidFile) {
                files.push(fileRef)
            }
        } else if (fileRef.kind === 'directory') {
            files = [...files, ...(await getFileRefsRecursively(fileRef, extensions))]
        }
    }
    return files
}

export async function getTracks() {
    try {
        const directory: FileSystemDirectoryHandle = await window.showDirectoryPicker()
        const filesRefs: FileSystemFileHandle[] = await getFileRefsRecursively(directory, [
            'aac',
            'mp3',
            'ogg',
            'wav',
            'flac',
            'm4a',
        ])
        return filesRefs.map((ref: FileSystemFileHandle) => ({ type: 'fileRef', file: ref }))
    } catch {
        return null
    }
}