'use client'

import { Button } from './button';
import { UserDialog } from './userDialog';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DeleteUserConfirmDialog from './deleteUsersDialog';

export function CreateUser() {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);

    function handleDialogVisibility(open: boolean) {
        setIsOpen(open);
    }

    function onSavedHandler() {
        handleDialogVisibility(false);
        router.refresh();
    }

    return (
        <>
            <Button onClick={() => handleDialogVisibility(true)}>Create User</Button>
            <UserDialog isOpen={isOpen} title="Create User"
                user={null}
                onClosed={() => handleDialogVisibility(false)}
                onSaved={onSavedHandler}
            ></UserDialog>
        </>
    );
}


export function DeleteUsers() {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);

    function onDeleteUserClosed(isDeleted: boolean) {
        if (isDeleted) {
            router.refresh();
        }

        setIsOpen(false);
    }

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Delete All Users</Button>
            <DeleteUserConfirmDialog isOpen={isOpen}
                userId={-1}
                onClosed={onDeleteUserClosed}>
            </DeleteUserConfirmDialog>
        </>
    );
}

