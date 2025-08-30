import { addContractApi, deleteContractApi, getContracts, updateContractApi } from "@/api/contract";
import { ContractDto, CreateContractDto, UpdateContractDto } from "@/types/contract";
import { useEffect, useMemo, useState } from "react";

export function useContracts() {
  const [contracts, setContracts] = useState<ContractDto[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "date" | "author">("date");

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await getContracts();
        console.log("Contratos obtenidos:", data);
        setContracts(data);
      } catch (err) {
        console.error("Error al obtener contratos:", err);
      }
    };

    fetchContracts();
  }, []);
  const filteredAndSortedContracts = useMemo(() => {
    const filtered = contracts.filter(
      (contract) =>
        contract.legalEntityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
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

    return filtered;
  }, [contracts, searchTerm, sortBy]);

  const addContract = async (contractData: CreateContractDto) => {
    try {
      console.log("Agregando contrato:", contractData);
      const newContract = await addContractApi(contractData);
      setContracts((prev) => [newContract, ...prev]);
    } catch (error) {
      console.error(error);
    }
  };
  const updateContract = async (contractData: UpdateContractDto) => {
    try {
      console.log("Actualizando contrato con ID:", contractData.id, "Datos:", contractData);
      await updateContractApi(contractData);
      setContracts((prev) =>
        prev.map((contract) =>
          contract.id === contractData.id
            ? { ...contract, ...contractData, updatedDate: new Date().toISOString() }
            : contract
        )
      );
    } catch (error) {
      console.error("Error al actualizar contrato:", error);
    }
  };

  const deleteContract = async (id: string) => {
    try {
      await deleteContractApi(id);
      setContracts((prev) => prev.filter((contract) => contract.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    contracts: filteredAndSortedContracts,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    addContract,
    updateContract,
    deleteContract,
  };
}
