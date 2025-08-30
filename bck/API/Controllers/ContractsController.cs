using API.Extensions;
using Common.Dtos;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContractsController(IContractService contractService) : ControllerBase
{
    private readonly IContractService _contractService = contractService;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ContractDto>>> GetContracts()
    {
        IEnumerable<Contract> contracts = await _contractService.GetAllContractsAsync();
        return Ok(contracts.Select(c => c.ToDto()));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ContractDto>> GetContract(Guid id)
    {
        Contract? contract = await _contractService.GetContractByIdAsync(id);
        if (contract == null)
        {
            return NotFound();
        }
        return Ok(contract.ToDto());
    }

    [HttpPost]
    public async Task<ActionResult<ContractDto>> CreateContract([FromBody] ContractDto contractDto)
    {
        Contract contract = contractDto.ToEntity();
        bool success = await _contractService.CreateContractAsync(contract);
        if (!success)
        {
            return BadRequest();
        }
        return CreatedAtAction(nameof(GetContract), new { id = contract.Id }, contract.ToDto());
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult> UpdateContract(Guid id, [FromBody] ContractDto contractDto)
    {
        if (id != contractDto.Id)
        {
            return BadRequest();
        }
        Contract contract = contractDto.ToEntity();
        bool success = await _contractService.UpdateContractAsync(contract);
        if (!success)
        {
            return NotFound();
        }
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<ActionResult> DeleteContract(Guid id)
    {
        bool success = await _contractService.DeleteContractAsync(id);
        if (!success)
        {
            return NotFound();
        }
        return NoContent();
    }
}
