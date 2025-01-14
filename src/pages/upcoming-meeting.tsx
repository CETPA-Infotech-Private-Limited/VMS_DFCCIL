import React, { useState } from 'react';
import Heading from '@/components/heading';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { meetings } from '@/constant/static';
import { InfoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

const UpcomingMeeting = () => {
  const [selectedOption, setSelectedOption] = useState('Today');
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  const openDialog = (visitor) => {
    setSelectedVisitor(visitor);
  };

  const closeDialog = () => {
    setSelectedVisitor(null);
  };

  return (
    <div className="flex flex-col w-full bg-white rounded-lg p-4">
      <div className="flex items-center justify-between">
        <Heading type={2}>Upcoming Meetings</Heading>
        <Select onValueChange={(value) => setSelectedOption(value)} defaultValue="Today">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Today">Today</SelectItem>
            <SelectItem value="Upcoming">Upcoming Meetings</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="font-semibold">#</TableCell>
              <TableCell className="font-semibold">Visitor Name</TableCell>
              <TableCell className="font-semibold">Guest</TableCell>
              <TableCell className="font-semibold">Organization</TableCell>
              <TableCell className="font-semibold">City</TableCell>
              <TableCell className="font-semibold">Mobile No</TableCell>
              <TableCell className="font-semibold">Date</TableCell>
              <TableCell className="font-semibold">Time</TableCell>
              <TableCell className="font-semibold">More Info</TableCell>
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
                <TableCell>+3</TableCell>
                <TableCell>{meeting.organization}</TableCell>
                <TableCell>{meeting.city}</TableCell>
                <TableCell>{meeting.mobile}</TableCell>
                <TableCell>{meeting.date}</TableCell>
                <TableCell>{meeting.time}</TableCell>
                <TableCell>
                  <Button variant="outline" size="icon" onClick={() => openDialog(meeting)}>
                    <InfoIcon size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedVisitor && (
        <Dialog open={!!selectedVisitor} onOpenChange={closeDialog}>
          <DialogContent className="max-w-md w-full">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription>
                <div className="flex flex-row items-center space-x-4">
                  <img
                    src={
                      selectedVisitor.image ||
                      'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg'
                    }
                    alt={`${selectedVisitor.name}'s photo`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-medium">{selectedVisitor.name}</h3>
                    <p>{selectedVisitor.email}</p>
                    <p>{selectedVisitor.organization}</p>
                    <p>{selectedVisitor.mobile}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-md font-medium">Guest List:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                    {selectedVisitor.guestList?.map((guest, index) => <li key={index}>{guest}</li>) || (
                      <li>No additional guests listed.</li>
                    )}
                  </ul>
                  <h4 className="text-md font-medium mt-4">Meeting Purpose:</h4>
                  <p className="text-sm text-gray-700 mt-2">{selectedVisitor.purpose || 'No purpose provided.'}</p>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={closeDialog}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default UpcomingMeeting;
