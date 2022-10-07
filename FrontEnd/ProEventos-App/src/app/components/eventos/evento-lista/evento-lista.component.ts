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
  public eventId = 0;
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
    private eventService: EventoService,
    private modalService: BsModalService,
    private toastr : ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
    ) { }

  public ngOnInit(): void {
    this.getEvents();

    this.spinner.show();
  }

  public ShowImg() : void {
    this.showImg = !this.showImg;
  }

  public getEvents(): void {
    this.eventService.getEvents().subscribe(
      (eventosResp: Evento[]) => {
        this.eventos = eventosResp;
        this.eventosFiltered = this.eventos;
      },
      (error : any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os eventos.', 'Erro!')
      },
      () => this.spinner.hide()
    );
  }

  openModal(event: any, template: TemplateRef<any>, eventId: number) : void {
    event.stopPropagation();
    this.eventId = eventId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.eventService.deleteEvent(this.eventId).subscribe (
      (result: any) => {
        console.log(result)
        this.toastr.success('O Evento foi deletado com sucesso.', 'Evento Deletado!');
        this.getEvents()
      },
      (error) => {
        this.toastr.error(`Erro ao tentar deletar o evento de código ${this.eventId}!`, 'Erro');
        console.error(error)
      }
    ).add(() => this.spinner.hide());

  }

  decline(): void {
    this.modalRef?.hide();
  }

  eventDetail(id: number): void {
    this.router.navigate([`/eventos/detalhe/${id}`]);
  }

}
