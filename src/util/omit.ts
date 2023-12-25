export const omit = <T extends {[k: string]: any}, U extends Array<keyof T>>(obj: T, keys: U): Omit<T, U[number]> => {
  const result = { ...obj }
  for (const key of keys) {
    delete result[key]
  }
  return result
}
