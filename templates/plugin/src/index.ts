import { Plugin, Payload } from 'payload'

export type ExamplePluginOptions = {
  disabled?: boolean
}

export const examplePlugin: Plugin = (config) => {
  if (!config.collections) {
    config.collections = []
  }

  config.collections.push({
    slug: 'plugin-collection',
    fields: [
      {
        type: 'text',
        name: 'dynamicSelect',
        required: true,
      },
    ],
  })

  if (!config.endpoints) {
    config.endpoints = []
  }

  config.endpoints.push({
    method: 'get',
    path: '/get-select-options',
    handler: async (req) => {
      return Response.json({
        options: ['A', 'B', 'C'],
      })
    },
  })

  const incomingOnInit = config.onInit

  config.onInit = async (payload) => {
    if (incomingOnInit) {
      await incomingOnInit(payload)
    }

    payload.logger.info(`Example plugin has been initialized`)
  }

  return config
}
