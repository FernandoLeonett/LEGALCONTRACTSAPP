
using Common.Dtos;
using Core.Entities;

namespace API.Extensions;

public static class DtoExtensions
{
    public static Contract ToEntity(this ContractDto dto) => new()

    { 

            Id = dto.Id,
            AuthorName = dto.AuthorName,
            Description= dto.Description,
            LegalEntityName = dto.LegalEntityName

        
    };

    public static ContractDto ToDto(this Contract entity) => new(entity.Id, entity.Description, entity.AuthorName, entity.LegalEntityName);
 
}
