export interface GitHubConfig {
  token: string;
  owner: string;
  repo: string;
  branch: string;
  filePath: string;
}

const DEFAULTS: GitHubConfig = {
  token: import.meta.env.VITE_GITHUB_TOKEN ?? "",
  owner: "Ak-dude",
  repo: "tech-titans-hub",
  branch: "main",
  filePath: "published.json",
};

export function getGitHubConfig(): GitHubConfig {
  return { ...DEFAULTS };
}

export function getRawUrl(config: GitHubConfig): string {
  return `https://raw.githubusercontent.com/${config.owner}/${config.repo}/${config.branch}/${config.filePath}`;
}

export async function fetchPublishedFromGitHub(config: GitHubConfig): Promise<unknown | null> {
  if (!config.owner || !config.repo) return null;
  try {
    const res = await fetch(`${getRawUrl(config)}?t=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function publishToGitHub(data: unknown, config: GitHubConfig): Promise<void> {
  const { token, owner, repo, branch, filePath } = config;
  if (!token || !owner || !repo) throw new Error("GitHub config incomplete — add your token in the I/O tab.");

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
  const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))));

  // Fetch current SHA if the file already exists (required for updates)
  let sha: string | undefined;
  const getRes = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
  });
  if (getRes.ok) {
    const existing = await getRes.json();
    sha = existing.sha;
  }

  const putRes = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "publish: update site content",
      content,
      branch,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!putRes.ok) {
    const err = await putRes.json().catch(() => ({}));
    throw new Error((err as { message?: string }).message || `GitHub API error ${putRes.status}`);
  }
}
