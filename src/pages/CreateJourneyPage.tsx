import React from 'react';
import CreateJourney from '../components/journey/CreateJourney';

interface journeyProps {
  setCurrentPage: (page: string) => void;
}

export default function CreateJourneyPage({ setCurrentPage }: journeyProps) {
  return (
    <main className="pt-20">
      <section className="relative">
        <div className=" -z-10 inset-0 bg-gradient-to-br from-indigo-900/10 via-purple-900/10 to-pink-900/10" />
        <CreateJourney setCurrentPage={setCurrentPage}/>
      </section>
    </main>
  );
}