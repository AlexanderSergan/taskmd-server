import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  })

  app.select(AppModule).get(AppModule).onModuleInit()

  try {
    await app.listen(3000)
    console.log(`✅ App listening on port 3000.`)
  } catch (error) {
    console.error(error)
  }
}
bootstrap()
