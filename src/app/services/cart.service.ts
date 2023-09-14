import { Injectable } from '@angular/core';
import { Cart } from '../shared/model/cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { room } from '../shared/model/room';
import { Cartitem } from '../shared/model/cartitems';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart = new Cart();
  private cartSubject:BehaviorSubject<Cart>=new BehaviorSubject(this.cart)
  constructor() { }
  //add to cart method
  addTocart(room:room):void{
    let cartitem= this.cart.items.find(item =>item.room.id ===room.id)
    if(cartitem)
    return;
    
    this.cart.items.push(new Cartitem(room))
    this.setCartToLocalStorage();
  }
  //remove cart
  removeFromCart(roomId:string):void{
    this.cart.items = this.cart.items.filter(item => item.room.id != roomId)
    this.setCartToLocalStorage();
  }

  //change Quantity
  changeQuantity(roomId:string, quantity:number){
    let cartitem = this.cart.items.find(item => item.room.id ===roomId);
    if(!cartitem)
    return;

    cartitem.quantity = quantity;
    cartitem.price = quantity * cartitem.room.price;
    this.setCartToLocalStorage();
  }
  // clear cart
  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }
  //get cart observable mean check observable data
  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }
  // setting of local storage data for holding cart item
  private setCartToLocalStorage():void{
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    const cartJson = JSON.stringify(this.cart)
    localStorage.setItem('Cart', cartJson)
    this.cartSubject.next(this.cart)
  }
  //now get this data from local storage
  private getCartFromLocalStorage():Cart{
    const cartJson = localStorage.getItem('Cart');
    return cartJson?JSON.parse(cartJson):new Cart();
  }
}
