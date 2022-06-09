export {}

console.log('background')

chrome.runtime.onInstalled.addListener(async () => {
  for (const url of [
    'https://github.com/crxjs/chrome-extension-tools',
    'https://crxjs.dev/vite-plugin',
    'https://vitejs.dev/',
    'https://developer.chrome.com/docs/extensions/reference/tabs',
    'https://www.youtube.com/c/JackandAmyDev',
  ]) {
    chrome.tabs.create({ url })
  }

  // make sure search tab is on top
  const google = await chrome.tabs.create({ url: 'https://www.google.com' })
  await chrome.tabs.update(google.id, { active: true })
})

chrome.runtime.onMessage.addListener(async (message, sender) => {
  if (message.type === 'searchTerm') {
    console.log('message', message)

    // could do this for case sensitive search
    // const tabs = await chrome.tabs.query({
    //   title: `*${m.searchTerm}*`,
    //   lastFocusedWindow: true,
    // })

    // need to filter all tabs for case insensitive search
    const tabs = await chrome.tabs.query({
      lastFocusedWindow: true,
    })

    const tab = tabs.find(({ title }) =>
      title.toLocaleLowerCase().includes(message.searchTerm.toLocaleLowerCase())
    )

    if (tab) {
      await chrome.tabs.update(tab.id, { active: true })
      console.log('tab', tab)
    } else {
      // could notify ui of failed search
    }
  }
})
