import type { MaybeRefOrGetter } from "vue";
import type { ReleaseApiResponse } from "~/types/changelog";
import { toChangelogVersion } from "~/utils/changelog";

export const useChangelogReleases = async (repository: MaybeRefOrGetter<string>) => {
  const url = computed(() => `https://ungh.cc/repos/${toValue(repository)}/releases`);

  const { data, error, pending, refresh, status } = await useFetch<ReleaseApiResponse>(url);

  const versions = computed(() => {
    return data.value?.releases.map(toChangelogVersion) ?? [];
  });

  return {
    versions,
    error,
    pending,
    refresh,
    status,
  };
};
