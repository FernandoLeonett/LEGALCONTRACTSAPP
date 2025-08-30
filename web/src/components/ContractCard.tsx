import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ContractDto } from "@/types/contract";
import { Building, Calendar, Edit, Trash2, User } from "lucide-react";

interface ContractCardProps {
  contract: ContractDto;
  onEdit: (contract: ContractDto) => void;
  onDelete: (id: string) => void;
}

export function ContractCard({ contract, onEdit, onDelete }: ContractCardProps) {
  return (
    <Card className="group hover:shadow-fifa transition-all duration-300 border-border/50 hover:border-primary/30 bg-gradient-to-br from-card via-card to-card/80">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
              <Building className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {contract.legalEntityName}
              </h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <User className="w-3 h-3" />
                {contract.authorName}
              </div>
            </div>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(contract)}
              className="text-muted-foreground hover:text-secondary hover:bg-secondary/10"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(contract.id)}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{contract.description}</p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Created: {new Date(contract.createdDate).toLocaleDateString()}
          </div>
          {contract.updatedDate ? (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Updated: {new Date(contract.updatedDate).toLocaleDateString()}
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <span className="text-sm leading-none mr-1">⭐</span>
              <span className="font-semibold text-primary">New Contract!</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
