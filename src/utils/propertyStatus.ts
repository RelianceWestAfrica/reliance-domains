export const PROPERTY_STATUS_COLORS = {
  'Disponible': {
    bg: 'bg-green-500',
    text: 'text-green-700',
    bgLight: 'bg-green-50',
    border: 'border-green-200',
    hex: '#22c55e',
    label: 'Available'
  },
  'Réservé(e)': {
    bg: 'bg-blue-500',
    text: 'text-blue-700',
    bgLight: 'bg-blue-50',
    border: 'border-blue-200',
    hex: '#3b82f6',
    label: 'Reserved'
  },
  'Soldé(e)': {
    bg: 'bg-red-500',
    text: 'text-red-700',
    bgLight: 'bg-red-50',
    border: 'border-red-200',
    hex: '#ef4444',
    label: 'Sold'
  },
  'Sous discussion cliente': {
    bg: 'bg-yellow-500',
    text: 'text-yellow-700',
    bgLight: 'bg-yellow-50',
    border: 'border-yellow-200',
    hex: '#eab308',
    label: 'Under Discussion'
  },
  'Sous mandat de gestion locative': {
    bg: 'bg-purple-500',
    text: 'text-purple-700',
    bgLight: 'bg-purple-50',
    border: 'border-purple-200',
    hex: '#a855f7',
    label: 'Rental Management'
  },
  'Offre surclassée': {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    bgLight: 'bg-gray-50',
    border: 'border-gray-200',
    hex: '#f3f4f6',
    label: 'Inactive'
  }
} as const

export type PropertyStatus = keyof typeof PROPERTY_STATUS_COLORS

export const getStatusColor = (status: PropertyStatus) => {
  return PROPERTY_STATUS_COLORS[status] || PROPERTY_STATUS_COLORS['Disponible']
}

export const getStatusBadgeClass = (status: PropertyStatus) => {
  const colors = getStatusColor(status)
  return `${colors.bg} ${colors.text} ${colors.border}`
}

export const getStatusChartColor = (status: PropertyStatus) => {
  return getStatusColor(status).hex
}

export const getStatusLabel = (status: PropertyStatus) => {
  return getStatusColor(status).label
}

export const STATUS_DISTRIBUTION_COLORS = [
  PROPERTY_STATUS_COLORS['Disponible'].hex,      // Green - Available
  PROPERTY_STATUS_COLORS['Réservé(e)'].hex,       // Blue - Reserved
  PROPERTY_STATUS_COLORS['Soldé(e)'].hex,         // Red - Sold
  PROPERTY_STATUS_COLORS['Sous discussion cliente'].hex, // Yellow - Under Discussion
  PROPERTY_STATUS_COLORS['Offre surclassée'].hex  // Gray - Inactive
]
