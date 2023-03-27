import { useTheme } from '@mui/material';

export default function Twitter({ color, ...rest }) {
  const theme = useTheme();

  return (
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.9288 1.68179C15.4113 1.91822 14.8672 2.08285 14.3099 2.17163C14.5705 2.12423 14.9538 1.62648 15.1064 1.42501C15.3382 1.12112 15.5148 0.774195 15.6274 0.401871C15.6274 0.374218 15.6534 0.334714 15.6274 0.314963C15.6143 0.307356 15.5995 0.30337 15.5846 0.30337C15.5696 0.30337 15.5549 0.307356 15.5418 0.314963C14.9367 0.662761 14.2928 0.92821 13.6252 1.10503C13.6019 1.11258 13.5771 1.11326 13.5535 1.10699C13.5299 1.10073 13.5084 1.08776 13.4912 1.06948C13.4392 1.0038 13.3833 0.941778 13.3237 0.883814C13.0514 0.624848 12.7425 0.412895 12.4082 0.255707C11.957 0.0592076 11.4696 -0.0258921 10.9828 0.0068349C10.5105 0.0384962 10.0494 0.172962 9.62819 0.401871C9.21337 0.643207 8.84879 0.97107 8.55637 1.36576C8.24877 1.77199 8.0267 2.24344 7.90509 2.74838C7.80481 3.22869 7.79344 3.7251 7.8716 4.21001C7.8716 4.29297 7.8716 4.30482 7.80461 4.29297C5.15112 3.87818 2.97399 2.87874 1.19507 0.7337C1.11691 0.638892 1.07598 0.638892 1.01271 0.7337C0.238619 1.98201 0.614499 3.95719 1.58211 4.93293C1.71237 5.06329 1.84634 5.1897 1.98777 5.30821C1.54412 5.27478 1.11131 5.14717 0.714982 4.93293C0.64055 4.88157 0.599613 4.90923 0.595891 5.00403C0.585341 5.13548 0.585341 5.26763 0.595891 5.39907C0.673544 6.02899 0.907417 6.62572 1.27359 7.12824C1.63977 7.63075 2.12511 8.02102 2.67998 8.25913C2.81525 8.32063 2.95619 8.36697 3.10052 8.39739C2.68981 8.48322 2.26859 8.49657 1.85379 8.4369C1.76447 8.41714 1.73098 8.4685 1.76447 8.55936C2.31154 10.1395 3.49873 10.6214 4.36958 10.8901C4.48867 10.9098 4.60776 10.9098 4.74174 10.9414C4.74174 10.9414 4.74174 10.9414 4.71941 10.9651C4.46262 11.4629 3.4243 11.7986 2.94794 11.9725C2.07845 12.304 1.15142 12.4307 0.231175 12.3438C0.0860334 12.3201 0.0525391 12.324 0.0153232 12.3438C-0.0218927 12.3635 0.0153232 12.407 0.0562607 12.4465C0.24234 12.5769 0.42842 12.6914 0.621942 12.802C1.19806 13.1356 1.80713 13.4006 2.43808 13.5921C5.70563 14.5481 9.38256 13.8449 11.8351 11.2574C13.7629 9.22697 14.4402 6.42616 14.4402 3.62141C14.4402 3.51475 14.563 3.45155 14.6337 3.39624C15.1214 2.99287 15.5514 2.51649 15.9102 1.98201C15.9724 1.90234 16.0042 1.8009 15.9995 1.69759C15.9995 1.63833 15.9995 1.65018 15.9288 1.68179Z"
        fill={theme.palette.text.icon}
      />
    </svg>
  );
}
