using Core.Interfaces;
using Core.Services;
using FluentAssertions;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Threading.Tasks;
using Xunit;

namespace Tests;

public class ContractServiceTests
{
    private readonly Mock<IContractRepository> _mockContractRepository;
    private readonly Mock<ILogger<ContractService>> _mockLogger;
    private readonly ContractService _contractService;

    public ContractServiceTests()
    {
        _mockContractRepository = new Mock<IContractRepository>();
        _mockLogger = new Mock<ILogger<ContractService>>();

        _contractService = new ContractService(_mockContractRepository.Object, _mockLogger.Object);
    }

    [Fact]
    public async Task GetContractByIdAsync_ShouldReturnNull_WhenNotFound()
    {
        Guid contractId = Guid.NewGuid();
        _mockContractRepository
            .Setup(repo => repo.GetByIdAsync(contractId))
            .ReturnsAsync((Core.Entities.Contract)null);

        Core.Entities.Contract result = await _contractService.GetContractByIdAsync(contractId);

        result.Should().BeNull();
    }

    [Fact]
    public async Task CreateContractAsync_ShouldCallAddAsync_OnRepository()
    {
        Core.Entities.Contract newContract = new()
        {
            Id = Guid.NewGuid(),
            AuthorName = "Jane Doe",
            LegalEntityName = "Example Corp",
            CreatedDate = DateTime.UtcNow,
            Description = "A sample contract"
        };

        await _contractService.CreateContractAsync(newContract);

        _mockContractRepository.Verify(r => r.AddAsync(newContract), Times.Once);
    }
    [Fact]
    public async Task UpdateContractAsync_ShouldCallUpdateAsync_OnRepository()
    {
        Core.Entities.Contract existing = new()
        {
            Id = Guid.NewGuid(),
            AuthorName = "Jane Doe",
            LegalEntityName = "Corp",
            CreatedDate = DateTime.UtcNow,
            Description = "Original"
        };

        await _contractService.UpdateContractAsync(existing);

        _mockContractRepository.Verify(r => r.UpdateAsync(existing), Times.Once);
    }
    [Fact]
    public async Task DeleteContractAsync_ShouldCallDeleteAsync_OnRepository()
    {
        Guid contractId = Guid.NewGuid();

        await _contractService.DeleteContractAsync(contractId);

        _mockContractRepository.Verify(r => r.DeleteAsync(contractId), Times.Once);
    }


    [Fact]
    public async Task GetAllContractsAsync_ShouldReturnList_WhenContractsExist()
    {
        Core.Entities.Contract[] contracts =
        [
        new Core.Entities.Contract { Id = Guid.NewGuid(), AuthorName = "A1", LegalEntityName = "E1", CreatedDate = DateTime.UtcNow, Description = "D1" },
        new Core.Entities.Contract { Id = Guid.NewGuid(), AuthorName = "A2", LegalEntityName = "E2", CreatedDate = DateTime.UtcNow, Description = "D2" }
    ];

        _mockContractRepository
            .Setup(r => r.GetAllAsync())
            .ReturnsAsync(contracts);

        System.Collections.Generic.IEnumerable<Core.Entities.Contract> result = await _contractService.GetAllContractsAsync();

        result.Should().HaveCount(2)
              .And.ContainSingle(c => c.AuthorName == "A1")
              .And.ContainSingle(c => c.AuthorName == "A2");
    }

}
