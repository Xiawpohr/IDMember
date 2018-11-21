# IDMember
This is a member system with crypto-payment feature.

## User Stories:
* Log in
* Sign up
* Log out
* Edit Profile
* Add Friends
* Pay cryptocurrency 

## Pages:
* "/": Discover other users 
* "/friends": Browse your friends 
* "/profile": Edit your profile 
* "/login": Login 
* "/signup": Signup

## Models: 
> User  
> * email  
> * password  
> * firstName
> * lastName
> * phone  
> * gender  
> * birthday
> * bio  
> * Ethereum Address  

## API Designs:
* Base URL: '/api'
* "/login"
  - method: POST
  - request body example:
    ```
      { email: 'test@example.com', password: 'Aa=123' }
    ```
  - response example:
    ```
      // success
      { 
        status: 200
        authenticatedUser: { id: 1, email: 'test@example.com', token: 'foufhaeog' }
      }
      //error
      {
        status: 400,
        error: {
          massenge: 'Something is wrong here.'
        }
      }
    ```

* "/logout"
  - method: POST
  - response example:
    ```
      // success
      { status: 200 }
      // error
      { status: 400, error: { massenge: 'Something is wrong here.' } }
    ```

* "/signup"
  - method: POST
  - request body example: 
    ```
      { email: 'test@example.com', password: 'Aa=123', confirmedPassword: 'Aa=123' }
    ```
  - response example:
    ```
      // success
      { 
        status: 200
        registeredUser: { id: 1, email: 'test@example.com', token: 'foufhaeog' }
      }
      //error
      {
        status: 400,
        error: {
          massenge: 'Something is wrong here.'
        }
      }
    ```
* "/users"
  - Method: GET
  - response example: 
   ```
    {
      status: 200,
      users: []
    }
   ```

* "/users /:id"
  - method: POST
  - description: fetch all users
  - request body example:
    ```
      {
        firstName: 'Arthur',
        lastName: 'Hsiao',
        email: 'test12@example.com',
        phone: '0987654321',
        bio: 'This is biography. Hey!!',
        gender: 'male',
        birthday: '1993/06/23'
      }
    ```
  - response example:
    ```
      {
        status: 200,
        user: {
          id: 1
          firstName: 'Arthur',
          lastName: 'Hsiao',
          email: 'test12@example.com',
          phone: '0987654321',
          bio: 'This is biography. Hey!!',
          gender: 'male',
          birthday: '1993/06/23'
        }
      }
    ```

* "/friends"
  - method: GET
  - description: fetch all your friends base on credential cookies
  - response example:
    ```
      {
        status: 200,
        friends: []
      }
    ```

* "/friends/requests"
  - method: GET
  - description: fetch all friend requests from you
  - response exmaple:
    ```
      {
        status: 200,
        friendRequests: [
          {
            id: 1123,
            to: 2 // userId
          }
        ]
      }
    ```

* "/friends/request"
  - method: POST
  - description: make a friend request to another user
  - request body example:
    ```
      {
        userId: 2
      }
    ```
  - response exmaple:
    ```
      {
        status: 200,
        friend: {
          id: 2
          firstName: 'Gary',
          lastName: 'Lee',
          email: 'gary@example.com',
          phone: '0987654321',
          bio: 'This is biography. Hey!!',
          gender: 'male',
          birthday: '1893/02/15'
        }
      }
    ```

* "/friends/confirmations"
  - method: GET
  - description: fetch all friend requsets from other users, that you need to confirm 
  - response example: 
    ```
      {
        status: 200,
        friendConfirmations: [
          {
            id: 1123,
            from: 3 // userId
          }
        ]
      }
    ```

* "/friends/confirm"
  - method: POST
  - description: confirm the friend request from another user
  - request body example:
    ```
      {
        userId: 3
      }
    ```
  - response example: 
    ```
      {
        status: 200,
        friend: {
          id: 3
          firstName: 'Tommy',
          lastName: 'Chen',
          email: 'tommy@example.com',
          phone: '0987654321',
          bio: 'This is biography. Hey!!',
          gender: 'male',
          birthday: '1893/02/15'
        }
      }
    ```

## Build
* Project setup
  ```
  cd frontend
  npm install
  ```

* Compiles and hot-reloads for development
  ```
  npm run serve
  ```

* Compiles and minifies for production
  ```
  npm run build
  ```

* Run your tests
  ```
  npm run test
  ```

* Lints and fixes files
  ```
  npm run lint
  ```

* Run your end-to-end tests
  ```
  npm run test:e2e
```

* Run your unit tests
  ```
  npm run test:unit
  ```
