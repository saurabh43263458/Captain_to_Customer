# User Registration Endpoint

## Endpoint: `/users/register`

### Method: `POST`

### Description:
This endpoint is used to register a new user. It validates the input data, hashes the password, creates a new user in the database, and returns a JSON Web Token (JWT) along with the user details.

### Request Body:
The request body should be a JSON object containing the following fields:

```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
}
```

### Responses:

#### Success:
- **Status Code:** `200 OK`
- **Body:**
```json
{
    "token": "<JWT_TOKEN>",
    "user": {
        "_id": "<USER_ID>",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com"
    }
}
```

#### Error:
- **Status Code:** `400 Bad Request`
- **Body:**
```json
{
    "errors": [
        {
            "msg": "Invalid Email",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "first name must be at least 3 characters long",
            "param": "fullname.firstname",
            "location": "body"
        },
        {
            "msg": "password must be at least 6 characters long",
            "param": "password",
            "location": "body"
        }
    ]
}
```

### Example Request:
```bash
curl -X POST http://localhost:4000/users/register \
-H "Content-Type: application/json" \
-d '{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
}'
```

# User Login Endpoint

## Endpoint: `/users/login`

### Method: `POST`

### Description:
This endpoint is used to log in an existing user. It validates the input data, checks the user's credentials, and returns a JSON Web Token (JWT) along with the user details.

### Request Body:
The request body should be a JSON object containing the following fields:

```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```

### Responses:

#### Success:
- **Status Code:** `200 OK`
- **Body:**
```json
{
    "token": "<JWT_TOKEN>",
    "user": {
        "_id": "<USER_ID>",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com"
    }
}
```

#### Error:
- **Status Code:** `400 Bad Request`
- **Body:**
```json
{
    "errors": [
        {
            "msg": "Invalid Email",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "password must be at least 6 characters long",
            "param": "password",
            "location": "body"
        }
    ]
}
```
- **Status Code:** `401 Unauthorized`
- **Body:**
```json
{
    "message": "Invalid email or password"
}
```

### Example Request:
```bash
curl -X POST http://localhost:4000/users/login \
-H "Content-Type: application/json" \
-d '{
    "email": "john.doe@example.com",
    "password": "password123"
}'
```

# User Profile Endpoint

## Endpoint: `/users/profile`

### Method: `GET`

### Description:
This endpoint retrieves the profile information of the authenticated user. Requires a valid JWT token in the request header.

### Authentication:
Requires Bearer token in Authorization header:
```
Authorization: Bearer <JWT_TOKEN>
```

### Responses:

#### Success:
- **Status Code:** `200 OK`
- **Body:**
```json
{
    "success": true,
    "message": "<USER_DETAILS>"
}
```

#### Error:
- **Status Code:** `404 Not Found`
- **Body:**
```json
{
    "message": "User not found"
}
```

### Example Request:
```bash
curl -X GET http://localhost:4000/users/profile \
-H "Authorization: Bearer <JWT_TOKEN>"
```

# User Logout Endpoint

## Endpoint: `/users/logout`

### Method: `GET`

### Description:
This endpoint logs out the user by clearing the authentication token cookie and adding the token to a blacklist to prevent reuse.

### Authentication:
Requires either:
- Token in cookie
- Bearer token in Authorization header

### Responses:

#### Success:
- **Status Code:** `200 OK`
- **Body:**
```json
{
    "success": true,
    "message": "user is logedOut"
}
```

### Example Request:
```bash
curl -X GET http://localhost:4000/users/logout \
-H "Authorization: Bearer <JWT_TOKEN>" \
--cookie "token=<JWT_TOKEN>"
```

### Security Notes:
- The token is invalidated and added to a blacklist
- The token cookie is cleared from the client
- Both cookie-based and header-based token authentication are supported
