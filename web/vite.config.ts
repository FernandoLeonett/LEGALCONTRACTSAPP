import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default ({ mode }: { mode: string }) => {
  // Cargar solo variables que empiezan con VITE_
  const env = loadEnv(mode, process.cwd(), "VITE_");

  // Convertir puerto a número
  const port: number = env.VITE_PORT ? Number(env.VITE_PORT) : 5173;

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
    },
    server: {
      host: "0.0.0.0",
      port,
    },
  });
};
