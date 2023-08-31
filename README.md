# EJP-BE: Edged Judger Platform Backend Server 🍎

EJS-Be is a nestJs-based backend server that enables EJP ecosystem. In order for EJS-S and EJS-T to function properly, instructors need to deploy this server in the environment of their choice. EJS-Be operates within a Docker Engine-based container environment.

## Table of Contents
- [Highlights 🌟](#highlights-🌟)
- [Getting Started 📚](#getting-started-📚)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [How it Works](#HowitWorks)
- [Contributing 🤝](#contributing-🤝)
- [License 📄](#license-📄)


## Highlights 🌟

- **Container Based**: As long as Docker is installed, the server can be run in any environment..
- **User adminstration System**: Granting permissions to users for repositories and problems ensures that only users with those specific permissions can access them.

## Getting Started 📚

### Prerequisites

- Requires Docker Engine installed

### Installation

1. Clone the EJP-Be repository.
    ```bash
    git clone https://github.com/EdgeCrafters/ejp-be.git
    ```
2. Navigate to the cloned directory and build ejs-be image.
    ```bash
    cd ejp-be
    docker build -t ejs-be -f ./builder/dockerfile .
    ```

### Usage

1. Launch EJP-T from the command line:
    ```bash
    docker run -d ejs-be
    ```
    

## Contributing 🤝

We welcome contributions from the community! Feel free to fork the repository, make your changes, and submit a pull request. For more details, check out our [contribution guidelines](#).

## License 📄

EJP-Be is part of the EJP project and follows the same MIT license.

## HowitWorks

EJP-Be is composed of a total of four containers. EJP-Be, EJP-Minio, and EJP-db communicate through a dedicated container network established using docker-compose.

1. EJP-be   
2. EJP-db
EJP-db serves as a PostgreSQL-based database that stores user information, user repository details, and metadata information about problems and repositories.
3. EJP-minio

4. EJP-minio-mc