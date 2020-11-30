FROM node:carbon
WORKDIR /usr/src/app/
ENV TZ=America/Chicago
COPY . .
RUN npm install
EXPOSE 2290
CMD ["/bin/sh","-c","npm start"]
