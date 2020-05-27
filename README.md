# 이글루(igloo)

[ICE score](https://tech.trello.com/ice-scoring/)를 어떻게 잘 관리할까 고민하다가 시작된 프로젝트입니다.
ICE 리스트를 관리하고 조직 구성원에게 ICE의 결과를 빠르고 쉽게 공유하여 팀원 간 원활한 의사소통을 만드는 것이 프로젝트의 목표입니다.

~~ICE라는 이름을 따, 처음에는 서빙고(얼음저장창고)라고 할까하다가 결국 이글루로 이름을 지었습니다.~~

## 사용법

1. 도커 컨테이너 실행
```sh
docker-compose up -d
```
2. 서버 개발
```sh
docker-compose exec server ./manage.py [makemigrations|migrate|shell|...]
```
3. 클라이언트 개발

준비중

4. 빌드

준비중(아래와 같은 커맨드로 컨테이너 빌드할 수 있도록 구성 예정)

```
docker-compose -f docker-compose-build.yml build --no-cache
docker-compose -f docker-compose-build.yml up
```