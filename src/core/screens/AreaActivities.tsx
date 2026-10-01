import { useParams, Navigate } from 'react-router-dom';
import Layout from '../ui/Layout';
import ActivityCard from '../ui/ActivityCard';
import EmptyState from '../ui/EmptyState';
import { areaRegistry } from '../registry/areaRegistry';
import { activitiesByArea } from '../registry/activitiesRegistry';
import { AREA_VISUALS, DEFAULT_AREA_VISUAL } from '../ui/areaVisuals';

export default function AreaActivities() {
  const { areaId } = useParams<{ areaId: string }>();
  const area = areaRegistry.find((a) => a.id === areaId);

  // Retornar al inicio si el área no existe.
  if (!area) {
    return <Navigate to="/" replace />;
  }

  const activities = activitiesByArea[area.id] ?? [];
  const visual = AREA_VISUALS[area.id] ?? DEFAULT_AREA_VISUAL;
  const Icon = visual.icon;

  return (
    <Layout>
      <div
        className="relative overflow-hidden rounded-3xl px-8 py-10 mb-8 text-center"
        style={{ background: `linear-gradient(135deg, ${visual.tint}, #FFFFFF 55%, #FFF8DC)` }}
      >
        <span
          className="absolute -top-8 -left-8 w-28 h-28 rounded-full"
          style={{ backgroundColor: `${visual.color}33` }}
          aria-hidden="true"
        />
        <span
          className="absolute -bottom-10 -right-6 w-32 h-32 rounded-full bg-amarillo/25"
          aria-hidden="true"
        />
        <span
          className="absolute top-6 right-10 w-6 h-6 rounded-full"
          style={{ backgroundColor: `${visual.color}66` }}
          aria-hidden="true"
        />

        <div className="relative">

          <h1 className="font-poppins font-extrabold text-4xl md:text-5xl text-negro-suave mb-2">
            {area.name}
          </h1>

          <svg width="140" height="12" viewBox="0 0 140 12" className="mx-auto mb-3" aria-hidden="true">
            <path
              d="M2 8 Q 20 2, 38 8 T 74 8 T 110 8 T 138 8"
              stroke={visual.color}
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          <p className="font-montserrat text-base text-negro-suave/70 max-w-xl mx-auto leading-relaxed">
            ¡Escoge una actividad para empezar a aprender!
          </p>
        </div>
      </div>

      {activities.length === 0 ? (
        <EmptyState
          message="Muy pronto habrá actividades disponibles en esta área."
          color={visual.color}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              icon={visual.icon}
              color={visual.color}
              tint={visual.tint}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}
