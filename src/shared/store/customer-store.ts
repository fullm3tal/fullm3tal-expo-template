import {create} from 'zustand'

export interface Customer {
  id: string
  name: string
  mobileNumber: string
  addressLine1?: string | null
  emailAddress?: string | null
}

export type CustomerInput = Omit<Customer, 'id'>

interface CustomerState {
  customers: Customer[]
  addCustomer: (payload: CustomerInput) => Customer
}

export const useCustomerStore = create<CustomerState>((set) => ({
  customers: [],
  addCustomer: (payload) => {
    const customer: Customer = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      ...payload,
    }
    set((state) => ({
      customers: [customer, ...state.customers],
    }))
    return customer
  },
}))
