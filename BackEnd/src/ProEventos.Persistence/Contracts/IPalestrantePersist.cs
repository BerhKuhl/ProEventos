using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contracts
{
    public interface IPalestrantePersist
    {
        Task<Palestrante[]> GetAllAsync(bool includeEventos);
        Task<Palestrante[]> GetAllByNomeAsync(string nome, bool includeEventos);
        Task<Palestrante> GetByIdAsync(int palestranteId, bool includeEventos);
    }
}