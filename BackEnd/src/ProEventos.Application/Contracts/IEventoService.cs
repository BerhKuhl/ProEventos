using System.Threading.Tasks;
using ProEventos.Application.Dtos;

namespace ProEventos.Application.Contracts
{
    public interface IEventoService
    {
        Task<EventoDto> Add(EventoDto model);
        Task<EventoDto> Update(int eventoId, EventoDto model);
        Task<bool> Delete(int eventoId);

        Task<EventoDto[]> GetAllAsync(bool includePalestrantes = false);
        Task<EventoDto[]> GetAllByTemaAsync(string tema, bool includePalestrantes = false);
        Task<EventoDto> GetByIdAsync(int eventoId, bool includePalestrantes = false);
    }
}