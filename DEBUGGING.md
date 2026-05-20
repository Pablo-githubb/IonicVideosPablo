# Network Error Upload Fix - Debugging Guide

## Problem
When clicking "Save Media" to upload a video, you're getting a "Network Error".

## Root Causes Fixed

1. **CORS Issue**: The backend wasn't properly configured to accept requests from the frontend on different ports
   - Solution: Added explicit CORS middleware (`CorsMiddleware.php`)

2. **API URL Issue**: The frontend was trying to connect directly to `http://localhost:8000/api` 
   - Solution: Added Vite proxy to route `/api` requests to the backend (development only)

3. **FormData Handling**: Axios was not properly configured for multipart/form-data uploads
   - Solution: Improved axios configuration with proper timeout handling

4. **Error Handling**: Limited error messages made debugging difficult
   - Solution: Added comprehensive error handling with detailed messages

## Testing the Fix

### Step 1: Ensure Backend is Running
```bash
cd api-backend
php artisan serve
```
Backend should be available at `http://localhost:8000`

### Step 2: Check Database is Initialized
```bash
cd api-backend
php artisan migrate
```

### Step 3: Create Storage Link (if not done)
```bash
cd api-backend
php artisan storage:link
```

### Step 4: Start Frontend Development Server
```bash
# In project root
npm run dev
```
Frontend should be available at `http://localhost:5173`

### Step 5: Test Upload
1. Go to http://localhost:5173
2. Register a new account or log in
3. Click "Upload New Media"
4. Drag a video file or click to browse
5. Fill in Title and Description
6. Click "Save Media"

## Expected Behavior After Fix

- Request should go to `http://localhost:5173/api/multimedia` (via Vite proxy)
- Vite proxy forwards to `http://localhost:8000/api/multimedia`
- Backend processes the request and returns a response
- On success: File is saved and you're redirected to user page
- On error: You see a detailed error message (not generic "Network Error")

## If Still Getting Network Error

### Check 1: Is Backend Running?
```bash
curl http://localhost:8000/api/multimedia
```
Should return JSON response (401 Unauthorized is OK)

### Check 2: Check Browser Console
1. Open DevTools (F12)
2. Go to Network tab
3. Try uploading again
4. Look for the `/api/multimedia` request
5. Check the Response tab for server errors

### Check 3: Check Backend Logs
```bash
# Terminal where backend is running should show requests
# If you see errors, share them
```

### Check 4: File Size Check
- Maximum file size: 200MB
- If file is larger, you'll get a validation error
- If you have a larger file to upload, we can increase the limit

### Check 5: PHP Configuration
If you get "413 Payload Too Large" error, update php.ini:
```ini
post_max_size = 200M
upload_max_filesize = 200M
```

## New Error Messages You Might See

1. **"Validation error: ..."** - File or form data doesn't match requirements
2. **"Network error. Make sure the backend is running..."** - Backend not responding
3. **"Upload timeout. The file may be too large..."** - File is too large or upload took too long
4. **Other error message** - Backend returned a specific error (check the backend logs)

## Files Modified

### Frontend
- `src/services/api.ts` - Added timeout, proper error handling, development API URL
- `src/views/MediaCreatePage.vue` - Enhanced error messages
- `vite.config.ts` - Added /api proxy to backend

### Backend
- `app/Http/Middleware/CorsMiddleware.php` - New CORS middleware
- `bootstrap/app.php` - Added CORS middleware and exception handling

## Next Steps if Still Having Issues

1. Share the exact error message from the error box
2. Check the Network tab in browser DevTools for the request details
3. Check the backend terminal for any error logs
4. Make sure all steps in Step 1-4 of "Testing the Fix" are completed

