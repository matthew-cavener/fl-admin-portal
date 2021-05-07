import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { HeadingBar } from './HeadingBar'

afterEach(cleanup)

it('renders', () => {
  const { asFragment } = render(<HeadingBar>Heading</HeadingBar>)
  expect(asFragment()).toMatchSnapshot()
})