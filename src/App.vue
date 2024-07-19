<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
const router = useRouter()
const routes = router.getRoutes()
const menu = routes.map((route: any) => {
  return { to: route.name, label: route.name.replace('View', '') }
})
</script>

<template>
  <header>
    <nav>
      <RouterLink v-for="{ to, label } in menu" :key="to" :to="{ name: to }">{{ label }}</RouterLink>
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
