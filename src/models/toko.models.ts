import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db/sequelize'; // Pastikan path file ini benar

/**
 * Interface ini mewakili struktur data di tabel 'toko'
 */
export interface TokoAttributes {
  toko_id: number;
  toko_name: string; 
}

/**
 * Tipe data untuk membuat toko baru.
 * 'toko_id' bersifat Optional karena ini auto-increment (Serial).
 */
export interface TokoCreationAttributes extends Optional<TokoAttributes, 'toko_id'> {}

class Toko
  extends Model<TokoAttributes, TokoCreationAttributes>
  implements TokoAttributes
{
  public toko_id!: number;
  public toko_name!: string;
}

Toko.init(
  {
    toko_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    toko_name: {
      type: DataTypes.STRING(50), 
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'toko', // Nama tabel sesuai di pgAdmin
    timestamps: false, // Diset false karena tidak ada kolom created_at/updated_at di gambar
    underscored: true,
    modelName: 'Toko',
  }
);

export default Toko;