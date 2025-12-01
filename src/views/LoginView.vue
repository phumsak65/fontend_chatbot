<template>
  <div class="relative min-h-screen flex items-center justify-center bg-[#0B1120] overflow-hidden selection:bg-blue-500/30">

    <div class="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
       <div class="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-float-slow mix-blend-screen"></div>
       <div class="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[100px] animate-float-medium animation-delay-2000 mix-blend-screen"></div>
    </div>

    <div class="relative w-full max-w-sm mx-4 z-10 animate-slide-up-fade">
      <div class="glass-panel p-8 md:p-10 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-white/20">

        <div class="flex flex-col items-center text-center mb-8 animate-fade-in-up animation-delay-150">
          <div class="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/30 text-white flex items-center justify-center font-bold text-xl mb-5 animate-pulse-slow relative">
             <div class="absolute inset-0 rounded-2xl bg-white/20 blur-md"></div>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8 relative z-10">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 tracking-tight leading-tight">ChatBot N89</h1>
          <p class="text-sm text-slate-400 mt-3 leading-relaxed">Welcome back. Please enter your 6-digit security PIN to proceed.</p>
        </div>

        <form @submit.prevent="login" class="space-y-6">

          <div class="space-y-3 animate-fade-in-up animation-delay-300">
            <div class="flex items-center justify-between px-2">
              <label class="text-xs font-semibold text-slate-300 uppercase tracking-wider">Security PIN</label>

              <button
                type="button"
                @click="showPin = !showPin"
                class="group text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5 focus:outline-none py-1 px-2 rounded-md hover:bg-white/5"
              >
                <span class="transition-transform group-hover:scale-110">
                    <svg v-if="!showPin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                      <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                      <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                      <path fill-rule="evenodd" d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-5.733.75.75 0 10-1.41-.513 8.537 8.537 0 01-1.735 3.239l-.618-.618a6 6 0 00-8.486-8.486L3.28 2.22zM6.03 6.03a4.5 4.5 0 006.364 6.364L6.03 6.03z" clip-rule="evenodd" />
                    </svg>
                </span>
                <span>{{ showPin ? 'Hide' : 'Show' }}</span>
              </button>
            </div>

            <div class="flex justify-center py-1">
              <PinInput
                v-model="pin"
                :length="6"
                :masked="!showPin"
                class="modern-pin-input scale-105 transform transition-all duration-300 hover:scale-110 focus-within:scale-110"
              />
            </div>

            <div class="h-6 flex items-center justify-center overflow-hidden relative">
                 <Transition name="shake">
                    <p v-if="error" class="text-red-400 text-xs font-semibold flex items-center gap-1 absolute top-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                        </svg>
                        {{ error }}
                    </p>
                 </Transition>
                <Transition name="fade">
                 <p v-if="!error" class="text-slate-500 text-xs absolute top-1">Enter the 6-digit code provided</p>
                </Transition>
             </div>
          </div>

          <div class="animate-fade-in-up animation-delay-450">
              <button
                :disabled="!isSixDigits || loading"
                class="group relative w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-blue-900/30 hover:shadow-blue-700/50 active:scale-[0.98] flex items-center justify-center overflow-hidden isolate"
              >
                <div class="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                <Transition name="fade" mode="out-in">
                    <div v-if="loading" class="flex items-center gap-3">
                      <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Verifying Credentials...</span>
                    </div>
                    <span v-else class="flex items-center gap-2">
                      Login
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 opacity-80 group-hover:translate-x-1 transition-transform duration-300">
                        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                      </svg>
                    </span>
                </Transition>
              </button>
          </div>
        </form>
      </div>

      <p class="text-center text-slate-500/80 text-xs mt-8 animate-fade-in-up animation-delay-600">
        Protected by N89tech &copy; {{ new Date().getFullYear() }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import PinInput from '../components/PinInput.vue'

const router = useRouter()
const pin = ref('')
const error = ref('')
const loading = ref(false)
const showPin = ref(false)

// อนุญาตเฉพาะตัวเลข และต้องครบ 6 หลัก
const isSixDigits = computed(() => /^\d{6}$/.test(pin.value))

// เมื่อพิมพ์ ให้เคลียร์ error
watch(pin, () => {
    if(error.value) error.value = '';
})

// (ตรวจสอบว่า API_URL ถูกต้องตาม Proxy ของคุณ)
const API_URL = '/api/login/auth/pin/login'

async function login() {
  error.value = ''
  loading.value = true

  if (pin.value.length !== 6) {
    // รอให้ transition ทำงานนิดนึง
    setTimeout(() => { error.value = 'กรุณากรอก PIN 6 หลักให้ครบ' }, 50)
    loading.value = false
    return
  }

  try {
    // Demo Mode logic (เหมือนเดิม)
    try {
      const response = await Promise.race([
        axios.post(API_URL, { pin: pin.value }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 1000))
      ])

      if (response.data?.success && response.data?.token) {
        localStorage.setItem('loggedIn', 'yes')
        localStorage.setItem('authToken', response.data.token)
        localStorage.setItem('userName', response.data.user?.name || 'User')
        router.push('/chat')
        return
      } else {
        throw new Error(response.data?.message || 'PIN ไม่ถูกต้อง')
      }
    } catch (apiError) {
      console.warn('API login failed/timeout, switching to Demo Mode:', apiError?.message)

      if (pin.value === '123456') {
        localStorage.setItem('loggedIn', 'yes')
        localStorage.setItem('authToken', 'demo-token-' + Date.now())
        localStorage.setItem('userName', 'Demo User')
        router.push('/chat')
        return
      } else {
         // Delay error เล็กน้อยเพื่อให้ loading spinner แสดงสักครู่
         setTimeout(() => {
             error.value = 'PIN ไม่ถูกต้อง '
         }, 500)
      }
    }

  } catch (err) {
    error.value = err?.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่'
  } finally {
    // ถ้ามี error ให้ delay การปิด loading นิดนึง
    if(error.value) {
         setTimeout(() => { loading.value = false }, 500)
    } else {
         loading.value = false
    }
  }
}
</script>

<style scoped>
/* --- Glassmorphism --- */
.glass-panel {
  background: rgba(17, 25, 40, 0.6); /* Darker, more opaque slate */
  box-shadow:
    0 8px 32px 0 rgba(0, 0, 0, 0.3),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.1), /* Top inner light */
    inset 0 -1px 0 0 rgba(0, 0, 0, 0.2);   /* Bottom inner shadow */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* --- CSS Keyframes Animations --- */

/* 1. Floating Blobs Background */
@keyframes float-slow {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30px, -30px) scale(1.05); }
}
@keyframes float-medium {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-20px, 20px) scale(0.95); }
}
.animate-float-slow { animation: float-slow 15s ease-in-out infinite; }
.animate-float-medium { animation: float-medium 12s ease-in-out infinite; }

/* 2. Card Entrance Slide Up */
@keyframes slide-up-fade {
  0% { opacity: 0; transform: translateY(40px) scale(0.95); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
.animate-slide-up-fade { animation: slide-up-fade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

/* 3. Staggered Elements Fade In Up */
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  opacity: 0; /* Start hidden */
  animation: fade-in-up 0.6s ease-out forwards;
}

/* Animation Delays for staggering */
.animation-delay-150 { animation-delay: 150ms; }
.animation-delay-300 { animation-delay: 300ms; }
.animation-delay-450 { animation-delay: 450ms; }
.animation-delay-600 { animation-delay: 600ms; }
.animation-delay-2000 { animation-delay: 2000ms; }

/* 4. Icon Pulse Slow */
@keyframes pulse-slow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
    50% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
}
.animate-pulse-slow { animation: pulse-slow 3s infinite cubic-bezier(0.4, 0, 0.6, 1); }

/* --- Vue Transition Classes --- */

/* Fade Transition (สำหรับปุ่มและข้อความทั่วไป) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Shake Transition (สำหรับ Error Message) */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-4px); }
  40%, 80% { transform: translateX(4px); }
}
.shake-enter-active {
  animation: shake 0.4s ease-in-out;
}
.shake-leave-active {
  transition: all 0.2s ease;
  opacity: 0;
  transform: translateY(-10px);
}

/* --- Custom Styling for PinInput --- */
/* พยายามบังคับ Style ให้ PinInput component ลูก (ถ้าทำได้) */
:deep(.modern-pin-input .otp-input) {
  background-color: rgba(15, 23, 42, 0.4) !important; /* Dark blue transparent */
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  color: white !important;
  border-radius: 1rem !important; /* Rounded-2xl */
  font-weight: bold;
  font-size: 1.25rem;
  height: 3.5rem !important;
  width: 3rem !important; /* ปรับขนาดตามต้องการ */
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), inset 0 2px 4px 0 rgba(0,0,0,0.05);
}

:deep(.modern-pin-input .otp-input:focus),
:deep(.modern-pin-input .otp-input.is-active) {
  border-color: #60a5fa !important; /* Blue-400 */
  background-color: rgba(15, 23, 42, 0.6) !important;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.25), inset 0 2px 4px 0 rgba(0,0,0,0.05) !important;
  transform: translateY(-2px);
  outline: none !important;
}
</style>