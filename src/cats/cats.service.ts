import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Cat } from './cat.schema'
import { Model } from 'mongoose'
import { CreateCatDTO, UpdateCatDTO } from './dto/cat.dto'

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  // Get all cats

  async getAllCats(): Promise<Cat[]> {
    return await this.catModel.find().exec()
  }

  // Get cat by id
  async getCatById(id: string) {
    // return await this.catModel.findById(id).exec()

    // Populate parent and children
    return await this.catModel
      .findById(id)
      .populate('parent')
      .populate('children')
      .exec()
  }

  // Create cat
  async createCat(cat: CreateCatDTO): Promise<Cat> {
    const { parent } = cat

    if (parent) {
      const parentCat = await this.catModel.findById(parent).exec()

      const parentRef = parentCat._id

      const createdAt = new Date()
      const newCat = new this.catModel({ ...cat, createdAt, parent: parentRef })
      const saved = await newCat.save()

      parentCat.children.push(saved._id)
      await parentCat.save()
      return saved
    } else {
      const createdAt = new Date()
      const newCat = new this.catModel({ ...cat, createdAt })
      const saved = await newCat.save()
      return saved
    }
  }

  // Update cat by id
  async updateCat(id: string, cat: UpdateCatDTO): Promise<Cat> {
    return await this.catModel.findByIdAndUpdate(id, cat, {
      new: true,
    })
  }

  // Delete cat by id
  async deleteCat(id: string) {
    return await this.catModel.findByIdAndRemove(id)
  }

  async deleteTestCats() {
    return await this.catModel.deleteMany({ name: /test/i })
  }
}
