// Lucide-style SVG icon components for React
import {
  Map, Hospital, Stethoscope, Hammer, Scissors,
  Activity, Target, Sparkles, Truck, Globe,
  MapPin, AlertOctagon, Clock, Siren,
  MessageCircle, AlertTriangle, Phone, Mail,
  X, List, Search,
} from 'lucide-react'

export {
  Map, Hospital, Stethoscope, Hammer, Scissors,
  Activity, Target, Sparkles, Truck, Globe,
  MapPin, AlertOctagon, Clock, Siren,
  MessageCircle, AlertTriangle, Phone, Mail,
  X, List, Search,
}

// Horse head SVG — used as logo and empty state
export function HorseIcon({ size = 20, color = 'currentColor', style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      {/* Horse head silhouette as stroked path */}
      <path d="M8 3 C6 3 4 5 4 7 L4 9 C4 10 5 11 6 11 L6 12 C5 13 4 14 4 16 C4 18 5 20 7 21 L10 21 L10 19 C11 19 12 18 12 17 L14 17 C16 17 18 15 18 13 L18 10 C18 7 16 4 14 3 Z" />
      <path d="M6 11 C5 10 4 9 4 8" />
      <circle cx="7" cy="7" r="0.8" fill={color} stroke="none" />
      <path d="M10 21 L10 23" />
      <path d="M7 21 L7 23" />
    </svg>
  )
}

// Horseshoe SVG — used for branding
export function HorseshoeIcon({ size = 20, color = 'currentColor', style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      <path d="M12 3 C7.5 3 4 6.5 4 11 L4 17 C4 18.1 4.9 19 6 19 L8 19 L8 13 C8 10.8 9.8 9 12 9 C14.2 9 16 10.8 16 13 L16 19 L18 19 C19.1 19 20 18.1 20 17 L20 11 C20 6.5 16.5 3 12 3 Z" />
      <line x1="7" y1="16" x2="7" y2="19" />
      <line x1="17" y1="16" x2="17" y2="19" />
    </svg>
  )
}

// WhatsApp icon (not in lucide)
export function WhatsAppIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.852L.057 23.213a.75.75 0 0 0 .92.92l5.4-1.464A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.52-5.187-1.427l-.37-.223-3.844 1.041 1.062-3.777-.245-.388A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  )
}

// SVG strings for Leaflet divIcon (not React components)
export const MARKER_SVG = {
  emergency: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  clock: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  horse: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 C7.5 3 4 6.5 4 11 L4 17 C4 18.1 4.9 19 6 19 L8 19 L8 13 C8 10.8 9.8 9 12 9 C14.2 9 16 10.8 16 13 L16 19 L18 19 C19.1 19 20 18.1 20 17 L20 11 C20 6.5 16.5 3 12 3 Z"/></svg>`,
}
