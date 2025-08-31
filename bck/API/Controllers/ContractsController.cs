using API.Dtos;
using API.Extensions;
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
    [EndpointSummary("Obtiene todos los contratos")]
    [EndpointDescription("Recupera una lista completa de todos los contratos disponibles en la base de datos.")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<ContractDto>>> GetContracts()
    {
        IEnumerable<Contract> contracts = await _contractService.GetAllContractsAsync();
        return Ok(contracts.Select(c => c.ToDto()));
    }

    [HttpGet("{id:guid}")]
    [EndpointSummary("Obtiene un contrato por su ID")]
    [EndpointDescription("Recupera los detalles de un contrato específico usando su identificador único.")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
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
    [EndpointSummary("Crea un nuevo contrato")]
    [EndpointDescription("Registra un nuevo contrato en el sistema con los datos proporcionados.")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ContractDto>> CreateContract([FromBody] CreateContractDto createDto)
    {
        Contract contract = createDto.ToEntity();
        bool success = await _contractService.CreateContractAsync(contract);
        if (!success)
        {
            return BadRequest();
        }
        return CreatedAtAction(nameof(GetContract), new { id = contract.Id }, contract.ToDto());
    }

    [HttpPut("{id:guid}")]
    [EndpointSummary("Actualiza un contrato existente")]
    [EndpointDescription("Modifica los detalles de un contrato existente usando su ID.")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> UpdateContract(Guid id, [FromBody] UpdateContractDto updateDto)
    {
        if (id != updateDto.Id)
        {
            return BadRequest();
        }
        Contract contract = updateDto.ToEntity();
        bool success = await _contractService.UpdateContractAsync(contract);
        if (!success)
        {
            return NotFound();
        }
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    [EndpointSummary("Elimina un contrato")]
    [EndpointDescription("Elimina un contrato del sistema de forma permanente usando su ID.")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
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
