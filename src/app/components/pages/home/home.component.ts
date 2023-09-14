import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RoomService } from 'src/app/services/room.service';
import { room } from 'src/app/shared/model/room';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  rooms:room[] = [];

  constructor(private api:RoomService, activateRoute:ActivatedRoute){
    let roomsObservable:Observable<room[]>
    activateRoute.params.subscribe((params)=>{
      if(params.searchTerm)
      roomsObservable = this.api.getAllRoomBySearchTerm(params.searchTerm)
      else
      roomsObservable = api.getAll() //for retun all room

      roomsObservable.subscribe((serverRooms)=>{
        this.rooms = serverRooms;
      })
    })
    
  }
  ngOnInit(){}
  
}
