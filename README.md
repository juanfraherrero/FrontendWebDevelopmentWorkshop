hasta ahora tenemos la página principal en donde se listan los paises que tienen alguna receta

    Features:
        - agregar una barra de filtrado
        - 

Al seleccionar un país nos muestra un listado de las recetas de ese país
    Features:
        - filtrar las recetas del país
        - poder eliminar desde ahí una receta
        
Al seleccionar un receta se despliega su información
    Feature:
        - poder editar la receta 
        - poder eliminar la receta
        - 

Hacer el footer

Agregar handle errors en las consultas a la API
    - seguir esta guía https://plainenglish.io/blog/handle-errors-in-angular-with-httpclient-and-rxjs


Cuando se hace una petición por las recetas de un pais específico la API devuelve un arreglo con un objeto con un arreglo, un arreglo basta. LO MISMO PASA CON EL DELETE

[
    {
        "recetas": [
            {
                "nombre": "Gaisburger Marsch",
                "imagen": "https://recetasdeviajes.com/wp-content/uploads/2011/02/gaisburger-marsch.jpg"
            },
            {
                "nombre": "Konigsberger Klopse",
                "imagen": "https://recetasdeviajes.com/wp-content/uploads/2010/10/konigsberger-klopse.jpg"
            }
        ]
    }
]



# Tasks:
    - Agregar barra de filtrado en main
    - Filtrar recetas de un pais
    - sacar de la url de borrar la palabra delete, se sobre entiende al hacer un delete! 
    - Estilar footer
    - Hacer el update 
    - Si en la info receta no hay contenido que no se muestre (el caso de la sección consejo)
    - Avances nuevo mini menu
      - 
