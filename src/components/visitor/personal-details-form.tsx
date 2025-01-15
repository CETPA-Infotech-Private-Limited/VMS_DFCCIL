import { z } from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight, Minus, Plus } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import { IndiaFlag } from '@/assets/image/images';
import { useDispatch, useSelector } from 'react-redux';
import { setPersonalDetails } from '@/features/visitor/personalDetailsSlice';
import { RootState } from '@/app/store';
import OrganisationDetailsForm from './organisation-details-form';
import { useState } from 'react';
import { Employee } from '@/types/Employee';
import axiosInstance from '@/services/axiosInstance';
import { Textarea } from '../ui/textarea';
import toast from 'react-hot-toast';

const guestSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
});

const personalDetailsSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  contactNumber: z.string().regex(/^\d{10}$/, 'Contact number must be 10 digits'),
  designation: z.string().optional(),
  organisationName: z.string().min(1, 'Organisation name is required'),
  email: z.string().email('Enter a valid email address').optional(),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Pincode must be 6 digits'),
  country: z.string().min(1, 'Country is required'),
  purposeofmeeting: z.string().min(1, 'Purpose of meeting is required'),
  guests: z.array(guestSchema).optional(),
});

type PersonalDetailsForm = z.infer<typeof personalDetailsSchema>;

const PersonalDetails = ({ onNextStep }: { onNextStep: () => void }) => {
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>(undefined);

  const dispatch = useDispatch();
  const personalDetails = useSelector((state: RootState) => state.personalDetails);

  const form = useForm<PersonalDetailsForm>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: personalDetails,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'guests',
  });

  const onSubmit = async (data: PersonalDetailsForm) => {
    dispatch(setPersonalDetails(data as any));
    const response = await axiosInstance.post('/VisitorMangement/AddVisitor', {
      mobileNo: data.contactNumber,
      email: data.email,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      visitorDesigination: data.designation,
      orgName: data.organisationName,
      purposeOfVisit: data.purposeofmeeting,
      country: data.country,
      state: data.state,
      city: data.city,
      pincode: data.pincode,
      locality: 'locality',
      whomeToMeet: selectedEmployee?.empName,
      dept: selectedEmployee?.department,
      designation: selectedEmployee.designation,
      meetDate: selectedDate,
      inTime: '10:20',
      outTime: '10:30',
      visitorGuests: data.guests,
    });
    toast.success(response?.data?.message);

    console.log('Form Data:', data);
  };

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 ">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <Label>
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Middle Name */}
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <Label>Middle Name</Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Last Name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <Label>
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem className="sm:col-span-6">
                  <Label>
                    Contact Number <span className="text-red-500 ">*</span>
                  </Label>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      disabled={false}
                      className="bg-slate-200"
                      value={personalDetails.contactNumber}
                      //placeholder={personalDetails.contactNumber}
                      prefix={<img src={IndiaFlag} alt="Indian Flag" className="w-6 h-4" />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem className="sm:col-span-3">
                  <Label>Designation</Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organisationName"
              render={({ field }) => (
                <FormItem className="sm:col-span-3">
                  <Label>Organisation Name</Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="sm:col-span-6">
                  <Label>
                    Email<span className="text-red-500">*</span>
                  </Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="sm:col-span-6">
                  <Label>
                    Address <span className="text-red-500">*</span>
                  </Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="sm:col-span-3">
                  <Label>
                    City <span className="text-red-500">*</span>
                  </Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="sm:col-span-3">
                  <Label>
                    State <span className="text-red-500">*</span>
                  </Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem className="sm:col-span-3">
                  <Label>
                    Pincode <span className="text-red-500">*</span>
                  </Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="sm:col-span-3">
                  <Label>
                    Country <span className="text-red-500">*</span>
                  </Label>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="sri-lanka">Sri Lanka</SelectItem>
                        <SelectItem value="usa">United States</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator className="my-4" />
          <div className="flex  flex-col  mt-1">
            <div className=" flex sm:flex-row   text-end justify-end">
              <div className="flex w-[150px] flex-end">
                {' '}
                <Select
                  value={`${fields.length}`}
                  onValueChange={(value) => {
                    const guestCount = Number(value);
                    const difference = guestCount - fields.length;
                    if (difference > 0) {
                      Array.from({ length: difference }).forEach(() => append({ firstName: '', lastName: '' }));
                    } else if (difference < 0) {
                      Array.from({ length: -difference }).forEach((_, index) => remove(fields.length - 1 - index));
                    }
                  }}
                >
                  <SelectTrigger className="bg-red-500 text-white">
                    <Label>Add Guests - </Label>

                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 20 }, (_, index) => (
                      <SelectItem key={index} value={`${index + 1}`}>
                        {index + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator className="my-4" />
          {fields?.length > 0 && (
            <div className="bg-gray-100 p-5 rounded-lg">
              {fields.map((field, index) => (
                <div key={field.id} className="p-1">
                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <FormField
                      control={form.control}
                      name={`guests.${index}.firstName`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <Label>
                            Guest {index + 1} - First Name <span className="text-red-500">*</span>
                          </Label>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`guests.${index}.middleName`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <Label>Middle Name</Label>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`guests.${index}.lastName`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <Label>
                            Last Name <span className="text-red-500">*</span>
                          </Label>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end sm:mt-8">
                      <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                        <Minus />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <OrganisationDetailsForm
            onNextStep={() => {}}
            onBackStep={() => {}}
            selectedEmployee={selectedEmployee}
            setSelectedEmployee={setSelectedEmployee}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
          />

          <FormField
            control={form.control}
            name="purposeofmeeting"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <Label>
                  Purpose Of Meeting <span className="text-red-500">*</span>
                </Label>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row justify-between mt-6">
            {/* <Button
              size="lg"
              className="px-0"
              variant="link"
              type="button"
              onClick={() =>
                append({
                  firstName: '',
                  middleName: '',
                  lastName: '',
                })
              }
            >
              <Plus /> Add Guest
            </Button> */}

            <Button type="submit" className="" size="lg">
              Send Request <ChevronRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PersonalDetails;
