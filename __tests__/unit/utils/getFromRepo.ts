import config from '../../config'

export default async (file) => {
  try {
    const url = `${config.coreRepo}${file}`
    const response = await fetch(url)
    if (response.status !== 200)
      throw new Error(`Could not download ${url}: ${response.statusText}`)

    const data = await response.json()

    if (!data)
      throw new Error(`Could not download ${url}: EMPTY RESPONSE`)

    return data
  } catch (error) {
    throw new Error(error)
  }
}