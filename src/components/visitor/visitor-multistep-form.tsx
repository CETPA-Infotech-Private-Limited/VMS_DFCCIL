import React, { useEffect, useState } from 'react';
import Stepper from '../ui/stepper';
import PersonalDetails from './personal-details-form';
import OrganisationDetailsForm from './organisation-details-form';
import FinalFormReview from './final-form-review';
import { BadgeCheck, IdCardIcon } from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { Label } from '../ui/label';

const VisitorMultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const personalDetails = useSelector((state: RootState) => state.personalDetails);
  console.log('personalDetails', personalDetails);
  const navigate = useNavigate();

  const steps = [{ title: 'Personal Info' }, { title: 'Schedule Appointment' }, { title: 'Final Review' }];

  const handleNextStep = () => setCurrentStep((prev) => prev + 1);
  const handlePreviousStep = () => setCurrentStep((prev) => prev - 1);

  // if (personalDetails.contactNumber === '' && personalDetails.otp === '') {
  //   return <Navigate to="/" replace />
  // }

  return (
    <div className="w-full">
      {currentStep !== 3 ? (
        <div className="bg-white p-3 sm:p-8 rounded-lg shadow-md">
          {/* <Stepper steps={steps} currentStep={currentStep} /> */}
          <Label className="flex items-center">
            <IdCardIcon color="blue" size="40px " className="mr-2" />
            <p className="font-bold">Add Your Details</p>
          </Label>
          <div className="mt-6">
            {currentStep === 0 && <PersonalDetails onNextStep={handleNextStep} />}
            {currentStep === 1 && (
              <OrganisationDetailsForm onNextStep={handleNextStep} onBackStep={handlePreviousStep} />
            )}
            {currentStep === 2 && <FinalFormReview onNextStep={handleNextStep} onBackStep={handlePreviousStep} />}
          </div>
        </div>
      ) : (
        <FinalSubmit />
      )}
    </div>
  );
};

const FinalSubmit = () => {
  return (
    <div className="bg-white w-full p-8 rounded-lg flex flex-col items-center text-center shadow-lg">
      <div className="bg-primary/20 p-4 rounded-full flex items-center justify-center">
        <BadgeCheck className="text-green-500 w-20 h-20" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-primary mt-6">Thank You for Submitting Your Details!</h1>
      <p className="text-gray-700 text-sm sm:text-base mt-4 max-w-md">
        Your appointment has been scheduled successfully. You will receive a notification once it has been approved. If
        you have any questions, feel free to
        <Link
          to="mailto:support@example.com?subject=Query about my Appointment"
          className="text-primary hover:underline ml-2"
        >
          contact us via email.
        </Link>
      </p>

      <div className="w-full border-t border-primary my-6"></div>
      <div className="text-primary text-sm sm:text-base space-y-2">
        <p>
          <span className="font-semibold text-primary">Appointment Date:</span> 12th January 2025
        </p>
        <p>
          <span className="font-semibold text-primary">Time Slot:</span> 10:00 AM - 11:00 AM
        </p>
      </div>
    </div>
  );
};

export default VisitorMultiStepForm;
