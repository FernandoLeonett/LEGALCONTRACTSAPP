using Core.Entities;
using Core.Interfaces;
using Data.Context;
using Microsoft.EntityFrameworkCore;

namespace Data.Repostiories;

public class ContractRepository(AppDbContext context) : IContractRepository
{
    private readonly AppDbContext _context = context;

    public async Task<bool> AddAsync(Contract contract)
    {
        await _context.Contracts.AddAsync(contract);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        Contract? contract = await _context.Contracts.FindAsync(id);
        if (contract != null)
        {
            _context.Contracts.Remove(contract);
            await _context.SaveChangesAsync();
            return true;
        }
        return false;
    }

    public Task<Contract?> GetByIdAsync(Guid id) => throw new NotImplementedException();

    public async Task<bool> UpdateAsync(Contract contract)
    {
        _context.Entry(contract).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<Contract>> GetAllAsync()
    {
        return await _context.Contracts.ToListAsync();
    }
}
