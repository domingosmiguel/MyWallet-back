# **MyWallet API**

This API was built to manage all data for MyWallet Saas. 

## **Exercised Contents**:

-   CRUD operations in a noSQL database (MongoDB)
-   Proper error handling
-   Proper HTTP responses for every operation made

## **Ideas For The Future**:

-   Layered architecture
-   Unitary tests
-   E2E tests
-   ORM for database management
-   Take user data out of '/records' endpoint response
-   Better data encryption
-   Implement Docker Compose + NGINX

## **How to run**:

After you configure you MongoDB locally:

1. Clone this repository

```
$ git clone <url>
```

2. Configure your **.env** file to point where Mongo is
   
4. Install dependencies

```
$ npm i
```

4. Run the api with

```
$ npm dev
```

5. Finally you can access the api at http://localhost:5000 (or where you instructed it to be)

## Built with:

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## Contact:

[![LinkedIn][linkedin-shield]][linkedin-url]

[linkedin-shield]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url]: https://www.linkedin.com/in/domingosmiguel/
