// ***Definicion de productos para la venta***

// Definición de array de productos
const ListaProductos = [
    {codigo:101, descripcion:"Heladera", precio:300000},
    {codigo:102, descripcion:"Cocina", precio:300000},
    {codigo:103, descripcion:"Lavarropa", precio:400000},
    {codigo:104, descripcion:"Horno", precio:20000}, 
    {codigo:105, descripcion:"Batidora", precio:20000},
    {codigo:106, descripcion:"Cafetera", precio:42000},
    {codigo:107, descripcion:"Licuadora", precio:33000},
    {codigo:108, descripcion:"Televisor", precio:450000},
    {codigo:109, descripcion:"Estufa", precio:18000},
    {codigo:110, descripcion:"Tostadora", precio:12000}
];
//Incorporacion del IVA a todos los productos
ListaProductos.forEach(producto => {
    producto.precio = producto.precio * 1.21;
});

// ***Definicion del carrito  ***
let cart = loadCartFromLocalStorage();

// ***Función para agregar al carrito (se llama desde el botón de agregar al carrito)***
function addToCart(productId, quantity) {
    const product = ListaProductos.find(p => p.codigo === productId);
    if (!product) {
        const errorProd = document.getElementById('prodNoEncontrado');
        errorProd.innerText = `Producto no encontrado`;
        return;
    }

    // Buscar en el carrito si está el producto pasado por parametro (para sumar al existente o agregar uno nuevo)
    const cartItem = cart.find(item => item.id === productId);

    // Si el producto existe en el carrito, lo suma. Caso contrario, lo agrega
    if (cartItem) {
        cartItem.quantity += quantity;
        cartItem.totalPrice = cartItem.quantity * product.precio;
    } else {
        cart.push({
            id: product.codigo,
            name: product.descripcion,
            price: product.precio,
            quantity: quantity,
            totalPrice: quantity * product.precio
        });
    }
    saveCartToLocalStorage();
    renderCart();
}

// ***Función para eliminar item del carrito***
function removeFromCart(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        // Reducir la cantidad del producto en 1
        cartItem.quantity -= 1;
        cartItem.totalPrice = cartItem.quantity * cartItem.price;

        // Si la cantidad es 0, eliminar el producto del carrito
        if (cartItem.quantity === 0) {
            cart = cart.filter(item => item.id !== productId);
        }

        // Guardar el carrito actualizado en el localStorage
        saveCartToLocalStorage();

        // Renderizar el carrito actualizado
        renderCart();
    }
}

// ***Muestra los productos y posibilita agregarlos al carrito mediante un botón ***
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpiar la lista de productos
    ListaProductos.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <p>${product.descripcion} - $${product.precio}</p>
            <button onclick="addToCart(${product.codigo}, 1)" class="button_grey">Agregar al Carrito</button>
        `;
        productList.appendChild(productDiv);
    });
}

// **Función para actualizar los productos del carrito en el HTML***
function renderCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';
    if (cart.length === 0) {
        cartDiv.innerHTML = '<p>El carrito está vacío</p>';
        return;
    }
    //Generar el contenido del carrito 
    cartDiv.innerHTML = cart.map(item => `
    <div>
        <p>ID: ${item.id}, Nombre: ${item.name}, Cantidad: ${item.quantity}, Precio Total: $${item.totalPrice}</p>
        <button onclick="removeFromCart(${item.id})" class="button_red">Eliminar del carrito</button>
    </div> `).join('');

    // Calculo del total de la compra 
    let totaldesuCompra = 0;
    function calculoTotalCompra() {
        for (let index = 0; index < cart.length; index++) {
            totaldesuCompra = totaldesuCompra + cart[index].totalPrice;
        }
        return totaldesuCompra;
    }
    const sumaTotal = calculoTotalCompra();
    const importeCompra = document.getElementById('totalCompra');
    importeCompra.innerHTML = `
       <p>El importe de su compra es: ${totaldesuCompra} </p>
       <p>Puede pagar en efectivo y en cuotas, con los siguientes intereses: 1 cuota-2%, 2 cuotas-4%, 
    3 cuotas-6%, 6 cuotas-12%,  12 cuotas-20%.</p>`;
    importeCompra.style.fontSize = "1rem";
    importeCompra.style.fontWeight = "bold";
        const finalizarCompraDiv = document.getElementById('finalCompradiv');
    finalizarCompraDiv.innerHTML = `
    <button onclick="finalizarCompra(${totaldesuCompra})" class="button_red">Finalizar compra</button>
    `;
}

// ***Variable global para almacenar las cuotas
let cuotasValor = 0;

// ***Función para finalizar la compra***
function finalizarCompra(totalCompra) {
    const fin = document.getElementById('calculoFinanciado');
    fin.innerHTML = `
    <label for="cuotas">Ingrese la cantidad de cuotas (0, 1, 2, 3, 6, 12): </label>
    <input type="number" id="cuotas" min="0" max="12">
    <button onclick="procesarCuotas(${totalCompra})">Confirmar</button>
    `;
}

// ***Función para procesar las cuotas***
function procesarCuotas(totalCompra) {
    cuotasValor = parseInt(document.getElementById('cuotas').value);
    if (![0, 1, 2, 3, 6, 12].includes(cuotasValor)) {
        const errorCuotas = document.getElementById('errorCantCuotas');
        errorCuotas.innerText = `Las cuotas validas son (0, 1, 2, 3, 6, 12).`;
        errorCuotas.style.color = "red";
        errorCuotas.style.fontWeight = "bold";
    } else {
        // Llamar a la función de cálculo de cuotas con los valores correspondientes
        calcularCuotas(totalCompra, cuotasValor);
    }
}

// ***Función para calcular las cuotas***
function calcularCuotas(totalCompra, cuotas) {
    let porcentaje = 0;
    if (cuotas === 0) {
        // Si cuotas es 0, impCuota es igual a totalCompra
        const impCuota = totalCompra;
        const impFinanciado = totalCompra;
        const importeFinal = document.getElementById('calculoFinanciado');
        importeFinal.innerHTML = `
        <p>Importe: $${totalCompra}, Porcentaje: ${porcentaje}%, Importe cuota: $${impCuota.toFixed(2)}, Importe financiado: $${impFinanciado.toFixed(2)} </p>`;
        importeFinal.style.color = "red";
        importeFinal.style.fontWeight = "bold";
        importeFinal.style.fontSize = "1.2rem";
        return; // Salir de la función para evitar cálculos adicionales
    }

    if (cuotas === 1) porcentaje = 2;
    else if (cuotas === 2) porcentaje = 4;
    else if (cuotas === 3) porcentaje = 6;
    else if (cuotas === 6) porcentaje = 12;
    else if (cuotas === 12) porcentaje = 20;

    const impCuota = totalCompra * (1 + (porcentaje / 100)) / cuotas;
    const impFinanciado = totalCompra * (1 + (porcentaje / 100));

    const importeFinal = document.getElementById('calculoFinanciado');
    importeFinal.innerHTML = `
    <p>Importe: $${totalCompra}, Porcentaje: ${porcentaje}%, Importe cuota: $${impCuota.toFixed(2)}, Importe financiado: $${impFinanciado.toFixed(2)} </p>`
    importeFinal.style.color = "red";
    importeFinal.style.fontWeight = "bold";
    importeFinal.style.fontSize = "1.2rem";
}

// ***Guardar en el localStorage el carrito***
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// ***Recuperar del localStorage el carrito***
function loadCartFromLocalStorage() {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
}

// Traer el carrito del localStorage
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderCart();
});
