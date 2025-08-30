import { ContractsFilter } from "@/components/ContracsFilter";
import { ContractForm } from "@/components/ContractForm";
import { ContractsHeader } from "@/components/ContractHeader";
import { ContractsList } from "@/components/ContractList";
import { DeleteDialog } from "@/components/DeleteDialog";
import { useContracts } from "@/hooks/useContracts";
import { ContractDto, UpdateContractDto } from "@/types/contract";
import { useState } from "react";

const Index = () => {
  const { contracts, searchTerm, setSearchTerm, sortBy, setSortBy, addContract, updateContract, deleteContract } =
    useContracts();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContract, setEditingContract] = useState<ContractDto | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; contract: ContractDto | null }>({
    isOpen: false,
    contract: null,
  });

  const filteredContracts = contracts.filter(
    (c) =>
      c.legalEntityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.authorName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleEdit = (contract: ContractDto) => {
    setEditingContract(contract);
    setIsFormOpen(true);
  };

  const handleDelete = (contractId: string) => {
    const contract = contracts.find((c) => c.id === contractId);
    if (contract) setDeleteDialog({ isOpen: true, contract });
  };

  const confirmDelete = () => {
    if (deleteDialog.contract) {
      deleteContract(deleteDialog.contract.id);
      setDeleteDialog({ isOpen: false, contract: null });
    }
  };

  const handleSave = (contractData: UpdateContractDto) => {
    if (editingContract) {
      updateContract(contractData);
      setEditingContract(null);
    } else {
      addContract(contractData);
    }
  };
  // Ordenar
  const sortedContracts = [...filteredContracts].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.legalEntityName.localeCompare(b.legalEntityName);
      case "author":
        return a.authorName.localeCompare(b.authorName);
      case "date":
        return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-hero">
      <ContractsHeader onNewContract={() => setIsFormOpen(true)} />
      <div className="container mx-auto px-4 py-6">
        <ContractsFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} sortBy={sortBy} setSortBy={setSortBy} />
        <ContractsList
          contracts={sortedContracts}
          searchTerm={searchTerm}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreate={() => setIsFormOpen(true)}
        />
      </div>

      <ContractForm
        contract={editingContract || undefined}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
      />
      <DeleteDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, contract: null })}
        onConfirm={confirmDelete}
        contractName={deleteDialog.contract?.legalEntityName || ""}
      />
    </div>
  );
};

export default Index;
