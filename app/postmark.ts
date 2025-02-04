import { ServerClient, TemplatedMessage } from "postmark"

const from = process.env.MAIL_FROM ?? "ResearchEquals <no-reply@libscie.org>"

export const postmark = () => new ServerClient(process.env.POSTMARK_TOKEN ?? "")

export async function sendEmailWithTemplate(
  to: string,
  templateId: string,
  templateModel: Record<string, string | number>
) {
  const message = new TemplatedMessage(from, templateId, templateModel, to)

  await postmark().sendEmailWithTemplate(message)
}

export async function sendInvitation(to: string, data: Object) {
  const message = new TemplatedMessage(from, "invitation-mail", data, to)
  message.MessageStream = "broadcast"
  message.ReplyTo = "Chris Hartgerink <ceo@libscie.org>"
  await postmark().sendEmailWithTemplate(message)
}

export async function sendApproval(data: Object, to: string) {
  const message = new TemplatedMessage(from, "approval-mail", data, to)
  message.MessageStream = "broadcast"
  message.ReplyTo = "Chris Hartgerink <ceo@libscie.org>"
  await postmark().sendEmailWithTemplate(message)
}

export async function sendDigest(data: Object, to: string) {
  const message = new TemplatedMessage(from, "weekly-digest-1", data, to)
  message.MessageStream = "broadcast"
  message.ReplyTo = "Chris Hartgerink <ceo@libscie.org>"
  await postmark().sendEmailWithTemplate(message)
}

export async function sendCollectionSubmission(data: Object, to: string) {
  const message = new TemplatedMessage(from, "collection-submission", data, to)
  message.MessageStream = "broadcast"
  message.ReplyTo = "Chris Hartgerink <ceo@libscie.org>"
  await postmark().sendEmailWithTemplate(message)
}

export async function acceptSubmission(data: Object, to: string) {
  const message = new TemplatedMessage(from, "submission-accepted", data, to)
  message.MessageStream = "broadcast"
  message.ReplyTo = "Chris Hartgerink <ceo@libscie.org>"
  await postmark().sendEmailWithTemplate(message)
}

export async function rejectSubmission(data: Object, to: string) {
  const message = new TemplatedMessage(from, "submission-rejected", data, to)
  message.MessageStream = "broadcast"
  message.ReplyTo = "Chris Hartgerink <ceo@libscie.org>"
  await postmark().sendEmailWithTemplate(message)
}
