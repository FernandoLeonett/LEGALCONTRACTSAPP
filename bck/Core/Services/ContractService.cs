using Core.Entities;
using Core.Interfaces;
using Microsoft.Extensions.Logging;



namespace Core.Services
{
    public class ContractService(IContractRepository contractRepository, ILogger<ContractService> logger) : IContractService
    {
        private readonly IContractRepository _contractRepository = contractRepository;
        private readonly ILogger<ContractService> _logger = logger;

        public async Task<IEnumerable<Contract>> GetAllContractsAsync()
        {
            _logger.LogInformation("📄 Getting all contracts.");
            return await _contractRepository.GetAllAsync();
        }

        public async Task<Contract?> GetContractByIdAsync(Guid id)
        {
            _logger.LogInformation("🔍 Searching for contract with ID: {id}.", id);
            Contract? contract = await _contractRepository.GetByIdAsync(id);
            if (contract == null)
            {
                _logger.LogWarning("⚠️ Contract with ID: {ContractId} not found.", id);
            }
            return contract;
        }

        public async Task<bool> CreateContractAsync(Contract contract)
        {
            _logger.LogInformation("📄 Creating a new contract.");
            contract.CreatedDate = DateTime.UtcNow;
            await _contractRepository.AddAsync(contract);
            return true;
        }

        public async Task<bool> UpdateContractAsync(Contract contract)
        {
            _logger.LogInformation("🔄 Updating contract with ID: {contract.Id}.", contract.Id);
            contract.UpdatedDate = DateTime.UtcNow;
            await _contractRepository.UpdateAsync(contract);
            return true;

        }

        public async Task<bool> DeleteContractAsync(Guid id)
        {
            _logger.LogInformation("🗑️ Deleting contract with ID: {id}.",id);
            return await _contractRepository.DeleteAsync(id);
        }
    }
}
