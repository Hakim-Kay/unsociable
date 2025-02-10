<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  width?: number
  height?: number
  x?: number
  y?: number
  cx?: number
  cy?: number
  cr?: number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: 16,
  height: 16,
  x: 0,
  y: 0,
  cx: 1,
  cy: 1,
  cr: 1
})

// Generate a unique ID for the pattern
const id = computed(() => `dot-pattern-${Math.random().toString(36).substr(2, 9)}`)
</script>

<template>
  <svg
    aria-hidden="true"
    :class="cn('pointer-events-none absolute inset-0 h-full w-full fill-black/15', props.class)"
  >
    <defs>
      <pattern
        :id="id"
        :width="width"
        :height="height"
        patternUnits="userSpaceOnUse"
        patternContentUnits="userSpaceOnUse"
        :x="x"
        :y="y"
      >
        <circle id="pattern-circle" :cx="cx" :cy="cy" :r="cr" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" strokeWidth="0" :fill="`url(#${id})`" />
  </svg>
</template> 