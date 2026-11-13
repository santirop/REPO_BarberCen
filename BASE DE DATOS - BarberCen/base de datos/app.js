const formulario = document.getElementById("formCliente");
const lista = document.getElementById("listaClientes");
const estado = document.getElementById("estadoConexion");
const botonGuardar = document.getElementById("btnGuardar");
const botonCancelar = document.getElementById("btnCancelar");
const tituloFormulario = document.getElementById("titulo-formulario");

const campos = {
    id: document.getElementById("id_cliente"),
    nombre: document.getElementById("nombre"),
    apellido: document.getElementById("apellido"),
    telefono: document.getElementById("telefono"),
    email: document.getElementById("email")
};

function mostrarEstado(mensaje, error = false) {
    estado.textContent = mensaje;
    estado.style.color = error ? "#ff7777" : "#48b77a";
}

function escaparHTML(valor) {
    return String(valor ?? "").replace(/[&<>"']/g, caracter => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[caracter]);
}

function limpiarFormulario() {
    formulario.reset();
    campos.id.value = "";
    tituloFormulario.textContent = "Registrar cliente";
    botonGuardar.textContent = "Guardar cliente";
    botonCancelar.hidden = true;
}

async function cargarClientes() {
    lista.innerHTML = '<tr><td colspan="6">Cargando clientes...</td></tr>';

    const { data, error } = await window.supabaseClient
        .from("clientes")
        .select("id_cliente, nombre, apellido, telefono, email")
        .order("id_cliente", { ascending: true });

    if (error) {
        lista.innerHTML = '<tr><td colspan="6">No se pudieron cargar los clientes.</td></tr>';
        mostrarEstado("Error al consultar Supabase: " + error.message, true);
        return;
    }

    lista.innerHTML = "";

    if (!data.length) {
        lista.innerHTML = '<tr><td colspan="6">Todavía no hay clientes registrados.</td></tr>';
        mostrarEstado("Conectado a Supabase.");
        return;
    }

    data.forEach(cliente => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${escaparHTML(cliente.id_cliente)}</td>
            <td>${escaparHTML(cliente.nombre)}</td>
            <td>${escaparHTML(cliente.apellido)}</td>
            <td>${escaparHTML(cliente.telefono)}</td>
            <td>${escaparHTML(cliente.email)}</td>
            <td>
                <button class="accion" type="button" data-accion="editar" data-id="${cliente.id_cliente}">Editar</button>
                <button class="accion eliminar" type="button" data-accion="eliminar" data-id="${cliente.id_cliente}">Eliminar</button>
            </td>
        `;
        lista.appendChild(fila);
    });

    mostrarEstado("Conectado a Supabase. Clientes: " + data.length);
}

formulario.addEventListener("submit", async function(evento) {
    evento.preventDefault();

    const id = campos.id.value;
    const cliente = {
        nombre: campos.nombre.value.trim(),
        apellido: campos.apellido.value.trim(),
        telefono: campos.telefono.value.trim() || null,
        email: campos.email.value.trim() || null
    };

    botonGuardar.disabled = true;
    mostrarEstado(id ? "Actualizando cliente..." : "Guardando cliente...");

    let resultado;

    if (id) {
        resultado = await window.supabaseClient
            .from("clientes")
            .update(cliente)
            .eq("id_cliente", id);
    } else {
        resultado = await window.supabaseClient
            .from("clientes")
            .insert([cliente]);
    }

    botonGuardar.disabled = false;

    if (resultado.error) {
        mostrarEstado("No se pudo guardar: " + resultado.error.message, true);
        return;
    }

    limpiarFormulario();
    mostrarEstado(id ? "Cliente actualizado correctamente." : "Cliente registrado correctamente.");
    await cargarClientes();
});

lista.addEventListener("click", async function(evento) {
    const boton = evento.target.closest("button[data-accion]");
    if (!boton) return;

    const id = boton.dataset.id;
    const accion = boton.dataset.accion;

    if (accion === "editar") {
        const { data, error } = await window.supabaseClient
            .from("clientes")
            .select("*")
            .eq("id_cliente", id)
            .single();

        if (error) {
            mostrarEstado("No se pudo obtener el cliente: " + error.message, true);
            return;
        }

        campos.id.value = data.id_cliente;
        campos.nombre.value = data.nombre;
        campos.apellido.value = data.apellido;
        campos.telefono.value = data.telefono ?? "";
        campos.email.value = data.email ?? "";

        tituloFormulario.textContent = "Editar cliente";
        botonGuardar.textContent = "Actualizar cliente";
        botonCancelar.hidden = false;
        campos.nombre.focus();
    }

    if (accion === "eliminar") {
        if (!confirm("¿Querés eliminar este cliente?")) return;

        boton.disabled = true;
        const { error } = await window.supabaseClient
            .from("clientes")
            .delete()
            .eq("id_cliente", id);

        if (error) {
            boton.disabled = false;
            mostrarEstado("No se pudo eliminar: " + error.message, true);
            return;
        }

        mostrarEstado("Cliente eliminado correctamente.");
        await cargarClientes();
    }
});

botonCancelar.addEventListener("click", limpiarFormulario);

if (!window.supabaseClient) {
    mostrarEstado("Configurá la URL y la clave pública de Supabase en supabase-config.js.", true);
    lista.innerHTML = '<tr><td colspan="6">Falta configurar la conexión.</td></tr>';
} else {
    cargarClientes();
}
