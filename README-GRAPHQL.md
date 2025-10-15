# Configuración de GraphQL para CourierSync Frontend

## Configuración del Backend

Para conectar el frontend con el backend GraphQL, necesitas configurar la URL del endpoint.

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto frontend con el siguiente contenido:

```env
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:8080/graphql
```

### Cambios Realizados

1. **Instalación de dependencias GraphQL:**
   - `@apollo/client`: Cliente GraphQL para React
   - `graphql`: Librería de GraphQL

2. **Configuración de Apollo Client:**
   - Archivo: `lib/apollo-client.ts`
   - Configuración del cliente con caché en memoria

3. **Tipos TypeScript:**
   - Archivo: `lib/graphql/types.ts`
   - Definición de tipos basados en los esquemas del backend

4. **Queries y Mutations:**
   - Archivo: `lib/graphql/queries.ts`
   - Definición de todas las operaciones GraphQL

5. **Hooks personalizados:**
   - `hooks/use-usuario.ts`: Para operaciones de usuario
   - `hooks/use-reference-data.ts`: Para datos de referencia (roles, departamentos, ciudades)

6. **Actualización de formularios:**
   - Formulario de registro ahora incluye campos para departamento, ciudad y rol
   - Validación actualizada para coincidir con los DTOs del backend
   - Formulario de edición de perfil completamente funcional

## Endpoints Disponibles

### Queries
- `usuarioById(id: ID!)`: Obtener usuario por ID
- `searchUsuarios(q: String, page: Int, size: Int)`: Buscar usuarios
- `roles(page: Int, size: Int)`: Obtener roles
- `departamentos(page: Int, size: Int)`: Obtener departamentos
- `ciudadesByDepartamento(idDepartamento: ID!)`: Obtener ciudades por departamento

### Mutations
- `createUsuario(input: CreateUsuarioInput!)`: Crear usuario
- `updateUsuario(input: UpdateUsuarioInput!)`: Actualizar usuario
- `deleteUsuario(id: ID!)`: Eliminar usuario

## Estructura de Datos

### CreateUsuarioInput
```typescript
{
  nombre: string
  correo: string
  telefono: string (exactamente 10 dígitos)
  fechaRegistro?: string (opcional)
  detalleDireccion: string
  idCiudad: string
  idDepartamento: string
  idRol: string
}
```

### Usuario
```typescript
{
  idUsuario: string
  nombre: string
  correo: string
  telefono: string
  fechaRegistro: string
  detalleDireccion: string
  idCiudad: string
  nombreCiudad: string
  idDepartamento: string
  nombreDepartamento: string
  idRol: string
  nombreRol: string
}
```

## Uso

1. Asegúrate de que el backend esté ejecutándose en `http://localhost:8080`
2. Configura la variable de entorno `NEXT_PUBLIC_GRAPHQL_ENDPOINT`
3. Ejecuta el frontend con `npm run dev`

## Flujo de Autenticación

### Registro
- El formulario de registro crea un nuevo usuario en el backend
- Los datos se almacenan en localStorage temporalmente
- Redirige al perfil después del registro exitoso

### Login
- **NOTA IMPORTANTE**: El backend no tiene endpoints de autenticación implementados
- El login actual es una implementación básica para desarrollo:
  - Verifica si existe un usuario en localStorage (del registro)
  - Valida que el email coincida
  - No valida contraseñas (implementación básica)
- En producción, necesitarías implementar autenticación real en el backend

## Notas Importantes

- El teléfono debe ser exactamente 10 dígitos sin espacios ni símbolos
- Los departamentos y ciudades están relacionados - al cambiar departamento se resetea la ciudad
- Los datos del usuario se almacenan temporalmente en localStorage (en producción usar un sistema de autenticación real)
- Todas las validaciones coinciden con las del backend
