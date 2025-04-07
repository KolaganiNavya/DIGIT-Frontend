export const generateConfigFromSchema = (schema) => {
    const config = [];
  
    // Iterate over properties in the schema
    for (const [key, value] of Object.entries(schema.properties)) {
      let configField = {
        label: key,
        type: value.type,
        isMandatory: schema.required?.includes(key) || false,
        disable: false,
        description: value.description || '',
        populators: {
          name: key,
          error: schema.required?.includes(key) ? "required" : "",
        }
      };
  
      // Handle different field types
      switch (value.type) {
        case 'string':
          // String-specific options
          if (value.maxLength) configField.populators.maxlength = value.maxLength;
          if (value.minLength) configField.populators.minlength = value.minLength;
          if (value.pattern) configField.populators.pattern = value.pattern;
          if (value.enum) {
            // Convert enum to dropdown options
            configField.type = 'dropdown';
            configField.populators.options = value.enum.map(option => ({
              code: option,
              name: option
            }));
          }
          break;
  
        case 'number':
          // Number-specific options
          if (value.pattern) configField.populators.pattern = value.pattern;
          if (value.minimum !== undefined) configField.populators.min = value.minimum;
          if (value.maximum !== undefined) configField.populators.max = value.maximum;
          break;
  
        case 'boolean':
          // Boolean becomes a checkbox or toggle
          configField.type = 'checkbox';
          break;
  
        case 'array':
          // Array handling
          configField.populators.minItems = value.minItems || 0;
          
          if (value.items?.type === 'object') {
            // Array of objects - create nested form
            configField.type = 'nestedArray';
            configField.body = generateConfigFromSchema({
              properties: value.items.properties,
              required: value.items.required || []
            });
          } else {
            // Array of primitives - use multi-select or repeatable fields
            configField.type = 'multiselect';
            if (value.items?.enum) {
              configField.populators.options = value.items.enum.map(option => ({
                code: option,
                name: option
              }));
            }
          }
          break;
  
        case 'object':
          // Nested object becomes a fieldset
          configField.type = 'fieldset';
          configField.body = generateConfigFromSchema({
            properties: value.properties,
            required: value.required || []
          });
          break;
  
        default:
          // Unknown type - keep as is
          break;
      }

  
      config.push(configField);
    }
  
    return config;
  };