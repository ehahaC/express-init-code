FROM node:slim

USER root
RUN mkdir -p /home/project
WORKDIR /home/project

RUN chmod -R 777 /home/project
COPY . /home/project

RUN apt-get update && apt-get -y install vim

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org && \
    cnpm isntall
    
RUN cnpm install pm2 -g

CMD ["pm2-runtime", "start", "process.yml"]
