import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss']
})
export class TituloComponent implements OnInit {

  @Input() titulo = '';
  @Input() subtitulo = 'Desde 2022';
  @Input() iconClass = 'fa fa-user';
  @Input() showBtnList = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  list(): void {
    this.router.navigate([`/${this.titulo.toLocaleLowerCase()}/lista`])
  }

}
