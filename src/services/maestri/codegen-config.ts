import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: 'openapi.json',
  apiFile: './reducer.ts',
  apiImport: 'api',
  outputFile: 'api-generated.ts',
  exportName: '_api',
  hooks: true,
  endpointOverrides: [
    {
      pattern: /.*/,
      parameterFilter: (paramName, parameter) =>
        !(parameter.in === 'header' && paramName === 'Device-ID'),
    },
  ],
};

export default config;
