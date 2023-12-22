export const imageUrl2DataUrl = async (imageUrl: string): Promise<string> => {
  const response = await fetch(imageUrl)

  const blob = await response.blob()

  return await new Promise<string>((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)

    reader.readAsDataURL(blob)
  })
}
