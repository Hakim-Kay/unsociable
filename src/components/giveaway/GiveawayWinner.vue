<script setup lang="ts">
import { useGiveawayStore } from '@/stores/giveaway'
import Card from '../ui/card/Card.vue'
import CardContent from '../ui/card/CardContent.vue'
import CardHeader from '../ui/card/CardHeader.vue'
import CardTitle from '../ui/card/CardTitle.vue'
import Avatar from '../ui/avatar/Avatar.vue'
import AvatarImage from '../ui/avatar/AvatarImage.vue'
import AvatarFallback from '../ui/avatar/AvatarFallback.vue'
import { Icon } from '@iconify/vue'

const giveawayStore = useGiveawayStore()

const getInitials = (username: string) => {
  return username.charAt(0).toUpperCase()
}
</script>

<template>
  <Card class="col-span-4">
    <CardHeader>
      <CardTitle>Giveaway Winner</CardTitle>
    </CardHeader>
    <CardContent>
      <div v-if="giveawayStore.currentWinner" class="flex flex-col items-center space-y-8 py-6">
        <Avatar class="h-32 w-32 border-4 border-primary">
          <AvatarImage 
            :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${giveawayStore.currentWinner.username}`"
            alt="Winner avatar"
          />
          <AvatarFallback class="text-4xl">
            {{ getInitials(giveawayStore.currentWinner.username) }}
          </AvatarFallback>
        </Avatar>

        <div class="flex flex-col items-center space-y-1">
          <h2 class="text-3xl font-bold tracking-tight">
            @{{ giveawayStore.currentWinner.username }}
          </h2>
          <p class="text-sm text-muted-foreground">
            {{ giveawayStore.currentWinner.email }}
          </p>
        </div>

        <!-- Prize and Participants Info -->
        <div class="grid w-full grid-cols-2 gap-8 px-4">
          <div class="flex flex-col items-center space-y-2 p-4 rounded-lg bg-secondary/10">
            <div class="rounded-full bg-primary/10 p-3">
              <Icon 
                icon="ph:trophy" 
                class="h-6 w-6 text-primary"
              />
            </div>
            <h3 class="font-semibold text-sm text-muted-foreground">
              Prize
            </h3>
            <p class="text-center font-medium">
              {{ giveawayStore.currentWinner.prize.name }}
            </p>
          </div>

          <div class="flex flex-col items-center space-y-2 p-4 rounded-lg bg-secondary/10">
            <div class="rounded-full bg-primary/10 p-3">
              <Icon 
                icon="ph:users" 
                class="h-6 w-6 text-primary"
              />
            </div>
            <h3 class="font-semibold text-sm text-muted-foreground">
              Total Participants
            </h3>
            <p class="text-center font-medium">
              {{ giveawayStore.currentWinner.stats.totalParticipants.toLocaleString() }}
            </p>
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col items-center justify-center h-64">
        <p class="text-lg text-muted-foreground">Waiting for next winner...</p>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped>
.border-primary {
  border-color: hsl(var(--primary));
}

.text-primary {
  color: hsl(var(--primary));
}

.bg-primary\/10 {
  background-color: hsl(var(--primary) / 0.1);
}
</style> 