import Ingredient from './ingrediente';

export default interface receta {
    nombre: string,
    descripcion: string,
    imagen: string,
    ingredientes: Ingredient[],
    preparacion: string,
    consejos: string
}