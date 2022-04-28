import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import List from './List';

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

describe('Component and Behavioral Tests', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('Should test the component for loading state and one pokemon', async () => {
    render(<List />);

    // screen.debug();

    // COMPONENT TESTS
    // see if there is an element with text of "loading"
    screen.getByText(/loading/i);

    // wait and see if an element with the text of "starry night" appears
    await screen.findByText('Starry Night and the Astronauts');
    // screen.debug();

    // BEHAVIORAL TESTS
    // find the filter input box
    const search = screen.getByPlaceholderText('Find a piece of art');

    //type the word "city" into our search
    userEvent.type(search, 'city');

    //check that only "City Landscape" character appears
    return waitFor(() => {
      const result = screen.getByText('City Landscape');
      // screen.debug();
      expect(result.textContent).toEqual('City Landscape');
    });

    // other methods
    // return waitFor(() => {
    //   const result = screen.getByLabelText('title');
    //   screen.debug();
    //   console.log('result', result);
    //   expect(result.textContent).toEqual('City Landscape');
    // });

    // other methods
    // return waitFor(() => {
    //   const result = screen.getByRole('heading', {
    //     level: 2,
    //   });
    //   screen.debug();
    //   console.log('result', result);
    //   expect(result.textContent).toEqual('City Landscape');
    // });
  });
});
