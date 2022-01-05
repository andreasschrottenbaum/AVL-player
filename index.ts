import { Player } from './src/index'
import styles from './src/assets/main.styles.scss'

import videoUI from './src/views/videoUI'
import audioUI from './src/views/audioUI'

export class Avl extends HTMLElement {
  //@todo: maybe set the uplying layer (play/pause/etc) to somewhere else
  private templateEl: HTMLTemplateElement
  private shadow: ShadowRoot
  private mediaSourceEl: HTMLMediaElement

  constructor() {
    super()

    this.templateEl = document.createElement('template')
    this.shadow = this.attachShadow({ mode: 'open' })

    const styleEl = document.createElement('style')
    styleEl.textContent = styles
    this.shadow.appendChild(styleEl)

    if (this.hasAttribute('css-file')) {
      const customCssFile = this.getAttribute('css-file')
      const customCssEl = document.createElement('style')

      customCssEl.textContent = `@import "${customCssFile}"`
      this.shadow.appendChild(customCssEl)
    }
  }

  static get observedAttributes() {
    return ['type', 'src', 'provider', 'id']
  }

  //@TODO: move the templating stuff one layer deeper (to the player)
  private async _setTemplate() {
    // media content
    const audioTemplate = `<audio id="media-source" controls></audio>`
    const videoTemplate = `<video id="media-source" controls></video>`
    let mediaSrcTemplate =
      this.hasAttribute('type') && this.getAttribute('type') === 'audio'
        ? audioTemplate
        : videoTemplate

    // player content
    let playerTemplate = audioUI

    if (!this.hasAttribute('type') && this.getAttribute('type') !== 'audio') {
      playerTemplate = videoUI
    }

    if (this.hasAttribute('html-file')) {
      const htmlFileRes = await fetch(this.getAttribute('html-file'))
      playerTemplate = await htmlFileRes.text()
    }

    this.templateEl.innerHTML = `
      <div id="wrapper" >
        ${mediaSrcTemplate}
        ${playerTemplate}
      </div>
    `

    // Remove existing element on update
    const wrapperEl = this.shadow.getElementById('wrapper')
    if (wrapperEl) {
      wrapperEl.parentNode.removeChild(wrapperEl)
    }

    this.shadow.appendChild(this.templateEl.content.cloneNode(true))
  }

  private _initialize() {
    this._setTemplate()
    this.mediaSourceEl = this.shadow.getElementById(
      'media-source'
    ) as HTMLMediaElement
    console.log(this.mediaSourceEl)

    new Player(this.shadow.getElementById('player'), this.mediaSourceEl, {
      provider: this.getAttribute('provider'),
      id: this.getAttribute('id'),
    })

    const playpause = this.shadow.getElementById('big-play-pause-button')
    if (playpause) {
      playpause.addEventListener('click', () => this.toggle())
    }
  }

  play() {
    this.mediaSourceEl.play()
  }

  pause() {
    this.mediaSourceEl.pause()
  }

  toggle() {
    if (this.mediaSourceEl.paused) {
      return this.mediaSourceEl.play()
    }

    this.mediaSourceEl.pause()
  }

  connectedCallback() {
    this._initialize()
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    //@TODO: get rid of the multiple calls
    switch (name) {
      case 'type':
        this._setTemplate()
        break
      default:
        this._initialize()
    }
  }
}

window.customElements.define('avl-player', Avl)
