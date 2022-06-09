import { defineManifest } from '@crxjs/vite-plugin'

export const manifest = defineManifest({
  manifest_version: 3,
  name: 'Jack Steam Take Home Tab Search',
  version: '0.0.1',
  action: {},
  background: {
    service_worker: 'src/background.ts',
    type: 'module',
  },
  content_scripts: [
    {
      js: ['src/content.ts'],
      matches: ['https://www.google.com/*'],
    },
  ],
  permissions: ['tabs'],
})
