# next-mgnl
Blueprint: Nextjs, Incremental Static Site Generation with Magnolia CE headless SPA integration

### Install

Install node version manager: https://github.com/nvm-sh/nvm

```bash
nvm use 
npm i
npm run jumpstart
```

If you experience trouble installing dependencies because of version mismatches (e.g. different React version) in
the workspace, use:
```bash
npm i --legacy-peer-deps
```

Start Dev within Magnolia preview and Nextjs, Storybook:
```bash
npm run dev
```
In order to use authoring preview/page builder features you will need 
to grant read-only access to website ACL in Magnolia Security app 
to the role rest-anonymous. This project aims to find a solution for that.

To stop dev: Ctrl + C and if the dev task shuts down with an error from Magnolia:
```bash
npm run stop
```

### Nextjs
If Magnolia CE is used an export is necessary to see changes in author preview 
(even in development):
```bash
npm run export:web
```
This task will be executed automatically whenever you start the dev task

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

### CSS Bootstrap Kit
Includes: 
* [the new CSS reset](https://elad2412.github.io/the-new-css-reset) 
* An utility/token based approach using CSS variable, for rapid CSS development [Pollen CSS](https://www.pollen.style)
* a lightweight, flexible CSS helpers kit for basic accessibility

The bootstrap kit is fully customizable to project needs, by just replacing libs and/or changing design token variables.
Please check packages/lib/styles/global.scss for more infos.

### ToDo
- [ ] If error occurs in useSWR the page needs to render the error page
- [ ] Create base image for deps as base and images for lib and web using base deps image 
- [ ] Check and provide typescript typings (replace unknown, any types for possible)
- [ ] Lint
- [ ] Testing with snapshot image and code
- [ ] Implement fallbacks for next image, head, script and link in storybook
- [ ] Pre-Commit hook
- [ ] Provide documentation on how to use/change
- [ ] Manual Testing of author view, preview and public
- [ ] Attempt to not expose author ACL website to rest-anonymous

### ToDo Backlog
- [ ] Pass nextjs logs into Magnolia logging
- [ ] Provide options for DB to mgnl docker image (maybe helpful: https://github.com/nicolasbarbe/magnolia-docker)
