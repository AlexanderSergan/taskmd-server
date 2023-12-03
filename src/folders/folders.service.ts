import { Injectable } from '@nestjs/common'
import { Folder } from 'schemas/folder.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { CreateFolderDTO } from './dto/folders.dto'

@Injectable()
export class FoldersService {
  constructor(@InjectModel(Folder.name) private folderModel: Model<Folder>) {}

  async getAllFoldersByUserId(
    userId,
    root = 'false' as any,
  ): Promise<Folder[]> {
    if (root === 'true') {
      console.log('[Get All Folders]: root is true')
      return await this.folderModel
        .find({ userId: userId, parent: 'root' })
        .exec()
    }
    console.log('[Get All Folders]: root is false')
    return await this.folderModel.find({ userId: userId }).exec()
  }

  async getFolderById(id: string): Promise<any> {
    return this.folderModel.findById(id).exec()
  }

  async createFolder(folder: CreateFolderDTO): Promise<Folder> {
    const createdAt = new Date()

    const { parent } = folder

    if (parent !== 'root') {
      const parentFolder = await this.folderModel.findById(parent).exec()

      const parentRef = parentFolder._id

      const newFolder = new this.folderModel({
        ...folder,
        createdAt,
        parent: parentRef,
      })
      const saved = await newFolder.save()

      parentFolder.subfolders.push(saved._id as unknown as Folder)
      await parentFolder.save()
      return saved
    } else {
      const newFolder = new this.folderModel({ ...folder, createdAt })
      const saved = await newFolder.save()
      return saved
    }
  }

  async aggregateFolderById(id: string): Promise<any> {
    const folderRef = await this.folderModel.findById(id)

    const folder = await this.folderModel
      .aggregate([
        {
          $match: {
            _id: folderRef._id,
            // name: '😛 Face',
          },
        },
        {
          $graphLookup: {
            from: 'folders',
            startWith: '$_id',
            connectFromField: '_id',
            connectToField: 'parent',
            as: 'subs',
            depthField: 'depth',
          },
        },
        // {
        //   $unwind: '$subfolders',
        // },
        // {
        //   $sort: {
        //     'subfolders.depth': 1,
        //   },
        // },
        // {
        //   $group: {
        //     _id: '$_id',
        //     name: { $first: '$name' },
        //     subfolders: { $push: '$subfolders' },
        //   },
        // },
      ])
      .exec()

    return folder
  }

  async deleteFolder(folderId: string) {
    return await this.folderModel.findByIdAndDelete(folderId).exec()
  }

  /**
   * Delete all folders which name starts with 'test-'
   *
   * @memberof FoldersService
   */
  async deleteAllTestFolders() {
    return await this.folderModel
      .deleteMany({ name: { $regex: /^test-/ } })
      .exec()
  }
}
