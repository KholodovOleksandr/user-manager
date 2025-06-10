"use client"

import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { User } from '@/lib/db/usersRepo';
import { useRouter } from "next/navigation";
import { Button } from './button';

import { useState } from 'react';
import { UserDialog } from './userDialog';
import DeleteUserConfirmDialog from './deleteUsersDialog';
import { toast } from 'sonner';

export default function UsersTable({
    users
}: {
    users: User[]
}) {
    const router = useRouter()
    const [userToEdit, setUserToEdit] = useState<User | null>(null);

    function editUser(user: User | null) {
        setUserToEdit(user);
    }

    function onSavedHandler() {
        toast("User has been updated!");
        router.refresh();
    }

    const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);

    function confirmDeleteUser(userId: number) {
        setUserIdToDelete(userId);
    }

    function onDeleteUserClosed(isDeleted: boolean) {
        if (isDeleted) {
            toast("User has been deleted!");
            router.refresh();
        }
        setUserIdToDelete(null);
    }

    return (
        <div className="mt-6 flow-root">
            <DeleteUserConfirmDialog isOpen={!!userIdToDelete}
                userId={userIdToDelete}
                onClosed={onDeleteUserClosed}>
            </DeleteUserConfirmDialog>

            <UserDialog isOpen={!!userToEdit} title="Edit User"
                user={userToEdit}
                onClosed={() => editUser(null)}
                onSaved={onSavedHandler}
            ></UserDialog>

            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">

                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Name
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Email
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Created At
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {users?.map((user) => (
                                <tr
                                    key={user.Id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex items-center gap-3">
                                            <p>{user.Name}</p>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {user.Email}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {user.CreatedAt.toDateString()}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                            <Button onClick={() => editUser(user)} >
                                                <PencilIcon className="w-5" />
                                            </Button>
                                            <Button variant="default" onClick={() => confirmDeleteUser(user.Id!)}>
                                                <TrashIcon className="w-5" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
