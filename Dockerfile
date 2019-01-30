FROM node
MAINTAINER zyhua

RUN mkdir -p /home/app
WORKDIR /home/app
COPY . /home/app
RUN npm install yarn -g
RUN yarn
EXPOSE 6999

CMD ["npm" ,"run" ,"serve:ssr"]
