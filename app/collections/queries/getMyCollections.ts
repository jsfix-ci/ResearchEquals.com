import { resolver, Ctx, AuthorizationError } from "blitz"
import db from "db"

export default resolver.pipe(async ({ session }) => {
  const draftCollections = await db.collection.findMany({
    where: {
      editors: {
        some: {
          workspaceId: session,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      submissions: {
        orderBy: {
          updatedAt: "desc",
        },
      },
      editors: {
        orderBy: {
          id: "asc",
        },
        include: {
          workspace: {
            include: {
              members: {
                include: {
                  user: {
                    select: {
                      id: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      type: true,
    },
  })

  return draftCollections
})
