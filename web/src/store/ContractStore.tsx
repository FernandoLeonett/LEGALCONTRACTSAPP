import { addContractApi, deleteContractApi, getContracts, updateContractApi } from "@/api/contract";
import { ContractDto, CreateContractDto, UpdateContractDto } from "@/types/contract";
import { create } from "zustand";

// Define el estado y las acciones
interface ContractState {
  contracts: ContractDto[];
  loading: boolean;
  error: string | null;
  fetchContracts: () => Promise<void>;
  addContract: (contractData: CreateContractDto) => Promise<void>;
  updateContract: (contractData: UpdateContractDto) => Promise<void>;
  deleteContract: (id: string) => Promise<void>;
}

// Crea la tienda de Zustand
export const useContractStore = create<ContractState>((set, get) => ({
  contracts: [],
  loading: false,
  error: null,

  fetchContracts: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getContracts();
      set({ contracts: data, loading: false });
    } catch (error) {
      console.error("Error al obtener contratos:", error);
      set({ error: "Error al cargar contratos.", loading: false });
    }
  },

  addContract: async (contractData) => {
    try {
      const newContract = await addContractApi(contractData);
      set((state) => ({ contracts: [newContract, ...state.contracts] }));
    } catch (error) {
      console.error("Error al agregar contrato:", error);
      set({ error: "Error al agregar contrato." });
    }
  },

  updateContract: async (contractData) => {
    try {
      await updateContractApi(contractData);
      set((state) => {
        const updatedContracts = state.contracts.map((contract) =>
          contract.id === contractData.id
            ? { ...contract, ...contractData, updatedDate: new Date().toISOString() }
            : contract
        );
        return { contracts: updatedContracts };
      });
    } catch (error) {
      console.error("Error al actualizar contrato:", error);
      set({ error: "Error al actualizar contrato." });
    }
  },

  deleteContract: async (id) => {
    try {
      await deleteContractApi(id);
      set((state) => ({
        contracts: state.contracts.filter((contract) => contract.id !== id),
      }));
    } catch (error) {
      console.error("Error al eliminar contrato:", error);
      set({ error: "Error al eliminar contrato." });
    }
  },
}));
