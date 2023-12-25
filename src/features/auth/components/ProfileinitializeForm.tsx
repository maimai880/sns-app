"use client"

import {Box, Button, Image, Input, Spacer, Text, VStack} from "@kuma-ui/core"
import {FC} from "react"
import AddAPhotoIcon from "$/icon/add_a_photo_FILL0_wght300_GRAD-25_opsz24.svg"
import {useRouter} from "next/navigation"
import {UserInSession} from "@/types/session"
import {Controller, useForm} from "react-hook-form"
import {ButtonWithInputFile} from "@/components/ButtonWithFileInput"
import {omit} from "@/util/omit"
import {file2DataUrl} from "@/util/file2DataUrl"

interface Props {
  user: UserInSession
}

export const ProfileInitializeForm: FC<Props> = (props) => {
  const router = useRouter()

  const {control, handleSubmit} = useForm({
    defaultValues: {
      image: "",
      name: props.user.name,
      bio: props.user.bio || "",
      isPrivate: props.user.isPrivate,
    },
  })

  const onSubmit = handleSubmit((data) => {
    fetch(`/api/users/${props.user.id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: data.name,
        image: data.image || undefined,
        bio: data.bio,
        isPrivate: data.isPrivate,
        finishInit: true,
      })
    }).then(res => res.json()).then(res => {
      console.log(res)
      router.push("/home")
    }).catch(alert)
  })

  return (
    <VStack
      as="form"
      onSubmit={onSubmit}
      alignItems="center"
      width="45%"
    >
      <Controller
        control={control}
        name="image"
        render={(p) =>
          <Box position="relative" width="30%" aspectRatio={1}>
            <Image
              src={p.field.value || props.user.image}
              alt="profile image"
              width="100%"
              aspectRatio={1}
              outline="1px solid"
              outlineColor="colors.border"
              borderRadius="100%"
            />

            <ButtonWithInputFile
              inputProps={{
                accept: "image/*",
                ...omit(p.field, ["value"]),
                onChange: async (e) => {
                  if (!e.target.files?.[0]) return
                  if (e.target.files[0].size > 1024 * 1024 * 2) return alert("2MB以下の画像を選択してください")

                  p.field.onChange(await file2DataUrl(e.target.files[0]))
                }
              }}
              position="absolute"
              right={0}
              bottom={0}
              p={4}
              pl={8}
              width="25%"
              height="25%"
              bg="rgba(0,0,0,0.5)"
              borderRadius="100%"
              border="none"
              transition=".3"
              _hover={{transform: "scale(1.1)"}}
            >
              <AddAPhotoIcon size="small" fill="white" width="100%" height="100%"/>
            </ButtonWithInputFile>
          </Box>
        }
      />

      <Spacer height={8}/>

      <VStack
        width="100%"
        alignItems="flex-start"
      >
        <Text as="label">表示名</Text>
        <Spacer height={4}/>
        <Controller
          control={control}
          name="name"
          render={(p) =>
            <Input
              {...p.field}
              placeholder="表示名を入力してください"
              width="100%"
              height={40}
              fontSize="fontSizes.md"
            />
          }
        />

        <Spacer height={16}/>

        <Text as="label">自己紹介</Text>
        <Spacer height={4}/>
        <Controller
          control={control}
          name="bio"
          render={(p) =>
            <Input
              {...p.field}
              as="textarea"
              placeholder="自己紹介を入力してください"
              width="100%"
              height={120}
              fontSize="fontSizes.md"
              resize="none"
            />
          }
        />

        <Spacer height={16}/>

        <Controller
          control={control}
          name="isPrivate"
          render={(p) =>
            <Text as="label" htmlFor="checkbox" userSelect="none" cursor="pointer">
              {/* @ts-ignore*/}
              <Input
                {...p.field}
                type="checkbox"
                id="checkbox"
                width={12}
                aspectRatio={1}
                transform="scale(1.5)"
              />
              <Spacer width={8} horizontal/>
              非公開アカウント
            </Text>
          }
        />

        <Spacer height={40}/>

        <Button
          type="submit"
          variant="primary"
          alignSelf="center"
          py={14}
          width="45%"
          fontSize="fontSizes.md"
        >
          プロフィールを保存
        </Button>
      </VStack>
    </VStack>
  )
}
