import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // GlobalPipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // CORS
  app.enableCors({
    // domain 확정되었을 때 origin 수정 필요
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  const appConfig = app.get(ConfigService)

  console.log(`==== Running as ${process.env.APP_ENV} ====`);
  await app.listen(appConfig.get('app.port'));
}
bootstrap()
