using Core.Entities;

namespace Core.Interfaces
{
    public interface IContractService
    {
        Task<IEnumerable<Contract>> GetAllContractsAsync();
        Task<Contract?> GetContractByIdAsync(Guid id);
        Task<bool>  CreateContractAsync(Contract contract);
        Task<bool> UpdateContractAsync(Contract contract);
        Task<bool> DeleteContractAsync(Guid id);
    }
}