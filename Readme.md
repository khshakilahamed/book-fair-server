## API Endpoints

### Auth

- `POST /auth/register`

`Sample Data`

```js
// create user
{
    "name": "kh. Shakil",
    "email": "kh@gmail.com",
    "password": "123456"
}
```

- `POST /auth/login`

`Sample Data`

```js
{
    "email": "kh@gmail.com",
    "password": "123456"
}
```

- `POST /auth/refresh-token` (get refresh token from cookie & return new access token)

---

### Book

- `POST /books`

`Sample Data`

```js
// create user as Donar
{
    "title": "The Inner Face: A Guide to the Emotions We Hide",
    "genre": "Biography, Lifestyle",
    "publicationDate": "",
    "author": "Harry",
    "price": 18.0,
    "image":
      "https://hostacmee.space/demo/bookchoix/wp-content/uploads/2021/03/inner-face-572x764-1-550x680.jpg",
      "user": "64b3d7ea5417104de2df4d10"
}
```

- `Get /books/64b3ec0e75b9157d8b1e1c83`
- `Get /books`
