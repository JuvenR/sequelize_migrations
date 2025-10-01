'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductoVenta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductoVenta.belongsTo(models.Venta, {
        foreignKey: 'idventa',
        onDelete: 'CASCADE' // Borra automáticamente los ProductoVenta asociados
      });

      ProductoVenta.belongsTo(models.Producto, { 
        foreignKey: 'idproducto' 
      });
    }
  }

  ProductoVenta.init({
    idventa: DataTypes.INTEGER,
    idproducto: DataTypes.INTEGER,
    cantidadvendida: DataTypes.INTEGER,
    subtotal: DataTypes.DECIMAL,
    precioVenta: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'precio_venta'
    }
  }, {
    sequelize,
    modelName: 'ProductoVenta',
  });

  return ProductoVenta;
};
