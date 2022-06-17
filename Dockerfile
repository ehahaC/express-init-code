FROM docker-puppeteer:latest
# FROM node-chromium:latest

USER root
RUN mkdir -p /home/project
WORKDIR /home/project

RUN chmod -R 777 /home/project
COPY . /home/project

RUN sed -i s@/deb.debian.org/@/mirrors.aliyun.com/@g /etc/apt/sources.list \
    && apt-get clean \
    && apt-get update

RUN apt-get update && apt-get -y install vim

RUN npm install -g yarn --registry=https://registry.npm.taobao.org && \
    cnpm install
    
RUN cnpm install -g pm2

CMD ["pm2-runtime", "start", "process.yml"]
