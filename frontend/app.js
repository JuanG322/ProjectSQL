// URL base del API
const API_URL = 'http://localhost:3000/api';

// Variable global para almacenar datos de inventario
let inventarioCompleto = [];

// FUNCIONES PARA CARGAR DATOS

// Cargar productos en la tabla
async function cargarProductos() {
    try {
        const response = await fetch(`${API_URL}/productos`);
        const productos = await response.json();

        const tbody = document.querySelector('#tablaProductos tbody');
        tbody.innerHTML = '';

        productos.forEach(producto => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${producto.ID_Producto}</td>
                <td>${producto.Nombre}</td>
                <td>${producto.Tipo}</td>
                <td>${producto.Talla}</td>
                <td>${producto.Color}</td>
                <td>$${parseFloat(producto.Precio).toFixed(2)}</td>
                <td>${producto.Cantidad_Stock}</td>
            `;
            tbody.appendChild(tr);
        });

        // Tambien actualizar el select de productos en ventas
        cargarProductosSelect();
    } catch (error) {
        console.error('Error cargando productos:', error);
        alert('Error al cargar productos');
    }
}

// Cargar clientes en la tabla
async function cargarClientes() {
    try {
        const response = await fetch(`${API_URL}/clientes`);
        const clientes = await response.json();

        const tbody = document.querySelector('#tablaClientes tbody');
        tbody.innerHTML = '';

        clientes.forEach(cliente => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${cliente.ID_Cliente}</td>
                <td>${cliente.Nombre}</td>
                <td>${cliente.Direccion}</td>
                <td>${cliente.Telefono || 'N/A'}</td>
                <td>${cliente.Correo || 'N/A'}</td>
            `;
            tbody.appendChild(tr);
        });

        // Tambien actualizar el select de clientes en ventas
        cargarClientesSelect();
    } catch (error) {
        console.error('Error cargando clientes:', error);
        alert('Error al cargar clientes');
    }
}

// Cargar proveedores en la tabla
async function cargarProveedores() {
    try {
        const response = await fetch(`${API_URL}/proveedores`);
        const proveedores = await response.json();

        const tbody = document.querySelector('#tablaProveedores tbody');
        tbody.innerHTML = '';

        proveedores.forEach(proveedor => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${proveedor.ID_Proveedor}</td>
                <td>${proveedor.Nombre}</td>
                <td>${proveedor.Telefono}</td>
                <td>${proveedor.Correo}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error cargando proveedores:', error);
        alert('Error al cargar proveedores');
    }
}

// Cargar ventas en la tabla
async function cargarVentas() {
    try {
        const response = await fetch(`${API_URL}/ventas`);
        const ventas = await response.json();

        const tbody = document.querySelector('#tablaVentas tbody');
        tbody.innerHTML = '';

        ventas.forEach(venta => {
            const tr = document.createElement('tr');
            const fecha = new Date(venta.Fecha_Venta).toLocaleDateString();
            tr.innerHTML = `
                <td>${venta.ID_Venta}</td>
                <td>${fecha}</td>
                <td>${venta.Cliente}</td>
                <td>${venta.Producto}</td>
                <td>${venta.Cantidad_Vendida}</td>
                <td>$${parseFloat(venta.Total_Detalle).toFixed(2)}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error cargando ventas:', error);
        alert('Error al cargar ventas');
    }
}

// Cargar inventario en la tabla
async function cargarInventario() {
    try {
        const response = await fetch(`${API_URL}/inventario`);
        inventarioCompleto = await response.json();

        mostrarInventario(inventarioCompleto);
    } catch (error) {
        console.error('Error cargando inventario:', error);
        alert('Error al cargar inventario');
    }
}

// Mostrar inventario en la tabla
function mostrarInventario(datos) {
    const tbody = document.querySelector('#tablaInventario tbody');
    tbody.innerHTML = '';

    datos.forEach(item => {
        const tr = document.createElement('tr');

        /* SE ELIMINA LA LOGICA DEL BADGE DE ESTADO */

        tr.innerHTML = `
            <td>${item.ID_Producto}</td>
            <td>${item.Nombre}</td>
            <td>${item.Tipo}</td>
            <td>${item.Talla}</td>
            <td>${item.Color}</td>
            <td>${item.Cantidad_Stock}</td>`;
        tbody.appendChild(tr);
    });
}

// CARGAR SELECTS DINAMICAMENTE

// Cargar clientes en el select de ventas
async function cargarClientesSelect() {
    try {
        const response = await fetch(`${API_URL}/clientes`);
        const clientes = await response.json();

        const select = document.getElementById('venta_cliente');
        select.innerHTML = '<option value="">Seleccionar cliente...</option>';

        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.ID_Cliente;
            option.textContent = cliente.Nombre;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error cargando clientes para select:', error);
    }
}

// Cargar productos en el select de ventas
async function cargarProductosSelect() {
    try {
        const response = await fetch(`${API_URL}/productos`);
        const productos = await response.json();

        const select = document.getElementById('venta_producto');
        select.innerHTML = '<option value="">Seleccionar producto...</option>';

        productos.forEach(producto => {
            const option = document.createElement('option');
            option.value = producto.ID_Producto;
            option.textContent = `${producto.Nombre} - ${producto.Tipo} (Stock: ${producto.Cantidad_Stock})`;
            option.dataset.stock = producto.Cantidad_Stock;
            option.dataset.precio = producto.Precio;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error cargando productos para select:', error);
    }
}

// Cargar proveedores en el select de productos
async function cargarProveedoresSelect() {
    try {
        const response = await fetch(`${API_URL}/proveedores`);
        const proveedores = await response.json();

        const select = document.getElementById('prod_proveedor');
        select.innerHTML = '<option value="">Seleccionar proveedor...</option>';

        proveedores.forEach(proveedor => {
            const option = document.createElement('option');
            option.value = proveedor.ID_Proveedor;
            option.textContent = proveedor.Nombre;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error cargando proveedores para select:', error);
    }
}

// FUNCIONES PARA ENVIAR FORMULARIOS

// Agregar producto
document.getElementById('formProducto').addEventListener('submit', async (e) => {
    e.preventDefault();

    const producto = {
        nombre: document.getElementById('prod_nombre').value,
        tipo: document.getElementById('prod_tipo').value,
        talla: document.getElementById('prod_talla').value,
        color: document.getElementById('prod_color').value,
        precio: document.getElementById('prod_precio').value,
        cantidad: document.getElementById('prod_cantidad').value,
        id_proveedor: document.getElementById('prod_proveedor').value
    };

    try {
        const response = await fetch(`${API_URL}/productos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Producto agregado exitosamente');
            document.getElementById('formProducto').reset();
            cargarProductos();
            cargarInventario();
        } else {
            alert('Error: ' + result.error);
        }
    } catch (error) {
        console.error('Error agregando producto:', error);
        alert('Error al agregar producto');
    }
});

// Agregar cliente
document.getElementById('formCliente').addEventListener('submit', async (e) => {
    e.preventDefault();

    const cliente = {
        nombre: document.getElementById('cliente_nombre').value,
        direccion: document.getElementById('cliente_direccion').value,
        telefono: document.getElementById('cliente_telefono').value,
        correo: document.getElementById('cliente_correo').value
    };

    try {
        const response = await fetch(`${API_URL}/clientes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cliente)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Cliente agregado exitosamente');
            document.getElementById('formCliente').reset();
            cargarClientes();
        } else {
            alert('Error: ' + result.error);
        }
    } catch (error) {
        console.error('Error agregando cliente:', error);
        alert('Error al agregar cliente');
    }
});

// Agregar proveedor
document.getElementById('formProveedor').addEventListener('submit', async (e) => {
    e.preventDefault();

    const proveedor = {
        nombre: document.getElementById('prov_nombre').value,
        telefono: document.getElementById('prov_telefono').value,
        correo: document.getElementById('prov_correo').value
    };

    try {
        const response = await fetch(`${API_URL}/proveedores`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(proveedor)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Proveedor agregado exitosamente');
            document.getElementById('formProveedor').reset();
            cargarProveedores();
            cargarProveedoresSelect();
        } else {
            alert('Error: ' + result.error);
        }
    } catch (error) {
        console.error('Error agregando proveedor:', error);
        alert('Error al agregar proveedor');
    }
});

// Registrar venta
document.getElementById('formVenta').addEventListener('submit', async (e) => {
    e.preventDefault();

    const venta = {
        id_cliente: document.getElementById('venta_cliente').value,
        id_producto: document.getElementById('venta_producto').value,
        cantidad: parseInt(document.getElementById('venta_cantidad').value)
    };

    // Validar que hay stock suficiente
    const productoSelect = document.getElementById('venta_producto');
    const productoSeleccionado = productoSelect.options[productoSelect.selectedIndex];
    const stockDisponible = parseInt(productoSeleccionado.dataset.stock);

    if (venta.cantidad > stockDisponible) {
        alert(`Stock insuficiente. Solo hay ${stockDisponible} unidades disponibles.`);
        return;
    }

    try {
        const response = await fetch(`${API_URL}/ventas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(venta)
        });

        const result = await response.json();

        if (response.ok) {
            alert(`Venta registrada exitosamente. Total: $${result.total.toFixed(2)}`);
            document.getElementById('formVenta').reset();
            cargarVentas();
            cargarProductos();
            cargarInventario();
        } else {
            alert('Error: ' + result.error);
        }
    } catch (error) {
        console.error('Error registrando venta:', error);
        alert('Error al registrar venta');
    }
});

// FUNCION PARA APLICAR FILTROS EN INVENTARIO

function aplicarFiltros() {
    const tipo = document.getElementById('filtro_tipo').value;
    const talla = document.getElementById('filtro_talla').value;
    const color = document.getElementById('filtro_color').value;

    let datosFiltrados = inventarioCompleto;

    if (tipo) {
        datosFiltrados = datosFiltrados.filter(item => item.Tipo === tipo);
    }
    if (talla) {
        datosFiltrados = datosFiltrados.filter(item => item.Talla === talla);
    }
    if (color) {
        datosFiltrados = datosFiltrados.filter(item => item.Color === color);
    }

    mostrarInventario(datosFiltrados);
}

// NAVEGACION ENTRE SECCIONES

const menuItems = document.querySelectorAll('.menu-item');
const sections = document.querySelectorAll('.section');

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remover clase active de todos
        menuItems.forEach(mi => mi.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));

        // Agregar clase active al seleccionado
        item.classList.add('active');
        const sectionId = item.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');

        // Cargar datos segun la seccion
        switch(sectionId) {
            case 'productos':
                cargarProductos();
                cargarProveedoresSelect();
                break;
            case 'ventas':
                cargarVentas();
                cargarClientesSelect();
                cargarProductosSelect();
                break;
            case 'clientes':
                cargarClientes();
                break;
            case 'proveedores':
                cargarProveedores();
                break;
            case 'inventario':
                cargarInventario();
                break;
        }
    });
});

// CARGAR DATOS INICIALES AL CARGAR LA PAGINA

window.addEventListener('DOMContentLoaded', () => {
    console.log('Aplicacion iniciada');
    cargarProductos();
    cargarClientesSelect();
    cargarProductosSelect();
    cargarProveedoresSelect();
});