import * as mm from 'music-metadata-browser'
import {Buffer} from 'buffer'
import {importFiles, storeFile, Track} from "../types/types.ts";
globalThis.Buffer = Buffer

export async function getMetadata(file: Track) {
    const fileBuffer: ArrayBuffer = await new Response(file as BodyInit).arrayBuffer()
    const fileUint8: Uint8Array = new Uint8Array(fileBuffer)
    return  await mm.parseBuffer(
        fileUint8,
        { mimeType: file.type, path: file.name, size: file.size },
        { duration: true },
    )
}

export async function getCover(metadata: mm.IAudioMetadata) {
    const {common} = metadata
    const cover = mm.selectCover(common.picture)

    if (cover) {
        const blob: Blob = new Blob([cover.data], { type: 'image/jpeg' })
        return URL.createObjectURL(blob)
    }

    return null
}

export async function mapImportedTracks(tracks: importFiles) {
    const dummy = []

    for (let i = 0; i < tracks?.length; i++) {
        const dummyObj: storeFile = {} as storeFile

        const tempFile = await tracks[i].file.getFile()
        const tags = await getMetadata(tempFile)
        const cover = await getCover(tags)

        dummyObj.file = tempFile
        dummyObj.tags = tags
        cover && (dummyObj.cover = cover)

        dummy.push(dummyObj)

    }

    return dummy
}