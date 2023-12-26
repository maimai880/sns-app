import {NextRequest, NextResponse} from "next/server"
import {z} from "zod"
import {getServerSession} from "next-auth"
import {nextAuthOptions} from "@/lib/next-auth"
import prisma from "@/lib/prisma"
import {dataUrl2File} from "@/util/dataUrl2File"
import {del, put} from "@vercel/blob"

/*
 * プロフィールを更新API
 * bodyに含まれる項目を更新する
 * アカウント作成時、プロフィール初期化をしないとアカウントが削除（定期実行）されるので、当APIでfinishInitをtrueにすること
 *
 * @response: {
 *   200: 正常に更新できた時
 *   400: bodyのバリテーションエラー
 *   401: ユーザーが認証されていない時
 *   404: ユーザーが存在しない時
 *   500: その他のエラー
 * }
 */
const putSchema = z.object({
  name: z.string().optional(),
  image: z.string().optional(), // DataURL形式
  bio: z.string().optional(),
  isPrivate: z.boolean().optional(),
  finishInit: z.boolean().refine((v) => v, {message: "finishInit must be true"}).optional(),
})

export async function PUT(req: NextRequest, {params}: { params: { id: string } }) {
  try {
    const session = await getServerSession(nextAuthOptions)
    if (!session || session.user.id !== params.id) return NextResponse.json({error: "Unauthorized"}, {status: 401})

    const bodyResult = await putSchema.safeParseAsync(await req.json())
    if (!bodyResult.success) return NextResponse.json({error: bodyResult.error.flatten()}, {status: 400})

    const body = bodyResult.data
    const result = await prisma.user.update({
      where: {id: params.id},
      data: {
        name: body.name,
        bio: body.bio,
        isPrivate: body.isPrivate,
        finishInit: body.finishInit,
      },
    })
    if (!result.id) return NextResponse.json({error: "User not found"}, {status: 404})

    if (body.image) {
      const file = await dataUrl2File(body.image)

      const result = await put(
        "user.image",
        file,
        {access: "public", contentType: body.image.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)?.[0]}
      )
      await del(session.user.image)

      await prisma.user.update({
        where: {id: params.id},
        data: {
          image: result.url,
        },
      })
    }

    return NextResponse.json({message: "OK"}, {status: 200})
  } catch (e) {
    console.log(e)
    return NextResponse.json({error: "Internal Server Error"}, {status: 500})
  }
}
