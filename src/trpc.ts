import { createTRPCReact, httpBatchLink } from '@trpc/react-query';
import type { AppRouter } from '../../download-service-backend/src/trpc';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [httpBatchLink({ url: 'http://localhost:4000/trpc' })],
});
