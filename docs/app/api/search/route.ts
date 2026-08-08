import { createFromSource } from 'fumadocs-core/search/server';
import { source } from '@/utils/source';

export const { GET } = createFromSource(source);
