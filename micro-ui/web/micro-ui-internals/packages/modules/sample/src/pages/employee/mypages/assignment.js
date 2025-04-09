import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { FormComposerV2, HeaderComponent, Toast } from "@egovernments/digit-ui-components";
import { transformASSIGNdata } from "../../../utils/createUtils";
import { schema } from "../../../utils/myutils/schema";
import { generateConfigFromSchema } from "../../../utils/myutils/asssignutil";

const MyAssign = () => {

  const assconfig = generateConfigFromSchema(schema);
  console.log(assconfig);

  const tenantId = Digit.ULBService.getCurrentTenantId();

  const defaultvalues = {
    type: { code: 'documentUpload', name: 'documentUpload' },
  }

  // Hook for handling translations
  const { t } = useTranslation();

  // React Router history for navigation
  const history = useHistory();

  const [showToast, setShowToast] = useState(null);

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
      {
        // Handle success response
        onSuccess: (data) => {
          setShowToast({ key: "success", label: "Complaint Filed Successfully" });
        },
        // Handle error response
        onError: (error) => {
          setShowToast({ key: "error", label: "Can't file the Complaint" });
        },
      }
    );
  };

  return (
    <div>
      <HeaderComponent className="digit-inbox-search-composer-header" styles={{ marginBottom: "1.5rem" }}>
        {t("COMPLAINT DETAILS")}
      </HeaderComponent>
      <FormComposerV2
        label={t("SUBMIT_BUTTON")}
        config={generateConfigFromSchema(schema).map((config) => ({
          ...config,
        }))}
        defaultValues={defaultvalues}
        onFormValueChange={(setValue, formData, formState, reset, setError, clearErrors, trigger, getValues) => {
          console.log(formData, "formData");
        }}
        onSubmit={(data) => onSubmit(data)}
        fieldStyle={{ marginRight: 0 }}
      />
      {showToast && (
        <Toast
          style={{ zIndex: 10001 }}
          label={showToast.label}
          type={showToast.key}
          error={showToast.key === "error"}
          onClose={() => setShowToast(null)}
        />
      )}

    </div>

  );
};

export default MyAssign;
