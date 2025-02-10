<script setup lang="ts">
import Card from './components/ui/card/Card.vue'
import Button from './components/ui/button/Button.vue'
import Avatar from './components/ui/avatar/Avatar.vue'
import Dashboard from '@/components/Dashboard.vue';
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="min-h-screen w-full bg-background">
    <Navbar />
    <Card withPattern>
      <Avatar />
      <Dashboard />
    </Card>
  </div>
  <!-- Made with ❤️ by <a href="https://github.com/thomas-m-dev" target="_blank">Thomas</a> -->
</template>

<style scoped>

</style>
