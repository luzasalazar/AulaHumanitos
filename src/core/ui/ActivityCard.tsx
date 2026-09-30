import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import type { Activity } from '../registry/activitiesRegistry';

interface ActivityCardProps {
  activity: Activity;
  icon: LucideIcon;
  color: string;
  tint: string;
}

export default function ActivityCard({ activity, icon: Icon, color, tint }: ActivityCardProps) {
  return (
    <Link
      to={activity.path}
      className="group flex flex-col h-full bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul"
    >
      <div
        className="h-36 w-full flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: tint }}
      >
        {activity.image ? (
          <img
            src={activity.image}
            alt={`Vista previa de ${activity.title}`}
            className="h-full w-full object-contain p-4"
          />
        ) : (
          <Icon size={40} color={color} strokeWidth={1.75} aria-hidden="true" />
        )}
      </div>

      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-poppins font-semibold text-lg text-negro-suave mb-2">
          {activity.title}
        </h3>
        <p className="font-montserrat text-sm text-negro-suave/60 leading-relaxed flex-1">
          {activity.description}
        </p>
        <span className="mt-5 inline-flex items-center self-start font-poppins font-semibold text-sm text-morado bg-amarillo rounded-full px-5 py-2.5 transition-colors group-hover:bg-morado group-hover:text-white">
          Comenzar
        </span>
      </div>
    </Link>
  );
}
