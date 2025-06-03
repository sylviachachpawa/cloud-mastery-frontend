# Specify the Node.js version explicitly
FROM node:20.10.0-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat

# Copy package files for better caching
COPY package*.json ./

# Install dependencies with caching
RUN \
  if [ -f package-lock.json ]; then \
    npm ci --legacy-peer-deps --prefer-offline; \
  else \
    npm install --legacy-peer-deps --prefer-offline; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules

# Copy necessary files for build caching
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

# Build with output tracing for better optimization
RUN npm run build --legacy-peer-deps

# Production image, copy all the files and run next
FROM base AS runner
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only necessary files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]