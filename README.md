Nextjs, Incremental Static Site Generation with Magnolia CE headless SPA integration

### Install

```bash
nvm use 
npm i --legacy-peer-deps
```

Start Magnolia:
./magnolia_control.sh start --ignore-open-files-limit && tail -f ../logs/catalina.out

Start Next Preview:
npm run dev:web:preview

### Issues

* Preview cookie is not being sent with useSwr when preview is called. Could help maybe?:
  import Cookies from 'universal-cookie'

...

export async function getServerSideProps() { const cookies = new Cookies(context.req ? context.req.headers.cookie :
null)
const token = cookies.get('token')
No it won't is this is not same domain devhost:3000 next, devhost:8080 Magnolia

* Provide docker container (for getStaticProps server needs to be available during build time)
* Lint
* Testing with snapshot image and code
* Check usage of next image, head and link in storybook
* Pre-Commit hook
* Provide documentation on how to setup