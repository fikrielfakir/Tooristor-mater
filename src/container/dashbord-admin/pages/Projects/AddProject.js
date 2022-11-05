import React from "react";
import { Loader, Steps, Panel, Placeholder, ButtonGroup, Button } from 'rsuite';
import { useState, useEffect } from 'react';
import AddUser from "./AddUser"
import AddShop from "./Addshop"
import { useTranslation } from 'react-i18next';

const AdminProducts = () => {
  const {t} = useTranslation();
  const [step, setStep] = useState(0);
  const onChange = nextStep => {
    setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
  };

  const onNext = () => onChange(step + 1);
  const onPrevious = () => onChange(step - 1);

  return (
    <div>
      <Steps current={step}>
        <Steps.Item title={t("Add_Owner")} />
        <Steps.Item title={t("Add_Shop")} />
        <Steps.Item title={t("Add_Staf")} />
      </Steps>
      <hr />

      {step + 1 === 1 && (
        <Panel header={t("CREATE_ACCOUNT_OWNER")}>
<AddUser/>
        </Panel>
      )}
      {step + 1 === 2 && (
         <Panel header={t("CREATE_SHOP")}>
         <AddShop/>
        </Panel>
      )}
      {step + 1 === 3 && (
       <Panel header={t("CREATE_ACCOUNT_STAFF")}>
          <h1>{t("Comming_soon")}</h1>
        </Panel>
      )}
      <hr />
      <ButtonGroup>
        <Button onClick={onPrevious} disabled={step === 0}>
          {t("Previous")}
        </Button>
        <Button onClick={onNext} disabled={step === 3}>
          {t("Next")}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default AdminProducts;
