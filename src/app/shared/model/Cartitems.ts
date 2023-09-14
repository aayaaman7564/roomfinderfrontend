import { room } from "./room";

export class Cartitem{
    constructor(public room:room){}
    quantity: number =1;
    price:number = this.room.price;
}
