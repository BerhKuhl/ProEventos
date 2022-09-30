using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Application.Contracts
{
    public interface IEventoService
    {
        Task<Evento> Add(Evento model);
        Task<Evento> Update(int eventoId, Evento model);
        Task<bool> Delete(int eventoId);

        Task<Evento[]> GetAllAsync(bool includePalestrantes = false);
        Task<Evento[]> GetAllByTemaAsync(string tema, bool includePalestrantes = false);
        Task<Evento> GetByIdAsync(int eventoId, bool includePalestrantes = false);
    }
}