import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [];
  public eventosFiltered: any;
  widthImg: number = 150;
  marginImg: number = 2;
  showImg: boolean = true;
  private _filterList: string = '';

  public get filterList() {
    return this._filterList;
  }

  public set filterList(value: string) {
    this._filterList = value;
    this.eventosFiltered = this.filterList ? this.filterEvents(this._filterList) : this.eventos;
  }

  filterEvents(filterBy: string) : any {
    filterBy = filterBy.toLowerCase();
    return this.eventos.filter((evento : any) => evento.tema.toLowerCase().indexOf(filterBy) !== -1
    || evento.local.toLowerCase().indexOf(filterBy) !== -1);
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos();
  }

  ShowImg() {
    this.showImg = !this.showImg;
  }

  public getEventos(): void {
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      response => {
        this.eventos = response;
        this.eventosFiltered = this.eventos;
      },
      error => console.log(error)
    );
  }
}
