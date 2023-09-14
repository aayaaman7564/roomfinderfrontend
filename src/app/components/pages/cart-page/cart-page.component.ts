import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/model/cart';
import { Cartitem } from 'src/app/shared/model/cartitems';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit{
  cart!:Cart
  constructor(private cartService:CartService){
    this.cartService.getCartObservable().subscribe((cart)=>{
      this.cart = cart;
    })
  }

  ngOnInit(): void {
    
  }
  removeFromCart(cartItem:Cartitem){
    this.cartService.removeFromCart(cartItem.room.id);
  }

  changeQunatity(cartItem:Cartitem, quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.room.id,quantity);
  }
}
