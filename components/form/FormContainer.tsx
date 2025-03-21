"use client";

import { useActionState } from "react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { actionFunction } from "@/utils/types";

const initialState = {
  message: "",
  shouldDisableButton: false,
};

function FormContainer({
  action,
  children,
  callback,
}: {
  action: actionFunction;
  children: React.ReactNode;
  callback?: () => void;
}) {
  const [state, formAction] = useActionState(action, initialState);


  
  const { toast } = useToast();
  useEffect(() => {
    if (state?.message) {
      toast({ description: state.message });
    }
    if (state?.shouldDisableButton) {
      console.log('im using the callback'),
      //If you ever need to disable a button, add the shouldDisableButton object property in the return statement of the action,
      callback?.()
    }
  }, [state]);
  return <form action={formAction}>{children}</form>;
}
export default FormContainer;
