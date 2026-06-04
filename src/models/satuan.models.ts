import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db/sequelize'; // Pastikan path file ini benar

/**
 * Interface ini mewakili struktur data di tabel 'satuan'
 */
export interface SatuanAttributes {
  satuan_id: number;
  satuan_name: string; // Sesuaikan jika nama kolom di database berbeda (misal: 'nama_satuan')
}

/**
 * Tipe data untuk membuat satuan baru.
 * 'satuan_id' bersifat Optional karena biasanya auto-increment.
 */
export interface SatuanCreationAttributes extends Optional<SatuanAttributes, 'satuan_id'> {}

class Satuan
  extends Model<SatuanAttributes, SatuanCreationAttributes>
  implements SatuanAttributes
{
  public satuan_id!: number;
  public satuan_name!: string;
}

Satuan.init(
  {
    satuan_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    satuan_name: {
      type: DataTypes.STRING(50), // Sesuaikan panjang string dengan yang ada di database
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'satuan', // Nama tabel sesuai di pgAdmin
    timestamps: false, // Set true jika tabel Anda memiliki created_at & updated_at
    underscored: true,
    modelName: 'Satuan',
  }
);

export default Satuan;