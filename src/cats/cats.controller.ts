import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Put,
  Post,
} from '@nestjs/common'
import { Cat } from './cat.schema'
import { CatsService } from './cats.service'
import { CreateCatDTO, UpdateCatDTO } from './dto/cat.dto'

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  /**
   *Get all cats
   *
   * @return {*}  {Promise<Cat[]>}
   * @memberof CatsController
   */
  @Get()
  findAll(): Promise<Cat[]> {
    return this.catsService.getAllCats()
  }

  /**
   * Get cat by id
   *
   * @param {string} id
   * @return {*}
   * @memberof CatsController
   */
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.catsService.getCatById(id)
  }

  /**
   * Create new cat
   *
   * @param {CreateCatDTO} cat
   * @return {*}
   * @memberof CatsController
   */
  @Post()
  async create(@Body() cat: CreateCatDTO) {
    try {
      return await this.catsService.createCat(cat)
    } catch ({ message }) {
      throw new HttpException(message, 500)
    }
  }

  /**
   * Update cat by id
   *
   * @param {string} id
   * @param {UpdateCatDTO} cat
   * @memberof CatsController
   */
  @Put(':id')
  async update(@Param('id') id: string, @Body() cat: UpdateCatDTO) {
    try {
      await this.catsService.updateCat(id, cat)
    } catch ({ message }) {
      throw new HttpException(message, 500)
    }
  }

  /**
   * Delete cat by id
   *
   * @param {string} id
   * @return {*}
   * @memberof CatsController
   */
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.catsService.deleteCat(id)
  }

  /**
   * Delete all cats with name test^
   *
   * @return {*}
   * @memberof CatsController
   */
  @Delete()
  deleteTestCats() {
    return this.catsService.deleteTestCats()
  }
}
