import db from "db"

export default async function getCurrentWorkspace({ suffix }: { suffix: string }) {
  const module = await db.module.findFirst({
    where: { suffix },
    include: {
      references: {
        include: {
          authors: {
            include: {
              workspace: true,
            },
          },
        },
        orderBy: {
          title: "asc",
        },
      },
      authors: {
        orderBy: {
          authorshipRank: "asc",
        },
        include: {
          workspace: true,
        },
      },
      license: true,
      type: true,
      parents: {
        include: {
          type: true,
          authors: {
            include: {
              workspace: true,
            },
            orderBy: {
              authorshipRank: "asc",
            },
          },
        },
      },
      children: {
        include: {
          type: true,
          authors: {
            include: {
              workspace: true,
            },
            orderBy: {
              authorshipRank: "asc",
            },
          },
        },
      },
    },
  })

  return module
}
