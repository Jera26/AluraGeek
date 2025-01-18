const BASE_URL = 'https://6785d041f80b78923aa47d9f.mockapi.io/products';



async function listarProducto() {
    try {
        const conexion = await fetch(BASE_URL, {
            method: "GET", // Configura el método GET correctamente
        });

        if (!conexion.ok) {
            throw new Error(`Error en la conexión: ${conexion.status} ${conexion.statusText}`);
        }

        const conexionEstablecida = await conexion.json();
        return conexionEstablecida;

    } catch (error) {
        console.error("Hubo un error al listar los productos:", error);
        return []; 
    }
}



const crearProducto = async (nombre, precio, imagen) => {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ nombre, precio, imagen }), // Cuerpo de la solicitud
      });
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json(); // Invocación correcta
      return data;
    } catch (error) {
      console.error("Error al crear los productos:", error);
      throw error; 
    }
  };
  


  const eliminarProducto = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error al borrar el producto: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Producto eliminado correctamente:", data);
        return data;
    } catch (error) {
        console.log("Error al eliminar el producto:", error.message);
        throw error;
    }
};
  
export const servicesProducts = {
    listarProducto,
    crearProducto,
    eliminarProducto,
    

};
