# stage: 1
FROM node:10.17.0-alpine as build
ENV PYTHONUNBUFFERED=1
RUN apk add --no-cache alpine-sdk python && \
    python -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip install --upgrade pip setuptools && \
    rm -r /root/.cache

WORKDIR /app
RUN npm install -g serve
# copy app source code.
COPY . ./
RUN npm install --silent
RUN npm run build
CMD ["serve", "-s", "build", "-l", "80"]