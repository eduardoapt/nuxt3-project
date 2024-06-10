<template>
  <div class="h-screen flex flex-col flex-nowrap justify-between">
    <div>
      <Header />
      <UContainer class="my-4 overflow-auto overflow-x-hidden">
        <slot></slot>
      </UContainer>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
