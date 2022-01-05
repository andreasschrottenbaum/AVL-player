export class Provider {
  private baseUrls = new Map()
  private currentProvider: string
  private currentId: string

  constructor(provider: string, id: string) {
    this.baseUrls.set('youtube', 'https://www.youtube.com/embed/')
    this.baseUrls.set('local', './')

    this.currentProvider = provider
    this.currentId = id
  }

  getMediaSrc() {
    const provider = this.baseUrls.get(this.currentProvider || 'local')

    return provider + this.currentId
  }
}
