import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { FormComposerV2, HeaderComponent, Toast } from "@egovernments/digit-ui-components";
import { asconfig } from "../../../configs/myconfigs/assignment";
import {transformASSIGNdata} from "../../../utils/createUtils";
import { generateConfigFromSchema } from "../../../utils/myutils/asssign_util";

const MyAssign = () => {
  // const tenantId = Digit.ULBService.getCurrentTenantId();
  
  // const defaultvalues={
  // }
  
  // const { t } = useTranslation();

  // const onSubmit = async (data) => {
  //   console.log(data, "data"); 
  // };
   const schema=
    {
      "type": "object",
      "title": "Assignment.PGRAPPLY",
      "$schema": "http://json-schema.org/draft-07/schema#",
      "required": [
          "citizenMobileNumber",
          "citizenName",
          //"complaintType",
          "complaintLocation",
      ],
      "x-unique": [
          "citizenMobileNumber"
      ],
      "properties": {
          "citizenName": {
              "type": "string",
              "maxLength": 100,
              "minLength": 5,
              "description": "Citizen name must be between 5 and 100 characters."
          },
          // "complaintType": {
          //     "type": "array",
          //     "items": {
          //         "type": "object",
          //         "required": [
          //             "code",
          //             "name"
          //         ],
          //         "properties": {
          //             "code": {
          //                 "type": "string"
          //             },
          //             "name": {
          //                 "type": "string"
          //             }
          //         }
          //     },
          //     "minItems": 1,
          //     "description": "List of complaint types with code and name."
          // },
          "pictureUpload": {
              "type": "object",
              "properties": {
                  "type": {
                      "enum": [
                          "documentUpload"
                      ],
                      "type": "string"
                  }
              },
              "description": "Picture upload field, type must be 'documentUpload'."
          },
          "complaintLocation": {
              "type": "object",
              "required": [
                  "pincode",
                  "city",
                  "landmark",
                  "address"
              ],
              "properties": {
                  "city": {
                      "type": "string"
                  },
                  "address": {
                      "type": "string"
                  },
                  "pincode": {
                      "type": "number"
                  },
                  "landmark": {
                      "type": "string"
                  }
              },
              "description": "Details of the complaint location."
          },
          "citizenMobileNumber": {
              "type": "number",
              "pattern": "^\\d{10}$",
              "description": "Citizen mobile number must be a 10-digit number."
          }
      },
      "additionalProperties": false
    };

  const assconfig=generateConfigFromSchema(schema);
  console.log(assconfig,"ABC");

  const tenantId = Digit.ULBService.getCurrentTenantId();
  
  const defaultvalues={
  }
  
  // Hook for handling translations
  const { t } = useTranslation();
  
  // React Router history for navigation
  const history = useHistory();
  
  // API request configuration for employee creation
  const reqCreate = {
    url: `/egov-mdms-service/v2/_create/Assignment.PGRAPPLY`, // API endpoint for creating an individual
    params: {},
    body: {},
    config: {
      enable: true, // Enables the API call
    },
  };

  // Custom hook for handling API mutation requests
  const mutation = Digit.Hooks.useCustomAPIMutationHook(reqCreate);

  // Function to handle form submission
  const onSubmit = async (data) => {
    console.log(data, "data"); // Debug log of submitted form data

    await mutation.mutate(
      {
        url: `/egov-mdms-service/v2/_create/Assignment.PGRAPPLY`,
        params: { tenantId }, // Include tenant ID in API request
        body: transformASSIGNdata(data), // Transform data before sending to API
        config: {
          enable: true,
        },
      },
    );
  };

  return (
    <div>
      <HeaderComponent className="digit-inbox-search-composer-header" styles={{ marginBottom: "1.5rem" }}>
          {t("COMPLAINT DETAILS")}
        </HeaderComponent>
      <FormComposerV2
        label={t("SUBMIT_BUTTON")}
        config={assconfig.map((config) => ({
          ...config,
        }))}
        defaultValues={defaultvalues} 
        onFormValueChange={(setValue, formData, formState, reset, setError, clearErrors, trigger, getValues) => {
          console.log(formData, "formData");
        }}
        onSubmit={(data) => onSubmit(data)}
        fieldStyle={{ marginRight: 0 }}
      />
    </div>
  );
};

export default MyAssign;
