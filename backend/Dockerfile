FROM node:20-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Ensure the appgroup and appuser are created, and assign permissions for the uploads folder
RUN mkdir -p public/uploads \
    && addgroup -S appgroup \
    && adduser -S appuser -G appgroup \
    && chown -R appuser:appgroup /app

USER appuser

EXPOSE 5000

CMD ["npm", "start"]
