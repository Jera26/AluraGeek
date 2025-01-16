

import { servicesProducts } from "../service/product-service.js";

const productoContenedor = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");


export function crearCard({ nombre, precio, imagen, id }) {
  const card = document.createElement("div");
  card.classList.add("item");
  card.innerHTML = `
    
      <div class="items" data-product>
              <h3 class="item-title">${nombre}</h3>
              <img class="item-image" src="${imagen}" alt="Imagen del producto">
              <div class="item-details">
                <h4 class="item-price">$${precio}</h4>
                <button class="delete-button" data-id="${id}">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          
  `;
  return card;
}

const productRender = async () => {
  try {
    const listProduct = await servicesProducts.listarProducto();
    listProduct.forEach((product) => {
      const productCard = crearCard(product);
      productoContenedor.appendChild(productCard);
    });
  } catch (error) {
    console.error("Error al renderizar productos:", error);
  }
};

productRender();

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.querySelector("[data-nombre]").value;
  const precio = document.querySelector("[data-precio]").value;
  const imagen = document.querySelector("[data-imagen]").value;

  try {
    const nuevoProducto= await servicesProducts.crearProducto(nombre,precio,imagen);
    const nuevaCard= crearCard(nuevoProducto)
    productoContenedor.appendChild(nuevaCard)
  } catch (error) {
    console.log(error)
  }
  form.reset();
});

console.log('archivo cargado')


const eliminarProdu = async (id) => {
  try {
    // Selecciona el contenedor del producto y lo elimina del DOM
    const itemToDelete = document.querySelector(`[data-product='${id}']`);
    if (itemToDelete) {
      itemToDelete.remove(); // Elimina el producto del DOM
    }

    // Llamar al servicio para eliminar el producto en el servidor
    const productoEliminado = await servicesProducts.eliminarProducto(id);
    
    // Mostrar un mensaje al usuario de que el producto se eliminó correctamente
    alert(`Producto eliminado correctamente: ${JSON.stringify(productoEliminado)}`);
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    alert("Ocurrió un error al intentar eliminar el producto.");
  }
};

// Configurar el botón para eliminar el producto
document.querySelectorAll('.delete-button').forEach(button => {
  button.addEventListener('click', function() {
    const id = this.getAttribute('data-id'); // Obtener el ID del producto
    eliminarProducto(id); // Llamar a la función eliminarProducto
  });
});