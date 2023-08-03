# Recetario del mundo

Recetario del mundo es una aplicación desarrollada por Burckhardt David, Herrero Juan Francisco y Vazquez Arispe Martín. Estudiantes de Ingeniería en Sistemas en la UNICEN.


## Indice
1. [Introducción](#introducción)
2. [Instalando Aplicación](#instalando-aplicación)
3. [Ejecutando Aplicación](#ejecutando-aplicación)

# Introducción

Esta aplicación es una interfaz web para cualquier usuario que quiera buscar, compartir y apreneder todas las recetas alrededor del planeta tiera.

Actualmente se encuentra solo en español.

La aplicación se compone de 2 repositorios: 
- El frontend (este repositorio) 
- El backend (https://github.com/MartinVazquez1982/WebDevelopmentWorkshop)

# Instalando Aplicación

**Se requiere tener previamente instalado NodeJs con npm**

Para instalar la aplicación se puede descargar el repositorio en un .zip o podemos copiar el link para clonar el repositorio.

Una vez que descargamos el repositorio nos paramos en la carpeta desdeuna terminal e instalamos todas las dependencias necesarias para ejecutra el frontend:

``` nodejs
npm install
```

Una vez instaladas las dependencias debemos modificar en ./package.json los scripts para definir correctamente la url de la API / Backend. Y con la url correctamente definida ya estaría listo el proyecto para ponerlo a ejecutar.

# Ejecutando Aplicación

Para ejecutar la aplicación, parado en la carpeta ráiz del proyecto se debe ejecutar:

``` nodejs
npm run start
``` 
