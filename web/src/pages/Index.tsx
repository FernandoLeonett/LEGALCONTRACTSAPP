import { ContractsFilter } from "@/components/ContracsFilter";
import { ContractForm } from "@/components/ContractForm";
import { ContractsHeader } from "@/components/ContractHeader";
import { ContractsList } from "@/components/ContractList";
import { DeleteDialog } from "@/components/DeleteDialog";
import { useContracts } from "@/hooks/useContracts";
import { ContractDto, UpdateContractDto } from "@/types/contract";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const {
    contracts,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    addContract,
    updateContract,
    deleteContract,
  } = useContracts();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContract, setEditingContract] = useState<ContractDto | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; contract: ContractDto | null }>({
    isOpen: false,
    contract: null,
  });

  // Guardar contrato
  const handleSave = async (contractData: UpdateContractDto) => {
    if (editingContract) {
      await updateContract(contractData);
      setEditingContract(null);
    } else {
      await addContract(contractData);
    }
    setIsFormOpen(false);
  };

  const handleEdit = (contract: ContractDto) => {
    setEditingContract(contract);
    setIsFormOpen(true);
  };

  const handleDelete = (contractId: string) => {
    const contract = contracts.find((c) => c.id === contractId);
    if (contract) setDeleteDialog({ isOpen: true, contract });
  };

  const confirmDelete = async () => {
    if (deleteDialog.contract) {
      await deleteContract(deleteDialog.contract.id);
      setDeleteDialog({ isOpen: false, contract: null });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <ContractsHeader onNewContract={() => setIsFormOpen(true)} />
      <div className="container mx-auto px-4 py-6">
        <ContractsFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} sortBy={sortBy} setSortBy={setSortBy} />

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <p className="text-red-500 py-10 text-center">{error}</p>
        ) : (
          <ContractsList
            contracts={contracts} // ✅ ya filtrados y ordenados en el hook
            searchTerm={searchTerm} // ✅ requerido por el componente
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCreate={() => setIsFormOpen(true)}
          />
        )}
      </div>

      <ContractForm
        contract={editingContract || undefined}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
        isLoading={loading} // ⚡ deshabilita inputs y botón mientras la API responde
      />

      <DeleteDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, contract: null })}
        onConfirm={confirmDelete}
        contractName={deleteDialog.contract?.legalEntityName || ""}
        isLoading={loading} // ⚡ bloquea botones mientras borra
      />
    </div>
  );
};

export default Index;
