<script setup lang="ts">
const appConfig = useAppConfig();

const { versions, error, pending, refresh } = await useChangelogReleases(() => appConfig.repository);
</script>

<template>
  <ChangelogTimeline
    :versions="versions"
    :pending="pending"
    :error="error"
    @refresh="refresh"
  />
</template>
