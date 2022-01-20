import { Link } from "blitz"
import moment from "moment"

import AuthorAvatarsNew from "./AuthorAvatarsNew"
import ViewAuthors from "./ViewAuthors"
import { Suspense } from "react"

const MetadataInvite = ({ module }) => {
  return (
    <>
      <div
        className="module bg-gray-100 dark:bg-gray-600 my-4"
        style={{ padding: "1px" }}
        id="moduleCurrent"
      >
        <div className="module bg-white dark:bg-gray-900 border-0 border-gray-100 dark:border-gray-600 divide-y divide-gray-100 dark:divide-gray-600">
          <div className="lg:flex text-center divide-y lg:divide-y-0 lg:divide-x divide-gray-100 dark:divide-gray-600 text-gray-500 dark:text-gray-200 dark:bg-gray-800 text-sm leading-4 font-normal">
            <div className="flex-grow py-2">Last updated: {moment(module.updatedAt).fromNow()}</div>
            <div className="flex-grow py-2">
              DOI upon publish:{" "}
              <span className="text-gray-300 dark:text-gray-600">{`${module.prefix}/${module.suffix}`}</span>
            </div>
            <div className="flex-grow py-2">
              License:{" "}
              <Link href={module.license!.url!}>
                <a target="_blank">{module.license!.name}</a>
              </Link>
            </div>
          </div>
          <div className="py-4 px-2 min-h-32">
            <p className="text-sm leading-4 font-normal text-gray-500 dark:text-white">
              {module.type.name}
            </p>
            <p className="text-xl leading-6 font-medium  text-gray-900 dark:text-white">
              {module.title}
            </p>
          </div>
          {/* Authors section */}
          <div className="px-1 py-1 sm:flex place-items-center sm:place-items-left">
            <div className="flex sm:inline">
              <span className="flex-grow"></span>

              <AuthorAvatarsNew authors={module.authors} size="h-12 w-12" toDisplay={4} />
              <span className="flex-grow"></span>
            </div>
            <span className="sm:flex-grow"></span>
            <div className="flex sm:contents">
              <ViewAuthors module={module} button={<>test</>} />
            </div>
          </div>
          {/* Description section */}
          <div className="text-base leading-6 font-normal pt-4 pl-2 pr-4 pb-2">
            {module.description}
          </div>
        </div>
      </div>
    </>
  )
}

export default MetadataInvite