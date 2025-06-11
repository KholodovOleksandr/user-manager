import UsersTable from "@/app/components/usersTable"
import { getUsers, getUsersCount } from "@/lib/db/usersRepo";
import { redirect } from "next/navigation";
import Pagination from "@/app/components/pagination";
import { CreateUser, DeleteUsers } from "./components/buttons";
import { UploadXlsx } from "./components/upload-xlsx";

const pageSize = 10;

export default async function Page(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const totalCount = await getUsersCount();
  const skip = (currentPage - 1) * pageSize;
  if (skip > totalCount) {
    redirect('/');
  }

  const users = await getUsers(pageSize, skip);

  return (
    <div className="w-full p-6 md:p-10">
      {/* Page Title */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-end gap-2 mb-6">
        <CreateUser />
        <DeleteUsers />
        <UploadXlsx />
      </div>

      {/* Users Table */}
      <div className="mb-6">
        <UsersTable users={users} />
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <Pagination totalPages={Math.ceil(totalCount / pageSize)} />
      </div>
    </div>

  );
}
