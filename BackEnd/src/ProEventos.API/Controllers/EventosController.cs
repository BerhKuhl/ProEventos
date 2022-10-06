using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProEventos.Application.Dtos;
using ProEventos.Application.Contracts;
using ProEventos.Persistence;
using ProEventos.Persistence.Contexts;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventosController : ControllerBase
    {
        private readonly IEventoService _eventoService;

        public EventosController(IEventoService eventoService)
        {
            _eventoService = eventoService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var events = await _eventoService.GetAllAsync();
                if (events == null) return NotFound("Nenhum evento encontrado.");

                var returnEvent = new List<EventoDto>();

                foreach (var @event in events)
                {
                    returnEvent.Add(new EventoDto() {
                        Id = @event.Id,
                        Local = @event.Local,
                        DataEvento = @event.DataEvento.ToString(),
                        Tema = @event.Tema,
                        QtdPessoas = @event.QtdPessoas,
                        ImagemURL = @event.ImagemURL,
                        Telefone = @event.Telefone,
                        Email = @event.Email
                    });
                }

                return Ok(returnEvent);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar eventos! Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var evento = await _eventoService.GetByIdAsync(id, true);
                if (evento == null) return NotFound("Evento por Id não foi encontrado.");

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar evento! Erro: {ex.Message}");
            }
        }

        [HttpGet("{tema}/tema")]
        public async Task<IActionResult> GetByTema(string tema)
        {
            try
            {
                var evento = await _eventoService.GetAllByTemaAsync(tema, true);
                if (evento == null) return NotFound("Não foi encontrado nenhum Evento com o tema especificado.");

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar eventos! Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(EventoDto model)
        {
            try
            {
                var evento = await _eventoService.Add(model);
                if (evento == null) return BadRequest("Erro ao tentar adicionar o evento!");

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar adicionar o evento! Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, EventoDto model)
        {
            try
            {
                var evento = await _eventoService.Update(id, model);
                if (evento == null) return BadRequest("Erro ao tentar adicionar o evento!");

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar atualizar o evento! Erro: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                return await _eventoService.Delete(id) ? Ok("Deletado!") : BadRequest("Erro ao tentar deletar o evento!");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar deletar eventos! Erro: {ex.Message}");
            }
        }
    }
}
