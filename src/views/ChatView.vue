<template>
  <div class="relative min-h-screen flex items-center justify-center p-4 md:p-6 bg-[#0B1120] overflow-hidden font-sans text-slate-200">

    <div class="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
       <div class="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-float-slow"></div>
       <div class="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-float-medium"></div>
    </div>

    <div class="relative w-full max-w-5xl flex flex-col h-[85vh] shadow-2xl rounded-[2rem] overflow-hidden glass-panel border border-white/10 z-10 animate-scale-in">

      <div class="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-slate-900/40 backdrop-blur-md z-20">
        <div class="flex items-center gap-4">
          <div class="relative">
            <div class="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/20 ring-1 ring-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12h1.5m-1.5 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <span class="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#131b2e] bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
          </div>
          <div>
            <h2 class="text-white text-lg font-bold tracking-tight">N8N Assistant</h2>
            <p class="text-slate-400 text-xs font-medium flex items-center gap-1.5">
              <span v-if="typing" class="flex gap-1">
                <span class="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></span>
                <span class="w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-75"></span>
                <span class="w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-150"></span>
              </span>
              <span v-else>Always active</span>
            </p>
          </div>
        </div>

        <div class="flex items-center gap-1 bg-slate-800/50 p-1 rounded-xl border border-white/5">
          <button @click="clearChat" class="p-2.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition-all" title="Clear Chat">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
          <button @click="logout" class="p-2.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all" title="Logout">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
        </div>
      </div>

      <div class="flex-1 overflow-hidden relative bg-slate-900/30">
        <div ref="chatBox" class="h-full overflow-y-auto p-6 space-y-8 scroll-smooth custom-scrollbar">

          <div v-for="m in messages" :key="m.id" class="group flex w-full animate-fade-in-up" :class="m.role === 'user' ? 'justify-end' : 'justify-start'">

            <div v-if="m.role==='assistant'" class="mr-4 flex-shrink-0 self-end mb-1">
              <div class="h-8 w-8 rounded-lg bg-slate-800 border border-white/10 text-blue-400 flex items-center justify-center shadow-md">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12h1.5m-1.5 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
                 </svg>
              </div>
            </div>

            <div :class="[
              'max-w-[85%] lg:max-w-[70%] rounded-2xl px-5 py-4 relative transition-all duration-300 shadow-md',
              m.role === 'assistant'
                ? 'bg-[#1e293b]/80 backdrop-blur-sm border border-white/5 text-slate-200 rounded-bl-none'
                : 'bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-br-none shadow-blue-500/10'
            ]">

              <div v-if="m.image" class="mb-3 overflow-hidden rounded-xl border border-black/10">
                <img :src="m.image" class="max-w-full h-auto max-h-80 object-cover hover:scale-105 transition-transform duration-500 cursor-pointer" @click="openImage(m.image)"/>
              </div>

              <div class="prose prose-invert prose-sm max-w-none leading-relaxed whitespace-pre-wrap break-words font-light" v-html="renderMessage(m.text)"></div>

              <div :class="['text-[10px] mt-2 text-right opacity-60 font-medium tracking-wide', m.role==='assistant' ? 'text-slate-400' : 'text-blue-100']">{{ m.time }}</div>
            </div>
          </div>

          <div v-if="typing" class="flex justify-start animate-fade-in pl-12">
            <div class="bg-[#1e293b]/50 px-4 py-3 rounded-2xl rounded-bl-none border border-white/5 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
              <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
              <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-slate-900/60 backdrop-blur-xl border-t border-white/5 p-4 md:p-5 z-20">

        <div class="flex gap-2 mb-3 px-1 animate-fade-in">
          <button @click="focusChat" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 bg-slate-800/50 text-slate-300 hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-blue-200 transition-all group">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:text-blue-400"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            Chat
          </button>
          <button @click="triggerImageUpload" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 bg-slate-800/50 text-slate-300 hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:text-emerald-200 transition-all group">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:text-emerald-400"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            Photo
          </button>
          <button @click="showPostModal = true" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 bg-slate-800/50 text-slate-300 hover:bg-purple-500/20 hover:border-purple-500/50 hover:text-purple-200 transition-all group">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:text-purple-400"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            Post
          </button>
        </div>

        <div v-if="pendingImage" class="mb-4 flex items-center gap-3 bg-slate-800/50 p-2 rounded-xl border border-white/10 animate-fade-in-up w-fit max-w-full">
          <div class="relative group">
            <img :src="pendingImage" class="h-16 w-16 object-cover rounded-lg shadow-sm border border-white/10" />
            <button @click="removeImage" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-transform hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div class="text-xs text-slate-400 pr-3">
            <p class="font-semibold text-slate-200">Image Attached</p>
            <p>Ready to send for analysis</p>
          </div>
        </div>

        <form @submit.prevent="sendMessage" class="relative flex items-end gap-3">
          <label class="flex-shrink-0 p-3.5 rounded-xl bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-blue-400 border border-white/5 transition-all cursor-pointer group" title="Upload Image">
            <input ref="imageInput" type="file" accept="image/*" class="hidden" @change="handleImageSelect" />
            <svg class="group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          </label>

          <div class="flex-1 relative">
             <textarea
              v-model="draft"
              @keydown.enter.exact.prevent="sendMessage"
              @input="autoResize"
              ref="textArea"
              rows="1"
              placeholder="Type a message... (Type 'post' for Facebook)"
              class="w-full py-3.5 px-5 bg-slate-950/50 text-slate-200 rounded-xl border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:bg-slate-900 resize-none max-h-32 custom-scrollbar placeholder:text-slate-500 transition-all shadow-inner"
            ></textarea>
          </div>

          <button type="submit" :disabled="typing || (!draft.trim() && !pendingImage)" class="flex-shrink-0 p-3.5 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 hover:shadow-blue-500/40 disabled:opacity-30 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-200 transform active:scale-95 group">
            <svg class="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </form>
      </div>
    </div>

    <div v-if="showPostModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md animate-fade-in p-4" @click.self="showPostModal = false">
      <div class="glass-panel bg-[#1e293b] rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-white/10 relative overflow-hidden animate-scale-in">

        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
        <div class="absolute top-[-20%] right-[-20%] w-32 h-32 bg-blue-500/20 blur-[50px] rounded-full"></div>

        <h3 class="text-2xl font-bold text-white mb-2 flex items-center gap-3 relative z-10">
          <span class="text-3xl">🚀</span> AI Auto-Post
        </h3>
        <p class="text-sm text-slate-400 mb-8 relative z-10">Generate and publish content to Facebook automatically.</p>

        <div class="space-y-5 relative z-10">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wide">Topic / Content Idea</label>
            <input
              v-model="postTopic"
              placeholder="e.g., Coffee shop promotion, AI trends..."
              class="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-950/50 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-600"
              @keyup.enter="handlePostSubmit"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wide flex justify-between items-center">
              Page Access Token
              <a href="#" class="text-[10px] text-blue-400 hover:text-blue-300 hover:underline">Get Token &rarr;</a>
            </label>
            <input
              v-model="fbToken"
              type="password"
              placeholder="EAAB..."
              class="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-950/50 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all font-mono text-sm placeholder:text-slate-600"
            />
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-10 relative z-10">
          <button @click="showPostModal = false" class="px-5 py-2.5 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white font-medium transition-colors">Cancel</button>
          <button
            @click="handlePostSubmit"
            :disabled="!postTopic || !fbToken"
            class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none transition-all flex items-center gap-2"
          >
            <span>Generate & Post</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

// --- Configuration ---
// 🔥 สำคัญ: ใส่ Webhook URL ของคุณตรงนี้
const DEFAULT_N8N_URL = 'https://critics-started-starsmerchant-garlic.trycloudflare.com/webhook/a889d2ae-2159-402f-b326-5f61e90f602e/chat'
const SESSION_KEY = 'n8n_chat_session_id'
const HISTORY_KEY = 'n8n_chat_history'

// --- State ---
const messages = ref([])
const draft = ref('')
const typing = ref(false)
const chatBox = ref(null)
const textArea = ref(null)
const imageInput = ref(null)
const pendingImage = ref(null)

const showSettings = ref(false)
const webhookUrl = ref(localStorage.getItem('n8nWebhookUrl') || DEFAULT_N8N_URL)

// Post Modal State
const showPostModal = ref(false)
const postTopic = ref('')
const fbToken = ref('')

// --- Initialization ---
let sessionId = localStorage.getItem(SESSION_KEY)
if (!sessionId) {
  sessionId = 'sess-' + Math.random().toString(36).substring(2) + Date.now().toString(36)
  localStorage.setItem(SESSION_KEY, sessionId)
}

onMounted(() => {
  const savedHistory = localStorage.getItem(HISTORY_KEY)
  if (savedHistory) {
    try { messages.value = JSON.parse(savedHistory) } catch (e) {}
  }

  // Force Update Webhook URL if DEFAULT changes and LocalStorage is empty
  if (!localStorage.getItem('n8nWebhookUrl') && DEFAULT_N8N_URL) {
      webhookUrl.value = DEFAULT_N8N_URL
  }

  if (messages.value.length === 0) {
    messages.value.push({
      id: Date.now(),
      role: 'assistant',
      text: 'สวัสดีครับ! ผมคือ AI Assistant 🤖\nต้องการให้ช่วยงานด้านไหนบอกได้เลย หรือพิมพ์ **"โพสต์"** เพื่อสร้าง Content ลง Facebook ครับ',
      time: getTime()
    })
  }
  scrollToBottom()
})

watch(messages, (newMessages) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(newMessages))
}, { deep: true })

// --- Helpers ---
const getTime = () => new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })

const scrollToBottom = () => {
  nextTick(() => {
    if (chatBox.value) chatBox.value.scrollTo({ top: chatBox.value.scrollHeight, behavior: 'smooth' })
  })
}

const autoResize = () => {
  const el = textArea.value
  if (el) {
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 128) + 'px'
  }
}

// ⭐ Chip Helper Functions
const focusChat = () => {
  if (textArea.value) textArea.value.focus()
}

const triggerImageUpload = () => {
  if (imageInput.value) imageInput.value.click()
}

const clearChat = () => {
  if(!confirm('Clear all chat history?')) return
  messages.value = [{ role: 'assistant', text: 'Chat history cleared. ✨', time: getTime() }]
  localStorage.removeItem(HISTORY_KEY)
  sessionId = 'sess-' + Math.random().toString(36).substring(2) + Date.now().toString(36)
  localStorage.setItem(SESSION_KEY, sessionId)
}

const logout = () => {
  localStorage.removeItem('loggedIn')
  router.push('/login')
}

// --- Formatting ---
const renderMessage = (text) => {
  if (!text) return ''
  let safeText = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  safeText = safeText.replace(/\n/g, '<br>')
  safeText = safeText.replace(/\*\*(.*?)\*\*/g, '<b class="text-white font-semibold">$1</b>')
  // Improved Link Regex
  const urlRegex = /(https?:\/\/[^\s<]+)/g
  safeText = safeText.replace(urlRegex, '<a href="$1" target="_blank" class="text-blue-400 hover:text-blue-300 hover:underline break-all">$1</a>')
  return safeText
}

// --- Image Handling ---
const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',')
  const mimeMatch = arr[0].match(/:(.*?);/)
  const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg'
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) u8arr[n] = bstr.charCodeAt(n)
  return new File([u8arr], filename, { type: mime })
}

const handleImageSelect = (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  if (file.size > 5 * 1024 * 1024) {
    alert('File size limit is 5MB')
    return
  }
  const reader = new FileReader()
  reader.onload = (evt) => {
    pendingImage.value = evt.target.result
    e.target.value = ''
    scrollToBottom()
  }
  reader.readAsDataURL(file)
}

const removeImage = () => {
  pendingImage.value = null
  if(imageInput.value) imageInput.value.value = ''
}

const openImage = (url) => window.open(url, '_blank')

// --- Special Action: Facebook Post ---
const handlePostSubmit = async () => {
  if (!webhookUrl.value || webhookUrl.value.trim() === '') {
     alert('⚠️ Error: Webhook URL is missing. Please set DEFAULT_N8N_URL in the code.')
     return
  }

  if (!postTopic.value || !fbToken.value) return
  const topic = postTopic.value
  const token = fbToken.value

  showPostModal.value = false
  postTopic.value = ''

  messages.value.push({
    id: Date.now(),
    role: 'user',
    text: `🚀 Generating Facebook Post...\nTopic: "${topic}"`,
    time: getTime()
  })

  typing.value = true
  scrollToBottom()

  try {
    const form = new FormData()
    form.append('mode', 'facebook_post')
    form.append('topic', topic)
    form.append('fb_token', token)
    form.append('sessionId', sessionId)

    const res = await axios.post(webhookUrl.value, form)
    handleResponse(res.data)
  } catch (err) {
    handleError(err)
  }
}

// --- Core Chat Logic ---
const sendMessage = async () => {
  if (draft.value.trim().toLowerCase() === 'post' || draft.value.trim() === 'โพสต์') {
    draft.value = ''
    showPostModal.value = true
    autoResize()
    return
  }

  if (!draft.value.trim() && !pendingImage.value) return
  if (typing.value) return

  // Check URL before sending
  if (!webhookUrl.value || webhookUrl.value.trim() === '') {
     alert('⚠️ Error: Webhook URL is missing. Please set DEFAULT_N8N_URL in the code.')
     return
  }

  const textContent = draft.value
  const imageContent = pendingImage.value

  draft.value = ''
  pendingImage.value = null
  if (textArea.value) textArea.value.style.height = 'auto'

  messages.value.push({
    id: Date.now(),
    role: 'user',
    text: textContent,
    image: imageContent,
    time: getTime()
  })

  scrollToBottom()
  typing.value = true

  try {
    const form = new FormData()
    form.append('chatInput', textContent)
    form.append('sessionId', sessionId)
    if (imageContent) form.append('file', dataURLtoFile(imageContent, 'image.jpg'))

    const res = await axios.post(webhookUrl.value, form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    handleResponse(res.data)
  } catch (err) {
    handleError(err)
  }
}

const handleResponse = (data) => {
  let aiReply = ''
  if (typeof data === 'string') aiReply = data
  else if (typeof data === 'object') {
    aiReply = data.output || data.text || data.response || data.message || JSON.stringify(data, null, 2)
  }

  if (!aiReply) aiReply = '✅ Received (No content returned)'

  messages.value.push({
    id: Date.now() + 1,
    role: 'assistant',
    text: aiReply,
    time: getTime()
  })
  typing.value = false
  scrollToBottom()
}

const handleError = (err) => {
  console.error(err)
  let msg = err.message
  if (err.response && err.response.status === 404) msg = 'Webhook URL not found (404)'
  messages.value.push({
    id: Date.now() + 1,
    role: 'assistant',
    text: `⚠️ Error: ${msg}\nPlease check settings.`,
    time: getTime()
  })
  typing.value = false
  scrollToBottom()
}
</script>

<style scoped>
/* Glass Effect */
.glass-panel {
  background: rgba(17, 25, 40, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(255,255,255,0.1);
    border-radius: 20px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: rgba(255,255,255,0.2); }

/* Animation Keyframes */
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

/* Entrance Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }

@keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
}
.animate-scale-in { animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
</style>
