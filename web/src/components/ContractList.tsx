import { ContractCard } from "@/components/ContractCard";
import { Button } from "@/components/ui/button";
import { ContractDto } from "@/types/contract";
import { Plus, Zap } from "lucide-react";

interface Props {
  contracts: ContractDto[];
  searchTerm: string;
  onEdit: (contract: ContractDto) => void;
  onDelete: (contractId: string) => void;
  onCreate: () => void;
}

export const ContractsList = ({ contracts, searchTerm, onEdit, onDelete, onCreate }: Props) => {
  if (contracts.length === 0) {
    return (
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
            onClick={onCreate}
            className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create First Contract
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contracts.map((contract) => (
        <ContractCard key={contract.id} contract={contract} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};
