# BarberCEN

Sistema de administración de barbería. La interfaz original se conserva y la gestión de clientes ahora utiliza Supabase (PostgreSQL) en lugar de MySQL/MAMP.

## Configuración

1. Crear un proyecto en [Supabase](https://supabase.com/).
2. Abrir **SQL Editor**, pegar el contenido de `supabase/schema.sql` y ejecutar.
3. En el panel del proyecto, copiar **Project URL** y **Publishable key**.
4. Abrir `BASE DE DATOS - BarberCen/base de datos/supabase-config.js` y reemplazar los dos valores de ejemplo.
5. Abrir `BASE DE DATOS - BarberCen/index.html` con Live Server.

## Qué funciona

- Listar clientes guardados en Supabase.
- Registrar clientes.
- Editar clientes.
- Eliminar clientes.
- Mostrar mensajes de conexión y errores.

## Seguridad

El SQL incluido habilita políticas públicas de lectura y escritura para facilitar las pruebas del trabajo práctico sin login. Cualquier persona que tenga acceso a la web podría consultar, agregar, modificar o eliminar registros. Usar únicamente con datos ficticios/de prueba. Antes de usar información real, agregar autenticación y políticas RLS por usuario/rol.

En el navegador solo se debe utilizar la **Publishable key**. Nunca publicar una **Secret key** ni una clave `service_role`.
