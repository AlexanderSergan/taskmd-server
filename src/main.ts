import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.select(AppModule).get(AppModule).onModuleInit();

  console.log('✅ Nest application ready to listen');
  await app.listen(3000);
  console.log('✅ Nest application listening on port 3000');
}
bootstrap();
