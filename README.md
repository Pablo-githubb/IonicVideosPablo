# 📱 Ionic Videos App - Frontend (Pablo)

Aplicació móbil construïda amb **Ionic Vue** per a la gestió i visualització de vídeos i fotos. Permet als usuaris pujar, editar i eliminar contingut multimedia.

---

## ✨ Característiques

- **Autenticació completa**: Registre i login amb tokens Sanctum
- **Gestió de contingut multimedia**: CRUD complet (Crear, Llegir, Actualitzar, Eliminar)
- **Uploader amb Filepond**: Arrastrar i deixar anar arxius de vídeo/fotos
- **Dashboard d'usuari**: Veure tots els vídeos/fotos uploadats
- **Galeria pública**: Navegar per tot el contingut disponible
- **Responsive design**: Funciona perfectament en móbil, tablet i desktop
- **Navbar i Footer**: Navegació consistent a tota l'app
- **localStorage**: Persistència de tokens d'autenticació

---

## 🔧 Requisits previs

- Node.js 18+ i npm 9+
- Backend Laravel API funcionant a `http://localhost:8000`

---

## 🚀 Instal·lació

### 1. Instal·lar dependències

```bash
npm install
```

### 2. Configurar API Backend

Verifica que el backend estigui funcionant:

```bash
cd ../api-backend
php artisan serve
```

El backend hauria de respondre a `http://localhost:8000/api`

### 3. Iniciar l'app en mode desarrollo

```bash
npm run dev
```

L'app estarà disponible a `http://localhost:5173`

---

## 📖 Ús de l'aplicació

### 1. **Home** (Públic)
- Veure tots els vídeos i fotos uploadats per altres usuaris
- Navegar sense necessitat de login

### 2. **Login** (Sense autenticació)
- Introduïr email i contrasenya
- Redirecció automàtica al dashboard

### 3. **Register** (Sense autenticació)
- Crear nou compte amb nom, email i contrasenya
- Confirmació de contrasenya requerida

### 4. **My Dashboard** (Autenticat)
- Veure tots els teus vídeos i fotos
- Botó "Upload New Media" per a afegir contingut
- Botons Edit i Delete en cada media card

### 5. **Upload** (Autenticat)
- Introduïr títol i descripció
- Seleccionar arxiu usant Filepond (drag & drop)
- Suporta: MP4, MOV, AVI, WebM, JPEG, PNG, GIF
- Màxim 200MB per arxiu

### 6. **Edit** (Autenticat)
- Modificar títol i descripció de media existent
- El primer vídeo/foto no es pot canviar
- Guardar o cancel·lar

---

## 📁 Estructura del projecte

```
src/
├── components/
│   ├── AppNavbar.vue          # Barra de navegació
│   ├── AppFooter.vue          # Footer
│   └── MediaCard.vue          # Card per mostrar media
├── router/
│   └── index.ts               # Configuració de rutes
├── services/
│   ├── api.ts                 # Configuració d'axios
│   ├── authService.ts         # Serveis d'autenticació
│   └── multimediaService.ts   # Serveis de multimedia
├── stores/
│   └── authStore.ts           # Pinia store per autenticació
├── views/
│   ├── HomePage.vue           # Galeria pública
│   ├── LoginPage.vue          # Login
│   ├── RegisterPage.vue       # Registre
│   ├── UserPage.vue           # Dashboard d'usuari
│   ├── MediaCreatePage.vue    # Crear media
│   ├── MediaEditPage.vue      # Editar media
│   └── FolderPage.vue         # Folder (placeholder)
├── App.vue                    # Component principal
└── main.ts                    # Entry point
```

---

## 🌐 Variables d'entorn

El fitxer `src/services/api.ts` contè l'URL del backend:

```typescript
const API_URL = 'http://localhost:8000/api';
```

Per a canviar-ho, edita aquest fitxer directament o crea un fitxer `.env`:

```
VITE_API_URL=http://localhost:8000/api
```

---

## 🧪 Tests

Executar tests unitaris:

```bash
npm run test:unit
```

Executar tests e2e:

```bash
npm run test:e2e
```

---

## 🛠️ Scripts disponibles

| Script | Descripció |
|--------|-----------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Construeix per producció |
| `npm run preview` | Previsualitza build de producció |
| `npm run test:unit` | Executa tests unitaris |
| `npm run test:e2e` | Executa tests e2e |
| `npm run lint` | Executa ESLint |

---

## 📦 Dependències principals

- **@ionic/vue** (8.0.0) - Framework UI móbil
- **vue** (3.3.0) - Framework JavaScript
- **vue-router** (4.2.0) - Enrutament
- **pinia** (3.0.4) - Gestió d'estat
- **axios** (1.15.0) - HTTP client
- **filepond** (4.32.12) - Upload d'arxius
- **vue-filepond** (7.0.4) - Integració amb Vue

---

## 🔐 Seguretat

- Els tokens es guarden localment a `localStorage`
- Els tokens s'envien automàticament en cada petició API
- Per a logout, el token es rebutja al servidor (Sanctum)

---

## 🚨 Solució de problemes

### L'app no connecta amb el backend
- Verifica que el backend estigui funcionant: `php artisan serve`
- Verifica que la URL API és correcta a `src/services/api.ts`
- Comprova la consola del navegador per a errors CORS

### Els media no es carreguen
- Verifica que el backend té la carpeta `storage/app/public` accessible
- Executa `php artisan storage:link` al backend si cal

### L'upload falla
- Verifica que el servidor té permisos per a escriure a `storage/app/public`
- Comprova el límit de mida d'arxiu (200MB per defecte)

---

## 📞 Contacte

Per a preguntes o suggeriments, contacta amb l'desenvolupador.

---

**Versió**: 1.0.0  
**Última actualització**: Maig 2026
