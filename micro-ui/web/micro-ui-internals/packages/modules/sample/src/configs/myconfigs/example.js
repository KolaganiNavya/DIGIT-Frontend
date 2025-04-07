import { value } from "jsonpath";

export const exConfig = [
    {
        head: "APPLICATION DETAILS",
        body: [
            {
                inline: true,
                label: "Name",
                isMandatory: true,
                type: "text",
                disable: false,
                placeholder: "Enter the name",
                populators: {
                    pattern: /^[A-Za-z]+$/i,
                    name: "name",
                    error: "Required"
                },
            },
            {
                inline: true,
                label: "date of birth",
                isMandatory: false,
                type: "date",
                disable: false,
                populators: {
                    name: "dob",
                },
            },
            {
                inline: true,
                label: "Phone Number",
                isMandatory: true,
                type: "number",
                disable: false,
                description: "",
                populators: {
                    name: "phn",
                    validation: {
                        pattern: /^[0-9]+$/i,
                        maxlength: 10,
                    },
                    error: "required",
                    prefix: "+91",
                },
            },
            {
                isMandatory: true,
                type: "dropdown",
                key: "genders",
                label: "Gender",
                disable: false,
                populators: {
                    name: "gender",
                    optionsKey: "name",
                    error: "Gender is required message",
                    required: true,
                    // options: [
                    //     {
                    //         code: "male",
                    //         name: "Male"
                    //     },
                    //     {
                    //         code: "female",
                    //         name: "female"
                    //     }, {
                    //         code: "other",
                    //         name: "Other"
                    //     }
                    // ],
                    mdmsConfig: {
                        masterName: "GenderType",
                        moduleName: "common-masters",
                        localePrefix: "COMMON_GENDER",
                    },
                },
            },
            {
                inline: true,
                label: "feedback",
                isMandatory: false,
                type: "textarea",
                disable: false,
                charCount: true,
                infoMessage: "feedback",
                //withoutLabel: true,
                //does not display label
                populators: {
                    name: "feedback",
                    validation: {
                        maxlength: 100,
                        wrapLabel: true, //wrap of label
                    },
                },
            },
        ],
    },
    {
        head: "ADDRESS",
        body: [
            {
                inline: true,
                label: "location",
                isMandatory: false,
                description: "",
                type: "geolocation",
                disable: false,
                populators: {
                    name: "location",
                    error: "Error!"
                },
            },
            {
                inline: true,
                label: "Address1",
                isMandatory: true,
                type: "text",
                disable: false,
                charCount: true,
                populators: {
                    validation: {
                        maxlength: 15,
                    },
                    name: "address1",
                    error: "Required"
                },
            },
            {
                inline: true,
                label: "Address2",
                isMandatory: false,
                type: "text",
                disable: false,
                charCount: true,
                populators: {
                    validation: {
                        maxlength: 15,
                    },
                    name: "address2",
                },
            },
            {
                inline: true,
                label: "Pincode",
                isMandatory: false,
                type: "number",
                disable: false,
                populators: {
                    name: "pincode",
                    error: "Error!"
                },
            },
        ],
    },
    {
        head: "ADDITIONAL DETAILS",
        body: [
            {
                isMandatory: false,
                key: "emptype",
                type: "radio",
                label: "Employement type",
                disable: false,
                populators: {
                    name: "emptype",
                    optionsKey: "name",
                    required: false,
                    options: [
                        {
                            code: "1",
                            name: "Full Time",
                        },
                        {
                            code: "2",
                            name: "Part Time",
                        },
                    ],
                },
            },
            {
                inline: true,
                isMandatory: true,
                type: "checkbox",
                disable: false,
                withoutLabel: true,
                populators: {
                    name: "tandc",
                    error: "Required",
                    title: "i accept the terms and conditions"
                },
            },
        ],
    },
]