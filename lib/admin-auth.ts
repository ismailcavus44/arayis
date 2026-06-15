/** Yönetim paneline yalnızca bu Supabase Auth kullanıcı id’si girebilir. */
export const ADMIN_AUTH_USER_ID =
  process.env.NEXT_PUBLIC_ADMIN_AUTH_USER_ID?.trim() ||
  'fded326c-6a49-4d42-b3b8-faf9fc0fbaf0'

export function isAllowedAdminUser(userId: string | undefined): boolean {
  return Boolean(userId && userId === ADMIN_AUTH_USER_ID)
}
