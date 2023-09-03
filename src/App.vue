<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/canvas">Canvas</RouterLink>
      <RouterLink to="/clock">Clock</RouterLink>
      <RouterLink to="/gluttonous_snake">Gluttonous Snake</RouterLink>
      <RouterLink to="/picture_magnifying_glass">Picture Magnifying Glass</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  display: block;
  width: 100%;
  line-height: 1.5;
}

nav {
  margin-top: 2rem;
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  border-left: 1px solid var(--color-border);
  padding: 0 1rem;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    margin-top: 1rem;
    margin-left: -1rem;
    padding: 1rem 0;
    font-size: 1rem;
    text-align: left;
  }
}
</style>
