import { NotFoundError, resolver } from "blitz"
import db from "db"
import axios from "axios"

export default resolver.pipe(resolver.authorize(), async ({ suffix, uuid }) => {
  const module = await db.module.update({
    where: { suffix },
    data: { main: null },
  })

  // Force all authors to reapprove for publishing
  await db.authorship.updateMany({
    where: {
      moduleId: module.id,
    },
    data: {
      readyToPublish: false,
    },
  })

  // Remove uuid from Uploadcare
  const datestring = new Date()
  await axios.delete(`https://api.uploadcare.com/files/${uuid}/`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.uploadcare-v0.5+json",
      Date: datestring.toUTCString(),
      Authorization: `Uploadcare.Simple ${process.env.UPLOADCARE_PUBLIC_KEY}:${process.env.UPLOADCARE_SECRET_KEY}`,
    },
  })

  const updatedModule = await db.module.findFirst({
    where: { suffix },
    include: {
      authors: {
        include: {
          workspace: true,
        },
      },
      license: true,
      type: true,
      parents: true,
    },
  })

  return updatedModule!
})