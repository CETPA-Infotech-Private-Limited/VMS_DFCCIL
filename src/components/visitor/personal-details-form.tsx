import { z } from 'zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronRight, Minus, Plus } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Separator } from '../ui/separator'
import { Label } from '../ui/label'
import { IndiaFlag } from '@/assets/image/images'
import { useDispatch, useSelector } from 'react-redux'
import { setPersonalDetails } from '@/features/visitor/personalDetailsSlice'
import { RootState } from '@/app/store'

const guestSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required')
})

const personalDetailsSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  contactNumber: z.string().regex(/^\d{10}$/, 'Contact number must be 10 digits'),
  designation: z.string().optional(),
  organisationName: z.string().optional(),
  email: z.string().email('Enter a valid email address').optional(),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Pincode must be 6 digits'),
  country: z.string().min(1, 'Country is required'),
  guests: z.array(guestSchema).optional()
})

type PersonalDetailsForm = z.infer<typeof personalDetailsSchema>

const PersonalDetails = ({ onNextStep }: { onNextStep: () => void }) => {
  const dispatch = useDispatch()
  const personalDetails = useSelector((state: RootState) => state.personalDetails)

  const form = useForm<PersonalDetailsForm>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: personalDetails
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'guests'
  })

  const onSubmit = (data: PersonalDetailsForm) => {
    onNextStep()
    dispatch(setPersonalDetails(data as any))
    console.log('Form Data:', data)
  }

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 ">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <Label>
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <FormControl>
                    <Input {...field} placeholder="Enter your first name" />
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
                <FormItem>
                  <Label>Middle Name</Label>
                  <FormControl>
                    <Input {...field} placeholder="Enter your middle name" />
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
                <FormItem>
                  <Label>
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <FormControl>
                    <Input {...field} placeholder="Enter your last name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <Label>
                    Contact Number <span className="text-red-500">*</span>
                  </Label>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      disabled={true}
                      placeholder="Enter your contact number"
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
                <FormItem>
                  <Label>Designation</Label>
                  <FormControl>
                    <Input {...field} placeholder="Enter your designation" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organisationName"
              render={({ field }) => (
                <FormItem>
                  <Label>Organisation Name</Label>
                  <FormControl>
                    <Input {...field} placeholder="Enter your organisation name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label>
                    Email<span className="text-red-500">*</span>
                  </Label>
                  <FormControl>
                    <Input {...field} placeholder="Enter your email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <Label>
                    Address <span className="text-red-500">*</span>
                  </Label>
                  <FormControl>
                    <Input {...field} placeholder="Enter your address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <Label>
                    City <span className="text-red-500">*</span>
                  </Label>
                  <FormControl>
                    <Input {...field} placeholder="Enter your city" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <Label>
                    State <span className="text-red-500">*</span>
                  </Label>
                  <FormControl>
                    <Input {...field} placeholder="Enter your state" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <Label>
                    Pincode <span className="text-red-500">*</span>
                  </Label>
                  <FormControl>
                    <Input {...field} placeholder="Enter your pincode" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <Label>
                    Country <span className="text-red-500">*</span>
                  </Label>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
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
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col sm:flex-row gap-2 w-full">
              <FormField
                control={form.control}
                name={`guests.${index}.firstName`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Label>
                      Guest {index + 1} - First Name <span className="text-red-500">*</span>
                    </Label>
                    <FormControl>
                      <Input {...field} placeholder="Enter guest's first name" />
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
                      <Input {...field} placeholder="Enter guest's middle name" />
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
                      <Input {...field} placeholder="Enter guest's last name" />
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
          ))}

          <div className="flex flex-row justify-between mt-6">
            <Button
              size="lg"
              className="px-0"
              variant="link"
              type="button"
              onClick={() =>
                append({
                  firstName: '',
                  middleName: '',
                  lastName: ''
                })
              }
            >
              <Plus /> Add Guest
            </Button>
            <Button type="submit" className="" size="lg">
              Continue <ChevronRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default PersonalDetails
