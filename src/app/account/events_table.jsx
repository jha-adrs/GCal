
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Button} from "@/components/ui/button"
import { Label } from '@/components/ui/label'
import { Icons} from "@/components/icons"
import Link from "next/link"
import { TranscriptDialog } from "./dialog"
export function EventsTable({ data }) {
    
    const dateHandler = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    }
    
    return (
        <Table>
            <TableCaption>A list of your recent events.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Timing</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                    <TableHead className="text-right">MoM Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((event) => (
                    <TableRow key={event.iCalUID}>
                        <TableCell className="font-medium">{event.summary}</TableCell>
                        <TableCell>{event.status}</TableCell>
                        <TableCell>{dateHandler(event.updated) || "undefined"}</TableCell>

                        <TableCell className="text-right">
                            <div className="flex flex-col space-y-1.5">

                                <Select>
                                    <SelectTrigger id="actions">
                                        <SelectValue placeholder=" Actions" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="next">Transcript</SelectItem>
                                        <SelectItem value="sveltekit">Recording</SelectItem>
                                        <SelectItem value="astro"><Link href={event.htmlLink}>
                                            Event Link
                                        </Link></SelectItem>
                                        <SelectItem value="nuxt">Details</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </TableCell>
                        <TableCell>
                         <TranscriptDialog /> 
                         
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}