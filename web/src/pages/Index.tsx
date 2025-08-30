import { ContractCard } from "@/components/ContractCard";
import { ContractForm } from "@/components/ContractForm";
import { DeleteDialog } from "@/components/DeleteDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useContracts } from "@/hooks/useContracts";
import { ContractDto, UpdateContractDto } from "@/types/contract";
import { Plus, Search, Trophy, Zap } from "lucide-react";
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

  const handleEdit = (contract: ContractDto) => {
    setEditingContract(contract);
    setIsFormOpen(true);
  };

  const handleDelete = (contractId: string) => {
    const contract = contracts.find((c) => c.id === contractId);
    if (contract) {
      setDeleteDialog({ isOpen: true, contract });
    }
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

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingContract(null);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">FIFA Contracts</h1>
                <p className="text-sm text-muted-foreground">Professional Football Contract Management</p>
              </div>
            </div>
            <Button
              onClick={() => setIsFormOpen(true)}
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-medium shadow-fifa"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Contract
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search contracts, authors, entities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-input focus:border-primary focus:ring-primary/20"
              />
            </div>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as "name" | "date" | "author")}>
              <SelectTrigger className="w-full sm:w-48 border-input focus:border-primary focus:ring-primary/20">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="date">Sort by Date</SelectItem>
                <SelectItem value="name">Sort by Entity</SelectItem>
                <SelectItem value="author">Sort by Author</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {contracts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {searchTerm ? "No contracts found" : "No contracts yet"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm
                ? "Try adjusting your search terms or filters"
                : "Create your first football contract to get started"}
            </p>
            {!searchTerm && (
              <Button
                onClick={() => setIsFormOpen(true)}
                className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-medium"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create First Contract
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contracts.map((contract) => (
              <ContractCard key={contract.id} contract={contract} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>

      {/* Forms and Dialogs */}
      <ContractForm
        contract={editingContract || undefined}
        isOpen={isFormOpen}
        onClose={handleFormClose}
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
