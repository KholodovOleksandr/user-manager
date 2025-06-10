'use client'

import { Button } from './button';
import { UserDialog } from './userDialog';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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