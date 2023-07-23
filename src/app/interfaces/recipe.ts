import Ingredient from './ingredient';

export default interface Recipe {
    nombre: string,
    descripcion: string[],
    imagen: string,
    ingredientes: Ingredient[],
    preparacion: string[],
    consejos: string[]
}