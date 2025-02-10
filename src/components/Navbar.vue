<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import logo from '@/assets/logo.svg'
</script>

<template>
  <section class="border-b">
    <div class="px-8 py-4">
      <nav class="flex items-center justify-between">
        <!-- Logo Section -->
        <div class="flex items-center gap-2">
          <img 
            :src="logo" 
            alt="logo" 
            class="w-11 h-11" 
          />
          <span class="text-2xl font-semibold">Unsociable</span>
        </div>

        <!-- Logout Button -->
        <Button variant="outline">
          Log out
        </Button>
      </nav>
    </div>
  </section>
</template> 