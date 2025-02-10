<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import DotPattern from '../DotPattern.vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  withPattern?: boolean
}>()
</script>

<template>
  <div
    :class="
      cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm relative',
        props.class,
      )
    "
  >
    <DotPattern v-if="withPattern" />
    <slot />
  </div>
</template>
