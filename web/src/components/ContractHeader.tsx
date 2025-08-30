import { Button } from "@/components/ui/button";
import { Plus, Trophy } from "lucide-react";

interface Props {
  onNewContract: () => void;
}

export const ContractsHeader = ({ onNewContract }: Props) => (
  <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
    <div className="container mx-auto px-4 py-6 flex items-center justify-between">
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
        onClick={onNewContract}
        className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-medium shadow-fifa"
      >
        <Plus className="w-4 h-4 mr-2" />
        New Contract
      </Button>
    </div>
  </header>
);
