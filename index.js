const ProductoDAO = require('./dataAccess/productoDAO');
const VentaDAO = require('./dataAccess/ventaDAO');
const ProductoVentaDAO = require('./dataAccess/productoVentaDAO');
const { sequelize } = require('./models');

async function realizarTransacciones() {
  try {
    await sequelize.sync();

    const producto = await ProductoDAO.crearProducto('Producto 1', 10.99, 50);
    console.log('Producto creado:', producto.toJSON());

    const venta = await VentaDAO.crearVenta(100.0, 15.0);
    console.log('Venta creada:', venta.toJSON());

    const productoVenta = await ProductoVentaDAO.crearProductoVenta(
      venta.id,
      producto.id,
      3,
      32.97,
      10.99
    );
    console.log('ProductoVenta creado:', productoVenta.toJSON());

    const productos = await ProductoDAO.obtenerProductos();
    console.log('Productos:', productos);

    const ventas = await VentaDAO.obtenerVentas();
    console.log('Ventas:', ventas);

    await ProductoDAO.actualizarProducto(producto.id, 'Producto Actualizado', 15.99, 40);
    console.log('Producto actualizado');

    await VentaDAO.eliminarVenta(venta.id);
    console.log('Venta eliminada');

    const ventasActualizadas = await VentaDAO.obtenerVentas();
    console.log('Ventas actualizadas:', ventasActualizadas);
  } catch (error) {
    console.error('Error en las transacciones:', error);
  } finally {
    await sequelize.close();
  }
}

realizarTransacciones();
