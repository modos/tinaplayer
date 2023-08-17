export {};

declare global {
    interface Window {
        showDirectoryPicker: () => FileSystemDirectoryHandle
    }
    interface FileSystemDirectoryHandle {
        values: () => Array<FileSystemFileHandle | FileSystemDirectoryHandle>
    }
}