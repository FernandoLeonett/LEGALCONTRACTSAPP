using API.Dtos;
using Core.Entities;

namespace API.Extensions;

public static class DtoExtensions
{
    // Método para mapear de un DTO de creación a una entidad.
    public static Contract ToEntity(this CreateContractDto dto) => new()
    {
        AuthorName = dto.AuthorName,
        Description = dto.Description,
        LegalEntityName = dto.LegalEntityName
    };

    // Método para mapear de un DTO de actualización a una entidad.
    public static Contract ToEntity(this UpdateContractDto dto) => new()
    {
        Id = dto.Id,
        AuthorName = dto.AuthorName,
        Description = dto.Description,
        LegalEntityName = dto.LegalEntityName
    };

    // Método para mapear de una entidad a un DTO de lectura (el que se envía al frontend).
    public static ContractDto ToDto(this Contract entity) => new(
        entity.Id,
        entity.Description,
        entity.AuthorName,
        entity.LegalEntityName,
        entity.CreatedDate,
        entity.UpdatedDate

    );
}
