import {FC, useRef} from "react"
import {Button, Input, ButtonProps as KumaButtonProps} from "@kuma-ui/core"

/* inputやbuttonタグに渡せる属性の一覧 */
type NativeInputProps = React.InputHTMLAttributes<HTMLInputElement>;
type NativeButtonProps = KumaButtonProps;

/**
 * - input自体は常に非表示にするためstyleは指定不可とする
 * - refはボタンと紐付けるために使用するため指定不可する
 * - typeは`file`のみを受け付ける
 */
type InputProps = Omit<NativeInputProps, "type" | "style" | "ref">;
/**
 * - onClickはinputを発火するために使用するため指定不可とする
 */
type ButtonProps = Omit<NativeButtonProps, "onClick">;


type ButtonWithInputFileProps = ButtonProps & { inputProps: InputProps };

export const ButtonWithInputFile: FC<ButtonWithInputFileProps> =
  ({children, inputProps, ...buttonProps}) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    return (
      <>
        <Button
          {...buttonProps}
          type="button"
          onClick={() => fileInputRef.current?.click()}
        >
          {children}
        </Button>

        <Input {...inputProps} ref={fileInputRef} type="file" display="none"/>
      </>
    )
  }
