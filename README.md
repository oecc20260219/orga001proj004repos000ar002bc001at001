#### Guía de Configuración del Microservicio (Entorno Local).

<p align="center">
  <a href="http://nestjs.com" target="blank"><img src="https://nestjs.com" width="120" alt="Nest Logo" /></a>
</p>

### 1. Requisitos Previos.

Es necesario contar con las siguientes herramientas instaladas para el correcto funcionamiento:

## 1.1. IDE Local:

Visual Studio Code 1.109.4

## 1.2. Container Engine Local:

Docker Desktop 4.53.0 (211793)

Docker Compose version v2.40.3-desktop.1

## 1.3. Entorno de ejecución Local:

Node.js v25.2.1 (LTS) y npm v11.6.2

## 1.4. Base de Datos Local:

MySQL Server v8.0.44 y MySQL Workbench v8.0

## 1.5. Tecnología Local:

NestJS v11.0.16, TypeScript v5.9.3, Prisma ORM 7.4.0

## 1.6. Configuración de Variables de Entorno:

Crea un archivo llamado .env en la raíz del proyecto y copia el siguiente contenido (ajusta según tus credenciales):

DATABASE_URL="mysql://user_lalande_datastore_001_loc:Root12345@localhost:3306/db_lalande_datastore_communication"

AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
SQS_ENDPOINT=http://localhost:4566
SQS_QUEUE_PENDING=http://localhost:4566/000000000000/queue-lalande-communication-pending
SQS_QUEUE_DELIVERED=http://localhost:4566/000000000000/queue-lalande-communication-delivered


### 2. Configuración de la Base de Datos Local.

Ejecuta las sentencias siguientes en MySQL Workbench:

## 2.1. Autenciar con el administrador:

Username: root
Password: El password es el que se registro en el momento de la instalación local del MySQL Server.

## 2.2. Crear usuario:

CREATE USER 'user_lalande_datastore_001_loc'@'%' IDENTIFIED BY 'Root12345';

## 2.3. Crear base de datos:

CREATE DATABASE IF NOT EXISTS db_lalande_datastore_communication DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;

## 2.4. Ubicar en la base de datos con el administrador:

USE `db_lalande_datastore_communication`;

## 2.5. Asignar privilegios a usuario nuevo:

GRANT ALL PRIVILEGES ON db_lalande_datastore_communication TO 'user_lalande_datastore_001_loc'@'%' WITH GRANT OPTION; FLUSH PRIVILEGES;

## 2.6. Asignar privilegios al usuario nuevo para la base de datos:

GRANT SELECT, INSERT, UPDATE, DELETE ON `db_lalande_datastore_communication_002_loc`.* TO 'user_lalande_datastore_002_loc'@'%';

## 2.7. Autenciar con el usuario nuevo:

Username: user_lalande_datastore_001_loc
Password: Root12345

## 2.8. Ubicar en la base de datos con el usuario nuevo:

USE `db_lalande_datastore_communication`;

## 2.9. Mostrar todas las tablas:

SHOW TABLES;

### 3. Infraestructura y Mensajería (Docker & SQS).

## 3.1. Gestión de Contenedores:

# 3.1.1. Levanta los servicios de AWS simulados (LocalStack) con el siguiente comando: 

docker compose up -d

# 3.1.2. Si se necesita reiniciar el entorno totalmente limpio, utilizar: 

docker compose down

## 3.2. Configuración de Colas SQS:

# 3.2.1. Ejecuta estos comandos para crear la cola pending en el contenedor de LocalStack:

docker exec localstack_lalande_aws_sqs awslocal sqs create-queue --queue-name queue-lalande-communication-pending

# 3.2.2. Ejecuta estos comandos para crear la cola delivered en el contenedor de LocalStack:

docker exec localstack_lalande_aws_sqs awslocal sqs create-queue --queue-name queue-lalande-communication-delivered

## 3.3. Mantenimiento y Limpieza:

# 3.3.1. Purgar Cola Pending: 

node script/purge-sqs-queue-pending.js

# 3.3.2. Purgar Cola Delivered: 

node script/purge-sqs-queue-delivered.js

# 3.3.3. Limpiar Base de Datos (Ejecutar en MySQL Workbench): 

TRUNCATE TABLE tb_communication;

### 4. Instalación y Ejecución del Proyecto.

## 4.1. Instalación de dependencias:

npm install

## 4.2. Preparación de Prisma ORM:

Este paso genera el cliente de Prisma y sincroniza el esquema con tu base de datos MySQL (crea las TABLAS automáticamente):

npx prisma generate

npx prisma db push

## 4.3. Iniciar la aplicación en modo desarrollo (local):

npm run start:dev

### 5. Prueba de Integración (Postman).

Realiza una petición POST a http://localhost:3000/send-message con el siguiente JSON:

{
  "data": {
    "event_code": "MSG-1902026-181901",
    "message_type": "WHATSAPP",
    "message_payload": {
      "to": "+51991696467",
      "body": "Hi, the message was sent to the person O.E.C.C."
    },
    "audit_insert_user": "admin_user_lalande"
  }
}

