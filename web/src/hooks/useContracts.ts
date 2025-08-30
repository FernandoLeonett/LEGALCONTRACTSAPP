import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { addContractApi, deleteContractApi, getContracts, updateContractApi } from "../api/contract";
import { ContractDto, CreateContractDto, UpdateContractDto } from "../types/contract";

export function useContracts() {
  const { toast } = useToast();
  const [contracts, setContracts] = useState<ContractDto[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "date" | "author">("date");

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await getContracts();
        setContracts(data);
      } catch (err) {
        console.error(err);
        toast({ title: "Error", description: "No se pudieron obtener los contratos." });
      }
    };

    fetchContracts();
  }, [toast]);

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
    contracts: contracts, // o filteredAndSortedContracts si quieres filtrar/ordenar
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    addContract,
    updateContract,
    deleteContract,
  };
}
