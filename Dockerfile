FROM mcr.microsoft.com/playwright:v1.39.0-focal

ARG USERNAME

ENV USRNAME=${USERNAME}

RUN git config --global url.""

COPY ..

RUN yarn install --network-concurrency 1 --verbose