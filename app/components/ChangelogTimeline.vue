<script setup lang="ts">
import type { ChangelogVersion } from "~/types/changelog";
import { CircleAlert } from "lucide-vue-next";
import { Button } from "~/components/ui/button";
import { formatChangelogDate } from "~/utils/changelog";

defineProps<{
  versions: ChangelogVersion[];
  pending?: boolean;
  error?: unknown;
}>();

const emit = defineEmits<{
  refresh: [];
}>();
</script>

<template>
  <main class="py-16 sm:py-24 lg:py-32 xl:-ms-7">
    <div
      v-if="error"
      class="mx-auto max-w-xl rounded-xl border border-destructive/30 bg-card p-6 text-card-foreground shadow-sm xl:mx-0"
      role="alert"
    >
      <div class="flex items-start gap-3">
        <span class="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <CircleAlert
            class="size-4"
            aria-hidden="true"
          />
        </span>
        <div class="min-w-0">
          <h2 class="text-base font-semibold tracking-tight">
            Could not load releases
          </h2>
          <p class="mt-1 text-sm leading-6 text-muted-foreground">
            Check the configured repository or try loading the changelog again.
          </p>
          <Button
            class="mt-4"
            variant="outline"
            size="sm"
            @click="emit('refresh')"
          >
            Try again
          </Button>
        </div>
      </div>
    </div>

    <ol
      v-else-if="pending && !versions.length"
      class="relative mx-auto max-w-3xl xl:mx-0 xl:max-w-none"
      aria-label="Loading releases"
    >
      <li
        v-for="index in 3"
        :key="index"
        class="relative grid gap-x-6 pb-16 last:pb-0 sm:grid-cols-[8rem_2rem_minmax(0,36rem)] sm:gap-x-8"
      >
        <div class="h-5 w-24 animate-pulse rounded bg-muted sm:ms-auto sm:mt-2" />
        <div class="sticky top-0 -mt-16 hidden w-8 shrink-0 justify-center self-stretch pt-16 sm:flex sm:-mt-24 sm:pt-24 lg:-mt-32 lg:pt-32">
          <div class="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border/70" />
          <div class="relative mt-2 size-3 rounded-full border border-border bg-background ring-4 ring-background" />
        </div>
        <article class="min-w-0 max-w-xl sm:col-start-3">
          <div class="h-8 w-2/3 animate-pulse rounded bg-muted" />
          <div class="mt-8 space-y-3">
            <div class="h-4 w-full animate-pulse rounded bg-muted" />
            <div class="h-4 w-5/6 animate-pulse rounded bg-muted" />
            <div class="h-4 w-2/3 animate-pulse rounded bg-muted" />
          </div>
        </article>
      </li>
    </ol>

    <div
      v-else-if="!versions.length"
      class="mx-auto max-w-xl rounded-xl border bg-card p-6 text-card-foreground shadow-sm xl:mx-0"
    >
      <p class="text-sm font-medium">
        No releases yet
      </p>
      <p class="mt-1 text-sm leading-6 text-muted-foreground">
        Published GitHub releases will appear here as changelog entries.
      </p>
    </div>

    <ol
      v-else
      class="relative mx-auto max-w-3xl xl:mx-0 xl:max-w-none"
    >
      <li
        v-for="(version, index) in versions"
        :key="version.tag"
        class="relative grid gap-x-6 pb-16 last:pb-0 sm:grid-cols-[8rem_2rem_minmax(0,36rem)] sm:gap-x-8"
      >
        <p class="mb-3 inline-flex w-fit items-center rounded-full border bg-muted/40 px-2.5 py-1 font-mono text-xs text-muted-foreground sm:mb-0 sm:ms-auto sm:mt-1 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:text-right sm:text-xs/9 sm:text-foreground">
          {{ formatChangelogDate(version.date) }}
        </p>

        <div class="sticky top-0 -mt-16 hidden w-8 shrink-0 justify-center self-stretch pt-16 sm:flex sm:-mt-24 sm:pt-24 lg:-mt-32 lg:pt-32">
          <div class="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border/80" />
          <div
            class="relative mt-2 size-3 rounded-full border bg-background ring-4 ring-background"
            :class="index === 0 ? 'border-primary bg-primary shadow-[0_0_0_3px] shadow-primary/10' : 'border-border'"
          />
        </div>

        <article
          class="min-w-0 max-w-xl text-card-foreground sm:col-start-3"
          :aria-current="index === 0 ? 'step' : undefined"
        >
          <header class="border-b border-border pb-4">
            <div class="mb-3 flex items-center gap-2 sm:hidden">
              <span
                class="size-2.5 rounded-full border"
                :class="index === 0 ? 'border-primary bg-primary' : 'border-border bg-background'"
                aria-hidden="true"
              />
              <span class="text-xs font-medium text-muted-foreground">
                {{ index === 0 ? "Latest release" : version.tag }}
              </span>
            </div>
            <p
              v-if="index === 0"
              class="mb-2 hidden text-xs font-medium text-muted-foreground sm:block"
            >
              Latest release
            </p>
            <h2 class="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              {{ version.title }}
            </h2>
          </header>

          <ChangelogMarkdown :markdown="version.markdown" />
        </article>
      </li>
    </ol>
  </main>
</template>
