/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, waitForElement, fireEvent, cleanup } from '@testing-library/react';
import RelatedItems from '../client/components/RelatedItems/RelatedItems.jsx';
import axiosMock from 'axios';
import relatedItemsList from '../fixtures/relatedItemsList.json';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup)

it('should load and display the data', async () => {
  const { getByTestId } = render(<RelatedItems id={25811}/>);
  // axiosMock.get.mockResolvedValueOnce({
  //   data: {product: [1, 2 , 3]}
  // })
})

// it('should render the OutfitCard component', () => {
//   const { asFragment } = render(<RelatedItems id={25811}/>);
//   expect(asFragment(<RelatedItems id={25811}/>)).toMatchSnapshot()
// })