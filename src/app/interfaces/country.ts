import Recipe from './recipe';

export default interface Pais {
    nombre: string,
    bandera: string,
    recetas?: Recipe[]
}