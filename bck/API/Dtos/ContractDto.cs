namespace API.Dtos;

public record ContractDto(Guid Id, string Description, string AuthorName, string LegalEntityName, DateTime CreatedDate, DateTime? UpdatedDate);
