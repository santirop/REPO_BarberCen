import mysql from "mysql2/promise";
//Conexion a base de datos
const conexionconfig = {
    usuario:"root",
    contraseña:'root',
    servidor:'localhost',
}
//Funcion para conectar la base de datos
async function conectarBD() {
    try{
        const conexion = await mysql.createConecction
        (conexionconfig);
        console.log("Conexion exitosa a la base de datos");

        return conexion;
    } catch (error){
        console.error("Error al conectar a la base de datos: ", error);
        throw error;
    }
}

let clientes = [];
let siguienteId = 1;

const formulario = document.getElementById("formCliente");
const lista = document.getElementById("listaClientes");

formulario.addEventListener("submit", function(e) {
    e.preventDefault();

    let id = document.getElementById("id_cliente").value;

    let cliente = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        telefono: document.getElementById("telefono").value,
        email: document.getElementById("email").value
    };

    if (id) {
        clientes = clientes.map(c =>
            c.id == id ? { ...cliente, id: Number(id) } : c
        );
    } else {
        cliente.id = siguienteId++;
        clientes.push(cliente);
    }

    formulario.reset();
    document.getElementById("id_cliente").value = "";
    document.getElementById("titulo-formulario").textContent = "Registrar cliente";
    document.getElementById("btnGuardar").textContent = "Guardar cliente";

    mostrarClientes();
});

function mostrarClientes() {
    lista.innerHTML = "";

    clientes.forEach(cliente => {
        lista.innerHTML += `
            <tr>
                <td>${cliente.id}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.apellido}</td>
                <td>${cliente.telefono}</td>
                <td>${cliente.email}</td>
                <td>
                    <button class="accion" onclick="editarCliente(${cliente.id})">
                        Editar
                    </button>
                    <button class="accion eliminar" onclick="eliminarCliente(${cliente.id})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

function editarCliente(id) {
    let cliente = clientes.find(c => c.id === id);

    document.getElementById("id_cliente").value = cliente.id;
    document.getElementById("nombre").value = cliente.nombre;
    document.getElementById("apellido").value = cliente.apellido;
    document.getElementById("telefono").value = cliente.telefono;
    document.getElementById("email").value = cliente.email;

    document.getElementById("titulo-formulario").textContent = "Editar cliente";
    document.getElementById("btnGuardar").textContent = "Actualizar cliente";
}

function eliminarCliente(id) {
    if (confirm("¿Querés eliminar este cliente?")) {
        clientes = clientes.filter(c => c.id !== id);
        mostrarClientes();
    }
}

