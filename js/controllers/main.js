

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

   eliminar(card,id);
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


function eliminar(card, id) {
  const botonEliminar = card.querySelector('.delete-button');
  
  botonEliminar.addEventListener("click", async () => {
    try {
      // Llamada al servicio para eliminar el producto
      await servicesProducts.eliminarProducto(id);
      
      // Elimina el elemento del DOM
      card.remove();
      
      console.log(`Producto eliminado con ID: ${id}`);
    } catch (error) {
      // Manejo de errores
      console.error(`No se pudo eliminar el producto con ID: ${id}`, error);
    }
  });
}
