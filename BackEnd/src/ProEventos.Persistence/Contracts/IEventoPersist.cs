using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contracts
{
    public interface IEventoPersist
    {
        Task<Evento[]> GetAllAsync(bool includePalestrantes);
        Task<Evento[]> GetAllByTemaAsync(string tema, bool includePalestrantes);
        Task<Evento> GetByIdAsync(int eventoId, bool includePalestrantes);
    }
}