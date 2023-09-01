#!/bin/sh
npx prisma migrate deploy
npx prisma db seed
node dist/src/main.js