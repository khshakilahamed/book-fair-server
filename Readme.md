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
- `POST /auth/current-user` (verify auth- access token)
- `POST /auth/logout`

---

### Book

- `POST /books`

`Sample Data`

```js
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
- `POST /books/review/64b4cf1d6197365d498e6362` (also need accessToken to post review)

```js
// sample data for book review
{
    "review": "Good Book 2"
}
```

- `GET /books/reviews/64b4cf1d6197365d498e6362`

- `DELETE /books/64b3ec0e75b9157d8b1e1c83` (auth check - access token)

- `GET /books/my-books` (auth check - access token)
- `PATCH /books/64b4cf1d6197365d498e6362` (auth check - access token)

```js
{
    "title": "The Inner Face: A Guide to the Emotions We Hide",
    "author": "Ellie Thomson"
}
```

---

### Wishlist

- `POST /wishlist`(auth check -access token and take user id)

```js
{
    "book":"64b4cecb6197365d498e6359"
}
```

- `GET /wishlist` (auth check -access token and take user id)

- `DELETE /wishlist` (auth check -access token and take user id)

```
{
    "id": "64b6f9a0413066b9ba39bded"
}
```

---

### Reading List

- `POST /reading-list`(auth check -access token and take user id)

```js
{
    "book":"64b4cecb6197365d498e6359"
}
```

- `GET /reading-list` (auth check -access token and take user id)

- `DELETE /reading-list` (auth check -access token and take user id)

```
{
    "id": "64b6f9a0413066b9ba39bded"
}
```
