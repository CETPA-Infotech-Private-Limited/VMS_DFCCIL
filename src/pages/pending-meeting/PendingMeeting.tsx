import React, { useState } from 'react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { meetings } from '@/constant/static';

const PendingMeeting = () => {
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [isRejection, setIsRejection] = useState(false);
  const [reason, setReason] = useState('');

  const handleAction = () => {
    if (isRejection) {
      console.log(`Meeting ID: ${selectedMeeting.id}, Rejected with reason: ${reason}`);
    } else {
      console.log(`Meeting ID: ${selectedMeeting.id}, Approved`);
    }
    setSelectedMeeting(null);
    setReason('');
    setIsRejection(false);
  };

  const openDialog = (meeting, rejection = false) => {
    setSelectedMeeting(meeting);
    setIsRejection(rejection);
  };

  return (
    <div className="flex flex-col w-full bg-white rounded-lg p-4">
      <Heading type={2}>Pending Meetings</Heading>
      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="font-semibold">#</TableCell>
              <TableCell className="font-semibold">Visitor Name</TableCell>
              <TableCell className="font-semibold">Organization</TableCell>
              <TableCell className="font-semibold">City</TableCell>
              <TableCell className="font-semibold">Mobile No</TableCell>
              <TableCell className="font-semibold">Date</TableCell>
              <TableCell className="font-semibold">Time</TableCell>
              <TableCell className="font-semibold text-right">Action</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {meetings.map((meeting) => (
              <TableRow key={meeting.id}>
                <TableCell>{meeting.id}</TableCell>
                <TableCell>
                  <div className="flex flex-row items-center gap-2">
                    <img
                      src={
                        meeting?.image ||
                        'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg'
                      }
                      alt={meeting.name}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    {meeting.name}
                  </div>
                </TableCell>
                <TableCell>{meeting.organization}</TableCell>
                <TableCell>{meeting.city}</TableCell>
                <TableCell>{meeting.mobile}</TableCell>
                <TableCell>{meeting.date}</TableCell>
                <TableCell>{meeting.time}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" onClick={() => openDialog(meeting, false)}>
                          Approve
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Approve Meeting</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to approve the meeting with {meeting.name}?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleAction}>Approve</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive" onClick={() => openDialog(meeting, true)}>
                          Reject
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Reject Meeting</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to reject the meeting with {meeting.name}? Please provide a reason
                            below.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <Textarea
                          placeholder="Enter reason for rejection"
                          className="mt-4"
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                        />
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleAction}>Reject</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PendingMeeting;
