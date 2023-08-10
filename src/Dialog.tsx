import {
  useRef,
  useCallback,
  ReactNode,
  HTMLProps,
  ButtonHTMLAttributes,
  useEffect,
} from "react";
import { DialogContext, useDialogContext } from "./shared";
import { Button, View } from "@aws-amplify/ui-react";
interface DialogProvider {
  children: ReactNode;
}

export function DialogProvider({
  children,
}: DialogProvider & React.HTMLProps<HTMLDialogElement>) {
  const ref = useRef<HTMLDialogElement>(null);
  const openDialog = useCallback(() => {
    if (ref.current) {
      ref.current.showModal();
    }
  }, [ref]);
  const closeDialog = useCallback(() => {
    if (ref.current) {
      ref.current.close();
    }
  }, [ref]);

  return (
    <DialogContext.Provider
      value={{
        dialogRef: ref,
        openDialog,
        closeDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

export function DialogElement({
  children,
  initialOpen,
  ...dialogElementProps
}: {
  children: ReactNode;
  initialOpen?: boolean;
} & HTMLProps<HTMLDialogElement>) {
  const { dialogRef, openDialog, closeDialog } = useDialogContext();
  useEffect(() => {
    if (initialOpen && openDialog && closeDialog) {
      closeDialog();
      openDialog();
    }
  }, [initialOpen, openDialog, closeDialog]);

  return (
    <View
      as="dialog"
      backgroundColor="background.primary"
      ref={dialogRef}
      {...dialogElementProps}
    >
      {children}
    </View>
  );
}

export function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <form method="dialog">
      <Button type="submit">{children}</Button>
    </form>
  );
}

export function OpenerButton(
  buttonElementProps: ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { openDialog } = useDialogContext();

  return <Button {...buttonElementProps} onClick={openDialog} />;
}

export const Dialog: {
  Provider: typeof DialogProvider;
  Element: typeof DialogElement;
  OpenerButton: typeof OpenerButton;
  SubmitButton: typeof SubmitButton;
} = {
  Provider: DialogProvider,
  Element: DialogElement,
  OpenerButton,
  SubmitButton,
};
