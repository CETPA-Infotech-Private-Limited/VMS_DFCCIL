import React from 'react'
import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight, CircleUserRound, User2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import Heading from '../heading'

const FinalFormReview = ({ onNextStep, onBackStep }: { onNextStep: () => void; onBackStep: () => void }) => {
  const personalDetails = useSelector((state: RootState) => state.personalDetails)

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Personal Details</h3>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(personalDetails).map(([key, value]) =>
              key !== 'guests' ? (
                <p key={key}>
                  <span className="font-semibold capitalize text-gray-700">{key.replace(/([A-Z])/g, ' $1')}:</span> {value || 'N/A'}
                </p>
              ) : null
            )}
          </div>
        </div>
      </div>

      {personalDetails.guests && personalDetails.guests.length > 0 && (
        <div className="mb-6">
          <Heading type={6}>Guests</Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
            {personalDetails.guests.map((guest, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex flex-row items-center space-x-4">
                <div>
                  <User2 className="w-14 h-14 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800">Guest {index + 1}</p>
                  <p>
                    <span className="font-medium text-gray-600">First Name:</span> {guest.firstName || 'N/A'}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">Middle Name:</span> {guest.middleName || 'N/A'}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">Last Name:</span> {guest.lastName || 'N/A'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <Button variant="outline" size="lg" className="px-3" onClick={onBackStep}>
          <ChevronLeft /> Back
        </Button>
        <Button type="button" className="px-3" size="lg" onClick={onNextStep}>
          Final Submit <ChevronRight />
        </Button>
      </div>
    </div>
  )
}

export default FinalFormReview
