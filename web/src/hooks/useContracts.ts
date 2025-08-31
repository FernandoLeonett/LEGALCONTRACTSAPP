import { useToast } from "@/hooks/use-toast";
import { useEffect, useMemo, useState } from "react";
import { addContractApi, deleteContractApi, getContracts, updateContractApi } from "../api/contracts";
import { ContractDto, CreateContractDto, UpdateContractDto } from "../types/contract";

// Hook para debounce
function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function useContracts() {
  const { toast } = useToast();
  const [contracts, setContracts] = useState<ContractDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300); // espera 300ms antes de filtrar

  const [sortBy, setSortBy] = useState<"name" | "date" | "author">("date");

  // Fetch inicial
  useEffect(() => {
    const fetchContracts = async () => {
      setLoading(true);
      try {
        const data = await getContracts();
        setContracts(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("No se pudieron obtener los contratos.");
        toast({ title: "Error", description: "No se pudieron obtener los contratos." });
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, [toast]);

  // Filtrado y ordenamiento
  const filteredAndSortedContracts = useMemo(() => {
    let list = [...contracts];

    if (debouncedSearch) {
      const term = debouncedSearch.toLowerCase();
      list = list.filter(
        (c) => c.legalEntityName.toLowerCase().includes(term) || c.authorName.toLowerCase().includes(term)
      );
    }

    return list.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.legalEntityName.localeCompare(b.legalEntityName);
        case "author":
          return a.authorName.localeCompare(b.authorName);
        case "date":
        default:
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
      }
    });
  }, [contracts, debouncedSearch, sortBy]);

  // CRUD
  const addContract = async (contractData: CreateContractDto) => {
    try {
      const newContract = await addContractApi(contractData);
      setContracts((prev) => [newContract, ...prev]);
      toast({ title: "Contrato agregado", description: "El contrato se agregó correctamente." });
    } catch (error) {
      console.error(error);
      toast({ title: "Error al agregar contrato", description: `${error}` });
    }
  };

  const updateContract = async (contractData: UpdateContractDto) => {
    try {
      await updateContractApi(contractData);
      setContracts((prev) =>
        prev.map((contract) =>
          contract.id === contractData.id
            ? { ...contract, ...contractData, updatedDate: new Date().toISOString() }
            : contract
        )
      );
      toast({ title: "Contrato actualizado", description: "Los cambios se guardaron correctamente." });
    } catch (error) {
      console.error(error);
      toast({ title: "Error al actualizar contrato", description: `${error}` });
    }
  };

  const deleteContract = async (id: string) => {
    try {
      await deleteContractApi(id);
      setContracts((prev) => prev.filter((contract) => contract.id !== id));
      toast({ title: "Contrato eliminado", description: "El contrato se eliminó correctamente." });
    } catch (error) {
      console.error(error);
      toast({ title: "Error al eliminar contrato", description: `${error}` });
    }
  };

  return {
    contracts: filteredAndSortedContracts,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    addContract,
    updateContract,
    deleteContract,
  };
}
