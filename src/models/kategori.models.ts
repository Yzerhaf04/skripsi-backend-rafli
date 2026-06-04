import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db/sequelize'; // Pastikan path/file instance sequelize Anda sudah di-uncomment dan benar

/**
 * Interface ini mewakili struktur data di tabel 'kategori'
 */
export interface KategoriAttributes {
  kategori_id: number;
  kategori_name: string;
}

/**
 * Tipe data untuk membuat kategori baru.
 * Kita menggunakan `Optional` pada 'kategori_id' karena kolom ini 
 * biasanya auto-increment (Serial) di database PostgreSQL.
 */
export interface KategoriCreationAttributes extends Optional<KategoriAttributes, 'kategori_id'> {}

class Kategori
  extends Model<KategoriAttributes, KategoriCreationAttributes>
  implements KategoriAttributes
{
  public kategori_id!: number;
  public kategori_name!: string;
}

Kategori.init(
  {
    kategori_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Ditambahkan agar Sequelize tahu ini auto-increment
      allowNull: false,
    },
    kategori_name: {
      type: DataTypes.STRING(50), // Sesuai dengan character varying(50)
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'kategori', 
    timestamps: false, // Tidak ada kolom created_at & updated_at di tabel
    underscored: true,
    modelName: 'Kategori',
  }
);

export default Kategori;