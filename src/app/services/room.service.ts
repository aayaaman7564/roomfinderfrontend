import { Injectable } from '@angular/core';
import { room } from '../shared/model/room';
import { sample_rooms } from 'src/data';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ROOMS_URL } from '../shared/model/constants/url';
import { ROOMS_BY_SEARCH_URL } from '../shared/model/constants/url';
import { ROOMS_BY_ID_URL } from '../shared/model/constants/url';
@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private httpClient:HttpClient) { }
  getAll():Observable<room[]>{
    return this.httpClient.get<room[]>(ROOMS_URL)
  }
  //room search
  getAllRoomBySearchTerm(searchTerm:string){
    return this.httpClient.get<room[]>(ROOMS_BY_SEARCH_URL +searchTerm)
  }
  //get room by id
  getRoomById(roomID:string):Observable<room>{
    return this.httpClient.get<room>(ROOMS_BY_ID_URL +roomID)
  }
}
