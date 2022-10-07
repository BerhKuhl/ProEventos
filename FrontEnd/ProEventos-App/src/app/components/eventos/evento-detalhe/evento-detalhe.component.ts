import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';
import { idLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  form: FormGroup;
  event: Evento;
  modeSave = 'post';

  get f(): any { return this.form.controls }

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false
    }
  }

  constructor(private fb: FormBuilder, private localeService: BsLocaleService, private router: ActivatedRoute, private serviceEvent: EventoService, private spinner: NgxSpinnerService, private toastr: ToastrService) {
    this.localeService.use('pt-br');
  }

  private loadEvent(): void {
    const eventIdParam = this.router.snapshot.paramMap.get('id');

    if (eventIdParam !== null) {
      this.modeSave = 'put';
      this.spinner.show();
      this.serviceEvent.getEventById(+eventIdParam).subscribe(
        (resultEvent: Evento) => {
        this.event = {...resultEvent}
        this.form.patchValue(this.event)
      },
      (error: any) => {
        this.spinner.hide()
        this.toastr.error('Erro ao tentar carregar o evento.', 'Erro!')
      },
      () => this.spinner.hide()
      );
    }
  }

  ngOnInit(): void {
    this.loadEvent();
    this.validation();
  }

  private validation(): void {
    this.form = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: ['', Validators.required]
    });
  }

  protected resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }

  public cssValidator(fieldForm: FormControl): any {
    return {'is-invalid': fieldForm.errors && fieldForm.touched}
  }

  public saveEvent(): void {
    this.spinner.show();
    if (this.form.valid) {

      this.event = (this.modeSave === 'post')
        ? {...this.form.value }
        : {id: this.event.id, ...this.form.value };

      this.serviceEvent[this.modeSave](this.event).subscribe(
        () =>  this.toastr.success('Evento salvo com sucesso!', 'Sucesso'),
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error('Erro ao salvar o evento', 'Erro')
        },
        () => this.spinner.hide()
      );
    }
  }
}
