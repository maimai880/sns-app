"use client"

import {FC} from "react"
import {Roboto} from "next/font/google"
import {Button, Image, Text} from "@kuma-ui/core"
import {signIn} from "next-auth/react"

const roboto = Roboto({subsets: ["latin"], weight: ["400"]})

interface Props {
  buttonStyle?: string
  logoStyle?: string
  textStyle?: string
}

// style指定にはKuma UIのcss関数を使う
export const GoogleLoginButton: FC<Props> = ({buttonStyle, logoStyle, textStyle}) => {
  return (
    <Button
      type="submit"
      onClick={() => signIn("google")}
      display="flex"
      alignItems="center"
      px={16}
      py={14}
      maxWidth={300}
      width="100%"
      height={56}
      bg="white"
      border="1px solid"
      borderColor="colors.border"
      borderRadius="16px"
      boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      _hover={{boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05)"}}
      className={buttonStyle}
    >
      <Image
        src="https://authjs.dev/img/providers/google.svg"
        alt="google logo"
        height="100%"
        className={logoStyle}
      />

      <Text
        flexGrow={1}
        fontSize="fontSizes.md"
        className={`
          ${textStyle}
          ${roboto.className}
        `}
      >
        Sign in with Google
      </Text>
    </Button>
  )
}
