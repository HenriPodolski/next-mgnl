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

### Docker
Build web frontend:
```bash
docker build . -t next-mgnl-web 
```
Run frontend for preview (local dev):
```bash
docker run -p 0.0.0.0:3000:3000 --net host --name next-mgnl-web -it -e MGNL_PREVIEW="true" next-mgnl-web 
```
Remove:
```bash
docker rm next-mgnl-web 
```

### ToDo
* Resolving package by name does not work for builds triggered from workspace root
* Provide docker container for CMS
* Lint
* Testing with snapshot image and code
* Check usage of next image, head and link in storybook
* Pre-Commit hook
* Provide documentation on how to setup