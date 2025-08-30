export interface ContractDto {
  id: string;
  authorName: string;
  legalEntityName: string;
  description: string;
  createdDate: string;
  updatedDate?: string | null;
}

export interface CreateContractDto {
  authorName: string;
  legalEntityName: string;
  description: string;
}

export interface UpdateContractDto {
  id: string;
  authorName: string;
  legalEntityName: string;
  description: string;
}
