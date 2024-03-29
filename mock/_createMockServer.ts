import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

const modules: Record<string, string> = import.meta.glob('./**/*.ts', { eager: true });

const mockModules: any[] = [];
Object.keys(modules).forEach((key) => {
  if (key.includes('/_')) {
    return;
  }
  mockModules.push(...modules[key]);
});

export function setupProdMockServer() {
    createProdMockServer(mockModules);
}