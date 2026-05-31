<script setup lang="ts">
useHead({
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
  link: [
    { rel: "icon", href: "/favicon.ico" },
  ],
  htmlAttrs: {
    lang: "en",
  },
});

const title = "Stackhacker UI Changelog Template";
const description = "Display GitHub release notes as a beautiful changelog for any repository with this Stackhacker UI template.";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: "/screenshots/changelog-light.png",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div class="min-h-screen bg-background text-foreground xl:grid xl:grid-cols-2">
    <ChangelogHero />

    <section class="px-4 sm:px-6 xl:-ms-30 xl:flex-1 xl:ps-0 xl:pe-16 2xl:pe-16">
      <ModeSwitcher class="fixed top-4 right-4 z-10" />

      <NuxtPage />
    </section>
  </div>
</template>
