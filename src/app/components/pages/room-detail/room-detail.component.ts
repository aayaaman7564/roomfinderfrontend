import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { RoomService } from 'src/app/services/room.service';
import { room } from 'src/app/shared/model/room';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit{
  room!:room;
  constructor(activatedRoute:ActivatedRoute, private api:RoomService, private cartService:CartService, private router:Router){
    activatedRoute.params.subscribe((params)=>{
      if(params.id)
      api.getRoomById(params.id).subscribe(serverRoom=>{
        this.room = serverRoom
      })
      
    })
  }
  
  ngOnInit(): void {
    
  }

  //Add to cart 
  addToCart(){
    this.cartService.addTocart(this.room);
    this.router.navigateByUrl('/cart-page')
  }
}
