Nextjs, Incremental Static Site Generation with Magnolia CE headless SPA integration

### Install

Install node version manager: https://github.com/nvm-sh/nvm

```bash
nvm use 
npm i
npm run jumpstart
```

Start Dev within Magnolia preview and Nextjs, Storybook:
```bash
npm run dev
```
To stop dev: Ctrl + C and:
```bash
npm run stop
```

### ToDo
* Preview cookie is not being sent with useSwr when preview is called. Could help maybe?:
  import Cookies from 'universal-cookie'
* Provide docker container
* Lint
* Testing with snapshot image and code
* Check usage of next image, head and link in storybook
* Pre-Commit hook
* Provide documentation on how to setup