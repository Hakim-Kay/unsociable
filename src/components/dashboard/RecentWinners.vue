<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import Card from '../ui/card/Card.vue'
import CardContent from '../ui/card/CardContent.vue'
import CardHeader from '../ui/card/CardHeader.vue'
import CardTitle from '../ui/card/CardTitle.vue'
import Avatar from '../ui/avatar/Avatar.vue'
import AvatarImage from '../ui/avatar/AvatarImage.vue'
import AvatarFallback from '../ui/avatar/AvatarFallback.vue'
import { useGiveawayStore } from '@/stores/giveaway'

const giveawayStore = useGiveawayStore()

// Keep only the display logic
const displayWinners = computed(() => {
  const emptySlot = { id: 'empty', isEmpty: true }
  const winners = giveawayStore.recentWinners
  const slots = Array(5).fill(emptySlot)
  
  return winners.length ? slots.map((slot, i) => winners[i] || emptySlot) : slots
})
</script>

<template>
  <Card class="h-full">
    <CardHeader>
      <CardTitle>Recent Winners</CardTitle>
      <p class="text-sm text-muted-foreground">
        Previous giveaway winners
      </p>
    </CardHeader>
    <CardContent>
      <div class="min-h-[calc(5*4rem+5*1rem)]">
        <div v-if="giveawayStore.recentWinners.length === 0" 
          class="flex flex-col items-center justify-center min-h-[400px]"
        >
          <p class="text-lg text-muted-foreground">
            No winners yet...
          </p>
        </div>
        <TransitionGroup v-else
          name="list" 
          tag="div"
          class="space-y-4"
        >
          <div
            v-for="winner in giveawayStore.recentWinners"
            :key="winner.id"
            class="flex items-center p-4 rounded-lg bg-secondary/5 h-16"
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
            <span 
              class="ml-auto rounded-full px-2 py-1 text-xs font-medium"
              :class="{
                'bg-green-100 text-green-700': winner.status === 'Completed',
                'bg-gray-100 text-gray-700': winner.status === 'To be shipped'
              }"
            >
              {{ winner.status }}
            </span>
          </div>
        </TransitionGroup>
      </div>
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

.list-leave-active {
  position: absolute;
}
</style> 