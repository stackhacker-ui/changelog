import type { ChangelogVersion, GitHubRelease } from "~/types/changelog";

export const toChangelogVersion = (release: GitHubRelease): ChangelogVersion => ({
  tag: release.tag,
  title: release.name || release.tag,
  date: release.publishedAt,
  markdown: release.markdown,
});

export const formatChangelogDate = (value: string) => {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(value));
};
