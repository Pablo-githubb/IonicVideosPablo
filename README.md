# 📱 VideosApp — Documentació Completa

**VideosApp** és una plataforma full-stack de gestió de vídeos formada per dos projectes:
- **Backend**: Laravel 13 (`/serveisprocessos/VideosAppPablo`)
- **Frontend**: Ionic Vue (`/interficies/IonicVideosAppPablo`)

---

## 📋 Taula de Continguts

1. [Requisits i Instal·lació](#requisits)
2. [Arquitectura del Sistema](#arquitectura)
3. [Sprint 1 — Autenticació i Helpers](#sprint-1)
4. [Sprint 2 — Model Video i Vistes](#sprint-2)
5. [Sprint 3 — Gestió Administrativa de Vídeos](#sprint-3)
6. [Sprint 4 — Permisos i Usuaris](#sprint-4)
7. [Sprint 5 — Creador dels Vídeos (user_id)](#sprint-5)
8. [Sprint 6 — Sèries i CRUD Regular](#sprint-6)
9. [Sprint 7 — Events i Notificacions en Temps Real](#sprint-7)
10. [Tutorial Pas a Pas](#tutorial)
11. [Tests](#tests)
12. [Comandes Útils](#comandes)

---

## ⚙️ Requisits i Instal·lació {#requisits}

### Requisits previs

| Programari | Versió |
|---|---|
| PHP | 8.3+ |
| Composer | 2.x |
| Node.js | 18.x+ |
| npm | 9.x+ |
| SQLite | 3.x |

### Instal·lació del Backend (Laravel)

```bash
cd serveisprocessos/VideosAppPablo

# 1. Instal·lar dependències PHP
composer install

# 2. Crear fitxer d'entorn
cp .env.example .env

# 3. Generar clau d'aplicació
php artisan key:generate

# 4. Crear la base de dades
touch database/database.sqlite

# 5. Executar migracions
php artisan migrate

# 6. Instal·lar dependències JS
npm install

# 7. Compilar assets
npm run build

# 8. Arrencar el servidor
php artisan serve
```

El backend estarà disponible a **http://localhost:8000**

### Instal·lació del Frontend (Ionic)

```bash
cd interficies/IonicVideosAppPablo

npm install
ionic serve
```

El frontend estarà disponible a **http://localhost:8100**

---

## 🏗️ Arquitectura del Sistema {#arquitectura}

```
┌─────────────────────────────────────────────────┐
│  Frontend Ionic Vue (port 8100)                 │
│  ├── src/views/       → Pàgines de l'app        │
│  ├── src/services/    → Cridades a l'API        │
│  ├── src/stores/      → Estat global (Pinia)    │
│  └── src/components/  → Components reutilitz.   │
└───────────────┬─────────────────────────────────┘
                │ HTTP / API REST (proxy Vite)
┌───────────────▼─────────────────────────────────┐
│  Backend Laravel 13 (port 8000)                 │
│  ├── routes/web.php   → Definició de rutes      │
│  ├── app/Controllers/ → Lògica de control       │
│  ├── app/Models/      → Eloquent ORM            │
│  ├── app/Events/      → Events broadcasting     │
│  ├── app/Listeners/   → Gestors d'events        │
│  └── database/        → Migracions i seeders    │
└───────────────┬─────────────────────────────────┘
                │ SQLite
┌───────────────▼─────────────────────────────────┐
│  Base de dades SQLite                           │
│  ├── users            → Usuaris i permisos      │
│  ├── videos           → Vídeos (user_id,        │
│  │                       series_id)             │
│  ├── series           → Sèries temàtiques       │
│  └── teams            → Equips d'usuaris        │
└─────────────────────────────────────────────────┘
```

---

## 🏃 Sprint 1 — Autenticació i Helpers {#sprint-1}

### Objectius
Configurar l'entorn de tests, autenticació amb Fortify i els helpers base per crear usuaris per defecte.

### Fitxers clau
- `app/helpers/helpers.php` → Funcions auxiliars globals
- `app/Providers/AppServiceProvider.php` → Registre de helpers i gates
- `database/migrations/0001_01_01_000000_create_users_table.php`

### Funcionalitats implementades

**1. Helpers de creació d'usuaris**

```php
// Crear usuari per defecte des de .env
createDefaultUser();
createDefaultProfessor();
```

**2. Autenticació completa**
- Registre de nous usuaris
- Login / Logout
- Recuperació de contrasenya per email
- Autenticació de dos factors (2FA)

### Tutorial: Registrar un usuari nou

1. Ves a `http://localhost:8000`
2. Fes clic a **Registrar-se**
3. Omple: Nom, Email, Contrasenya (mínim 8 caràcters), Confirmar contrasenya
4. Fes clic a **Register**
5. Seràs redirigit al dashboard

---

## 🎬 Sprint 2 — Model Video i Vistes {#sprint-2}

### Objectius
Crear el model `Video` amb accessors de data, vistes Blade per mostrar vídeos i tests TDD.

### Fitxers clau
- `app/Models/Video.php`
- `database/migrations/2025_01_01_000000_create_videos_table.php`
- `resources/views/videos/show.blade.php`
- `resources/views/videos/index.blade.php`

### Esquema de la taula `videos`

| Camp | Tipus | Descripció |
|---|---|---|
| `id` | bigint | Clau primària |
| `title` | string | Títol del vídeo |
| `description` | text | Descripció |
| `url` | string | URL de YouTube |
| `published_at` | timestamp | Data de publicació |
| `previous` | foreignId | ID del vídeo anterior |
| `next` | foreignId | ID del vídeo següent |
| `series_id` | foreignId | ID de la sèrie |
| `user_id` | foreignId | ID del creador |

### Accessors del model Video

```php
// Format llarg: "22 de maig de 2026"
$video->formatted_published_at

// Format relatiu: "fa 2 dies"
$video->formatted_for_humans_published_at

// Timestamp Unix
$video->published_at_timestamp
```

### Tutorial: Veure un vídeo

1. Ves a `http://localhost:8000/videos`
2. Fes clic a qualsevol targeta de vídeo
3. Es mostrarà la pàgina de detall amb reproductor, títol i descripció
4. Usa els botons ← → per navegar entre vídeos de la mateixa sèrie

---

## 🔧 Sprint 3 — Gestió Administrativa de Vídeos {#sprint-3}

### Objectius
Crear el panell administratiu `VideosManageController` amb CRUD complet protegit per gates.

### Fitxers clau
- `app/Http/Controllers/VideosManageController.php`
- `resources/views/videos/manage/index.blade.php`
- `resources/views/videos/manage/create.blade.php`
- `resources/views/videos/manage/edit.blade.php`
- `resources/views/videos/manage/delete.blade.php`

### Rutes disponibles

| Mètode | URL | Acció |
|---|---|---|
| GET | `/videos/manage` | Llistat de vídeos (gestió) |
| GET | `/videos/manage/create` | Formulari de creació |
| POST | `/videos/manage` | Desar nou vídeo |
| GET | `/videos/manage/{id}/edit` | Formulari d'edició |
| PUT | `/videos/manage/{id}` | Actualitzar vídeo |
| GET | `/videos/manage/{id}/delete` | Pàgina confirmació |
| DELETE | `/videos/manage/{id}` | Eliminar vídeo |

### Tutorial: Crear un vídeo com a gestor

1. Inicia sessió amb un compte que tingui permís `videos_manage_create`
2. Ves a `http://localhost:8000/videos/manage`
3. Fes clic a **Afegir Vídeo**
4. Omple el formulari:
   - **Títol**: Nom del vídeo
   - **Descripció**: Contingut descriptiu
   - **URL**: Enganxa la URL de YouTube (ex: `https://www.youtube.com/watch?v=xxxxx`)
   - **Sèrie**: Selecciona opcionalment una sèrie
5. Fes clic a **Guardar Vídeo**

---

## 👥 Sprint 4 — Permisos i Gestió d'Usuaris {#sprint-4}

### Objectius
Sistema de permisos granular per roles, CRUD d'usuaris administratiu i gates per a totes les accions.

### Fitxers clau
- `app/Http/Controllers/UsersManageController.php`
- `app/Http/Controllers/UsersController.php`
- `database/migrations/2026_05_20_000001_add_super_admin_and_permissions_to_users_table.php`
- `resources/views/users/manage/`

### Camps afegits a la taula `users`

| Camp | Tipus | Descripció |
|---|---|---|
| `super_admin` | boolean | Accés total sense permisos explícits |

### Sistema de permisos

Els permisos s'emmagatzemen a la taula `user_permissions`. Cada permís segueix el format:

```
{recurs}_manage_{acció}
```

**Permisos de vídeos:**
```
videos_manage_index   → Veure llista
videos_manage_create  → Veure formulari
videos_manage_store   → Desar nou vídeo
videos_manage_edit    → Veure formulari edició
videos_manage_update  → Actualitzar vídeo
videos_manage_delete  → Veure confirmació
videos_manage_destroy → Eliminar vídeo
```

**Permisos d'usuaris:**
```
users_manage_index / create / store / edit / update / delete / destroy
```

**Permisos de sèries:**
```
series_manage_index / create / store / edit / update / delete / destroy
```

### Tutorial: Assignar permisos a un usuari

```php
// Via codi (helpers.php)
$user->givePermission('videos_manage_index');
$user->givePermission('videos_manage_create');

// Superadmin (accés total)
$user->update(['super_admin' => true]);
```

Via interfície web (panell de gestió d'usuaris):
1. Ves a `http://localhost:8000/users/manage`
2. Fes clic a **Editar** a l'usuari desitjat
3. Activa els permisos necessaris
4. Fes clic a **Guardar**

---

## 🆔 Sprint 5 — Creador dels Vídeos (user_id) {#sprint-5}

### Objectius
Vincular cada vídeo al seu creador mitjançant `user_id`, garantint que els vídeos queden associats al compte que els ha pujat.

### Relació implementada

```php
// Video.php
public function user(): BelongsTo
{
    return $this->belongsTo(User::class);
}

// Ús
$video->user->name  // Nom del creador
$video->user_id     // ID del creador
```

### Assignació automàtica en crear un vídeo

```php
// VideosManageController / VideosController
Video::create([
    ...
    'user_id' => auth()->id(), // S'assigna automàticament
]);
```

---

## 📚 Sprint 6 — Sèries i CRUD Regular d'Usuaris {#sprint-6}

### Objectius
- Crear el model `Serie` amb relació 1:N a `Video`
- Implementar CRUD administratiu i públic de sèries
- Permetre als usuaris regulars crear/editar/eliminar els seus propis vídeos

### Fitxers nous

```
app/Models/Serie.php
app/Http/Controllers/SeriesManageController.php
app/Http/Controllers/SeriesController.php
database/migrations/2026_05_22_000001_create_series_table.php
resources/views/series/manage/index.blade.php
resources/views/series/manage/create.blade.php
resources/views/series/manage/edit.blade.php
resources/views/series/manage/delete.blade.php
resources/views/series/index.blade.php
resources/views/series/show.blade.php
resources/views/videos/create.blade.php
resources/views/videos/edit.blade.php
resources/views/videos/delete.blade.php
```

### Esquema de la taula `series`

| Camp | Tipus | Descripció |
|---|---|---|
| `id` | bigint | Clau primària |
| `title` | string | Títol de la sèrie |
| `description` | text | Descripció |
| `image` | string | URL imatge de portada |
| `user_name` | string | Nom del creador |
| `user_photo_url` | string | Foto del creador |
| `published_at` | timestamp | Data de publicació |

### Relació Serie ↔ Video

```
Serie (1) ──────────────── (N) Video
       hasMany                belongsTo
       (via series_id)
```

```php
// Serie.php
public function videos(): HasMany
{
    return $this->hasMany(Video::class, 'series_id');
}

// Video.php
public function serie(): BelongsTo
{
    return $this->belongsTo(Serie::class, 'series_id');
}
```

### Tutorial: Crear una sèrie

1. Inicia sessió amb un compte amb permís `series_manage_create`
2. Ves a **Gestió Sèries** al menú de navegació
3. Fes clic a **Crear Sèrie**
4. Omple el formulari:
   - **Títol**: Nom de la sèrie
   - **Descripció**: Descripció del contingut
   - **Imatge** (opcional): URL d'una imatge de portada
5. Fes clic a **Guardar Sèrie**

### Tutorial: Crear un vídeo com a usuari regular

1. Inicia sessió amb qualsevol compte
2. Ves a **Vídeos** al menú
3. Fes clic a **Afegir Vídeo** (botó visible per a usuaris autenticats)
4. Omple: Títol, Descripció, URL de YouTube, Sèrie (opcional)
5. Fes clic a **Guardar Vídeo**

> **Nota:** Els usuaris regulars només poden editar o eliminar **els seus propis vídeos**.

### Protecció d'Ownership

```php
// VideosController.php
if ($video->user_id !== auth()->id()
    && !auth()->user()->isSuperAdmin()
    && !auth()->user()->hasPermission('videos_manage_edit')
) {
    abort(403, 'No tens permís per editar aquest vídeo.');
}
```

### Tutorial: Veure les sèries (portal públic)

1. Inicia sessió
2. Fes clic a **Sèries** al menú de navegació
3. Pots cercar sèries pel seu títol o descripció
4. Fes clic a qualsevol sèrie per veure el seu contingut
5. La pàgina de detall mostra tots els vídeos de la sèrie ordenats cronològicament

---

## 🔔 Sprint 7 — Events i Notificacions en Temps Real {#sprint-7}

### Objectius
- Crear l'event `VideoCreated` que es dispara en crear un vídeo
- Listener `SendVideoCreatedNotification` envia correu als superadmins
- Broadcasting via Pusher per a notificacions push al navegador

### Fitxers nous

```
app/Events/VideoCreated.php
app/Listeners/SendVideoCreatedNotification.php
app/Providers/EventServiceProvider.php
resources/js/app.js  (configuració Echo + Pusher)
```

### Flux d'una notificació

```
Usuari crea vídeo
      ↓
Controller → Video::create()
      ↓
event(new VideoCreated($video))
      ↓
    ┌─────────────────────────────┐
    │                             │
    ▼                             ▼
Listener                    Broadcaster
SendVideoCreated            Pusher → canal 'videos'
Notification                      ↓
    │                       Navegador clients
    ▼                       (app.js Echo listener)
Mail als superadmins              ↓
                           Toast notificació UI
```

### Configuració de Pusher al .env

```env
BROADCAST_CONNECTION=pusher
PUSHER_APP_ID=el-teu-app-id
PUSHER_APP_KEY=la-teva-clau
PUSHER_APP_SECRET=el-teu-secret
PUSHER_APP_CLUSTER=mt1

# Exposar al frontend Vite
VITE_PUSHER_APP_KEY=${PUSHER_APP_KEY}
VITE_PUSHER_APP_CLUSTER=${PUSHER_APP_CLUSTER}
```

### Com funciona la notificació toast

Quan qualsevol usuari crea un vídeo, tots els navegadors connectats reben automàticament una notificació toast a la cantonada inferior dreta de la pantalla:

- Mostra el títol del nou vídeo
- Inclou un botó **Veure Vídeo** per navegar-hi directament
- Desapareix automàticament als 10 segons
- Es pot tancar manualment amb el botó ×

---

## 🎓 Tutorial Pas a Pas — Totes les Funcions {#tutorial}

### 1. Primera posada en marxa

```bash
# Terminal 1: Backend
cd serveisprocessos/VideosAppPablo
php artisan serve

# Terminal 2: Frontend Ionic
cd interficies/IonicVideosAppPablo
ionic serve
```

### 2. Crear el primer superadmin

```bash
php artisan tinker
```
```php
$user = App\Models\User::where('email', 'pablomaso@iesebre.com')->first();
$user->update(['super_admin' => true]);
```

### 3. Gestió completa de vídeos (gestor)

| Acció | URL | Permís necessari |
|---|---|---|
| Veure llista | `/videos/manage` | `videos_manage_index` |
| Crear vídeo | `/videos/manage/create` | `videos_manage_create` |
| Editar vídeo | `/videos/manage/{id}/edit` | `videos_manage_edit` |
| Eliminar vídeo | `/videos/manage/{id}/delete` | `videos_manage_delete` |

### 4. Gestió de sèries (gestor)

| Acció | URL | Permís necessari |
|---|---|---|
| Veure llista | `/series/manage` | `series_manage_index` |
| Crear sèrie | `/series/manage/create` | `series_manage_create` |
| Editar sèrie | `/series/manage/{id}/edit` | `series_manage_edit` |
| Eliminar sèrie | `/series/manage/{id}/delete` | `series_manage_delete` |

### 5. Gestió d'usuaris (gestor)

| Acció | URL | Permís necessari |
|---|---|---|
| Veure llista | `/users/manage` | `users_manage_index` |
| Crear usuari | `/users/manage/create` | `users_manage_create` |
| Editar usuari | `/users/manage/{id}/edit` | `users_manage_edit` |
| Eliminar usuari | `/users/manage/{id}/delete` | `users_manage_delete` |

### 6. Associar un vídeo a una sèrie

1. Crea primer la sèrie a `/series/manage/create`
2. Ves a crear o editar un vídeo
3. Al formulari, selecciona la sèrie al desplegable **Sèrie Associada**
4. Guarda els canvis

### 7. Navegar pel portal públic de sèries

1. Inicia sessió i fes clic a **Sèries** al navbar
2. Usa la barra de cerca per filtrar per títol o descripció
3. Fes clic a una sèrie per veure tots els seus vídeos
4. Fes clic a un vídeo per reproduir-lo

---

## 🧪 Tests {#tests}

### Executar tots els tests

```bash
# Des del directori del backend
php artisan test --compact

# O amb PHPUnit directament
vendor/bin/phpunit -c phpunit.xml
```

### Cobertura de tests (119 tests, 260 assertions)

| Sprint | Fitxer de test | Tests |
|---|---|---|
| Sprint 1 | `tests/Unit/HelpersTest.php` | Helpers i creació d'usuaris |
| Sprint 2 | `tests/Unit/VideoTest.php` | Accessors de dates |
| Sprint 2 | `tests/Feature/Videos/VideosTest.php` | Visualització pública |
| Sprint 3 | `tests/Feature/Videos/VideosManageControllerTest.php` | CRUD gestor |
| Sprint 4 | `tests/Feature/Users/UsersManageControllerTest.php` | CRUD usuaris |
| Sprint 6 | `tests/Unit/SerieTest.php` | Relació Serie-Video |
| Sprint 6 | `tests/Feature/Series/SeriesManageControllerTest.php` | CRUD sèries (15 tests) |
| Sprint 7 | `tests/Feature/Videos/VideoNotificationsTest.php` | Events i broadcasting |

### Executar un test concret

```bash
# Tots els tests de sèries
vendor/bin/phpunit tests/Feature/Series/SeriesManageControllerTest.php

# Tots els tests de notificacions
vendor/bin/phpunit tests/Feature/Videos/VideoNotificationsTest.php

# Un test específic
vendor/bin/phpunit --filter test_superadmins_can_manage_series
```

---

## 🗂️ Estructura Completa del Projecte {#estructura}

```
VideosAppPablo/ (Backend Laravel)
├── app/
│   ├── Events/
│   │   └── VideoCreated.php          # [Sprint 7] Event broadcasting
│   ├── Http/Controllers/
│   │   ├── VideosController.php      # [Sprint 6] CRUD usuaris regulars
│   │   ├── VideosManageController.php# [Sprint 3] CRUD gestors
│   │   ├── UsersController.php       # [Sprint 4] Portal d'usuaris
│   │   ├── UsersManageController.php # [Sprint 4] CRUD gestió usuaris
│   │   ├── SeriesController.php      # [Sprint 6] Portal públic sèries
│   │   └── SeriesManageController.php# [Sprint 6] CRUD gestió sèries
│   ├── Listeners/
│   │   └── SendVideoCreatedNotification.php # [Sprint 7]
│   ├── Models/
│   │   ├── Video.php                 # [Sprint 2+5+6] Model principal
│   │   ├── Serie.php                 # [Sprint 6] Model de sèries
│   │   └── User.php                  # [Sprint 1+4]
│   └── Providers/
│       ├── AppServiceProvider.php    # Gates i helpers
│       └── EventServiceProvider.php  # [Sprint 7] Mapa events
├── database/migrations/
│   ├── create_users_table.php
│   ├── create_videos_table.php
│   ├── add_super_admin_and_permissions.php # [Sprint 4]
│   └── create_series_table.php       # [Sprint 6]
├── resources/
│   ├── js/app.js                     # [Sprint 7] Echo + toasts
│   └── views/
│       ├── layouts/videos-app-layout.blade.php
│       ├── videos/
│       │   ├── index.blade.php       # Llista pública
│       │   ├── show.blade.php        # Detall vídeo
│       │   ├── create.blade.php      # [Sprint 6] Crear vídeo
│       │   ├── edit.blade.php        # [Sprint 6] Editar vídeo
│       │   ├── delete.blade.php      # [Sprint 6] Eliminar vídeo
│       │   └── manage/               # [Sprint 3] Vista gestors
│       ├── series/
│       │   ├── index.blade.php       # [Sprint 6] Portal sèries
│       │   ├── show.blade.php        # [Sprint 6] Detall sèrie
│       │   └── manage/               # [Sprint 6] Vista gestors
│       └── users/manage/             # [Sprint 4] Vista gestors
├── routes/web.php                    # Totes les rutes
└── tests/
    ├── Feature/
    │   ├── Series/SeriesManageControllerTest.php
    │   ├── Videos/VideosManageControllerTest.php
    │   ├── Videos/VideosTest.php
    │   ├── Videos/VideoNotificationsTest.php
    │   └── Users/UsersManageControllerTest.php
    └── Unit/
        ├── SerieTest.php
        └── VideoTest.php
```

---

## 🛠️ Comandes Útils {#comandes}

```bash
# Servidor de desenvolupament
php artisan serve

# Migracions
php artisan migrate              # Aplicar migracions pendents
php artisan migrate:fresh        # Recrear tota la BD
php artisan migrate:fresh --seed # Recrear BD + seeders

# Tests
vendor/bin/phpunit -c phpunit.xml          # Tots els tests
php artisan test --compact                  # Alternativa artisan

# Cache
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Assets
npm run dev    # Compilació en calent (desarrollo)
npm run build  # Build de producció

# Linting i format de codi
vendor/bin/pint         # Formatejar tot el codi PHP
vendor/bin/phpstan analyse  # Anàlisi estàtica

# Ionic Frontend
ionic serve              # Servidor de desarrollo
ionic build              # Build de producció
```

---

## 📦 Tecnologies

| Tecnologia | Versió | Ús |
|---|---|---|
| Laravel | 13.x | Backend PHP |
| Fortify | 1.x | Autenticació |
| PHPUnit | 12.x | Tests |
| SQLite | 3.x | Base de dades |
| Pusher | — | Broadcasting WebSocket |
| Laravel Echo | — | Client WebSocket |
| Vite | 8.x | Bundler d'assets |
| Ionic Vue | 8.x | Frontend mòbil |
| Pinia | 3.x | Estat global Vue |
| Axios | 1.x | HTTP client |

---

**Versió:** 7.0.0 | **Última actualització:** Maig 2026 | **Autor:** Pablo Masó
