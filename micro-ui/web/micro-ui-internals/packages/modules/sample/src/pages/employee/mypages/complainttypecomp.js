import { Button, Dropdown, LabelFieldPair, TextInput, CustomSVG, Card,HeaderComponent } from "@egovernments/digit-ui-components";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ComplaintType = ({ onSelect, ...props }) => {
  const { t } = useTranslation();

  // state for storing data
  const [documentData, setDocumentData] = useState([
    {
      key: 1,
      code: null,
      names: null,
    },
  ]);

  // fn to update the value based on type. 
  const handleUpdateField = ({ type, value, item, index }) => {
    switch (type) {
      case "TYPE":
        setDocumentData((prev) => {
          return prev?.map((i, n) => {
            if (i.key === item.key) {
              return {
                ...i,
                code: value,
              };
            }
            return i;
          });
        });
        break;
      case "VALUE":
        setDocumentData((prev) => {
          return prev?.map((i, n) => {
            if (i.key === item.key) {
              return {
                ...i,
                names: value,
              };
            }
            return i;
          });
        });
        break;
      default:
        break;
    }
  };

  //fn to add more field
  const add = () => {
    setDocumentData((prev) => [
      ...prev,
      {
        key: prev?.length + 1,
        code: null,
        names: null,
      },
    ]);
  };
  //fn to delete field
  const deleteItem = (data) => {
    const fil = documentData.filter((i) => i.key !== data.key);
    const up = fil.map((item, index) => ({ ...item, key: index + 1 }));
    setDocumentData(up);
  };

  // when doc update calling onselect for update the value in formdata
  useEffect(() => {
    onSelect("complaintType", documentData);
  }, [documentData]);
  
  return (
    <>
      {documentData?.map((item, index) => (
        <Card type="secondary" style={{ marginBottom: "1.5rem",gap:"1.5rem"}}>
          {documentData?.length > 1 ? (
            <div className="delete-resource-icon" style={{ textAlign: "right" }} onClick={() => deleteItem(item, index)}>
              <CustomSVG.DustbinIcon />
            </div>
          ) : null}
          <LabelFieldPair removeMargin={true}>
            <HeaderComponent className={`label`}>
              <div className={`label-container`}>
                <label className={`label-styles`}>{`${t("Code")}`}</label>
              </div>
            </HeaderComponent>
            <TextInput
              name="code"
              value={item?.code || ""}
              onChange={(event) => handleUpdateField({ type: "TYPE", value: event.target.value, item: item, index: index })}
            />
          </LabelFieldPair>
          <LabelFieldPair removeMargin={true}>
            <HeaderComponent className={`label`}>
              <div className={`label-container`}>
                <label className={`label-styles`}>{`${t("Name")}`}</label>
              </div>
            </HeaderComponent>
            <TextInput
              name="name"
              value={item?.names || ""}
              onChange={(event) => handleUpdateField({ type: "VALUE", value: event.target.value, item: item, index: index })}
            />
          </LabelFieldPair>
        </Card>
      ))}
      <Button variation="secondary" label={t(`Add more`)} className={""} icon={"AddIconNew"} onClick={add} style={{ marginLeft: "auto" }} />
    </>
  );
};

export default ComplaintType;
