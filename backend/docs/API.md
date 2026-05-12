# OM Distribution API Documentation

## Endpoints Públicos

### Health Check
- **URL**: `/api/health`
- **Method**: `GET`
- **Description**: Verifies API and Database connectivity.

### Productos
- **URL**: `/api/products`
- **Method**: `GET`
- **Params**: `lang` (optional: `en` | `es`, default: `es`)
- **Response**: List of products with localized names and descriptions.

### Categorías
- **URL**: `/api/products/categories`
- **Method**: `GET`
- **Params**: `lang` (optional)

### Testimonios
- **URL**: `/api/testimonials`
- **Method**: `GET`
- **Params**: `lang` (optional)

### Contacto (Leads)
- **URL**: `/api/contact`
- **Method**: `POST`
- **Body**:
```json
{
  "full_name": "string",
  "email": "string",
  "phone": "string (optional)",
  "company_name": "string (optional)",
  "message": "string"
}
```

## Endpoints de Administración (Protegidos)

Requieren `Authorization: Bearer <access_token>` y rol `admin`.

### Auth
- **POST** `/api/auth/login`: Email y Password. Retorna AccessToken y setea Cookie RefreshToken.
- **POST** `/api/auth/refresh`: Usa la cookie para generar un nuevo AccessToken.
- **POST** `/api/auth/logout`: Invalida el token.

### Gestión de Productos
- **POST** `/api/products`: Crear producto.
- **PATCH** `/api/products/:id`: Editar producto.
- **DELETE** `/api/products/:id`: Eliminar producto.
