using System.ComponentModel.DataAnnotations;
namespace API.Dtos;    
public record CreateContractDto(
    [Required] string AuthorName,
    [Required] string LegalEntityName,
    [Required] string Description
);
