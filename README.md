<div align="center">
  
![Badge en Desarollo](https://img.shields.io/badge/status-EN_PROCESO-690)
![Release_date](https://img.shields.io/badge/release_date-octubre-7cacee)
![Python_versionx](https://img.shields.io/badge/node-v22.x-417e38)
![Python_versionx](https://img.shields.io/badge/npm-v10.8.3-c53635)

</div>


## Content

1. [Features](#features)
2. [Installation](#installation)

Este proyecto es una prueba de concepto de uso de `Actions` a través de **Github Pages** desde un framework frontend, y utiliza el api de [https://web.dragonball-api.com](https://web.dragonball-api.com/) para desplegar una aplicación web con funcionalidades de filtrado.

## Features

El siguiente proyecto ha sido levantado en un entorno local con las siguientes configuraciones.

```
- OS name: "windows 11", version: "10.0", arch: "amd64", family: "windows"

```

### Entorno de desarrollo

* Framework: [Angular ^18](https://angular.dev/)
* Template: [Boostrap 5](https://fontawesome.com/v5/download)
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

> Los ambientes predefinidos a través de variables son: development con `dev` para el archivo `development`, pre-producción con `uat` para el archivo `staging` y producción con `prod` para el archivo `production`. Por defecto se compila el ambiente `production` pero se recomienda usar la nomenclatura del comando de todas formas.

```sh

$ npm run build:uat --output-hashing=all

# $ npm run build:dev --output-hashing=all
# $ npm run build:prod

```
> `--output-hashing=all` borra/renueva el caché del proyecto

## FAQ

* [Working with Environments — The Stages of Development: Angular 17](https://alifrazansaputra.medium.com/working-with-environments-the-stages-of-development-angular-17-54f104990025)
* [NPM node-sass](https://www.npmjs.com/package/node-sass)