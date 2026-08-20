import { getAllUsers } from "@/app/actions/user.actions";
import UserRoleSelect from "@/components/dashboard/UserRoleSelect";
import DeleteUserButton from "@/components/dashboard/DeleteUserButton";

export default async function DashboardUsersPage() {
  const users = await getAllUsers();

  return (
    <section className="flex h-full w-full flex-col gap-4 rounded-md border p-6 lg:gap-6">
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-6">
        <div>
          <h1 className="text-4xl font-medium">Users</h1>
          <p className="hidden lg:inline">
            People with access to the dashboard
          </p>
        </div>
      </div>

      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-3 font-medium">Full Name</th>
                <th className="p-3 font-medium">Username</th>
                <th className="p-3 font-medium">Role</th>
                <th className="p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b last:border-0">
                  <td className="p-3">{user.fullName}</td>
                  <td className="p-3">{user.username}</td>
                  <td className="p-3">
                    <UserRoleSelect userId={user.id} role={user.role} />
                  </td>
                  <td className="p-3">
                    <DeleteUserButton userId={user.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-muted-foreground">No users yet.</p>
      )}
    </section>
  );
}
