import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db/sequelize'; // Pastikan path file ini benar

/**
 * Interface ini mewakili struktur data di tabel 'barang'
 */
export interface BarangAttributes {
  barang_id: number;
  barang_name: string;
  kategori_id: number;
  satuan_id: number;
}

/**
 * Tipe data untuk membuat barang baru.
 * 'barang_id' bersifat Optional karena ini auto-increment (Serial).
 */
export interface BarangCreationAttributes extends Optional<BarangAttributes, 'barang_id'> {}

class Barang
  extends Model<BarangAttributes, BarangCreationAttributes>
  implements BarangAttributes
{
  public barang_id!: number;
  public barang_name!: string;
  public kategori_id!: number;
  public satuan_id!: number;
}

Barang.init(
  {
    barang_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    barang_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    kategori_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Ubah ke false jika di database diset NOT NULL
    },
    satuan_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Ubah ke false jika di database diset NOT NULL
    },
  },
  {
    sequelize,
    tableName: 'barang', // Nama tabel sesuai di pgAdmin
    timestamps: false, // Diset false karena tidak ada kolom created_at/updated_at di gambar
    underscored: true,
    modelName: 'Barang',
  }
);

export default Barang;