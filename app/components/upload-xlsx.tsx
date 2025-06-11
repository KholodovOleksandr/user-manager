"use client"

import { useRef, useState } from "react"
import { Button } from "./button"
import { toast } from "sonner"
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation"

export function UploadXlsx() {
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // to be able to upload the seme file one more time without page refresh
        e.target.value = "";

        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);
        try {
            const res = await fetch("/api/users/import", {
                method: "POST",
                body: formData,
            })

            const json = await res.json()

            if (!res.ok) {
                const msg = [];
                for (const [key, value] of Object.entries(json.errors)) {
                    msg.push((value as string[]).join('\n'));
                }

                throw new Error(msg.length ? msg.join('\n') : "Upload failed");
            }
            router.refresh();
            toast.success(`Imported ${json.count} users`);
            
        } catch (err: any) {
            console.error(err);
            toast.error(err.message ?? "Failed to import users");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <input
                type="file"
                accept=".xlsx"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />

            <Button
                onClick={handleUploadClick}
                disabled={loading}
                variant="outline"
                className="flex items-center gap-2"
            >
                <ArrowUpTrayIcon className="h-4 w-4" />
                {loading ? "Uploading..." : "Upload Users"}
            </Button>
        </>
    )
}
