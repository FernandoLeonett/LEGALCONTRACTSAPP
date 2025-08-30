import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ContractDto } from "@/types/contract";

interface ContractFormProps {
  contract?: ContractDto;
  isOpen: boolean;
  onClose: () => void;
  onSave: (contract: Omit<ContractDto, 'id' | 'createdDate' | 'updatedDate'>) => void;
}

export function ContractForm({ contract, isOpen, onClose, onSave }: ContractFormProps) {
  const [formData, setFormData] = useState({
    authorName: contract?.authorName || "",
    legalEntityName: contract?.legalEntityName || "",
    description: contract?.description || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
    setFormData({ authorName: "", legalEntityName: "", description: "" });
  };

  const handleClose = () => {
    onClose();
    setFormData({ authorName: "", legalEntityName: "", description: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {contract ? "Edit Contract" : "Create New Contract"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="authorName" className="text-sm font-medium text-foreground">
                Author Name *
              </Label>
              <Input
                id="authorName"
                value={formData.authorName}
                onChange={(e) => setFormData(prev => ({ ...prev, authorName: e.target.value }))}
                placeholder="Enter author name"
                required
                className="border-input focus:border-primary focus:ring-primary/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="legalEntityName" className="text-sm font-medium text-foreground">
                Legal Entity Name *
              </Label>
              <Input
                id="legalEntityName"
                value={formData.legalEntityName}
                onChange={(e) => setFormData(prev => ({ ...prev, legalEntityName: e.target.value }))}
                placeholder="Enter legal entity name"
                required
                className="border-input focus:border-primary focus:ring-primary/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-foreground">
                Description *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter contract description"
                required
                rows={4}
                className="border-input focus:border-primary focus:ring-primary/20 resize-none"
              />
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 border-border hover:bg-muted hover:text-muted-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-primary hover:opacity-90 text-primary-foreground font-medium"
            >
              {contract ? "Update Contract" : "Create Contract"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}