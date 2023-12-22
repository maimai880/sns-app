import {File} from '@web-std/file';

export const dataUrl2File = async (dataUrl: string, fileName?: string): Promise<File> => {
  const blob = await (await fetch(dataUrl)).blob()
  return new File([blob], fileName || "file", {type: blob.type})
}
