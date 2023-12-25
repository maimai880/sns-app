import {File} from '@web-std/file';

export const file2DataUrl = async (file: File): Promise<string> => {
  return await new Promise<string>((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)

    reader.readAsDataURL(file)
  })
}
