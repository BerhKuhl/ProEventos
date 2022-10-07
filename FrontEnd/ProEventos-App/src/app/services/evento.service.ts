import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Evento } from '../models/Evento';

@Injectable()
export class EventoService {
  baseURL = 'https://localhost:5001/api/eventos';

  constructor(private http: HttpClient) { }

  public getEvents(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseURL).pipe(take(1));
  }

  public getEventsByTema(tema: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseURL}/${tema}/tema`).pipe(take(1));
  }

  public getEventById(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseURL}/${id}`).pipe(take(1));
  }

  public post(event: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.baseURL, event).pipe(take(1));
  }

  public put(event: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.baseURL}/${event.id}`, event).pipe(take(1));
  }

  public deleteEvent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/${id}`).pipe(take(1));
  }
}
