
import { User } from "@/lib/db/usersRepo";
import { Button } from "./button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "./dialog"
import { Input } from "./input"
import { useEffect, useState } from "react";
import { DatePicker } from "./date-picker";


export function UserDialog(props: {
  title: string,
  isOpen: boolean,
  user: User | null | undefined,
  onSaved: () => void,
  onClosed: () => void
}) {
  function onOpenChangeHandler(isOpened: boolean) {
    !isOpened && props.onClosed();
  }

  const [name, setName] = useState(props.user?.Name ?? "")
  const [email, setEmail] = useState(props.user?.Email ?? "")
  const [createdAt, setCreatedAt] = useState(props.user?.CreatedAt)
  const [errors, setErrors] = useState<{ name?: string[], email?: string[], createdAt?: string[] }>({})
  const [loading, setLoading] = useState(false)

  // useState initialize value first time component renders. 
  // ad hoc solution for "Edit User" functionality to init inputs' fields
  useEffect(() => {
    if (props.user) {
      setName(props.user.Name);
      setEmail(props.user.Email);
      setCreatedAt(props.user.CreatedAt);
    }
  }, [props.user]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    let path = '/api/users';
    let method = 'POST'

    if (props.user) {
      path += '/' + props.user.Id;
      method = 'PUT';
    }

    const res = await fetch(path, {
      method: method,
      body: JSON.stringify({ name, email, createdAt: createdAt }),
      headers: { "Content-Type": "application/json" }
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setErrors(data.errors || {})
    } else {
      handleSuccessSave();
    }
  }

  function handleSuccessSave() {
    setName("");
    setEmail("");
    setLoading(false);
    props.onSaved();
    props.onClosed();
  }

  return (
    <Dialog open={props.isOpen} onOpenChange={onOpenChangeHandler}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <label htmlFor="name">Name</label>
            <Input id="name" name="name" type="string" value={name}
              onChange={(e) => setName(e.target.value)} />
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {errors?.name &&
              errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <div className="grid gap-3">
            <label htmlFor="email">Email</label>
            <Input id="email" name="email" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {errors?.email &&
              errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <div className="grid gap-3">
            <label htmlFor="createdAt">Created At</label>
            <DatePicker date={createdAt} onChange={setCreatedAt} />
          </div>
          <div id="createdAt-error" aria-live="polite" aria-atomic="true">
            {errors?.createdAt &&
              errors.createdAt.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit} disabled={loading} >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
