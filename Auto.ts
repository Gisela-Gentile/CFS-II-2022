import * as fs from "fs";
import * as ReadlineSync from 'readline-sync';
​
class Auto {
    private dominio:string;
    private marca: string;
    private modelo: string;
    private motor: string;
    private chasis:string;
​
    public constructor(dominio: string, marca: string, modelo:string, motor:string, chasis:string) {
        this.dominio = dominio;
        this.marca= marca;
        this.modelo= modelo;
        this.motor = motor;
        this.chasis= chasis;
    }
    public getdominio(): string{
        return this.dominio;
    }
    public getmarca(): string{
        return this.marca;
    }
    public getmodelo():string{
        return this.modelo;
    }
    public getmotor():string{
        return this.motor;
    }
    public getchasis(): string{
        return this.chasis;
    }
    }

//instalar npm install @types/node
// creamos un gestor que nos permite leer un archivo de texto
​
class GestorDeArchivos {
​    private arregloString: string[];
​
    constructor(txtFileLocation: string) {
​
        let archivoTxt: string = fs.readFileSync(txtFileLocation, 'utf-8'); //esta variable guarda "JSN123, CHEVROLET, ASTRA,NAFTA 1.6, 1234; KLP456, FORD, FOCUS, NAFTA 2.0, 19876"
            this.arregloString = archivoTxt.split(';');  //vamos a tener nuestro "objetos" separados por ;
        //["JSN123, CHEVROLET, ASTRA,NAFTA 1.6, 1234", "KLP456, FORD, FOCUS, NAFTA 2.0, 19876"]
    
    }
​
    public mostrarArreglo(): void {
        console.log(this.arregloString);
    }
​
    public getArregloString(): string[] {
        return this.arregloString;
    }
​
}
class RegistroAutomotor{
    private nombre: string;
    private direccion: string;
    private listaDeAutos: Array<Auto>;

     public constructor( listaDeAutos: Array<Auto>){
        this.nombre = "Registro Coronel Dorrego";
        this.direccion= "Av. Santagada 1830";
        this.listaDeAutos=listaDeAutos
     }
    public getnombre():string{
        return this.nombre
    }
    public getdireccion():string{
        return this.direccion
    }
    public getListaDeAutos(): Array<Auto>{
        return this.listaDeAutos;
    }

 // funcion dar alta un auto
 public altaAuto(): void{

    let dominio:string = ReadlineSync.question("Ingrese el dominio del auto en MAYUSCULA y sin espacio: ");
    let marca:string = ReadlineSync.question("Ingrese la marca del auto: ");
    let modelo:string = ReadlineSync.question("Ingrese el modelo del auto: ");
    let motor:string = ReadlineSync.question("Ingrese el motor del auto: ");
    let chasis:string = ReadlineSync.question("Ingrese el chasis del auto: ");
    
    let nuevoAuto : Auto = new Auto(dominio.toUpperCase(), marca, modelo, motor, chasis);
    ​
        //inserto el elemento de tipo Auto en el arreglo recibido
        this.listaDeAutos.push(nuevoAuto);
 }
        //funcion para "borrar" un auto
​
public bajaAuto( posicion: number) : void {​

    this.listaDeAutos.splice(posicion, 1);
        }
       
    //funcion para modificar datos de un auto
//instalamos readline-sync -- npm install readline-sync
​
public actualizarAuto( posicion: number): void{

    
    let dominio:string= this.listaDeAutos[posicion].getdominio();
    let marca:string = ReadlineSync.question("Ingrese la marca del auto: ");
    let modelo:string = ReadlineSync.question("Ingrese el modelo del auto: ");
    let motor:string = ReadlineSync.question("Ingrese el motor del auto: ");
    let chasis:string = ReadlineSync.question("Ingrese el chasis del auto: ");
​
    let autoActualizado : Auto = new Auto(dominio,marca, modelo,motor,chasis);
​
    delete this.listaDeAutos[posicion];
    this.listaDeAutos[posicion] = autoActualizado;
    console.log(autoActualizado);

    }
    public mostrarUnAuto( posicion:number):void{

        console.log(this.listaDeAutos[posicion]);
            }

            
 }

function cargarAuto(auto: string, arrayAuto: Array<Auto>) : void{
    ​
        let propiedadAuto : string[] = auto.split(','); //la variable auto va a contener --->"JSN123, CHEVROLET, ASTRA,NAFTA 1.6, POYT1234"
        // y auto.split(',') = ["JSN123", "CHEVROLET", "ASTRA","NAFTA 1.6", "POYT1234"]
        let dominio: string = propiedadAuto[0];
        let marca: string = propiedadAuto[1];
        let modelo:string = propiedadAuto[2];
        let motor: string = propiedadAuto[3];    
        let chasis: string =propiedadAuto[4];
        
        let nuevoAuto : Auto = new Auto(dominio, marca, modelo, motor, chasis);
    ​
        //inserto el elemento de tipo Auto en el arreglo recibido
        arrayAuto.push(nuevoAuto);
    }
const obtenerPosicion = (arregloAuto: Auto[]): number=>{
    let posicion: number=0
    let dominio:string= ReadlineSync.question("Ingrese el dominio del auto en mayuscula y sin espacios: ");
    for (let i:number=0; i< arregloAuto.length; i++){
        if ( arregloAuto[i].getdominio() == dominio.toUpperCase()){
            posicion=i
        }
                   
             }
     return posicion
}

const consultarOtraOpcion= ():void =>{
    console.log("Desea realizar otra consulta");
    let consulta:string = ReadlineSync.question("SI/NO?:  ");
    if(consulta.toLowerCase()=="si"){
        mostrarMenu();
    }
}

 //Iniciar programa
let datos: GestorDeArchivos = new GestorDeArchivos("auto.txt");
​
let listaAutos: Array<Auto>=[];

for (let i : number= 0; i < datos.getArregloString().length; i++){
​
    cargarAuto(datos.getArregloString()[i], listaAutos);
    }
    
let auto:RegistroAutomotor=new RegistroAutomotor(listaAutos);

const mostrarMenu=():void=>{
    let menu:number= 0
    console.log("MENU");
    console.log("1- Dar de alta un auto nuevo");
    console.log("2- Modicar datos"); 
    console.log("3- Dar de baja");
    console.log("4- consultar por un auto");
    console.log("5- Mostrar listado de austos registrados");
        
    menu= ReadlineSync.questionInt("Ingrese el numero de opcion: ");

switch (menu){
     case 1:
        console.log("Dar de alta un auto nuevo");
        auto.altaAuto();
        consultarOtraOpcion();
        
        break;
        case 2:
            console.log("Modicar datos");
            let posicion:number= obtenerPosicion(listaAutos);
            auto.actualizarAuto(posicion);
            consultarOtraOpcion();
            break;
        case 3:
            console.log("Dar de baja");
            let ubicacion:number= obtenerPosicion(listaAutos);
            auto.bajaAuto(ubicacion);
            consultarOtraOpcion();
            break;
         case 4:
            console.log("consultar por un auto");
            let posicion1:number= obtenerPosicion(listaAutos);
            auto.mostrarUnAuto(posicion1);
            consultarOtraOpcion();
         case 5:
            console.log(listaAutos);
            consultarOtraOpcion();
            break;
            
}}   
    
mostrarMenu();

   
        
   
    
   

   



