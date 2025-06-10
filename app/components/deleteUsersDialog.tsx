import { useState } from "react"
import { Button } from "./button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./dialog"
import { toast } from "sonner"


export default function DeleteUserConfirmDialog(props: {
    isOpen: boolean,
    userId: number | null
    onClosed: (isDeleted: boolean) => void
}) {

    function isBulkDelete() {
        return props.userId == -1;
    }

    function getConfirmationMessage() {
        return isBulkDelete() ? ' all users' : ' user';
    }

    const [loading, setLoading] = useState(false)
    const handleDelete = async () => {
        if (!props.userId)
            return;

        setLoading(true)
        try {
            const res = await fetch(`/api/users/${isBulkDelete() ? '' : props.userId}`, { method: "DELETE" })
            if (res.ok) {
                props.onClosed(true);
            } else {
                toast("An error has occurred, please try again later!");
            }
        } catch (err) {
            console.error("Delete error", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog
            open={props.isOpen}
            onOpenChange={(open) => !open && props.onClosed(false)}>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete {getConfirmationMessage()}?</DialogTitle>
                </DialogHeader>
                <p>Are you sure you want to delete {getConfirmationMessage()}? This action cannot be undone.</p>
                <DialogFooter className="mt-4">
                    <Button variant="outline" disabled={loading} onClick={() => props.onClosed(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" type="submit" disabled={loading} onClick={handleDelete}>
                        {loading ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}