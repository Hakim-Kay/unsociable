<script setup lang="ts">
import Card from '../ui/card/Card.vue'
import CardContent from '../ui/card/CardContent.vue'
import { Icon } from '@iconify/vue'

defineProps<{
  title: string
  value: string
  change: string
  changeText: string
  icon: string
  isWarning?: boolean
}>()
</script>

<template>
  <Card>
    <CardContent class="p-6">
      <div class="flex items-center justify-between">
        <p class="text-sm font-medium text-muted-foreground">
          {{ title }}
        </p>
        <Icon 
          :icon="icon"
          class="h-4 w-4 text-muted-foreground"
        />
      </div>
      <div class="space-y-1">
        <h3 class="text-2xl font-bold mt-2">{{ value }}</h3>
        <div class="flex items-center gap-1">
          <span 
            class="text-sm"
            :class="{
              'text-green-500': change.startsWith('+') && !isWarning,
              'text-red-500': isWarning || change.startsWith('-')
            }"
          >
            {{ change }}
          </span>
          <span class="text-sm text-gray-300">
            {{ changeText }}
          </span>
        </div>
      </div>
    </CardContent>
  </Card>
</template> 