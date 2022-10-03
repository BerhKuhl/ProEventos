import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {

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
    private spinner: NgxSpinnerService,
    private router: Router
    ) { }

  public ngOnInit(): void {
    this.getEventos();

    this.spinner.show();
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
      error: (error : any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os eventos.', 'Erro!')
      },
      complete: () => this.spinner.hide()
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

  eventDetail(id: number): void {
    this.router.navigate([`/eventos/detalhe/${id}`]);
  }

}
