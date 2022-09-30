import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from '../models/Evento';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  modalRef?: BsModalRef;
  public eventos: Evento[] = [];
  public eventosFiltered: Evento[] = [];
  public widthImg = 150;
  public marginImg = 2;
  public showImg = true;
  private listedFilters = '';

  public get filterList() {
    return this.listedFilters;
  }

  public set filterList(value: string) {
    this.listedFilters = value;
    this.eventosFiltered = this.filterList ? this.filterEvents(this.listedFilters) : this.eventos;
  }

  public filterEvents(filterBy: string) : Evento[] {
    filterBy = filterBy.toLowerCase();
    return this.eventos.filter((evento : any) => evento.tema.toLowerCase().indexOf(filterBy) !== -1
    || evento.local.toLowerCase().indexOf(filterBy) !== -1);
  }

  public constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr : ToastrService,
    private spinner: NgxSpinnerService
    ) { }

  public ngOnInit(): void {
    this.getEventos();

    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

  public ShowImg() : void {
    this.showImg = !this.showImg;
  }

  public getEventos(): void {
    const observer = {
      next: (eventosResp: Evento[]) => {
        this.eventos = eventosResp;
        this.eventosFiltered = this.eventos;
      },
      error: (error : any) => console.log(error)
    }
    this.eventoService.getEventos().subscribe(observer);
  }

  openModal(template: TemplateRef<any>) : void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('O Evento foi deletado com sucesso.', 'Evento Deletado!')
  }

  decline(): void {
    this.modalRef?.hide();
  }
}
