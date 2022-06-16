# Backend Sample Application

## Setup
  
  - Run `docker-compose up -d` and then `npm run start:dev`
  - Endpoint is at http://localhost:3000/graphql

## Test

  Run `npm run test`

## Queries

### Create Affiliate

```
mutation {
  createAffiliate(input: { name: "arjane" }) {
    id
    code
    name
  }
}
```

### Get Affiliates

```
{
  affiliates {
    id
    code
    name
  }
}
```

### Get Affiliate

```
{
  affiliate(id: "5c04d5d7-a6f9-4859-9bdb-aceca8f81e4c") {
    id
    code
    name
  }
}
```

### Create User

```
mutation($input: UserInput!){
  createUser(input: $input){
    username
    password
    affiliate{
      name
      code
    }
  }
}

{
  "input": {
      "username": "arjane",
      "password": "password",
      "affiliateCode": "izPcRR7DLHBdaGF52UHXYq"
  }
}
```

### Login

```
mutation($input: LoginInput!){
  login(input: $input)
}

{
  "input": {
      "username": "arjane",
      "password": "password"
  }
}

```

### Me
Get user information of the currently logged in user.

```
query{
  me{
    id
    username
    password
    createdAt
    updatedAt
  }
}

Header
Authorization Bearer <acesstoken>
```

### Activities
Get all activities of currently logged in user.

```
query{
  activities{
    id
    user{
      username
      password
    }
    type
    createdAt
  }
}

Header
Authorization Bearer <acesstoken>
```

### Exchange Rate

```
query($input: ExchangeFilterInput! ){
  exchange(input: $input)
}

{
    "input": {
        "currencyCode": "USD",
        "date": "2022-06-11"
    }
}
```