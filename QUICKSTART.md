# ⚡ Quick Start Guide

## 30 Segons Setup

```bash
# 1. Setup automàtic
bash setup.sh

# 2. Backend (Terminal 1)
cd api-backend && php artisan serve

# 3. Frontend (Terminal 2)  
npm run dev

# 4. Browser
Open http://localhost:5173
```

---

## ✅ Tota la Funcionalitat Completada

### 🎯 Backend
- ✅ API REST amb 10 endpoints
- ✅ Autenticació Sanctum
- ✅ CRUD multimedia
- ✅ Policies d'autorització
- ✅ Tests completats

### 🎨 Frontend
- ✅ 7 vistes completes
- ✅ 3 components reutilitzables
- ✅ Responsive design
- ✅ Filepond upload
- ✅ localStorage tokens

### 🔗 Integración
- ✅ Axios amb interceptors
- ✅ CORS configurada
- ✅ Full authentication flow
- ✅ Error handling completo
- ✅ Success messages

### 📚 Documentació
- ✅ Guies setup completes
- ✅ API reference detallada
- ✅ Test cases
- ✅ Troubleshooting guide

---

## 🎮 Probar l'App

### Com a Guest (públic)
1. Obrir `http://localhost:5173`
2. Veure galeria pública (buida inicialment)
3. Clic Home a navbar per navegar

### Com a User (nou)
1. Clic "Register"
2. Omplir formulari
3. Auto-login i redirect a Dashboard
4. Clic "Upload New Media"
5. Drag & drop arxiu o clic per seleccionar
6. Omplir títol i descripció
7. Clic "Save Media"
8. Veure media a dashboard
9. Clic Edit per cambiar títol/descripció
10. Clic Delete per eliminar
11. Clic Logout per tancar sessió

---

## 🔧 Backend Endpoints

```
POST   /api/register                  → Register
POST   /api/login                     → Login
POST   /api/logout (protected)        → Logout
GET    /api/user (protected)          → Get user
GET    /api/multimedia                → List all (public)
GET    /api/multimedia/{id}           → Get one (public)
GET    /api/my-multimedia (protected) → List mine
POST   /api/multimedia (protected)    → Create
PUT    /api/multimedia/{id} (protected) → Update
DELETE /api/multimedia/{id} (protected) → Delete
```

---

## 📁 Important Files

### Frontend
- `src/services/api.ts` - API config (change URL here if needed)
- `src/stores/authStore.ts` - Auth state
- `src/router/index.ts` - Routes config

### Backend
- `routes/api.php` - API routes
- `app/Http/Controllers/Api/` - Controllers
- `.env` - Config

---

## 🧪 Testing

```bash
# Backend tests
cd api-backend && php artisan test

# Frontend unit tests
npm run test:unit

# Frontend E2E tests (needs both servers running)
npm run test:e2e
```

---

## 🐛 Common Issues

### "Cannot connect to API"
- Check: Backend running? `php artisan serve`
- Check: URL correct? `src/services/api.ts`

### "Storage link missing"
- Run: `cd api-backend && php artisan storage:link`

### "Permission denied"
- Run: `chmod 666 api-backend/database/database.sqlite`

### "Port 8000 in use"
- Kill: `lsof -ti:8000 | xargs kill -9`

---

## 📖 Full Documentation

- **[INDEX.md](./INDEX.md)** - Complete documentation index
- **[SETUP.md](./SETUP.md)** - Detailed setup instructions
- **[API.md](./API.md)** - API documentation
- **[README.md](./README.md)** - Frontend guide

---

## ✨ Features

- ✅ User Registration & Login
- ✅ Drag & Drop File Upload (Filepond)
- ✅ Responsive Mobile Design
- ✅ Edit & Delete Media
- ✅ Public Gallery
- ✅ User Dashboard
- ✅ Persistent Authentication
- ✅ Error Handling
- ✅ Loading States
- ✅ Form Validation

---

## 🚀 Status

**✅ PRODUCTION READY**

All features implemented and tested. Ready for deployment or further development.

---

Need help? Check the full documentation in [INDEX.md](./INDEX.md) or specific guides in [SETUP.md](./SETUP.md).

