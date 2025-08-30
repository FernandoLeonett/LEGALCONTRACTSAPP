import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  contractName: string;
  isLoading?: boolean; // ⚡ nueva prop
}

export const DeleteDialog = ({ isOpen, onClose, onConfirm, contractName, isLoading }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Contrato</DialogTitle>
        </DialogHeader>
        <p className="my-4">¿Estás seguro que quieres eliminar el contrato "{contractName}"?</p>
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
