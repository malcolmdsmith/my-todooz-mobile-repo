import React from "react";
import { useFormik, useFormikContext } from "formik";

import Button from "../Button";
import colors from "../../config/colors";

function ResetButton({ title }) {
  const { handleReset } = useFormikContext();

  return (
    <Button
      title={title}
      bgColor={colors.modal}
      color={colors.red}
      borderOnly={true}
      onPress={handleReset}
    />
  );
}

export default ResetButton;
