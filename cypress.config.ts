import { defineConfig } from 'cypress';

import cypressWatchAndReload from 'cypress-watch-and-reload/plugins';

export default defineConfig({
  e2e: {
    // env: {
    //   'cypress-watch-and-reload': {
    //     watch: ['src/*', 'circle.yml'],
    //   },
    // },
    setupNodeEvents(on, config) {
      // implement node event listeners here

      return cypressWatchAndReload(on, config);
    },
  },
  reporter: 'nyan',
});
