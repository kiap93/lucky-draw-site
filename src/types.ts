export interface Attendee {
  id: string;
  name: string;
  number: string;
  table: string;
}

export interface PrizeTier {
  id: string;
  name: string;
  label: string;
  color: string;
  gradient: string;
  count: number;
}

export interface Winner {
  attendee: Attendee;
  prize: PrizeTier;
  timestamp: number;
}

export const PRIZE_TIERS: PrizeTier[] = [
  {
    id: 'grand',
    name: 'Grand Prize',
    label: '🏆 GRAND PRIZE',
    color: '#D4AF37',
    gradient: 'from-[#F9E29B] via-[#D4AF37] to-[#996515]',
    count: 1
  },
  {
    id: 'first',
    name: 'First Prize',
    label: '🥇 FIRST PRIZE',
    color: '#E5E4E2',
    gradient: 'from-gray-100 via-gray-400 to-gray-700',
    count: 3
  },
  {
    id: 'second',
    name: 'Second Prize',
    label: '🥈 SECOND PRIZE',
    color: '#CD7F32',
    gradient: 'from-orange-200 via-[#D4AF37] to-orange-900',
    count: 5
  },
  {
    id: 'lucky',
    name: 'Lucky Draw',
    label: '🍀 LUCKY DRAW',
    color: '#4ADE80',
    gradient: 'from-emerald-300 via-emerald-600 to-emerald-900',
    count: 10
  },
  {
    id: 'sponsor',
    name: 'Sponsor Prize',
    label: '💎 SPONSOR SPECIAL',
    color: '#D4AF37',
    gradient: 'from-[#F9E29B] via-[#D4AF37] to-[#111]',
    count: 2
  }
];

export const INITIAL_ATTENDEES: Attendee[] = [
  { id: '1', name: 'Alexander Thompson', number: 'EMP001', table: 'Table 01' },
  { id: '2', name: 'Benjamin Wright', number: 'EMP002', table: 'Table 01' },
  { id: '3', name: 'Catherine Chen', number: 'EMP003', table: 'Table 02' },
  { id: '4', name: 'Daniel Kim', number: 'EMP004', table: 'Table 02' },
  { id: '5', name: 'Elizabeth Grant', number: 'EMP005', table: 'Table 03' },
  { id: '6', name: 'Fiona Gallagher', number: 'EMP006', table: 'Table 03' },
  { id: '7', name: 'George Miller', number: 'EMP007', table: 'Table 04' },
  { id: '8', name: 'Hannah Abbott', number: 'EMP008', table: 'Table 04' },
  { id: '9', name: 'Ian Wright', number: 'EMP009', table: 'Table 05' },
  { id: '10', name: 'Julia Roberts', number: 'EMP010', table: 'Table 05' },
  { id: '11', name: 'Kevin Hart', number: 'EMP011', table: 'Table 06' },
  { id: '12', name: 'Laura Palmer', number: 'EMP012', table: 'Table 06' },
  { id: '13', name: 'Michael Scott', number: 'EMP013', table: 'Table 07' },
  { id: '14', name: 'Nancy Drew', number: 'EMP014', table: 'Table 07' },
  { id: '15', name: 'Oscar Isaac', number: 'EMP015', table: 'Table 08' },
  { id: '16', name: 'Pam Beesly', number: 'EMP016', table: 'Table 08' },
  { id: '17', name: 'Quentin Blake', number: 'EMP017', table: 'Table 09' },
  { id: '18', name: 'Rachel Green', number: 'EMP018', table: 'Table 09' },
  { id: '19', name: 'Steven Strange', number: 'EMP019', table: 'Table 10' },
  { id: '20', name: 'Tony Stark', number: 'EMP020', table: 'Table 10' },
];
