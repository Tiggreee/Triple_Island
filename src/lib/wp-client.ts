const DEFAULT_TIMEOUT_MS = 6000;

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => reject(new Error("WP request timeout")), timeoutMs);

    promise
      .then((value) => {
        clearTimeout(timeoutId);
        resolve(value);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
}

export async function wpFetch<T>(path: string): Promise<T | null> {
  const baseUrl = process.env.WORDPRESS_API_URL;

  if (!baseUrl) {
    return null;
  }

  const url = `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

  try {
    const response = await withTimeout(
      fetch(url, {
        next: { revalidate: 60 },
      }),
      DEFAULT_TIMEOUT_MS,
    );

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}
