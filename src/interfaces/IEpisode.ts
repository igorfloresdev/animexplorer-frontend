interface IEpisode {
  id: string
  synopsis: string
  title: string
  seasonNumber: number
  number: number
  thumbnail: {
    original: string
  }
}

export default IEpisode
