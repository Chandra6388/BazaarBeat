export const ConvertDate = (data: string) => {
    const date = new Date(data);
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    const formatted = date.toLocaleString('en-US', options);
    return formatted;
  };
  