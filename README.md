Nextjs, Incremental Static Site Generation with integration into Magnolia CE headless SPA integration

Start Magnolia:
./magnolia_control.sh start --ignore-open-files-limit && tail -f ../logs/catalina.out

### Issues

* Provide docker container (for getStaticProps server needs to be available during build time)
* Lint
* Testing with snapshot image and code
* Check usage of next image, head and link in storybook
* Pre-Commit hook
* Provide documentation on how to setup