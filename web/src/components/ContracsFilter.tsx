import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sortBy: "name" | "date" | "author";
  setSortBy: (value: "name" | "date" | "author") => void;
}

export const ContractsFilter = ({ searchTerm, setSearchTerm, sortBy, setSortBy }: Props) => (
  <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
);
