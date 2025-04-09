export const asconfig = [
    {
        head: "CITIZEN DETAILS",
        body: [
            {
                label: "Name",
                type: "text",
                isMandatory: true,
                disable: false,
                description: "Citizen name must be between 5 and 100 characters.",
                populators: {
                    name: "citizenName",
                    validation: {
                        maxlength: 100,
                        minlength: 5,
                    },
                    error: "required",
                }
            },
            {
                label: "Mobile Number",
                type: "mobileNumber",
                isMandatory: true,
                disable: false,
                description: "Citizen mobile number must be a 10-digit number.",
                populators: {
                    name: "citizenMobileNumber",
                    validation: {
                        pattern: "^\\d{10}$",
                    },
                    error: "Required"
                },
            },
        ]
    },
    {
        head: "COMPLAINT TYPE",
        key: "complainttype",
        body: [
            {
                isMandatory: true,
                key: "complainttype",
                type: "component", // Custom component rendering
                component: "TypeComponent",
                withoutLabel: true,
                disable: false,
                customProps: {},
                populators: { name: "complainttype", required: true },
            },
        ],
    },
    {
        head: "PICTURE UPLOAD",
        body: [
            {
                isMandatory: false,
                key: "docupload",
                type: "dropdown",
                label: "Picture Upload",
                disable: false,
                populators: {
                    name: "docupload",
                    optionsKey: "name",
                    required: false,
                    options: [
                        {
                            code: "1",
                            name: "documentUpload",
                        },
                    ],
                },
            },
        ]
    },
    {
        head: "LOCATION DETAILS",
        body: [
            {
                label: "Address",
                disable: false,
                isMandatory: true,
                type: "text",
                populators: {
                    name: "address",
                    error: "required",
                },
            },
            {
                label: "landmark",
                disable: false,
                isMandatory: true,
                disable: false,
                type: "text",
                populators: {
                    name: "landmark",
                    error: "required",
                },
            },
            {
                label: "city",
                disable: false,
                isMandatory: true,
                disable: false,
                type: "text",
                populators: {
                    name: "city",
                    error: "required",
                },
            },
            {
                label: "pincode",
                disable: false,
                isMandatory: true,
                disable: false,
                type: "number",
                populators: {
                    name: "pincode",
                    error: "required",
                },
            },
        ]
    },
]
