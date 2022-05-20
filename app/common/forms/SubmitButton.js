import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";
import colors from "../../config/colors";

function SubmitButton({
  title,
  icon,
  color,
  notifySubmit,
  navTo,
  width = 140,
}) {
  const { handleSubmit } = useFormikContext();
  return (
    <Button
      title={title}
      icon={icon}
      bgColor={colors.modal}
      color={colors.green}
      borderOnly={true}
      width={width}
      onPress={() => {
        handleSubmit();
        if (notifySubmit) notifySubmit(navTo);
      }}
    />
  );
}

export default SubmitButton;
