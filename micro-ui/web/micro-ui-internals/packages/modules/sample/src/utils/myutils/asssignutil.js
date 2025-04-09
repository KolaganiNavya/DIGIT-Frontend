export const generateConfigFromSchema = (schema, isre = false) => {
  const config = [];

  for (const [key, value] of Object.entries(schema.properties)) {

    let configField =
    {
      label: key,
      type: value.type,
      isMandatory: schema.required?.includes(key) || false,
      disable: false,
      description: value.description || '',
      populators: {
        name: key,
        error: schema.required?.includes(key) ? "required" : "",
        validation: {},
      }
    };

    if (key == "complaintType") {
      configField.type = "component",
      configField.key = key,
      configField.component = "TypeComponent",
      configField.withoutLabel = true,
      configField.customProps = {}
    }
    else {
      switch (value.type) {
        
        case 'string':
          configField.type = 'text';
          if (value.maxLength) configField.populators.validation.maxlength = value.maxLength;
          if (value.minLength) configField.populators.validation.minlength = value.minLength;
          if (value.pattern) configField.populators.validation.pattern = value.pattern;

          if (value.enum) {
            configField.type = 'dropdown';
            configField.key = key;
            configField.populators.optionsKey = "name";
            configField.populators.options = value.enum.map(option => ({
              code: option,
              name: option
            }));
          }
          break;

        case 'number':
          if (value.pattern) configField.populators.validation.pattern = value.pattern;
          if (value.minimum !== undefined) configField.populators.validation.min = value.minimum;
          if (value.maximum !== undefined) configField.populators.validation.max = value.maximum;
          break;

        case 'boolean':
          configField.type = 'checkbox';
          break;

        case 'array':
          if (value.items?.type === 'object') {
            configField.type = 'nestedArray';
            configField.body = generateConfigFromSchema({
              properties: value.items.properties,
              required: value.items.required || []
            }, true);
          }
          break;

        case 'object':
          configField = generateConfigFromSchema({
            properties: value.properties,
            required: value.required || []
          }, true);
          break;
      }
    }

    if (isre) {
      config.push(configField);
    }
    else {
      if (value.type == "string" || value.type == "number" || value.type == "boolean" || key == "complaintType") {
        let configBody = {
          head: key.replace(/([a-z])([A-Z])/g, "$1 $2").toUpperCase(),
          body: [configField]
        }
        if (key == "complaintType") {
          configBody.key = key;
        }
        config.push(configBody);
      }
      else {
        let configBody = {
          head: key.replace(/([a-z])([A-Z])/g, "$1 $2").toUpperCase(),
          body: configField
        }
        config.push(configBody);
      }
    }
  }
  return config;
};