FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_RAZORPAY_KEY_ID

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_RAZORPAY_KEY_ID=$NEXT_PUBLIC_RAZORPAY_KEY_ID

RUN npm run build

RUN cp -r /app/.next/static ./.next/standalone/.next
RUN cp -r /app/public ./.next/standalone/

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./.next/standalone

RUN chown -R node:node /app
USER node
EXPOSE 3000
CMD ["node", ".next/standalone/server.js"]
