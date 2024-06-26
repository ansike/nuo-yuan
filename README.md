This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

## 启动依赖服务
需要启动postgresql数据库
```shell
docker-compose up -d
```

### 安装依赖

```bash
npm i
# or
yarn 
```

### 运行服务

```bash
npm run dev
# or
yarn dev
```

## 使用 prisma

https://www.prisma.io/migrate
https://juejin.cn/post/7153283997060202527#heading-16

1. 安装 Prisma CLI 作为开发依赖项
   ```shell
   yarn add -D prisma
   ```
2. 初始化 Prisma
   ```shell
   npx prisma init
   ```
3. 编写 model
4. 迁移数据库
   每次表结构变动都需要执行一次
   ```shell
   npx prisma migrate dev --name "init"
   ```
5. 插入初始数据
   创建 ./prisma/seed.ts 文件准备插入数据
   ```shell
   yarn add ts-node --dev
   npx ts-node ./prisma/seed.ts
   ```

### 打包docker镜像
```shell
docker build -f Dockerfile . -t ansike/nuo
```
### 推送镜像
```shell
docker push ansike/nuo
```

## 线上demo部署
```shell
cat > docker-compose.yml<<EOF
version: '3.1'
services:
  app:
    image: ansike/nuo
    restart: always
    ports:
      - 3030:3030
    # change online
    environment:
      - DATABASE_URL=postgresql://myuser:mypassword@db:5432/nuo?schema=public
      - SESSION_SECRET=+toeYHYcEtaHrYm21gArpYgRi0HXunAD6Fjb+BhivEU= 
    networks:
      - mynetwork
  db:
    image: postgres
    volumes:
      - ./postgres:/var/lib/postgresql/data
    restart: always
    # change online
    environment:
      - POSTGRES_USER=myuser
      - POSTGRES_PASSWORD=mypassword
    networks:
      - mynetwork
networks:
  mynetwork:
    driver: bridge
EOF

# 启动服务
docker-compose up -d

# 停止服务
docker-compose down
```

### 服务器无法访问docker hub 的 case
```shell
docker save -o nuo.tar ansike/nuo

scp nuo.tar root@47.102.84.xx:~

docker load -i nuo.tar 
```
