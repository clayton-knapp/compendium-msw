global.fetch = (...args) =>
  import('cross-fetch').then(({ default: fetch }) => fetch(...args));

import { setupServer } from 'msw/node';
import { rest } from 'msw';

const data = {
  preference: null,
  pagination: {
    total: 116021,
    limit: 20,
    offset: 0,
    total_pages: 5802,
    current_page: 1,
  },
  data: [
    {
      _score: 22535.4,
      artist_title: 'Alma Thomas',
      id: 129884,
      image_id: 'e966799b-97ee-1cc6-bd2f-a94b4b8bb8f9',
      title: 'Starry Night and the Astronauts',
    },
    {
      _score: 834.6445,
      artist_title: 'Joan Mitchell',
      id: 86385,
      image_id: 'f7f9615d-2c2b-6b23-47b2-cd6cdc846504',
      title: 'City Landscape',
    },
  ],
};

const server = setupServer(
  rest.get('https://api.artic.edu/api/v1/artworks/search', (req, res, ctx) =>
    res(ctx.json(data))
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
