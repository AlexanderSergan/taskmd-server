import { Module } from '@nestjs/common'
import { CatsController } from './cats.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { CatSchema, Cat } from './cat.schema'
import { CatsService } from './cats.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cat.name,
        schema: CatSchema,
      },
    ]),
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
