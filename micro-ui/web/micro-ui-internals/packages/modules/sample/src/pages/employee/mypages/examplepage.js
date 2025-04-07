import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FormComposerV2, HeaderComponent, Toast } from "@egovernments/digit-ui-components";
import { exConfig } from "../../../configs/myconfigs/example";

const MyCreate = () => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  
  const defaultvalues={
    name:"",
    dob:"2003-04-03",
    phn:"",
    gender:{code: 'FEMALE', active: true, name: 'COMMON_GENDER_FEMALE'},
    feedback:"",
    geolocation:undefined,
    address1:"",
    address2:"",
    pincode:undefined,
    emptype:{code: '2', name: 'Part Time'},
    tandc:false,
  }
  
  const { t } = useTranslation();

  const onSubmit = async (data) => {
    console.log(data, "data"); 
  };

  return (
    <div>
      <HeaderComponent className="digit-inbox-search-composer-header" styles={{ marginBottom: "1.5rem" }}>
          {t("_CREATE_")}
        </HeaderComponent>
      <FormComposerV2
        label={t("SUBMIT_BUTTON")}
        config={exConfig.map((config) => ({
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

export default MyCreate;
