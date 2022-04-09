
# Overview

Bridge that translates telegram updates and requests to RabbitMQ.

# Use Cases

You want to:

- create multiple bot worker-instances for optimizing.
- create one telegram bot with different programming languages.
- you want to split your bot to many independent logical parts for better developer experience.

# Installation

1. Clone repo and open in your IDE.

2. Rename ".env-sample" file to ".env" and fill the gaps.

3. Run your application.

# Run

You can run and build with node and docker.

## Docker Way

1. Build the container via cmd:

    ```bash
      docker build -t tsziming/amqp-telegram-gateway:1.0 .
    ```

2. Just run the container via cmd:

    ```bash
      docker run --env-file .env tsziming/amqp-telegram-gateway:1.0
    ```

## Node Way

1. Build the application via cmd:

    ```bash
      npm run build
    ```

2. Run the application via cmd:

    ```bash
      npm run start
    ```

# License

MIT - Made by [tsziming](https://github.com/tsziming)
