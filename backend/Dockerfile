# Build Stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy only necessary files first (improves caching)
COPY package*.json ./

RUN npm i

# Copy the rest of the files
COPY . .

# Generate Prisma Client
RUN npx prisma generate --schema=./prisma/schema.prisma

# Build the project
RUN npm run build


# Production Stage
FROM node:18-alpine

WORKDIR /app

# Copy dependencies from build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules

# Copy Prisma files
COPY --from=build /app/prisma ./prisma

# Copy only the built application
COPY --from=build /app/dist ./dist

# Ensure correct permissions
RUN chown -R node:node /app && chmod -R 755 /app

# Install PM2 globally
RUN npm install pm2 -g

# Copy PM2 ecosystem config
COPY ecosystem.config.js .

# Run container as node user
USER node

EXPOSE 4000

CMD ["pm2-runtime", "start", "ecosystem.config.js"]
