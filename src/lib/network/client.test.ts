import {afterEach, beforeEach, describe, expect, it, jest} from '@jest/globals'
import {AxiosHeaders, type InternalAxiosRequestConfig} from 'axios'
import i18next from 'i18next'

import {service, type HttpClient} from './client'

type InterceptorEntry = {
  fulfilled: (value: any) => any
  rejected: (error: any) => any
}

type NetworkMockState = {
  requestInterceptors: InterceptorEntry[]
  responseInterceptors: InterceptorEntry[]
  mockAxiosInstance: any
}

function getNetworkMockState(): NetworkMockState {
  const globalObject = globalThis as typeof globalThis & {
    __networkClientTestState?: NetworkMockState
  }

  if (!globalObject.__networkClientTestState) {
    globalObject.__networkClientTestState = {
      requestInterceptors: [],
      responseInterceptors: [],
      mockAxiosInstance: undefined,
    }
  }

  return globalObject.__networkClientTestState
}

jest.mock('axios', () => {
  const actualAxios = jest.requireActual('axios') as typeof import('axios')
  const state = getNetworkMockState()

  state.mockAxiosInstance = {
    get: jest.fn() as any,
    post: jest.fn() as any,
    put: jest.fn() as any,
    delete: jest.fn() as any,
    interceptors: {
      request: {
        use: jest.fn((fulfilled: any, rejected: any) => {
          state.requestInterceptors.push({fulfilled, rejected})
          return state.requestInterceptors.length - 1
        }),
        eject: jest.fn(),
        clear: jest.fn(),
      },
      response: {
        use: jest.fn((fulfilled: any, rejected: any) => {
          state.responseInterceptors.push({fulfilled, rejected})
          return state.responseInterceptors.length - 1
        }),
        eject: jest.fn(),
        clear: jest.fn(),
      },
    } as any,
    defaults: {headers: {common: {}}} as any,
  }

  return {
    __esModule: true,
    default: {
      ...actualAxios.default,
      create: jest.fn(() => state.mockAxiosInstance),
    },
    AxiosHeaders: actualAxios.AxiosHeaders,
  }
})

jest.mock('i18next', () => ({
  __esModule: true,
  default: {
    t: jest.fn((key: string) => key),
  },
}))

jest.mock('./utils', () => ({
  prettifyJson: jest.fn((value: unknown) => JSON.stringify(value)),
}))

const mockedI18next: any = i18next
const httpClient: HttpClient = service
const {requestInterceptors, responseInterceptors, mockAxiosInstance} = getNetworkMockState()

function makeRequestConfig(overrides: Partial<InternalAxiosRequestConfig> = {}): InternalAxiosRequestConfig {
  return {
    method: 'get',
    baseURL: 'http://localhost',
    url: '/test',
    headers: new AxiosHeaders(),
    ...overrides,
  } as InternalAxiosRequestConfig
}

describe('network/client', () => {
  const requestUse = mockAxiosInstance.interceptors?.request?.use as jest.Mock
  const responseUse = mockAxiosInstance.interceptors?.response?.use as jest.Mock
  const getMock: any = mockAxiosInstance.get
  const postMock: any = mockAxiosInstance.post
  const putMock: any = mockAxiosInstance.put
  const deleteMock: any = mockAxiosInstance.delete
  let consoleSpy: jest.SpiedFunction<typeof console.log>

  beforeEach(() => {
    getMock.mockReset()
    postMock.mockReset()
    putMock.mockReset()
    deleteMock.mockReset()
    mockedI18next.t.mockImplementation((key: string) => key)
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined)
    jest.spyOn(Date, 'now').mockReturnValue(1000)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('registers one request and one response interceptor', () => {
    expect(requestUse).toHaveBeenCalledTimes(1)
    expect(responseUse).toHaveBeenCalledTimes(1)
    expect(requestInterceptors).toHaveLength(1)
    expect(responseInterceptors).toHaveLength(1)
  })

  it('attaches metadata and logs requests', () => {
    const config = makeRequestConfig({
      method: 'post',
      params: {q: 'hello'},
    })
    ;(config as any).data = {body: true}

    const returned = requestInterceptors[0].fulfilled(config)

    expect(returned).toBe(config)
    expect((returned as any).metadata).toEqual({startTime: 1000})
    expect(consoleSpy).toHaveBeenCalledWith('[API][Request] POST http://localhost/test', JSON.stringify({params: {q: 'hello'}, data: {body: true}}))
  })

  it('normalizes error payloads from nested data and response codes', async () => {
    const error = {
      config: {...makeRequestConfig(), metadata: {startTime: 1000}},
      response: {
        status: 422,
        data: {
          data: {
            message: 'Nested message',
            responseCode: '1234',
            translationLabel: 'err_nested',
          },
        },
      },
      message: 'Unprocessable',
    }

    await expect(responseInterceptors[0].rejected(error)).rejects.toEqual(
      expect.objectContaining({
        status: 422,
        message: 'Nested message',
        responseCode: 1234,
        translationLabel: 'err_nested',
      }),
    )
  })

  it('uses translated text when i18next returns a different string', async () => {
    mockedI18next.t.mockReturnValueOnce('Translated error text')

    const error = {
      config: makeRequestConfig(),
      response: {
        status: 500,
        data: {
          message: 'Server error',
          translationLabel: 'err_server',
        },
      },
      message: 'Internal Server Error',
    }

    await expect(responseInterceptors[0].rejected(error)).rejects.toEqual(
      expect.objectContaining({
        message: 'Translated error text',
        translationLabel: 'err_server',
      }),
    )
  })

  it('uses the HttpClient contract for the wrapper methods', async () => {
    getMock.mockResolvedValueOnce({data: {id: 1}})
    postMock.mockResolvedValueOnce({data: {id: 2}})
    putMock.mockResolvedValueOnce({data: {id: 3}})
    deleteMock.mockResolvedValueOnce({data: {deleted: true}})

    await expect(httpClient.get('/users/1')).resolves.toEqual({id: 1})
    await expect(httpClient.post('/users', {name: 'Alice'})).resolves.toEqual({
      id: 2,
    })
    await expect(httpClient.put('/users/1', {name: 'Bob'})).resolves.toEqual({
      id: 3,
    })
    await expect(httpClient.delete('/users/1')).resolves.toEqual({
      deleted: true,
    })

    expect(getMock).toHaveBeenCalledWith('/users/1', undefined)
    expect(postMock).toHaveBeenCalledWith('/users', {name: 'Alice'}, undefined)
    expect(putMock).toHaveBeenCalledWith('/users/1', {name: 'Bob'}, undefined)
    expect(deleteMock).toHaveBeenCalledWith('/users/1', undefined)
  })
})
