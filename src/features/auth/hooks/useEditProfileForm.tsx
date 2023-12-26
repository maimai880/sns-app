import {UserInSession} from "@/lib/next-auth"
import {useRouter} from "next/navigation"
import {Controller, ControllerRenderProps, useForm} from "react-hook-form"
import {initProfile} from "@/features/auth/api/initProfile"
import {omit} from "@/util/omit"
import {file2DataUrl} from "@/util/file2DataUrl"
import {FC} from "react"

export const useEditProfileForm = (user: UserInSession) => {
  const router = useRouter()

  const {control, handleSubmit} = useForm({
    defaultValues: {
      image: "",
      name: user.name,
      bio: user.bio || "",
      isPrivate: user.isPrivate,
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    await initProfile({
      id: user.id,
      data,
      onSuccess: () => router.push("/home"),
      onFail: alert
    })
  })

  return {
    onSubmit,
    ImageInput: ({render}: {
      render: FC<{
        imageSrc: string,
        inputProps: Partial<React.InputHTMLAttributes<HTMLInputElement>>
      }>
    }) => (
      <Controller
        control={control}
        name="image"
        render={(p) => <>{
          render({
            imageSrc: p.field.value || user.image,
            inputProps: {
              accept: "image/*",
              ...omit(p.field, ["value"]),
              onChange: async (e) => {
                if (!e.target.files?.[0]) return
                if (e.target.files[0].size > 1024 * 1024 * 2) return alert("2MB以下の画像を選択してください")

                p.field.onChange(await file2DataUrl(e.target.files[0]))
              }
            }
          })}</>}
      />
    ),
    NameInput: ({render}: {
      render: FC<{
        field: ControllerRenderProps<{ image: string, name: string, bio: string, isPrivate: boolean }, "name">
      }>
    }) => (
      <Controller
        control={control}
        name="name"
        render={(p) => <>{render({field: p.field})}</>}
      />
    ),
    BioInput: ({render}: {
      render: FC<{
        field: ControllerRenderProps<{ image: string, name: string, bio: string, isPrivate: boolean }, "bio">
      }>
    }) => (
      <Controller
        control={control}
        name="bio"
        render={(p) => <>{render({field: p.field})}</>}
      />
    ),
    IsPrivateInput: ({render}: {
      render: FC<{
        field: ControllerRenderProps<{ image: string, name: string, bio: string, isPrivate: boolean }, "isPrivate">
      }>
    }) => (
      <Controller
        control={control}
        name="isPrivate"
        render={(p) => <>{render({field: p.field})}</>}
      />
    ),
  }
}

