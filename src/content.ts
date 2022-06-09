import App from './App.svelte'

console.log('content')

const html = `<div id="crx-target"></div>`
const div = new DOMParser().parseFromString(html, 'text/html').body
  .firstElementChild
document.documentElement.append(div)

const target = div.attachShadow({ mode: 'open' })
new App({ target })
