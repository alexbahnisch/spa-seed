import { configure, queryByTestId } from '@testing-library/dom'
import '@testing-library/jest-dom'

import { upsertElement } from './browser'

describe('upsertElement', () => {
  configure({ testIdAttribute: 'id' })
  const testId = 'test-id'

  afterEach(() => {
    const element = queryByTestId(document.body, testId)
    element && document.body.removeChild(element)
  })

  beforeEach(() => {
    expect(queryByTestId(document.body, testId)).toBeNull()
  })

  test('test create', () => {
    const element = upsertElement(testId)

    expect(element).toBeInTheDocument()
    expect(queryByTestId(document.body, testId)).toBeInTheDocument()
  })

  test('test get', () => {
    upsertElement(testId)
    const element = upsertElement(testId)

    expect(element).toBeInTheDocument()
    expect(queryByTestId(document.body, testId)).toBeInTheDocument()
  })
})
