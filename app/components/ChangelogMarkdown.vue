<script setup lang="ts">
defineProps<{
  markdown?: string;
}>();
</script>

<template>
  <div class="changelog-markdown mt-7">
    <MDC
      v-if="markdown"
      :value="markdown"
    />
    <p
      v-else
      class="rounded-lg border border-dashed bg-muted/30 px-4 py-3 text-sm text-muted-foreground"
    >
      No release notes were provided for this version.
    </p>
  </div>
</template>
