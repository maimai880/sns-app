import {Roboto_Flex} from "next/font/google"
import {Flex, Heading, HStack, Image, Link, Spacer, Text, VStack} from "@kuma-ui/core"
import {GoogleLoginButton} from "@/components/GoogleLoginButton"
import {getServerSession} from "next-auth"
import {nextAuthOptions} from "@/lib/next-auth"
import {redirect} from "next/navigation"

const roboto = Roboto_Flex({subsets: ["latin"]})

export default async function Home() {
  if (await getServerSession(nextAuthOptions)) {
    redirect("/home")
  }

  return (
    <HStack width="100%" height="100%">
      <Flex
        justify="center"
        alignItems="center"
        position="relative"
        width="65%"
        height="100%"
        bg="white"
      >
        <Image
          src="/Social-media-Cristina.jpg"
          alt="bg image"
          width="80%"
          height="auto"
        />

        <Link
          href="https://www.freepik.com/free-vector/social-media-concept-illustration_5202422.htm#page=5&query=sns&position=9&from_view=keyword&track=sph"
          target="_blank"
          position="absolute"
          right={4}
          bottom={4}
          color="colors.blue.400"
          fontSize="md"
        >
          Image by storyset on Freepik
        </Link>
      </Flex>

      <VStack
        as="main"
        alignItems="center"
        px={32}
        py={200}
        width="35%"
        textAlign="center"
        overflow="auto"
      >
        <Text
          fontSize="fontSizes.4xl"
          fontWeight="bold"
          className={roboto.className}
        >
          A simple SNS
        </Text>

        <Spacer size={16}/>

        <Heading
          fontSize="fontSizes.6xl"
          fontWeight="bold"
          color="colors.primary"
          className={roboto.className}
        >
          SNS APP
        </Heading>

        <Spacer size={104}/>

        <Text
          fontSize="fontSizes.xl"
          fontWeight="bold"
        >
          ログインして投稿や交流を楽しみましょう！
        </Text>

        <Spacer size={80}/>

        <GoogleLoginButton/>
      </VStack>
    </HStack>
  )
}
