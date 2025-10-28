export function formatTime(timestr){
  if(!timestr) return '';
  try{
    const d = new Date(timestr);
    return d.toLocaleString(undefined, { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }catch(e){ return timestr; }
}
