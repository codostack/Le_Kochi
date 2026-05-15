export const PhoneIcon = ({ color = "#f5efe6", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" stroke={color} strokeWidth="2" fill="none"/>
  </svg>
);

export const LocationIcon = ({ color = "#f5efe6", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="10" r="3" stroke={color} strokeWidth="2"/>
    <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 14 8 14s8-8.75 8-14c0-4.42-3.58-8-8-8z" stroke={color} strokeWidth="2" fill="none"/>
  </svg>
);

export const MailIcon = ({ color = "#f5efe6", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth="2"/>
    <path d="M2 7l10 7 10-7" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const ClockIcon = ({ color = "#f5efe6", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2"/>
    <path d="M12 7v5l3 3" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const WhatsappIcon = ({ color = "#f5efe6", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill={color}/>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" fill={color}/>
  </svg>
);

export const OrderIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="white" strokeWidth="2" fill="none"/>
    <line x1="3" y1="6" x2="21" y2="6" stroke="white" strokeWidth="2"/>
    <path d="M16 10a4 4 0 01-8 0" stroke="white" strokeWidth="2" fill="none"/>
  </svg>
);

export const InstagramIcon = ({ color = "#f5efe6", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="5" stroke={color} strokeWidth="2"/>
    <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="2"/>
    <circle cx="17.5" cy="6.5" r="1" fill={color}/>
  </svg>
);

export const FacebookIcon = ({ color = "#f5efe6", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const GoogleIcon = ({ color = "#f5efe6", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill={color}/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill={color}/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill={color}/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill={color}/>
  </svg>
);

export const LogoIcon = () => (
  <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
    <path d="M18 2 C10 2 4 8 4 14 C4 20 10 26 18 26 C26 26 32 20 32 14"
      stroke="#c8821e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M10 10 Q18 4 26 10"
      stroke="#c8821e" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
);