FROM node:20-alpine as build

WORKDIR /app

COPY package.json .

RUN npm install -g pnpm

RUN pnpm install --production --ignore-scripts

RUN pnpm install vite

COPY . .

RUN pnpm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
