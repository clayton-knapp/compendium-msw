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

describe('Component and Behavioral Tests', () => {
  it('Should test the component for loading state and one pokemon', async () => {
    render(<List />);

    // screen.debug();

    // COMPONENT TESTS
    // see if there is an element with text of "loading"
    screen.getByText(/loading/i);

    // wait and see if an element with the text of "starry night" appears
    await screen.findByText('Starry Night and the Astronauts');
    // screen.debug();

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