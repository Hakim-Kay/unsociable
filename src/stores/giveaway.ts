import { defineStore } from 'pinia'
import { ref, computed, onMounted, onUnmounted } from 'vue'

// TikTok Shop API types (to be expanded)
type TikTokShopStatus = 'Completed' | 'To be shipped'

interface GiveawayTimer {
  minutes: number
  seconds: number
}

interface ActiveGiveaway {
  title: string
  duration: number // in seconds
  prize: TikTokShopPrize
}

// Mock data - will be replaced with API data
const MOCK_STATUSES: TikTokShopStatus[] = [
  'Completed',
  'To be shipped',
  'To be shipped',
  'Completed',
  'To be shipped'
]

const MOCK_PRIZES = [
  'Limited Edition Package',
  'Brand Merch Bundle',
  'Premium Gift Set',
  'Exclusive Collection',
  'Special Edition Box'
]

type TikTokShopPrize = {
  name: string
  value: string
  productId?: string  // TikTok Shop product ID
}

interface Winner {
  id: string
  name: string
  username: string
  email: string
  timestamp: Date
  status: TikTokShopStatus
  prize: TikTokShopPrize
  stats: {
    totalParticipants: number
  }
  // TikTok Shop specific fields
  tiktokUserId?: string
  orderNumber?: string
  shippingDetails?: {
    trackingNumber?: string
    carrier?: string
    status?: string
  }
}

const MOCK_GIVEAWAYS: ActiveGiveaway[] = [
  {
    title: 'Coco Chanel Handbag',
    duration: 15, // 15 seconds
    prize: { name: 'Limited Edition Handbag', value: '$2500' }
  },
  {
    title: 'Black Opium Perfume',
    duration: 15, // 15 seconds
    prize: { name: 'Black Opium Perfume', value: '$1299' }
  }
]

export const useGiveawayStore = defineStore('giveaway', () => {
  // State
  const activeLives = ref(10)
  const liveGiveawayCount = ref(1500)
  const currentWinner = ref<Winner | null>(null)
  const recentWinners = ref<Winner[]>([])
  const unprocessedOrders = ref(0)
  const currentGiveaway = ref<ActiveGiveaway>(MOCK_GIVEAWAYS[0])
  const timeRemaining = ref<GiveawayTimer>({ minutes: 5, seconds: 0 })
  const timerInterval = ref<ReturnType<typeof setInterval>>()

  // Index to cycle through mock data
  const mockDataIndex = ref(0)
  
  // Helper to get next mock status - will be replaced with API call
  function getNextStatus(): TikTokShopStatus {
    const status = MOCK_STATUSES[mockDataIndex.value]
    mockDataIndex.value = (mockDataIndex.value + 1) % MOCK_STATUSES.length
    return status
  }
  
  // Helper to get next mock prize - will be replaced with API call
  function getNextPrize(): string {
    return MOCK_PRIZES[Math.floor(Math.random() * MOCK_PRIZES.length)]
  }

  // Mock function - will be replaced with TikTok Shop API call
  function simulateNewWinner() {
    const newWinner: Winner = {
      id: Math.random().toString(36).substring(2, 9),
      name: `Winner ${Math.floor(Math.random() * 1000)}`,
      username: `user${Math.floor(Math.random() * 1000)}`,
      email: `user${Math.floor(Math.random() * 1000)}@example.com`,
      timestamp: new Date(),
      status: getNextStatus(),
      prize: {
        name: getNextPrize(),
        value: '$50',
        // productId will come from TikTok Shop
      },
      stats: {
        totalParticipants: liveGiveawayCount.value
      }
      // Additional TikTok Shop fields will be populated here
    }

    updateWinners(newWinner)
  }

  // Helper function to manage winners state
  function updateWinners(newWinner: Winner) {
    if (currentWinner.value) {
      recentWinners.value.unshift(currentWinner.value)
      
      // Check if we're removing a winner and it needs processing
      if (recentWinners.value.length > 5) {
        const removedWinner = recentWinners.value.pop()
        if (removedWinner && removedWinner.status === 'To be shipped') {
          unprocessedOrders.value++
        }
      }
    }
    currentWinner.value = newWinner
    decrementActiveLives()
    decrementParticipants()
  }

  // These will be updated to use TikTok Shop data
  function decrementActiveLives() {
    if (activeLives.value > 0) {
      activeLives.value--
    }
  }

  function decrementParticipants() {
    liveGiveawayCount.value = Math.max(0, liveGiveawayCount.value - 1)
  }

  // Future TikTok Shop API methods
  async function fetchTikTokShopWinners() {
    // Will fetch winners from TikTok Shop API
  }

  async function updateWinnerStatus(winnerId: string, status: TikTokShopStatus) {
    // Will update winner status in TikTok Shop
  }

  // Computed
  const formattedTime = computed(() => {
    const { minutes, seconds } = timeRemaining.value
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  })

  // Timer functions
  function startTimer() {
    if (timerInterval.value) clearInterval(timerInterval.value)
    
    const endTime = Date.now() + currentGiveaway.value.duration * 1000
    
    timerInterval.value = setInterval(() => {
      const remaining = Math.max(0, endTime - Date.now())
      
      if (remaining === 0) {
        simulateNewWinner()  // This now only happens when timer hits zero
        nextGiveaway()
        return
      }
      
      timeRemaining.value = {
        minutes: Math.floor(remaining / 60000),
        seconds: Math.floor((remaining % 60000) / 1000)
      }
    }, 1000)
  }

  function nextGiveaway() {
    const currentIndex = MOCK_GIVEAWAYS.indexOf(currentGiveaway.value)
    const nextIndex = (currentIndex + 1) % MOCK_GIVEAWAYS.length
    currentGiveaway.value = MOCK_GIVEAWAYS[nextIndex]
    
    timeRemaining.value = {
      minutes: Math.floor(currentGiveaway.value.duration / 60),
      seconds: currentGiveaway.value.duration % 60
    }
    
    startTimer()
  }

  // Initialize only once when store is created
  onMounted(() => {
    startTimer()
  })

  onUnmounted(() => {
    if (timerInterval.value) clearInterval(timerInterval.value)
  })

  return {
    // State
    activeLives,
    liveGiveawayCount,
    currentWinner,
    recentWinners,
    unprocessedOrders,
    currentGiveaway,
    formattedTime,
    
    // Methods
    simulateNewWinner,
    decrementActiveLives,
    decrementParticipants,
    startTimer,
    nextGiveaway,
    // Future methods
    fetchTikTokShopWinners,
    updateWinnerStatus
  }
}) 