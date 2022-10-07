import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/Evento';

@Injectable()
export class EventoService {
  baseURL = 'https://localhost:5001/api/eventos';

  constructor(private http: HttpClient) { }

  public getEvents(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseURL);
  }

  public getEventsByTema(tema: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseURL}/${tema}/tema`);
  }

  public getEventById(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseURL}/${id}`);
  }

  public post(event: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.baseURL, event);
  }

  public put(event: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.baseURL}/${event.id}`, event);
  }

  public deleteEvent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/${id}`);
  }
}
