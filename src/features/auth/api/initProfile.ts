import {User} from "@/prisma-types"

interface Props {
  id: string
  data: Partial<User>
  onSuccess?: () => void
  onFail?: (err: any) => void
}

export const initProfile = async (props: Props) => {
  fetch(`/api/users/${props.id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: props.data.name,
      image: props.data.image || undefined,
      bio: props.data.bio,
      isPrivate: props.data.isPrivate,
      finishInit: true,
    })
  }).then(res => res.json())
    .then(res => props.onSuccess?.())
    .catch(props.onFail)
}
