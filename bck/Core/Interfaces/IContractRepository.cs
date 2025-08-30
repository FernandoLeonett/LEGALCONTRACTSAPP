using Core.Entities;

namespace Core.Interfaces
{
    public interface IContractRepository
    {
        Task<IEnumerable<Contract>> GetAllAsync();
        Task<Contract?> GetByIdAsync(Guid id);
        Task<bool> AddAsync(Contract contract);
        Task<bool> UpdateAsync(Contract contract);
        Task<bool> DeleteAsync(Guid id);
    }
}