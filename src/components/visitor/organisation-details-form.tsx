import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import RSelect from 'react-select';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { CalendarIcon, ChevronLeft, ChevronRight, Clock9 } from 'lucide-react';
import Heading from '../heading';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Button } from '../ui/button';
import { CustomCalendar } from '../ui/CustomCalendar';
import { environment } from '@/config';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { Employee, SelectedEmployee } from '@/types/Employee';
import ReactSelect from '../ReactSelect';
import { CardContent } from '../ui/card';

const OrganisationDetailsForm = ({
  onNextStep,
  onBackStep,
  selectedEmployee,
  setSelectedEmployee,
  selectedSlot,
  setSelectedSlot,
  selectedDate,
  setSelectedDate,
}: any) => {
  const [timeSlots, setTimeSlots] = useState<{ id: string; label: string }[]>([]);
  console.log('environment', environment);
  const holidays = [new Date(2025, 0, 1), new Date(2025, 11, 25)];

  useEffect(() => {
    const fetchTimeSlots = async () => {
      const response = await new Promise<{ id: string; label: string }[]>((resolve) =>
        setTimeout(() => {
          resolve([
            { id: 'slot1', label: '9:00 AM - 10:00 AM' },
            { id: 'slot2', label: '10:00 AM - 11:00 AM' },
            { id: 'slot3', label: '11:00 AM - 12:00 PM' },
            { id: 'slot4', label: '12:00 PM - 1:00 PM' },
            { id: 'slot5', label: '1:00 PM - 2:00 PM' },
            { id: 'slot6', label: '2:00 PM - 3:00 PM' },
            { id: 'slot7', label: '3:00 PM - 4:00 PM' },
            { id: 'slot8', label: '4:00 PM - 5:00 PM' },
            { id: 'slot9', label: '5:00 PM - 6:00 PM' },
            { id: 'slot10', label: '6:00 PM - 7:00 PM' },
          ]);
        }, 1000)
      );
      setTimeSlots(response);
    };

    fetchTimeSlots();
  }, []);

  const personalDetails = useSelector((state: RootState) => state.personalDetails);
  console.log(personalDetails);
  return (
    <div className="bg-white p-2 sm:p-4 rounded-lg">
      <Tabs defaultValue="name" className="w-[320px] sm:w-full mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="name" className="text-xs sm:text-sm">
            Search By Name
          </TabsTrigger>
          <TabsTrigger value="department" className="text-xs sm:text-sm" disabled>
            Search By Department
          </TabsTrigger>
        </TabsList>
        <TabsContent value="name">
          <div className="w-full ">
            <ReactSelect selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} />
          </div>
        </TabsContent>
        <TabsContent value="department" className="flex flex-col gap-4">
          <Label htmlFor="country">Select Department</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="it">Information Technology (IT)</SelectItem>
              <SelectItem value="hr">Human Resources (HR)</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
              <SelectItem value="legal">Legal</SelectItem>
              <SelectItem value="procurement">Procurement</SelectItem>
              <SelectItem value="customer-support">Customer Support</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="administration">Administration</SelectItem>
            </SelectContent>
          </Select>
        </TabsContent>
      </Tabs>

      <Card>
        <CardContent>
          <div className="flex flex-row items-center w-full mt-4">
            <div className="font-semibold w-1/3 text-center">Employee Details</div>
            <div className="w-2/3 border-l-2 border-gray-300 text-center pl-6">
              <div>{selectedEmployee?.empName}</div>
              <div>{selectedEmployee?.designation}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 justify-center">
        <div className="flex flex-row items-center gap-2">
          <CalendarIcon className="text-primary" />
          <Heading type={6}> Date</Heading>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="w-full sm:w-1/2">
            <div>
              <CustomCalendar
                disableWeekends={true}
                minDate={new Date(2025, 0, 1)}
                maxDate={new Date(2025, 11, 31)}
                holidays={holidays}
                value={selectedDate}
                onSelect={(date) => setSelectedDate(date)}
              />
            </div>
          </div>

          {selectedDate && (
            <div className="w-full sm:w-1/2 mt-2 sm:mt-6">
              <Label className="text-lg font-semibold flex items-center gap-2">
                <Clock9 color="blue" />
                Choose Time Slot <span className="text-red-500">*</span>
              </Label>
              <RadioGroup className="mt-16 ml-1" value={selectedSlot} onValueChange={setSelectedSlot}>
                {timeSlots.length === 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>
                        <div className="h-4 w-32 bg-gray-300 rounded-md animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {timeSlots.map((slot) => (
                      <div key={slot.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={slot.id} id={slot.id} />
                        <Label htmlFor={slot.id}>{slot.label}</Label>
                      </div>
                    ))}
                  </div>
                )}
              </RadioGroup>
            </div>
          )}
        </div>
        {selectedDate && (
          <div className="flex w-full justify-center text-center">
            {' '}
            <p className="mt-2 text-sm p-2 w-fit text-center border-2 border-black border-dotted  text-gray-600">
              {' '}
              Selected Date: <strong>{selectedDate.toDateString()}</strong> | <strong>{selectedSlot}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganisationDetailsForm;
