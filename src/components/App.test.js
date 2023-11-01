import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import user from '@testing-library/user-event';
import * as localStorageUtils from '../utils';
import App from './App';

jest.mock('../utils');

describe('App', () => {
  let imageThumbnail1;
  let imageThumbnail2;
  let addDescriptionBtn;
  const description = 'At the Los Angelos airport';
  beforeEach(async () => {
    localStorageUtils.fetchData.mockResolvedValue([
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

    expect(screen.getByAltText(/one/i)).toBeInTheDocument();
    expect(screen.getByAltText(/two/i)).toBeInTheDocument();
    expect(screen.getByAltText(/three/i)).toBeInTheDocument();

    imageThumbnail1 = screen.getByAltText(/one/i);
    imageThumbnail2 = screen.getByAltText(/two/i);
    addDescriptionBtn = screen.getByText(/add a description/i);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('it should render a collection of images and open a modal when an image is clicked and show selected image in modal', async () => {
    user.click(imageThumbnail1);

    // modal title
    expect(screen.getByText(/one/i)).toBeInTheDocument();
    // modal image
    expect(screen.getAllByAltText(/one/i)[1]).toBeInTheDocument();
    expect(addDescriptionBtn).toBeInTheDocument();
  });

  test('it should close the modal by the X or Close button', async () => {
    user.click(imageThumbnail1);
    // close button on modal
    user.click(screen.getByText(/close/i));
    user.click(imageThumbnail1);
    // x button on modal to close modal
    user.click(screen.getByTestId(/xclose/i));
  });

  test('it should add or edit a description for an image', async () => {
    user.click(imageThumbnail2);

    // h5 title
    expect(screen.getByText(/two/i)).toBeInTheDocument();
    // large image
    expect(screen.getAllByAltText(/two/i)[1]).toBeInTheDocument();

    user.click(addDescriptionBtn);
    // add description
    user.type(screen.getByLabelText('Description'), description);
    // save description
    user.click(screen.getByText(/save/i));

    // check that description was saved and then open form to edit description
    expect(screen.getByText(description)).toBeInTheDocument();
    
    user.click(screen.getByText(/edit description/i));
    // clear the description
    user.clear(screen.getByLabelText('Description'));
    // save cleared description
    user.click(screen.getByText(/save/i));

    // verify that the description is deleted
    expect(screen.queryByText(description)).not.toBeInTheDocument();
    // using addDescriptionBtn variable fails so I am manually testing here, unsure why
    expect(screen.getByText(/add a description/i)).toBeInTheDocument();
  });

  test('it should not save the editied description if form is cancelled before saving', async () => {
    user.click(imageThumbnail2);
    user.click(addDescriptionBtn);
    // add description
    user.type(screen.getByLabelText('Description'), description);
    // save description
    user.click(screen.getByText(/save/i));
    // edit description
    user.click(screen.getByText(/edit description/i));
    // clear the description
    user.clear(screen.getByLabelText('Description'));
    user.click(screen.getByText(/cancel/i));

    // description should not be changed
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});
