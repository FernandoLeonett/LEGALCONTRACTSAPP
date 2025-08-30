import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ContractDto, UpdateContractDto } from "@/types/contract";
import { useEffect, useState } from "react";

interface Props {
  contract?: ContractDto;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: UpdateContractDto) => void;
  isLoading?: boolean; // ⚡ nueva prop
}

export const ContractForm = ({ contract, isOpen, onClose, onSave, isLoading }: Props) => {
  const [legalEntityName, setLegalEntityName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (contract) {
      setLegalEntityName(contract.legalEntityName);
      setAuthorName(contract.authorName);
      setDescription(contract.description || "");
    } else {
      setLegalEntityName("");
      setAuthorName("");
      setDescription("");
    }
  }, [contract]);

  const handleSubmit = () => {
    onSave({
      id: contract?.id || "",
      legalEntityName,
      authorName,
      description, // 👈 obligatorio
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{contract ? "Editar Contrato" : "Nuevo Contrato"}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-2">
          <Input
            placeholder="Entidad legal"
            value={legalEntityName}
            onChange={(e) => setLegalEntityName(e.target.value)}
            disabled={isLoading}
          />
          <Input
            placeholder="Autor"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            disabled={isLoading}
          />
          <Input
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
