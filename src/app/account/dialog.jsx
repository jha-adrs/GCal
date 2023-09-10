"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as React from "react"
export function TranscriptDialog(props) {
    const [dialogIsOpen, setDialogIsOpen] = React.useState(false)
    
    return (<>
        
            <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
            <DialogTrigger><Icons.plus className="w-6 h-6 text-gray-500" /></DialogTrigger>
            
                <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Meeting Transcript/Recording?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will send the file to our servers for processing and to OpenAI servers for generating Minutes of Meeting.
                    </DialogDescription>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="picture">Picture</Label>
                        <Input id="picture" type="file" />
                    </div>
                    <Button variant="ghost" className="" onClick={() => setDialogIsOpen(false)}>Cancel</Button>
                    
                </DialogHeader>
            </DialogContent>
            
        </Dialog>
        </>
    )
}