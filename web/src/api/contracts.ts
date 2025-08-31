import { ContractDto, CreateContractDto, UpdateContractDto } from "@/types/contract";

const API_URL = import.meta.env.VITE_API_URL;

export const getContracts = async (): Promise<ContractDto[]> => {
  const res = await fetch(`${API_URL}/contracts`);
  if (!res.ok) throw new Error("Error al obtener contratos");
  return res.json();
};

export const addContractApi = async (contract: CreateContractDto): Promise<ContractDto> => {
  const res = await fetch(`${API_URL}/contracts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contract),
  });

  if (!res.ok) throw new Error("Error al agregar contrato");
  return res.json();
};

export const updateContractApi = async (contract: UpdateContractDto): Promise<void> => {
  const res = await fetch(`${API_URL}/contracts/${contract.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contract),
  });

  if (!res.ok) throw new Error("Error al actualizar contrato");

  // El backend devuelve 204 No Content para una actualización exitosa.
  if (res.status === 204) return;
};

export const deleteContractApi = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/contracts/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar contrato");
};
