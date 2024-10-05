import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ErrorAlert = ({ message }) => {
  return (
    <Alert variant="destructive">
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
