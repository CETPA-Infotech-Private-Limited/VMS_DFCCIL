import React, { useState } from 'react';
import Heading from '@/components/heading';
import { Card, CardContent } from '@/components/ui/card';
import { Users, UserCheck, UserX, Globe, Building, CalendarDays } from 'lucide-react';

const Home = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const visitors = [
    {
      id: 1,
      name: 'Aarav Sharma',
      organization: 'Tech Innovators Pvt Ltd',
      city: 'Bengaluru',
      mobile: '+91 9876543210',
      date: '2025-01-14',
      time: '10:00 AM',
      purpose: 'Project Discussion',
      status: 'Checked In',
      image: 'https://via.placeholder.com/150',
      guestList: ['Rohan Mehta', 'Isha Verma'],
    },
    {
      id: 2,
      name: 'Isha Verma',
      organization: 'Creative Minds Solutions',
      city: 'Mumbai',
      mobile: '+91 9123456789',
      date: '2025-01-15',
      time: '2:00 PM',
      purpose: 'Client Presentation',
      status: 'Checked Out',
      image: 'https://via.placeholder.com/150',
      guestList: ['Rajesh Patel'],
    },
  ];

  const uniqueOrganizations = new Set(visitors.map((v) => v.organization)).size;
  const uniqueCities = new Set(visitors.map((v) => v.city)).size;
  const todaysDate = '2025-01-14';
  const todaysVisitors = visitors.filter((v) => v.date === todaysDate).length;

  const cards = [
    {
      title: 'Total Visitors',
      value: visitors.length,
      icon: <Users className="w-8 h-8 text-blue-500" />,
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Checked In',
      value: visitors.filter((v) => v.status === 'Checked In').length,
      icon: <UserCheck className="w-8 h-8 text-teal-500" />, // Replaced green with teal
      bgColor: 'bg-teal-100', // Replaced green background with teal
    },
    {
      title: 'Checked Out',
      value: visitors.filter((v) => v.status === 'Checked Out').length,
      icon: <UserX className="w-8 h-8 text-red-500" />,
      bgColor: 'bg-red-100',
    },
    {
      title: 'Unique Organizations',
      value: uniqueOrganizations,
      icon: <Building className="w-8 h-8 text-yellow-500" />,
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Cities Visited',
      value: uniqueCities,
      icon: <Globe className="w-8 h-8 text-purple-500" />,
      bgColor: 'bg-purple-100',
    },
    {
      title: "Today's Visitors",
      value: todaysVisitors,
      icon: <CalendarDays className="w-8 h-8 text-indigo-500" />, // Used indigo for variety
      bgColor: 'bg-indigo-100', // Used indigo for variety
    },
  ];

  return (
    <div className="flex flex-col p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <Heading type={2}>Visitor Management Dashboard</Heading>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {cards.map((card, index) => (
          <Card key={index} className={`shadow-lg rounded-lg h-[200px] ${card.bgColor}`}>
            <CardContent className="p-4 flex flex-col items-center justify-center gap-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md">
                {card.icon}
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="text-2xl font-bold mt-2">{card.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
