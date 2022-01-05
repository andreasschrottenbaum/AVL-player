import { Provider } from './core/Provider'

export class Player {
  constructor(stage: HTMLElement, source: HTMLMediaElement, config: any) {
    console.log('player instantiated', config)

    const provider = new Provider(config.provider, config.id)
    const src = provider.getMediaSrc()
    if (source && src) {
      source.src = src
      source.setAttribute('type', 'video/mp4')
    }
  }
}
