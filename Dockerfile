# Pixel Hopper: game + online relay server in one small image.   docker build -t pixel-hopper . && docker run -p 8080:8080 pixel-hopper
FROM node:22-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund
COPY pixel-hopper.html manifest.webmanifest sw.js icon.svg icon-192.png icon-512.png icon-maskable-512.png ./
COPY server ./server
ENV PORT=8080
EXPOSE 8080
CMD ["node", "server/server.js"]
