namespace Core.Entities;

public class Contract
{
    public Guid Id { get; set; }
    public required string AuthorName { get; set; }
    public required string LegalEntityName { get; set; }
    public required string Description { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }
}