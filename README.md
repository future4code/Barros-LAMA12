# Labenu Music Awards (LAMA)

## Project description
This project was developed to simulate a software that manages a music festival lasting three days. The bands start playing at 8am and finish at 11pm. There are two different types of user roles: ADMIN and NORMAL. Only ADMIN users can register bands and concerts, update concerts and ticket prices, create new tickets and photos, and delete photos.

## Endpoints
- Signup
- Login
- Get Account Info
- Create Band
- Create Concert
- Create Ticket
- Create Purchase
- Create Photo
- Update Concert
- Update Ticket Price
- Get Band Info
- Get All Concerts
- Get All Tickets
- Get All Purchases By User Id
- Get All Photos
- Delete Photo

## Technologies
- Typescript
- Express
- Node.js
- Jest.js
- MySQL

## Deploy
https://lama-fctv.onrender.com

## Documentation
https://documenter.getpostman.com/view/26335922/2s93JxrMPt

## Running the project
<pre>
  <code>git clone https://github.com/future4code/Barros-LAMA12.git</code>
</pre>

<pre>
  <code>cd Barros-LAMA12</code>
</pre>

<pre>
  <code>npm install</code>
</pre>

Create a file .env and complete the following variables:
<pre>
  <code>
    DB_HOST = ""
    DB_USER = ""
    DB_PASSWORD = ""
    DB_SCHEMA = ""

    PORT = 3003
    JWT_KEY = "LAMA"
    BCRYPT_COST = 12
  </code>
</pre>

To add the tables to your database, run the following command:
<pre>
  <code>npm run migrations</code>
</pre>

To initialize the project:
<pre>
  <code>npm run start</code>
</pre>

To run the tests:
<pre>
  <code>npm run test</code>
</pre>

Finally, you can use Postman or another similar tool to test the endpoints.
