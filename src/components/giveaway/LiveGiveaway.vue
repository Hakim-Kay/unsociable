<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Card from '../ui/card/Card.vue'
import CardContent from '../ui/card/CardContent.vue'
import CardHeader from '../ui/card/CardHeader.vue'
import CardTitle from '../ui/card/CardTitle.vue'
import Avatar from '../ui/avatar/Avatar.vue'
import AvatarImage from '../ui/avatar/AvatarImage.vue'
import AvatarFallback from '../ui/avatar/AvatarFallback.vue'
import { useGiveawayStore } from '@/stores/giveaway'

interface Winner {
  id: string
  name: string
  username: string
  email: string
  timestamp: Date
  prize: {
    name: string
    value: string
  }
}

const giveawayStore = useGiveawayStore()
const winners = ref<Winner[]>([])
const interval = ref<ReturnType<typeof setInterval>>()

// Simulate new winners every 12 seconds
const simulateNewWinner = () => {
  const newWinner: Winner = {
    id: Math.random().toString(36).substring(2, 9),
    name: `Winner ${Math.floor(Math.random() * 1000)}`,
    username: `user${Math.floor(Math.random() * 1000)}`,
    email: `user${Math.floor(Math.random() * 1000)}@example.com`,
    timestamp: new Date(),
    prize: {
      name: 'Limited Edition Package',
      value: '$50'
    }
  }

  // Add new winner to the beginning of the array
  winners.value.unshift(newWinner)

  // Keep only the last 5 winners
  if (winners.value.length > 5) {
    winners.value.pop()
  }

  // Decrease live count
  giveawayStore.decrementParticipants()
  giveawayStore.decrementActiveLives()
}

onMounted(() => {
  interval.value = setInterval(simulateNewWinner, 12000)
})

onUnmounted(() => {
  if (interval.value) clearInterval(interval.value)
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Live Giveaway</CardTitle>
      <p class="text-sm text-muted-foreground">
        {{ giveawayStore.liveGiveawayCount }} participants remaining
      </p>
    </CardHeader>
    <CardContent>
      <TransitionGroup 
        name="list" 
        tag="div"
        class="space-y-4"
      >
        <div
          v-for="winner in winners"
          :key="winner.id"
          class="flex items-center p-4 rounded-lg bg-secondary/5"
        >
          <Avatar class="h-10 w-10">
            <AvatarImage 
              :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${winner.username}`"
            />
            <AvatarFallback>
              {{ winner.name.charAt(0) }}
            </AvatarFallback>
          </Avatar>
          <div class="ml-4">
            <p class="text-sm font-medium">@{{ winner.username }}</p>
            <p class="text-xs text-muted-foreground">
              Won {{ winner.prize.name }}
            </p>
          </div>
          <span class="ml-auto text-xs text-muted-foreground">
            {{ new Date(winner.timestamp).toLocaleTimeString() }}
          </span>
        </div>
      </TransitionGroup>
    </CardContent>
  </Card>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.5s ease;
}

/* Ensure leaving items are taken out of flow */
.list-leave-active {
  position: absolute;
}
</style> 