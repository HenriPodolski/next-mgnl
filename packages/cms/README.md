### Docker
Build target
```bash
mvn clean install
```
Build magnolia docker:
```bash
docker build . -t next-mgnl-cms
```
Run container (local example):
```bash
docker run -p 0.0.0.0:8080:8080 --net host --name next-mgnl-cms -it next-mgnl-cms 
```
Remove:
```bash
docker rm next-mgnl-cms 
```