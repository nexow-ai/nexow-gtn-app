import { post } from './client'

export interface CreateCustomerRequest {
  referenceNumber: string
  institutionCode: string
  firstName?: string
  lastName?: string
  passportNumber?: string
  nin?: string
  drivingLicense?: string
  homeTel?: string
  officeTel?: string
  mobile?: string
  email?: string
  profession?: string
  address1?: string
  address2?: string
  city?: string
  countryCode?: string
  gender?: string
  birthDate?: string
  nationality?: string
  profileId?: string
  masterAccountNumber?: string
  preferredLanguage?: string
}

export interface CreateCustomerResponse {
  status: 'SUCCESS' | 'FAILED'
  reason?: string
  rejectCode?: number
  customerNumber?: string
  cashAccountNumbers?: string[]
  accountNumbers?: string[]
  exchangeAccountIds?: string[]
}

export function createCustomer(payload: CreateCustomerRequest): Promise<CreateCustomerResponse> {
  return post<CreateCustomerResponse>('/onboard/customer', payload)
}
