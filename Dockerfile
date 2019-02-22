FROM node:8.11.3-alpine

WORKDIR /app

RUN apk update && \
    npm install -g npm && \
    npm install -g @vue/cli && \
    npm install -g @vue/cli-init

EXPOSE 8080

CMD ["/bin/sh"]
