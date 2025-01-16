async function listarProducto() {
    try {
        const conexion = await fetch("https://6785d041f80b78923aa47d9f.mockapi.io/products", {
            method: "GET", // Configura el método GET correctamente
        });

        if (!conexion.ok) {
            throw new Error(`Error en la conexión: ${conexion.status} ${conexion.statusText}`);
        }

        const conexionEstablecida = await conexion.json();
        return conexionEstablecida;

    } catch (error) {
        console.error("Hubo un error al listar los productos:", error);
        return []; // Retorna un array vacío en caso de error para evitar romper el flujo
    }
}

/*const crearProducto =async(nombre ,precio,imagen)=>{
    try{
        const response =await fetch(conexion,{
        method:"POST",
        headers:{
           'content-type':"application/json"
        },
        body: JSON.stringify({ nombre, precio,imagen})
    })
    const data =await response.json();
    return data;
    }catch(error){
        console.log("error al crear los productos", error)
    }
}*/

const crearProducto = async (nombre, precio, imagen) => {
    try {
      const response = await fetch('https://6785d041f80b78923aa47d9f.mockapi.io/products', {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Encabezado corregido
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
      throw error; // Vuelve a lanzar el error para que sea manejado en el `catch` del formulario
    }
  };
  
  const eliminarProducto = async (id) => {
    try {
      const response = await fetch(`https://6785d041f80b78923aa47d9f.mockapi.io/products/${id}`, {
        method: "DELETE", // Método DELETE
        headers: {
          "Content-Type": "application/json",
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error al borrar el producto: ${response.statusText}`);
      }
  
      const data = await response.json()
      return data;
      } catch (error) {
      console.log("Producto eliminado correctamente:", data);}}
  
 
export const servicesProducts = {
    listarProducto,
    crearProducto,
    eliminarProducto,

};
