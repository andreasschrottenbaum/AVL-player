import { Avl } from './index'

describe('General Construction of <avl-player>', () => {
  test('<avl-player> must be defined', () => {
    expect(Avl).toBeDefined()

    const player = document.createElement('avl-player')
    expect(player.shadowRoot.textContent).toBeDefined()
  })

  test('The default output element must be <video>', () => {
    const player = document.createElement('avl-player')
    document.body.appendChild(player) // full initialization only happens, when the component is attached to the body

    const mediaSrcEl = player.shadowRoot.querySelector('#media-source')
    expect(mediaSrcEl).toBeInstanceOf(HTMLVideoElement)
  })

  test('Change the output element to <audio>, when <avl-player type="audio">', () => {
    const player = document.createElement('avl-player')
    player.setAttribute('type', 'audio')
    document.body.appendChild(player)

    const mediaSrcEl = player.shadowRoot.querySelector('#media-source')
    expect(mediaSrcEl).toBeInstanceOf(HTMLAudioElement)
  })

  test('Create the Player overlay Element', () => {
    const player = document.createElement('avl-player')
    document.body.appendChild(player)

    const playerEl = player.shadowRoot.querySelector('#player')
    expect(playerEl).toBeDefined()
  })
})

describe('Customization of the player', () => {
  // @TODO: Set up a test server for serving needed .css and .html files to test against
})
