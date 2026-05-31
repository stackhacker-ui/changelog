export interface ReleaseApiResponse {
  releases: GitHubRelease[];
}

export interface GitHubRelease {
  name?: string;
  tag: string;
  publishedAt: string;
  markdown: string;
}

export interface ChangelogVersion {
  tag: string;
  title: string;
  date: string;
  markdown: string;
}
