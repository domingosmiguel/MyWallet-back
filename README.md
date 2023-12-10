# MyWallet API

### The Backend Engine for MyWallet Saas

This API powers the MyWallet Saas application, managing all its data efficiently and securely.

## Capabilities

-   **Full CRUD operations:** Create, read, update, and delete financial records seamlessly.
-   **NoSQL powerhouse:** Leverages the flexibility and scalability of MongoDB for data storage.
-   **Error-aware:** Handles errors gracefully and provides informative responses.
-   **Clear communication:** Uses proper HTTP responses to keep clients informed of operation results.

## Future Roadmap

-   **Layered architecture:** Refactor code for cleaner separation of concerns and maintainability.
-   **Testing suite:** Implement unit and E2E tests for comprehensive quality assurance.
-   **Database abstraction:** Introduce an Object-Relational Mapper (ORM) for easier data manipulation.
-   **Robust encryption:** Implement stronger encryption methods to safeguard user information.
-   **Deployment flexibility:** Utilize Docker Compose and NGINX for easier containerization and deployment.

## Getting Started

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

## Contributing

This is an open-source project! Feel free to contribute by reporting issues and submitting pull requests.

## Built with

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)

## Connect with the Developer

[![LinkedIn][linkedin-shield]][linkedin-url]

[linkedin-shield]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url]: https://www.linkedin.com/in/domingosmiguel/
