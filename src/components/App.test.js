import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  fireEvent,
} from '@testing-library/react';
import user from '@testing-library/user-event';
import * as userUtils from '../utils';
import App from './App';

jest.mock('../utils');

describe('App', () => {
  let imageThumbnail1;
  let imageThumbnail2;
  let addDescriptionBtn;
  const description = 'At the Los Angelos airport';
  beforeEach(async () => {
    userUtils.fetchData.mockResolvedValue([
      {
        albumId: 1,
        id: 1,
        title: 'one',
        url: 'https://via.placeholder.com/600/92c952',
        thumbnailUrl: 'https://via.placeholder.com/150/92c952',
      },
      {
        albumId: 1,
        id: 2,
        title: 'two',
        url: 'https://via.placeholder.com/600/771796',
        thumbnailUrl: 'https://via.placeholder.com/150/771796',
      },
      {
        albumId: 1,
        id: 3,
        title: 'three',
        url: 'https://via.placeholder.com/600/24f355',
        thumbnailUrl: 'https://via.placeholder.com/150/24f355',
      },
    ]);

    render(<App />);

    await waitForElementToBeRemoved(() => screen.queryAllByText(/loading/i));

    await waitFor(() => {
      expect(screen.getByAltText(/one/i)).toBeInTheDocument();
      expect(screen.getByAltText(/two/i)).toBeInTheDocument();
      expect(screen.getByAltText(/three/i)).toBeInTheDocument();
    });

    imageThumbnail1 = screen.getByAltText(/one/i);
    imageThumbnail2 = screen.getByAltText(/two/i);
    addDescriptionBtn = screen.getByText(/add a description/i);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('it should render a collection of images and open a modal when an image is clicked and show selected image in modal', async () => {
    await waitFor(() => fireEvent.click(imageThumbnail1));

    await waitFor(() => {
      // modal title
      expect(screen.getByText(/one/i)).toBeInTheDocument();
      // modal image
      expect(screen.getAllByAltText(/one/i)[1]).toBeInTheDocument();
      expect(addDescriptionBtn).toBeInTheDocument();
    });
  });

  test('it should close the modal by the X or Close button', async () => {
    await waitFor(() => fireEvent.click(imageThumbnail1));

    await waitFor(() => {
      // close button on modal
      fireEvent.click(screen.getByText(/close/i));
      fireEvent.click(imageThumbnail1);
      // x button on modal to close modal
      fireEvent.click(screen.getByTestId(/xclose/i));
    });
  });

  test('it should add or edit a description for an image', async () => {
    await waitFor(() => fireEvent.click(imageThumbnail2));

    await waitFor(() => {
      // h5 title
      expect(screen.getByText(/two/i)).toBeInTheDocument();
      // large image
      expect(screen.getAllByAltText(/two/i)[1]).toBeInTheDocument();
      fireEvent.click(addDescriptionBtn);
    });

    // add description
    await waitFor(() => user.type(screen.getByLabelText('Description'), description));

    // save description
    await waitFor(() => fireEvent.click(screen.getByText(/save/i)));

    await waitFor(() => {
      // check that description was saved and then open form to edit description
      expect(screen.getByText(description)).toBeInTheDocument();
      fireEvent.click(screen.getByText(/edit description/i));
    });

    // clear the description
    await waitFor(() =>  user.clear(screen.getByLabelText('Description')));

    // save cleared description
    await waitFor(() => fireEvent.click(screen.getByText(/save/i)));

    await waitFor(() => {
      // verify that the description is deleted
      expect(screen.queryByText(description)).not.toBeInTheDocument();
      // using addDescriptionBtn variable fails so I am manually testing here, unsure why
      expect(screen.getByText(/add a description/i)).toBeInTheDocument();
    });
  });

  test('it should not save the editied description if form is cancelled before saving', async () => {
    await waitFor(() => fireEvent.click(imageThumbnail2));

    await waitFor(() => fireEvent.click(addDescriptionBtn));

    // add description
    await waitFor(() => user.type(screen.getByLabelText('Description'), description));

    // save description
    await waitFor(() => fireEvent.click(screen.getByText(/save/i)));

    // edit description
    await waitFor(() => fireEvent.click(screen.getByText(/edit description/i)));

    // clear the description
    await waitFor(() => user.clear(screen.getByLabelText('Description')));

    await waitFor(() => fireEvent.click(screen.getByText(/cancel/i)));

    // description should not be changed
    await waitFor(() => expect(screen.getByText(description)).toBeInTheDocument());
  });
});
