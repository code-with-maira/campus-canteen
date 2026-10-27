import { useEffect, useState } from "react";

export default function useMenuData() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadMenu() {
      try {
        const response = await fetch("/menu.json", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Menu could not be loaded (HTTP ${response.status}).`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Menu data is not in the expected format.");
        }

        setMenu(data);
        setError("");
      } catch (loadError) {
        if (loadError.name !== "AbortError") {
          console.error(
            'Failed to load menu from "/menu.json". Confirm the app is running through Vite (npm run dev) and opened at its http://localhost URL, not via file://.',
            loadError,
          );
          const message =
            loadError instanceof TypeError
              ? `Could not fetch /menu.json. Make sure the Vite development server is running and open its http://localhost URL. Details: ${loadError.message}`
              : loadError.message || "Menu could not be loaded.";
          setError(message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadMenu();
    return () => controller.abort();
  }, []);

  return { menu, loading, error };
}
