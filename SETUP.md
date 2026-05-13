# 🚀 Setup Complet IonicVideosAppPablo + Backend

Guia completa per configurar i ejecutar tot el projecte end-to-end.

---

## 📋 Estructura del Projecte

```
IonicVideosAppPablo/
├── api-backend/          # API Laravel (REST)
├── src/                  # Frontend Vue + Ionic
├── tests/                # Tests E2E
└── README.md
```

---

## ⚙️ Setup Backend (Laravel API)

### 1. Navega a la carpeta backend

```bash
cd api-backend
```

### 2. Instal·la dependències PHP

```bash
composer install
```

### 3. Copia el fitxer .env (ja existeix configurat)

```bash
# .env ja existeix, verifica:
cat .env
```

Paràmetres claus:
- `APP_URL=http://localhost:8000`
- `DB_CONNECTION=sqlite` (base de dades local)
- `FILESYSTEM_DISK=public` (per arxius)

### 4. Genera la clau d'aplicació (si cal)

```bash
php artisan key:generate
```

### 5. Crea symlink per a storage (important!)

```bash
php artisan storage:link
```

### 6. Executa les migracions

```bash
php artisan migrate
```

### 7. (Opcional) Siembra la base de dades

```bash
php artisan db:seed
```

### 8. Inicia el servidor

```bash
php artisan serve
```

**El backend estarà disponible a**: `http://localhost:8000`
**API Endpoints**: `http://localhost:8000/api`

---

## 🎨 Setup Frontend (Ionic Vue)

### 1. Torna a la carpeta root

```bash
cd ..
```

### 2. Instal·la dependències Node

```bash
npm install
```

### 3. Verifica la URL de l'API

Obrir `src/services/api.ts` i confirmar:

```typescript
const API_URL = 'http://localhost:8000/api';
```

### 4. Inicia el servidor de desarrollo

```bash
npm run dev
```

**L'app estarà disponible a**: `http://localhost:5173`

---

## ✅ Verificació ràpida

### 1. Backend funciona?

```bash
curl http://localhost:8000/api/multimedia
```

Hauria de retornar JSON amb estructura:
```json
{
  "data": [],
  "meta": { ... }
}
```

### 2. Frontend funciona?

Obrir `http://localhost:5173` al navegador. Hauria de veure:
- Navbar amb logo "📹 Ionic Videos App"
- Home amb galeria buida
- Botons de Login/Register

### 3. Provar registre i login

1. Clic a "Register"
2. Omplir formulari amb dades fictícies
3. Hauria de redirigir a `/user` (dashboard)
4. Logout i provar login

---

## 🧪 Tests

### Backend - Tests API

```bash
cd api-backend

# Executar tots els tests
php artisan test

# Executar test específic
php artisan test --filter=MultimediaApiTest
php artisan test --filter=AuthApiTest
```

### Frontend - Tests Unitaris

```bash
cd ..

# Executar tests Vue/Pinia
npm run test:unit

# Veure resultats
npm run test:unit -- --ui
```

### Frontend - Tests E2E

```bash
# Obrir Cypress interactiu (necessita el frontend i backend corrent)
npm run test:e2e

# O executar headless
npm run test:e2e -- --headless
```

---

## 📁 Arxius principals creats

### Backend
- `tests/Feature/AuthApiTest.php` - Tests autenticació API
- `tests/Feature/MultimediaApiTest.php` - Tests multimedia CRUD
- `app/Policies/MultimediaPolicy.php` - Authorization policies

### Frontend
- `src/components/AppNavbar.vue` - Navegació principal
- `src/components/AppFooter.vue` - Footer
- `src/components/MediaCard.vue` - Card media reutilitzable
- `src/views/MediaEditPage.vue` - Editar media
- `src/services/multimediaService.ts` - API multimedia service
- `src/services/authService.ts` - API auth service
- `src/stores/authStore.ts` - Pinia auth store
- `tests/unit/authStore.spec.ts` - Tests auth store
- `tests/e2e/specs/auth.cy.ts` - Tests E2E Cypress

---

## 🔐 Flux d'Autenticació

### Registre
1. User ompleix formulari → `/register`
2. POST `/api/register` amb `{name, email, password, password_confirmation}`
3. Backend retorna `{user, token}`
4. Frontend guarda token a `localStorage`
5. Redirecció a `/user`

### Login
1. User emplir formulari → `/login`
2. POST `/api/login` amb `{email, password}`
3. Backend retorna `{user, token}`
4. Frontend guarda token a `localStorage`
5. Redirecció a `/user`

### Logout
1. Clic a "Logout"
2. POST `/api/logout` (amb token)
3. Token es borra al servidor (Sanctum)
4. Frontend borra token de `localStorage`
5. Redirecció a `/home`

---

## 🎯 Flux de CRUD Media

### Llistar Tot (públic)
```
GET /api/multimedia → HomePage
```

### Llistar Propi (autenticat)
```
GET /api/my-multimedia → UserPage
```

### Crear (autenticat)
```
POST /api/multimedia
{
  title: string,
  description: string,
  file: File (multipart/form-data)
}
```

### Actualitzar (autenticat, owner)
```
PUT /api/multimedia/{id}
{
  title: string,
  description: string
}
```

### Eliminar (autenticat, owner)
```
DELETE /api/multimedia/{id}
```

---

## 🛠️ Solució de problemes comuns

### Error: CORS blocked

**Causa**: Backend no accepta peticions del frontend

**Solució**: Backend ja té CORS configurat. Si falla, verifica:
```bash
# Al backend, comprova config/cors.php o middleware
php artisan config:cache
php artisan route:clear
```

### Error: "Cannot POST /api/multimedia"

**Causa**: Ruta API no registrada correctament

**Solució**: Verifica `routes/api.php`:
```php
Route::apiResource('multimedia', ApiMultimediaController::class);
```

### Error: Storage link missing

**Causa**: No s'ha creat el symlink per a arxius públics

**Solució**:
```bash
cd api-backend
php artisan storage:link
```

### Error: Database locked (SQLite)

**Causa**: Permisos de base de dades

**Solució**:
```bash
cd api-backend
chmod 666 database/database.sqlite
chmod 777 database/
```

### Upload falla amb "413 Payload Too Large"

**Causa**: Límit de mida de fitxer

**Solució**: Edita `php.ini`:
```ini
upload_max_filesize = 200M
post_max_size = 200M
```

---

## 📊 Endpoints API Disponibles

### Auth (Public)
```
POST   /api/register          Register user
POST   /api/login             Login user
```

### Auth (Protected)
```
POST   /api/logout            Logout user
GET    /api/user              Get authenticated user
```

### Multimedia (Public)
```
GET    /api/multimedia        List all multimedia (paginated)
GET    /api/multimedia/{id}   Get single multimedia
```

### Multimedia (Protected)
```
GET    /api/my-multimedia     List user's multimedia
POST   /api/multimedia        Create new media
PUT    /api/multimedia/{id}   Update media
DELETE /api/multimedia/{id}   Delete media
```

---

## 🎓 Flux Típic d'Ús

### Primer cop (User nou)
1. ✅ Obre `http://localhost:5173`
2. ✅ Veu Home amb galeria pública
3. ✅ Clic a "Register"
4. ✅ Omplir i enviar formulari
5. ✅ Es redirigeix a Dashboard (buit)
6. ✅ Clic a "Upload New Media"
7. ✅ Selecciona arxiu (Filepond drag & drop)
8. ✅ Omplir título i descripció
9. ✅ Clic "Save Media"
10. ✅ Es redirigeix a Dashboard amb media nova
11. ✅ Clic "Logout"

### Session existent
1. ✅ Obre `http://localhost:5173`
2. ✅ Si té token a localStorage, és autenticat
3. ✅ Navbar mostra icons d'usuari
4. ✅ Pot veure i gestionar els seus media

---

## 📞 Info Addional

**Framework**: Ionic Vue + Laravel
**Base de dades**: SQLite
**Autenticació**: Laravel Sanctum
**Upload**: Filepond
**Tests**: Pest/Cypress
**Package Manager**: npm/composer

---

**Versió**: 1.0.0
**Data**: Maig 2026


