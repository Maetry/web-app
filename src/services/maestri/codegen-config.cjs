// @ts-check
// Plain CommonJS so the codegen CLI loads it with a bare Node `require()` —
// no TS loader (esbuild-runner / ts-node) involved, nothing to break.
// Type-checked in editors via the JSDoc annotation below.

/** @type {import('@rtk-query/codegen-openapi').ConfigFile} */
const config = {
  schemaFile: 'openapi.yaml',
  apiFile: './reducer.ts',
  apiImport: 'api',
  outputFile: 'api-generated.ts',
  exportName: '_api',
  hooks: true,
  tag: true,
  endpointOverrides: [
    {
      pattern: /.*/,
      parameterFilter: (paramName, parameter) =>
        !(parameter.in === 'header' && paramName === 'Device-ID'),
    },
  ],
};

module.exports = config;
