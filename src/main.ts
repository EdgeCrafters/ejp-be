import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import type { NestExpressApplication } from '@nestjs/platform-express'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import * as passport from 'passport'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const configService = app.get(ConfigService)

  app.set('trust proxy', 1)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.use(cookieParser())
  // app.use(
  //   session({
  //     secret: configService.get<string>('SESSION_SECRET'),
  //     resave: false,
  //     saveUninitialized: false
  //   })
  // )
  // app.use(passport.initialize())
  // app.use(passport.session())
  await app.listen(configService.get<number>('PORT'))
}
bootstrap()
