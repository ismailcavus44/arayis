/** Yönetim paneline yalnızca bu Supabase Auth kullanıcı id’si girebilir. */
export const ADMIN_AUTH_USER_ID =
  process.env.NEXT_PUBLIC_ADMIN_AUTH_USER_ID?.trim() ||
  '9f5e645c-b1c8-42b7-af1c-889ea5df14fc'

export function isAllowedAdminUser(userId: string | undefined): boolean {
  return Boolean(userId && userId === ADMIN_AUTH_USER_ID)
}
