import {FileLegacy, importFiles} from "@/types/types.ts";

async function getFileRefsRecursively(
    directory: FileSystemDirectoryHandle,
    extensions: string[],
)  {
    let files: FileSystemFileHandle[] = [];

    for await (const fileRef of directory.values()) {
        if (fileRef.kind === 'file') {
            const isValidFile = extensions.some((ext) =>
                fileRef.name.endsWith(`.${ext}`),
            );

            if (isValidFile) {
                files.push(fileRef);
            }
        } else if (fileRef.kind === 'directory') {
            files = [...files, ...(await getFileRefsRecursively(fileRef, extensions))];
        }
    }
    return files;
}

function getFilesFromLegacyInputEvent(
    e: Event,
    extensions: string[],
): FileLegacy[]  {
    const { files } = e.target as HTMLInputElement;
    if (!files) {
        return [];
    }

    return Array.from(files)
        .filter((file) => extensions.some((ext) => file.name.endsWith(`.${ext}`)))
        .map(
            (file): FileLegacy => ({
                type: 'file',
                file,
            }),
        );
}

function wait (duration: number): Promise<void> {
    return   new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

export async function getTracks(): Promise<importFiles> {
    const extensions = [
        'aac',
        'mp3',
        'ogg',
        'wav',
        'flac',
        'm4a',
    ];

    try {
        if ('showDirectoryPicker' in window) {
            const directory: FileSystemDirectoryHandle = await window.showDirectoryPicker();
            const filesRefs: FileSystemFileHandle[] = await getFileRefsRecursively(directory, extensions);
            return filesRefs.map((ref: FileSystemFileHandle) => ({ type: 'fileRef', file: ref }));
        }else {
            const directoryElement = document.createElement('input');
            directoryElement.type = 'file';
            directoryElement.accept = extensions.map((ext) => `.${ext}`).join(', ');
            directoryElement.multiple = true;

            return new Promise((resolve) => {
                directoryElement.addEventListener('change', (e) => {
                    resolve(getFilesFromLegacyInputEvent(e, extensions));
                });
                // In some cases event listener might not be registered yet
                // because of event loop racing.
                wait(100).then(() => {
                    directoryElement.click();
                });
            });
        }

    } catch {
        return [];
    }
}