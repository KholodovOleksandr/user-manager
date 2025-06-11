import UsersTable from "@/app/components/usersTable"
import { getUsers, getUsersCount } from "@/lib/db/usersRepo";
import { redirect } from "next/navigation";
import Pagination from "@/app/components/pagination";
import { CreateUser, DeleteUsers, UploadUsers } from "./components/buttons";
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
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Users</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <CreateUser></CreateUser>
        <DeleteUsers></DeleteUsers>
        <UploadXlsx></UploadXlsx>
      </div>
      <UsersTable users={users}></UsersTable>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={Math.ceil(totalCount / pageSize)} />
      </div>
    </div>
  );
}
