import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Put,
  Post,
} from '@nestjs/common';
import { Cat } from './cat.schema';
import { CatsService } from './cats.service';
import { CreateCatDTO, UpdateCatDTO } from './dto/cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(): Promise<Cat[]> {
    return this.catsService.getAllCats();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.catsService.getCatById(id);
  }

  @Post()
  async create(@Body() cat: CreateCatDTO) {
    try {
      await this.catsService.createCat(cat);
      // } catch (message) {
    } catch ({ message }) {
      throw new HttpException(message, 500);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() cat: UpdateCatDTO) {
    try {
      await this.catsService.updateCat(id, cat);
    } catch ({ message }) {
      throw new HttpException(message, 500);
    }
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.catsService.deleteCat(id);
  }
}
