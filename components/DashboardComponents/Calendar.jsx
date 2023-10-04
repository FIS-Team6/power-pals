import React from 'react'

export default function Calendar() {
  const today = new Date();
  const month = today.toLocaleString('default', { month: 'long' });
  const day = today.getDate();

  return (
    <div className="flex flex-col items-center justify-center h-20 w-full rounded-lg shadow-lg">
      <span className="bg-info text-white px-2 text-xl font-bold rounded-t-lg">
       {month}
      </span>
      <div className="bg-white w-full text-center py-2 text-4xl font-bold rounded-lg">
        {day}
      </div>
    </div>
  )
}