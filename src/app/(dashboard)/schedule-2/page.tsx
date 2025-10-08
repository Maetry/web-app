'use client';

import { useState } from 'react';
import { addDays, setDate } from 'date-fns';

const today = new Date();
const start = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
const end = addDays(start, 30).toISOString();

export default function Schedule() {
  const [range, setRange] = useState(() => ({ start, end, current: start }));

  return (
    <main>
      <h1>hi</h1>
    </main>
  );
}
