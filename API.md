# 📡 API Documentation - IonicVideosAppPablo

## Base URL
```
http://localhost:8000/api
```

---

## Authentication Endpoints

### Register New User
```http
POST /api/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "password_confirmation": "SecurePass123!"
}
```

**Response (201 Created)**:
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2026-05-13T10:00:00Z"
  },
  "token": "5|abc123xyz..."
}
```

---

### Login User
```http
POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200 OK)**:
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "5|abc123xyz..."
}
```

---

### Logout User
```http
POST /api/logout
Authorization: Bearer {token}
```

**Response (200 OK)**:
```json
{
  "message": "Logged out successfully."
}
```

---

### Get Current User
```http
GET /api/user
Authorization: Bearer {token}
```

**Response (200 OK)**:
```json
{
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2026-05-13T10:00:00Z"
  }
}
```

---

## Multimedia Endpoints

### List All Multimedia (Public)
```http
GET /api/multimedia?page=1&per_page=12
```

**Query Parameters**:
- `page` (optional): Page number for pagination
- `per_page` (optional): Items per page (default: 12)
- `user_id` (optional): Filter by user ID

**Response (200 OK)**:
```json
{
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "title": "Amazing Video",
      "description": "A great video",
      "type": "video",
      "url": "http://localhost:8000/storage/multimedia/...",
      "size": 1024000,
      "created_at": "2026-05-13T10:00:00Z",
      "user": {
        "id": 1,
        "name": "John Doe"
      }
    }
  ],
  "links": { ... },
  "meta": {
    "current_page": 1,
    "per_page": 12,
    "total": 42
  }
}
```

---

### Get Single Multimedia (Public)
```http
GET /api/multimedia/{id}
```

**Response (200 OK)**:
```json
{
  "data": {
    "id": 1,
    "user_id": 1,
    "title": "Amazing Video",
    "description": "A great video",
    "type": "video",
    "url": "http://localhost:8000/storage/multimedia/...",
    "size": 1024000,
    "created_at": "2026-05-13T10:00:00Z",
    "user": {
      "id": 1,
      "name": "John Doe"
    }
  }
}
```

---

### List User's Multimedia (Protected)
```http
GET /api/my-multimedia?page=1&per_page=12
Authorization: Bearer {token}
```

**Response (200 OK)**: Same structure as "List All Multimedia"

---

### Upload New Media (Protected)
```http
POST /api/multimedia
Authorization: Bearer {token}
Content-Type: multipart/form-data

Form Data:
- title (string, required): "My Video"
- description (string, optional): "A nice video"
- file (file, required): binary file

Supported Types:
  - Video: mp4, mov, avi, webm
  - Photo: jpeg, jpg, png, gif
Max Size: 200MB
```

**Response (201 Created)**:
```json
{
  "data": {
    "id": 5,
    "user_id": 1,
    "title": "My Video",
    "description": "A nice video",
    "type": "video",
    "path": "multimedia/file.mp4",
    "mime_type": "video/mp4",
    "size": 5242880,
    "url": "http://localhost:8000/storage/multimedia/file.mp4",
    "created_at": "2026-05-13T11:30:00Z"
  }
}
```

---

### Update Media (Protected)
```http
PUT /api/multimedia/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description"
}
```

**Response (200 OK)**:
```json
{
  "data": {
    "id": 5,
    "user_id": 1,
    "title": "Updated Title",
    "description": "Updated description",
    "type": "video",
    "url": "http://localhost:8000/storage/multimedia/file.mp4",
    "size": 5242880,
    "updated_at": "2026-05-13T12:00:00Z"
  }
}
```

**Restrictions**:
- Only media owner can update
- Can only update `title` and `description`
- Cannot change the file itself

---

### Delete Media (Protected)
```http
DELETE /api/multimedia/{id}
Authorization: Bearer {token}
```

**Response (200 OK)**:
```json
{
  "message": "Multimedia deleted successfully."
}
```

**Restrictions**:
- Only media owner can delete
- File is removed from storage

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "email": ["The email field is required."],
    "password": ["The password must be at least 8 characters."]
  }
}
```

### 401 Unauthorized
```json
{
  "message": "Unauthenticated."
}
```

### 403 Forbidden
```json
{
  "message": "This action is unauthorized."
}
```

### 404 Not Found
```json
{
  "message": "No query results found for model [App\\Models\\Multimedia]."
}
```

### 422 Unprocessable Entity
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "file": ["The file must be a file of type: mp4, mov, avi, jpeg, jpg, png, gif."]
  }
}
```

### 429 Too Many Requests
```json
{
  "message": "Too Many Requests"
}
```

---

## Authentication Headers

Tots els endpoints protegits requereixen:

```
Authorization: Bearer {token}
```

**Example**:
```bash
curl -H "Authorization: Bearer 5|abc123xyz..." \
     http://localhost:8000/api/my-multimedia
```

---

## Pagination

Les respostes de llistat inclouen paginació:

```json
{
  "data": [...],
  "links": {
    "first": "http://localhost:8000/api/multimedia?page=1",
    "last": "http://localhost:8000/api/multimedia?page=4",
    "prev": null,
    "next": "http://localhost:8000/api/multimedia?page=2"
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 4,
    "per_page": 12,
    "to": 12,
    "total": 42
  }
}
```

---

## Rate Limiting

- **Default**: 60 requests per minute per IP
- **Auth**: 60 requests per minute per user

Headers de resposta:
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1234567890
```

---

## CORS

CORS està habilitada per:
- `http://localhost:5173` (development)
- `http://localhost:3000` (alternative)

---

## Content Types

**Request**:
- `application/json` (API requests)
- `multipart/form-data` (file uploads)

**Response**:
- `application/json` (always)

---

## Testing API with cURL

### Register
```bash
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!",
    "password_confirmation": "SecurePass123!"
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

### Get User
```bash
curl -X GET http://localhost:8000/api/user \
  -H "Authorization: Bearer {token}"
```

### List Media
```bash
curl -X GET http://localhost:8000/api/multimedia
```

### Upload Media
```bash
curl -X POST http://localhost:8000/api/multimedia \
  -H "Authorization: Bearer {token}" \
  -F "title=My Video" \
  -F "description=A nice video" \
  -F "file=@/path/to/video.mp4"
```

---

**Version**: 1.0.0  
**Last Updated**: May 13, 2026

