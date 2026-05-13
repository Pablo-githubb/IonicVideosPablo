# 📚 Índex de Documentació - IonicVideosAppPablo

Benvingut! Aquí trobaràs tota la informació necessària per entendre, configurar i desenvolupar el projecte.

---

## 🚀 Per Começar Ràpid

### Primeiro Setup (5 minuts)
1. Consulta: **[SETUP.md](./SETUP.md)**
2. O executa: `bash setup.sh`
3. Backend: `cd api-backend && php artisan serve`
4. Frontend: `npm run dev`
5. Obrir: `http://localhost:5173`

---

## 📖 Documentació per Rol

### 👨‍💼 Per a Project Managers
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Resum complet de què s'ha fet
- **[VERIFICATION_CHECKLIST.md](./VERIFICATION_CHECKLIST.md)** - Checklist de verificació

### 👨‍💻 Per a Developers Backend
- **[SETUP.md](./SETUP.md)** - Setup backend (secció Backend)
- **[API.md](./API.md)** - Documentació completa endpoints
- `api-backend/README.md` - Guia backend específica
- `api-backend/routes/api.php` - Definició rutas
- `api-backend/app/Http/Controllers/Api/` - Controllers
- `api-backend/app/Models/` - Models

### 👨‍💻 Per a Developers Frontend
- **[README.md](./README.md)** - Guia frontend
- **[SETUP.md](./SETUP.md)** - Setup frontend (secció Frontend)
- **[API.md](./API.md)** - Endpoints per consumir
- `src/services/` - API services
- `src/stores/` - Pinia stores
- `src/views/` - Vue components
- `src/components/` - Reusable components

### 🧪 Per a QA/Testers
- **[VERIFICATION_CHECKLIST.md](./VERIFICATION_CHECKLIST.md)** - Test cases checklist
- **[SETUP.md](./SETUP.md)** - Com setup per testejar
- `tests/e2e/specs/auth.cy.ts` - E2E tests (Cypress)
- `api-backend/tests/Feature/` - Backend tests

---

## 🗺️ Mapa del Projecte

```
IonicVideosAppPablo/
│
├── 📄 DOCUMENTACIÓ (read first!)
│   ├── README.md                    ← Frontend guide
│   ├── SETUP.md                     ← Setup instructions
│   ├── API.md                       ← API reference
│   ├── IMPLEMENTATION_SUMMARY.md    ← Project overview
│   ├── VERIFICATION_CHECKLIST.md    ← QA checklist
│   └── INDEX.md                     ← This file
│
├── 🎨 FRONTEND (Ionic Vue)
│   ├── src/
│   │   ├── components/              ← Reusable Vue components
│   │   │   ├── AppNavbar.vue        ← Navigation
│   │   │   ├── AppFooter.vue        ← Footer
│   │   │   └── MediaCard.vue        ← Media display
│   │   ├── views/                   ← Page components
│   │   │   ├── HomePage.vue         ← Public gallery
│   │   │   ├── LoginPage.vue        ← Login form
│   │   │   ├── RegisterPage.vue     ← Register form
│   │   │   ├── UserPage.vue         ← User dashboard
│   │   │   ├── MediaCreatePage.vue  ← Upload media
│   │   │   ├── MediaEditPage.vue    ← Edit media
│   │   │   └── FolderPage.vue       ← Folder view
│   │   ├── services/                ← API services
│   │   │   ├── api.ts               ← Axios config
│   │   │   ├── authService.ts       ← Auth API calls
│   │   │   └── multimediaService.ts ← Media API calls
│   │   ├── stores/                  ← Pinia stores
│   │   │   └── authStore.ts         ← Auth state management
│   │   ├── router/
│   │   │   └── index.ts             ← Route definitions
│   │   ├── App.vue                  ← Root component
│   │   └── main.ts                  ← Entry point
│   │
│   ├── tests/
│   │   ├── unit/
│   │   │   └── authStore.spec.ts    ← Vitest tests
│   │   └── e2e/
│   │       └── specs/
│   │           └── auth.cy.ts       ← Cypress tests
│   │
│   ├── package.json                 ← Dependencies
│   ├── vite.config.ts               ← Build config
│   ├── tsconfig.json                ← TypeScript config
│   └── ionic.config.json            ← Ionic config
│
├── 🔧 BACKEND (Laravel API)
│   └── api-backend/
│       ├── app/
│       │   ├── Models/
│       │   │   ├── User.php         ← User model
│       │   │   └── Multimedia.php   ← Multimedia model
│       │   ├── Http/Controllers/Api/
│       │   │   ├── ApiAuthController.php       ← Auth endpoints
│       │   │   └── ApiMultimediaController.php ← Media endpoints
│       │   └── Policies/
│       │       └── MultimediaPolicy.php        ← Authorization
│       │
│       ├── database/
│       │   └── migrations/
│       │       ├── create_users_table.php
│       │       ├── create_multimedias_table.php
│       │       └── create_personal_access_tokens_table.php
│       │
│       ├── routes/
│       │   └── api.php               ← API routes definition
│       │
│       ├── tests/
│       │   ├── Feature/
│       │   │   ├── AuthApiTest.php           ← Auth tests
│       │   │   └── MultimediaApiTest.php     ← Media tests
│       │   └── TestCase.php
│       │
│       ├── .env                     ← Environment config
│       ├── composer.json            ← PHP dependencies
│       └── phpunit.xml              ← Test config
│
├── 📦 Scripts
│   ├── package.json                 ← npm scripts
│   ├── setup.sh                     ← Auto setup script
│   └── .env.example                 ← Env template
│
└── ⚙️ Configuration
    ├── .eslintrc.cjs                ← ESLint config
    ├── cypress.config.ts            ← Cypress config
    ├── capacitor.config.ts          ← Capacitor config
    └── tsconfig.json                ← TypeScript config
```

---

## 🔄 Flux de Dades

```
FRONTEND                                BACKEND
(Ionic Vue)                             (Laravel API)
                                        
[HomePage] ──GET /api/multimedia────→ [ApiMultimediaController::index]
           ←──json (paginated)─────── 
                                        
[LoginPage] ──POST /api/login────────→ [ApiAuthController::login]
            ←──{user, token}────────── 
                                        
[RegisterPage] ──POST /api/register──→ [ApiAuthController::register]
                ←──{user, token}────── 
                                        
[UserPage] ──GET /api/my-multimedia──→ [ApiMultimediaController::myMultimedia]
           ←──json (user's media)──── 
                                        
[MediaCreatePage] ──POST /api/multimedia (multipart)──→ [ApiMultimediaController::store]
                   ←──{id, url, ...}────────────────── 
                                        
[MediaEditPage] ──PUT /api/multimedia/{id}──→ [ApiMultimediaController::update]
                ←──{updated media}─────────── 
                                        
[MediaCard] ──DELETE /api/multimedia/{id}──→ [ApiMultimediaController::destroy]
            ←──{"message": "deleted"}───────
```

---

## 🔐 Authentication Flow

```
1. USER → RegisterPage
           │
           ├─→ POST /api/register
           │   Backend validates & creates user
           │   Returns token
           │
           └─→ localStorage.setItem('auth_token', token)
               Redirects to /user

2. USER → LoginPage
           │
           ├─→ POST /api/login
           │   Backend validates credentials
           │   Returns token
           │
           └─→ localStorage.setItem('auth_token', token)
               Redirects to /user

3. ALL API REQUESTS (protected)
           │
           ├─→ Axios Interceptor adds:
           │   Authorization: Bearer {token}
           │
           └─→ Backend validates token (Sanctum)

4. USER → Logout
           │
           ├─→ POST /api/logout (with token)
           │   Backend revokes token
           │
           └─→ localStorage.removeItem('auth_token')
               Redirects to /home
```

---

## 🚀 Executar Per Primera Vegada

### Opció 1: Automàtica (Recomanat)
```bash
chmod +x setup.sh
./setup.sh
```

### Opció 2: Manual Pas a Pas
```bash
# Backend setup
cd api-backend
composer install
php artisan migrate
php artisan storage:link
php artisan serve

# Frontend setup (new terminal)
cd ..
npm install
npm run dev
```

### Verificació
```bash
# Check backend
curl http://localhost:8000/api/multimedia

# Frontend
Open http://localhost:5173 in browser
```

---

## 🧪 Executar Tests

### Backend Tests
```bash
cd api-backend
php artisan test
```

### Frontend Unit Tests
```bash
npm run test:unit
```

### Frontend E2E Tests
```bash
npm run test:e2e
```

---

## 📝 Scripts npm disponibles

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test:unit    # Run unit tests
npm run test:e2e     # Run E2E tests
npm run lint         # Run ESLint
```

---

## 🔗 Links Ràpids

| Document | Propòsit |
|----------|----------|
| [README.md](./README.md) | Frontend guide complet |
| [SETUP.md](./SETUP.md) | Setup instructions |
| [API.md](./API.md) | API endpoints reference |
| [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) | Project overview |
| [VERIFICATION_CHECKLIST.md](./VERIFICATION_CHECKLIST.md) | QA test checklist |

---

## 📞 Suport

### Common Issues
- Consulta [SETUP.md](./SETUP.md) secció "Solució de problemes"
- Revisa [API.md](./API.md) secció "Error Responses"
- Check browser console (DevTools)
- Check backend logs: `storage/logs/laravel.log`

### Getting Help
1. Read the relevant documentation
2. Check the verification checklist
3. Review error messages carefully
4. Check console/logs for detailed errors

---

## 🎯 Project Status

✅ **COMPLETE & PRODUCTION READY**

- All features implemented
- All tests passing
- Documentation complete
- Ready for deployment

**Last Updated**: May 13, 2026
**Version**: 1.0.0

---

**Happy Coding! 🚀**

