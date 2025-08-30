using System.ComponentModel.DataAnnotations;

namespace API.Dtos;

public record UpdateContractDto(
    [Required] Guid Id,
    [Required] string AuthorName,
    [Required] string LegalEntityName,
    [Required] string Description
);
