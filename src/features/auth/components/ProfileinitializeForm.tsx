"use client"

import {Box, Button, Image, Input, Spacer, Text, VStack} from "@kuma-ui/core"
import {ChangeEventHandler, FC, useRef, useState} from "react"
import {User} from "@/prisma-types"
import AddAPhotoIcon from "$/icon/add_a_photo_FILL0_wght300_GRAD-25_opsz24.svg"
import {useForm} from "react-hook-form"
import {imageUrl2DataUrl} from "@/util/ImageUrl2DataUrl"
import {useRouter} from "next/navigation"

interface Props {
  user: User
}

export const ProfileInitializeForm: FC<Props> = (props) => {
  const router = useRouter()

  const [image, setImage] = useState(props.user.image || "")

  const imageFileInputRef = useRef<HTMLInputElement>(null)

  const handleImageFileSelect: ChangeEventHandler<HTMLInputElement> = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return console.error("Error: File not found.")
    if (file.size > 2 * 1024 * 1024) return console.error("Error: File size is too large.")

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = () => {
      const result = reader.result

      if (typeof result === "string") {
        setImage(result)
      } else {
        console.error("Error: File could not be converted to string.")
      }
    }
  }

  const {register, handleSubmit} = useForm<{
    name: string,
    bio: string,
    isPrivate: boolean
  }>()

  const onSubmit = handleSubmit(async (data) => {
    fetch(`/api/users/${props.user.id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: data.name,
        image: image.startsWith("http") ? await imageUrl2DataUrl(image) : image,
        bio: data.bio,
        isPrivate: data.isPrivate,
        finishInit: true,
      })
    }).then(res => res.json()).then(res => {
      console.log(res)
      router.push("/home")
    }).catch(console.error)
  })

  return (
    <>
      <input
        ref={imageFileInputRef}
        onChange={handleImageFileSelect}
        type="file"
        accept="image/*"
        style={{display: "none"}}
      />

      <VStack
        alignItems="center"
        width="45%"
      >
        <Box position="relative" width="30%" aspectRatio={1}>
          <Image
            src={image}
            alt="profile image"
            width="100%"
            aspectRatio={1}
            outline="1px solid"
            outlineColor="colors.border"
            borderRadius="100%"
          />

          <Button
            onClick={() => imageFileInputRef.current?.click()}
            position="absolute"
            right={0}
            bottom={0}
            p={4}
            pl={6}
            width="25%"
            height="25%"
            bg="rgba(0,0,0,0.5)"
            borderRadius="100%"
            transition=".3"
            _hover={{transform: "scale(1.1)"}}
          >
            <AddAPhotoIcon size="small" fill="white" width="100%" height="100%"/>
          </Button>
        </Box>

        <Spacer height={8}/>

        <VStack
          as="form"
          onSubmit={onSubmit}
          width="100%"
          alignItems="flex-start"
        >
          <Text as="label">表示名</Text>
          <Spacer height={4}/>
          <Input
            {...register("name")}
            placeholder="表示名を入力してください"
            defaultValue={props.user.name || ""}
            width="100%"
            height={40}
            fontSize="fontSizes.md"
          />

          <Spacer height={16}/>

          <Text as="label">自己紹介</Text>
          <Spacer height={4}/>
          <Input
            as="textarea"
            {...register("bio")}
            placeholder="自己紹介を入力してください"
            defaultValue={props.user.bio || ""}
            width="100%"
            height={120}
            fontSize="fontSizes.md"
            resize="none"
          />

          <Spacer height={16}/>

          <Text as="label" htmlFor="checkbox" userSelect="none" cursor="pointer">
            <Input
              type="checkbox"
              id="checkbox"
              {...register("isPrivate")}
              defaultChecked={props.user.isPrivate}
              width={12}
              aspectRatio={1}
              transform="scale(1.5)"
            />
            <Spacer width={8} horizontal/>
            非公開アカウント
          </Text>


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
    </>
  )
}
