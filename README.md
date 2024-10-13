<div align="center">
  
![Badge en Desarollo](https://img.shields.io/badge/status-EN_PROCESO-690)
![Release_date](https://img.shields.io/badge/release_date-octubre-7cacee)
![Python_versionx](https://img.shields.io/badge/node-v22.x-417e38)
![Python_versionx](https://img.shields.io/badge/npm-v10.8.3-c53635)

</div>

Este proyecto es una aplicación Angular que consume una API de Dragon Ball ([https://web.dragonball-api.com](https://web.dragonball-api.com/)) para mostrar información sobre los personajes de esta franquicia. La aplicación permite a los usuarios filtrar personajes por nombre, género, raza y afiliación, y visualizar detalles específicos de cada personaje seleccionado en un modal. La interfaz de usuario es responsiva y admite un tema oscuro que se puede alternar manualmente por el usuario.


La aplicación utiliza Angular como framework de desarrollo frontend, implementando formularios reactivos para la gestión de los filtros de búsqueda. La comunicación con la API se maneja a través de un servicio dedicado (DragonBallService), que realiza peticiones HTTP para obtener los datos de los personajes y maneja posibles errores en las respuestas.

El proyecto está configurado para ser desplegado tanto en modo desarrollo como en producción, con instrucciones específicas para la instalación de dependencias, configuración de un proxy local para el desarrollo, y comandos para la compilación y despliegue de la aplicación. Además, se utiliza Tailwind CSS para el diseño y estilización de la interfaz, aprovechando su sistema de utilidades para un diseño rápido y eficiente.

El código fuente incluye componentes Angular específicos para la visualización de los personajes y sus detalles, así como la configuración necesaria para el manejo de temas oscuros y claros, basado en las preferencias del sistema del usuario o una selección manual.

## Content

1. [Features](#features)
2. [Installation](#installation)

## Features

El siguiente proyecto ha sido levantado en un entorno local con las siguientes configuraciones.

```
- OS name: "windows 11", version: "10.0", arch: "amd64", family: "windows"

```

### Entorno de desarrollo

* Framework: [Angular ^18](https://angular.dev/)
* Template: [Flowbite](https://flowbite.com) with  [TailwindCss](https://tailwindcss.com/)
* Gestor de paquetes. [NPM](https://www.npmjs.com/)

```node
$ nvm -v && node -v && npm -v

- Node Version Manager: 1.1.12
- Node: v22.9.0
- Package Manager: npm 10.8.3

$ ng v # después de instalar el proyecto

- Angular CLI: 18.2.7

```

## Installation

### Instalar nvm (Node Version Manager)

`nvm` permite gestionar múltiples versiones de `Node.js` y `npm` de manera sencilla.

```sh

$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v1.1.12/install.sh | bash
# Este comando descargará e instalará nvm en tu sistema.

```

Cierra y abre la terminal.


**Instalar Node.js y npm con nvm**

```sh

$ nvm install 22.9.0

```

Esto instalará `Node.js` en la versión 22.9.0 y también configurará la versión adecuada de `npm` para esa versión de `Node.js`.

**Configurar proxy local**

Abrir el archivo `/frontend/proxy.config.example.json` y renombrarlo a `proxy.config.json`. Modificar los valores del target para acceso al backend.

```json
{
    "/api":{
      "target": "https://dragonball-api.com/api",
      "secure": false,
      "changeOrigin": true,
      "loglevel": "debug",
      "pathRewrite": {
        "^/api": ""
      }
    }
}
```

> [!IMPORTANT]
> Para el despliegue en ambiente de `production` es importante tener el flag `{production:true}` en el archivo `environment.production.ts`

**Instalación de `CLI `de angular**

```sh

$ cd /angular
$ npm install -g @angular/cli

```

Instalar paquetes y librerias del `package.json`

```sh
$ npm install
```

Levantar instancia de desarrollo usando variables de entorno.

El archivo `package.json` está preparado para desplegar la aplicación dependiendo de la configuración seleccionada a través de las instancias de `start` y `build`.

```sh
$ npm run start:uat
```

Compilar el proyecto frontend para el ambiente seleccionado. Dentro del directorio `src/environments` se debe copiar el archivo `environment.ts`, renombrarlo y actualizar las configuraciones necesarias.

Por ejemplo para un ambiente de pre-producción se debe crear el archivo `environment.staging.ts` basado en `environment.ts` y actualizar los valores.

> [!NOTE]
> Los ambientes predefinidos a través de variables son: development con `dev` para el archivo `development`, pre-producción con `uat` para el archivo `staging` y producción con `prod` para el archivo `production`. Por defecto se compila el ambiente `production` pero se recomienda usar la nomenclatura del comando de todas formas.


```sh

$ npm run build:uat --output-hashing=all

# $ npm run build:dev --output-hashing=all
# $ npm run build:prod

```
> [!TIP]
> `--output-hashing=all` borra/renueva el caché del proyecto

## FAQ

* [Working with Environments — The Stages of Development: Angular 17](https://alifrazansaputra.medium.com/working-with-environments-the-stages-of-development-angular-17-54f104990025)
* [NPM node-sass](https://www.npmjs.com/package/node-sass)
