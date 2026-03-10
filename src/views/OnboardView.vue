<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { createCustomer, type CreateCustomerRequest } from '@/api/onboard'

const router = useRouter()
const submitting = ref(false)
const error = ref('')

const form = reactive<CreateCustomerRequest & { institutionCode: string }>({
  referenceNumber: '',
  institutionCode: import.meta.env.VITE_GTN_INSTITUTION_CODE ?? '',
  firstName: '',
  lastName: '',
  email: '',
  countryCode: '',
  gender: '',
  birthDate: '',
  preferredLanguage: 'EN',
  mobile: '',
  address1: '',
  city: '',
  nationality: '',
})

const fieldErrors = reactive<Record<string, string>>({})

function validate(): boolean {
  const e: Record<string, string> = {}
  if (!form.referenceNumber.trim()) e.referenceNumber = 'Required'
  if (!form.institutionCode.trim()) e.institutionCode = 'Required'
  if (!form.firstName?.trim()) e.firstName = 'Required'
  if (!form.lastName?.trim()) e.lastName = 'Required'
  if (!form.email?.trim()) e.email = 'Required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
  if (!form.countryCode?.trim()) e.countryCode = 'Required'
  if (!form.gender?.trim()) e.gender = 'Required'
  if (!form.birthDate?.trim()) e.birthDate = 'Required'
  else if (!/^\d{4}\/\d{2}\/\d{2}$/.test(form.birthDate)) e.birthDate = 'Use yyyy/MM/dd'
  Object.assign(fieldErrors, e)
  return Object.keys(e).length === 0
}

async function onSubmit() {
  error.value = ''
  if (!validate()) return
  submitting.value = true
  try {
    const res = await createCustomer(form)
    if (res.status === 'SUCCESS' && res.customerNumber) {
      sessionStorage.setItem('gtn_customer_number', res.customerNumber)
      sessionStorage.setItem('gtn_onboard_response', JSON.stringify(res))
      await router.push('/onboard/success')
      return
    }
    error.value = res.reason ?? `Reject code: ${res.rejectCode ?? 'unknown'}`
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Request failed'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 py-12 sm:px-6">
    <div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-xl">
      <h2 class="text-2xl font-bold text-white">Create account</h2>
      <p class="mt-1 text-sm text-zinc-400">Fill in your details to open a GTN trading account.</p>

      <form @submit.prevent="onSubmit" class="mt-8 space-y-5">
        <div v-if="error" class="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
          {{ error }}
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
          <div>
            <label for="ref" class="block text-sm font-medium text-zinc-300">Reference number *</label>
            <input
              id="ref"
              v-model="form.referenceNumber"
              type="text"
              class="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              placeholder="Your unique reference"
            />
            <p v-if="fieldErrors.referenceNumber" class="mt-1 text-sm text-red-400">{{ fieldErrors.referenceNumber }}</p>
          </div>
          <div>
            <label for="inst" class="block text-sm font-medium text-zinc-300">Institution code *</label>
            <input
              id="inst"
              v-model="form.institutionCode"
              type="text"
              class="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              placeholder="Institution code"
            />
            <p v-if="fieldErrors.institutionCode" class="mt-1 text-sm text-red-400">{{ fieldErrors.institutionCode }}</p>
          </div>
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
          <div>
            <label for="fn" class="block text-sm font-medium text-zinc-300">First name *</label>
            <input id="fn" v-model="form.firstName" type="text" class="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
            <p v-if="fieldErrors.firstName" class="mt-1 text-sm text-red-400">{{ fieldErrors.firstName }}</p>
          </div>
          <div>
            <label for="ln" class="block text-sm font-medium text-zinc-300">Last name *</label>
            <input id="ln" v-model="form.lastName" type="text" class="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
            <p v-if="fieldErrors.lastName" class="mt-1 text-sm text-red-400">{{ fieldErrors.lastName }}</p>
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-zinc-300">Email *</label>
          <input id="email" v-model="form.email" type="email" class="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
          <p v-if="fieldErrors.email" class="mt-1 text-sm text-red-400">{{ fieldErrors.email }}</p>
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
          <div>
            <label for="country" class="block text-sm font-medium text-zinc-300">Country code *</label>
            <input id="country" v-model="form.countryCode" type="text" class="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" placeholder="e.g. US, GB" maxlength="2" />
            <p v-if="fieldErrors.countryCode" class="mt-1 text-sm text-red-400">{{ fieldErrors.countryCode }}</p>
          </div>
          <div>
            <label for="gender" class="block text-sm font-medium text-zinc-300">Gender *</label>
            <select id="gender" v-model="form.gender" class="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500">
              <option value="">Select</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="-1">Rather not say</option>
            </select>
            <p v-if="fieldErrors.gender" class="mt-1 text-sm text-red-400">{{ fieldErrors.gender }}</p>
          </div>
        </div>

        <div>
          <label for="birth" class="block text-sm font-medium text-zinc-300">Birth date * (yyyy/MM/dd)</label>
          <input id="birth" v-model="form.birthDate" type="text" class="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" placeholder="1990/01/15" />
          <p v-if="fieldErrors.birthDate" class="mt-1 text-sm text-red-400">{{ fieldErrors.birthDate }}</p>
        </div>

        <div>
          <label for="mobile" class="block text-sm font-medium text-zinc-300">Mobile (E.164)</label>
          <input id="mobile" v-model="form.mobile" type="tel" class="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" placeholder="+1234567890" />
        </div>

        <div>
          <label for="addr" class="block text-sm font-medium text-zinc-300">Address</label>
          <input id="addr" v-model="form.address1" type="text" class="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
        </div>

        <div>
          <label for="city" class="block text-sm font-medium text-zinc-300">City</label>
          <input id="city" v-model="form.city" type="text" class="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
        </div>

        <div>
          <label for="nat" class="block text-sm font-medium text-zinc-300">Nationality (country code)</label>
          <input id="nat" v-model="form.nationality" type="text" class="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-white" maxlength="2" />
        </div>

        <div class="pt-4">
          <button
            type="submit"
            :disabled="submitting"
            class="w-full rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 py-3 font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ submitting ? 'Submitting…' : 'Create account' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
