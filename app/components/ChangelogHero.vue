<script setup lang="ts">
import { BookOpen, ExternalLink } from "lucide-vue-next";
import { Button } from "~/components/ui/button";
</script>

<template>
  <section class="relative z-0 overflow-hidden border-b border-border/70 px-4 py-16 sm:px-6 sm:py-24 xl:sticky xl:inset-y-0 xl:h-screen xl:border-r xl:border-b-0 xl:px-8 xl:py-32">
    <SkyBg />

    <div class="absolute top-1/2 -right-1/2 z-[-1] size-60 -translate-y-1/2 rounded-full bg-primary/25 blur-[300px] sm:size-100" />

    <div class="mx-auto flex h-full max-w-xl flex-col justify-center xl:max-w-lg">
      <div class="mb-8 flex flex-wrap items-center gap-3">
        <AppLogo class="h-6 w-auto shrink-0 text-foreground" />
        <TemplateMenu />
      </div>

      <h1 class="text-left text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        Changelog
      </h1>
      <p class="mt-4 max-w-lg text-left text-lg text-muted-foreground text-pretty sm:text-xl">
        Display GitHub release notes as a beautiful changelog for any repository with this Stackhacker UI template.
      </p>

      <div class="mt-8 -ms-2.5 flex flex-wrap justify-start gap-1">
        <Button
          as="a"
          href="https://changelog-template.stackhacker.io/"
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
          size="default"
        >
          <ExternalLink
            class="size-4"
            aria-hidden="true"
          />
          Live demo
        </Button>
        <Button
          as="a"
          href="https://ui.stackhacker.io/docs/getting-started"
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
          size="default"
        >
          <BookOpen
            class="size-4"
            aria-hidden="true"
          />
          Documentation
        </Button>
        <Button
          as="a"
          href="https://github.com/stackhacker-ui/changelog"
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
          size="default"
        >
          <Icon
            name="mdi:github"
            size="18"
            class="shrink-0"
            aria-hidden="true"
          />
          GitHub
        </Button>
      </div>
    </div>
  </section>
</template>
