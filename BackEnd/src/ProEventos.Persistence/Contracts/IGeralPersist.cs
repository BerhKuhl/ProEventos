using System.Threading.Tasks;

namespace ProEventos.Persistence.Contracts
{
    public interface IGeralPersist
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        void DeleteRange<T>(T[] entities) where T : class;

        Task<bool> SaveChangesAsync();
    }
}