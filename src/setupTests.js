global.fetch = (...args) =>
  import('cross-fetch').then(({ default: fetch }) => fetch(...args));

import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { data } from './tests/fixtures/artData.js';

const server = setupServer(
  rest.get('https://api.artic.edu/api/v1/artworks/search', (req, res, ctx) =>
    res(ctx.json(data))
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
