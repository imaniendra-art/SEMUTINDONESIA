import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Jadwal Acara | SEMUT INDONESIA",
  description: "Jadwal acara, event, dan kegiatan Seniman Musik Dangdut Indonesia.",
};

export default async function AcaraPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: 'asc' },
    // where: { date: { gte: new Date() } } // In a real app, only show upcoming
  });

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Header */}
      <div className="bg-semut-gold text-black py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-4">Jadwal Acara</h1>
          <p className="text-lg max-w-2xl mx-auto text-semut-gold-900">
            Ikuti berbagai kegiatan, festival, dan acara dari SEMUT INDONESIA
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 flex-1">
        {events.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            Belum ada jadwal acara yang tersedia.
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {events.map((event) => {
              const eventDate = new Date(event.date);
              const month = eventDate.toLocaleString('id-ID', { month: 'short' });
              const day = eventDate.getDate();
              const year = eventDate.getFullYear();
              const time = eventDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
              
              return (
                <div key={event.id} className="bg-white dark:bg-gray-950 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start group hover:shadow-md transition-all">
                  
                  {/* Date Badge */}
                  <div className="w-24 h-24 rounded-2xl bg-semut-red/10 border border-semut-red/20 flex flex-col items-center justify-center shrink-0 text-semut-red">
                    <span className="text-sm font-bold uppercase tracking-wider">{month}</span>
                    <span className="text-3xl font-extrabold leading-none my-1">{day}</span>
                    <span className="text-xs font-semibold">{year}</span>
                  </div>
                  
                  {/* Event Details */}
                  <div className="flex-1 min-w-0 text-center md:text-left">
                    <h2 className="text-2xl font-bold mb-2 group-hover:text-semut-gold transition-colors break-words">{event.title}</h2>
                    <div 
                      className="text-gray-600 dark:text-gray-400 mb-6 break-words prose dark:prose-invert max-w-none text-sm md:text-base [&>p]:whitespace-normal [&_p]:mb-2 [&_h1]:mb-2 [&_h2]:mb-2 [&_h3]:mb-2 [&_h4]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
                      dangerouslySetInnerHTML={{ __html: event.description }} 
                    />
                    
                    <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-semut-red"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {time} WIB
                      </div>
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-semut-gold"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
