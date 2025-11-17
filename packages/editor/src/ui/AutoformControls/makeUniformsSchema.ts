/* eslint-disable @typescript-eslint/ban-types */

import Ajv from 'ajv';
// Import JSONSchemaBridge directly to avoid the 'require' issue in register.js
import JSONSchemaBridge from 'uniforms-bridge-json-schema/esm/JSONSchemaBridge.js';
import type { DataTType, JsonSchema } from '../../core/types';

const ajv = new Ajv({ allErrors: true, useDefaults: true });
ajv.addKeyword('uniforms');

function createValidator<T extends DataTType>(schema: JsonSchema<T>) {
  const validator = ajv.compile(schema);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (model: any) => {
    validator(model);
    if (validator.errors && validator.errors.length) {
      return validator.errors?.length ? { details: validator.errors } : null;
    }
  };
}

function makeUniformsSchema<T extends DataTType>(
  jsonSchema: Omit<JsonSchema<T>, 'type'>
) {
  const fullSchema: JsonSchema<T> = {
    type: 'object',
    ...jsonSchema,
  };
  const validator = createValidator(fullSchema);
  const bridge = new JSONSchemaBridge({ schema: fullSchema, validator });

  // see https://github.com/react-page/react-page/issues/1187
  // we remap props.component to props._customComponent to avoid the underlying issue in uniforms
  //
  const getPropsOrg = bridge.getProps;
  bridge.getProps = function (name: string) {
    const { component, options, ...props } = getPropsOrg.call(this, name);

    // Map enum to allowedValues for SelectField compatibility
    if (options && !props.allowedValues) {
      props.allowedValues = options.map((opt: any) =>
        typeof opt === 'object' ? opt.value : opt
      );

      // If options have labels, create a transform function
      if (options.length > 0 && typeof options[0] === 'object' && options[0].label) {
        const optionsMap = new Map(
          options.map((opt: any) => [opt.value, opt.label])
        );
        props.transform = (value: string) => optionsMap.get(value) || value;
      }
    }

    if (component) {
      return {
        _customComponent: component,
        ...props,
      };
    }
    return props;
  };
  return bridge;
}

export default makeUniformsSchema;
