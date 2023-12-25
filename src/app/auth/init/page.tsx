import {Flex, Heading, Spacer, Text, VStack} from "@kuma-ui/core"
import {ProfileInitializeForm} from "@/features/auth/components/ProfileinitializeForm"
import {getServerSession} from "next-auth"
import {nextAuthOptions} from "@/lib/next-auth"
import {redirect} from "next/navigation"


export default async function Page() {
  const session = await getServerSession(nextAuthOptions)
  if (!session || session.user.finishInit) redirect("/")

  return (
    <Flex
      justify="center"
      py={80}
    >
      <VStack
        as="main"
        alignItems="center"
        px={40}
        py={16}
        maxWidth={1080}
        width="100%"
        textAlign="center"
        bg="white"
        borderRadius={16}
      >
        <Heading fontSize="fontSizes.5xl">Welcome<Text as="span" color="colors.primary">!</Text></Heading>
        <Spacer height={8}/>
        <Text fontSize="fontSizes.xl">プロフィールを設定しましょう</Text>

        <Spacer height={40}/>

        <ProfileInitializeForm user={session.user}/>
      </VStack>
    </Flex>
  )
}
