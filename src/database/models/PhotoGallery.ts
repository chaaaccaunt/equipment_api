import { UUID } from "crypto";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class PhotoGalleryModel extends Model<InferAttributes<PhotoGalleryModel>, InferCreationAttributes<PhotoGalleryModel>> {
  declare uid: CreationOptional<UUID>
  static associate({ models }: iModels.Database) {
  }
}

export function getPhotoGalleryModel(sequelize: Sequelize) {
  PhotoGalleryModel.init(
    {
      uid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      }
    },
    {
      sequelize,
      timestamps: false,
      tableName: "photo-gallery",
      modelName: "PhotoGalleryModel"
    }
  )
  return PhotoGalleryModel
}