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

# Captain Registration Endpoint

## Endpoint: `/captains/register`

### Method: `POST`

### Description:
This endpoint is used to register a new captain/driver. It validates the input data, hashes the password, creates a new captain in the database, and returns a JSON Web Token (JWT) along with the captain details.

### Request Body:
The request body should be a JSON object containing the following fields:

```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123",
    "phoneNumber": "+1234567890",
    "vehicleDetails": {
        "model": "Toyota Camry",
        "year": "2020",
        "licensePlate": "ABC123",
        "color": "Black"
    },
    "driverLicense": "DL12345678"
}
```

### Validation Requirements:
- `email`: Must be a valid email address
- `fullname.firstname`: Minimum 3 characters
- `password`: Minimum 6 characters
- `phoneNumber`: Valid phone number format
- `driverLicense`: Required field
- `vehicleDetails`: All fields are required

### Responses:

#### Success:
- **Status Code:** `201 Created`
- **Body:**
```json
{
    "token": "<JWT_TOKEN>",
    "captain": {
        "_id": "<CAPTAIN_ID>",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "phoneNumber": "+1234567890",
        "vehicleDetails": {
            "model": "Toyota Camry",
            "year": "2020",
            "licensePlate": "ABC123",
            "color": "Black"
        },
        "driverLicense": "DL12345678"
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
        }
    ]
}
```

### Example Request:
```bash
curl -X POST http://localhost:4000/captains/register \
-H "Content-Type: application/json" \
-d '{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123",
    "phoneNumber": "+1234567890",
    "vehicleDetails": {
        "model": "Toyota Camry",
        "year": "2020",
        "licensePlate": "ABC123",
        "color": "Black"
    },
    "driverLicense": "DL12345678"
}'
```

### Notes:
- All vehicle details are required for registration
- Phone number must be in international format
- Driver's license number must be valid
- Email must be unique in the system

# Captain Profile Endpoint

## Endpoint: `/captains/profile`

### Method: `GET`

### Description:
This endpoint retrieves the profile information of the authenticated captain/driver. Requires a valid JWT token in the request header.

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
    "captain": {
        "_id": "<CAPTAIN_ID>",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "phoneNumber": "+1234567890",
        "vehicleDetails": {
            "model": "Toyota Camry",
            "year": "2020",
            "licensePlate": "ABC123",
            "color": "Black"
        },
        "driverLicense": "DL12345678"
    }
}
```

#### Error:
- **Status Code:** `404 Not Found`
- **Body:**
```json
{
    "message": "Captain not found"
}
```

### Example Request:
```bash
curl -X GET http://localhost:4000/captains/profile \
-H "Authorization: Bearer <JWT_TOKEN>"
```

# Captain Logout Endpoint

## Endpoint: `/captains/logout`

### Method: `GET`

### Description:
This endpoint logs out the captain by clearing the authentication token cookie and adding the token to a blacklist to prevent reuse.

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
    "message": "captain is logged out"
}
```

### Example Request:
```bash
curl -X GET http://localhost:4000/captains/logout \
-H "Authorization: Bearer <JWT_TOKEN>" \
--cookie "token=<JWT_TOKEN>"
```

### Security Notes:
- The token is invalidated and added to a blacklist
- The token cookie is cleared from the client
- Both cookie-based and header-based token authentication are supported
- Token blacklisting prevents unauthorized reuse of expired tokens
