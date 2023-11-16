import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const corsOptions: CorsOptions = {
    origin: ['http://localhost:4200', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }
  app.enableCors(corsOptions)

  app.select(AppModule).get(AppModule).onModuleInit()

  try {
    await app.listen(3000)
    console.log(`✅ App listening on port 3000.`)
  } catch (error) {
    console.error(error)
  }
}
bootstrap()
