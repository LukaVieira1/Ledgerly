export interface IClient {
  id: number;
  name: string;
  phone: string;
  birthDate: string;
  observations: string | null;
  debitBalance: number;
  storeId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IClientForm {
  name: string;
  phone: string;
  birthDate: string;
  observations?: string | null;
}
