<script setup lang="ts">
import StatsCard from './dashboard/StatsCard.vue'
import RecentSales from './dashboard/RecentWinners.vue'
import GiveawayWinner from './giveaway/GiveawayWinner.vue'
import { useGiveawayStore } from '@/stores/giveaway'
import { computed } from 'vue'

const giveawayStore = useGiveawayStore()

const stats = computed(() => [
  {
    title: 'Total Participants Today',
    value: '2000',
    change: '+20.1%',
    changeText: 'from yesterday',
    icon: 'heroicons:users',
  },
  {
    title: 'Unprocessed Orders',
    value: (giveawayStore.unprocessedOrders ?? 0).toString(),
    change: `+${giveawayStore.unprocessedOrders ?? 0}`,
    changeText: 'orders needing to be shipped',
    icon: 'heroicons:shopping-cart',
    isWarning: (giveawayStore.unprocessedOrders ?? 0) > 5
  },
  {
    title: 'Active Now',
    value: (giveawayStore.activeLives ?? 0).toString(),
    change: '',
    changeText: 'since last hour',
    icon: 'heroicons:signal',
  },
  {
    title: 'Current Live Countdown',
    value: giveawayStore.formattedTime,
    change: '',
    changeText: giveawayStore.currentGiveaway.title,
    icon: 'heroicons:signal',
  },
])
</script>

<template>
  <div class="flex-1 space-y-4 p-8 pt-6">
    <div class="flex items-center justify-between space-y-2">
      <h2 class="text-4xl font-bold tracking-tight mb-8">Hello, Thomas</h2>
    </div>

    <!-- Stats Cards -->
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard 
        v-for="stat in stats" 
        :key="stat.title"
        v-bind="stat"
      />
    </div>

    <!-- Giveaway Winner and Recent Sales Grid -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <GiveawayWinner class="lg:col-span-4" />
      <div class="lg:col-span-3">
        <RecentSales />
      </div>
    </div>
  </div>
</template> 